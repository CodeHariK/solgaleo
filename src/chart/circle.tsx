import { createSignal, onMount, createEffect, onCleanup } from "solid-js";
import { Point } from "./area";

interface CircleChartProps {
    data: {
        label: string;
        value: number;
        color: string;
    }[];
    radius: number;
    thickness?: number;
    duration?: number;
    startAngle?: number;
}

export function CircleChart(props: CircleChartProps) {
    const [hoveredSegment, setHoveredSegment] = createSignal<Point | null>(null);
    const [internalData, setInternalData] = createSignal(props.data);
    let canvasRef: HTMLCanvasElement;
    let animationFrameId: number;

    // Calculate actual dimensions
    const diameter = props.radius * 2;
    const clampedThickness = props.thickness
        ? Math.min(Math.max(props.thickness, 0), props.radius)
        : props.radius * 0.3;

    function drawChart(data: typeof props.data, progress = 1) {
        if (!canvasRef) return;
        const ctx = canvasRef.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, diameter, diameter);
        ctx.save();

        const centerX = props.radius;
        const centerY = props.radius;
        const startAngle = props.startAngle ?? -Math.PI / 2;

        // Rest of drawing logic stays the same but uses props.radius and clampedThickness
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const points: Point[] = [];

        let currentAngle = startAngle;

        data.forEach((item) => {
            const segmentAngle = (item.value / total) * Math.PI * 2 * progress;
            const endAngle = currentAngle + segmentAngle;
            const midAngle = currentAngle + segmentAngle / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, props.radius, currentAngle, endAngle);
            ctx.arc(centerX, centerY, props.radius - clampedThickness, endAngle, currentAngle, true);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();

            points.push({
                x: centerX + Math.cos(midAngle) * (props.radius - clampedThickness / 2),
                y: centerY + Math.sin(midAngle) * (props.radius - clampedThickness / 2),
                value: item.value,
                label: item.label,
                color: item.color,
                percentage: (item.value / total) * 100
            });

            currentAngle = endAngle;
        });

        ctx.restore();

        // Add hover detection
        canvasRef.onmousemove = (e) => {
            const rect = canvasRef.getBoundingClientRect();
            const x = e.clientX - rect.left - centerX;
            const y = e.clientY - rect.top - centerY;
            const distance = Math.sqrt(x * x + y * y);

            if (distance <= props.radius && distance >= props.radius - clampedThickness) {
                const angle = Math.atan2(y, x);
                let normalizedAngle = angle;
                if (normalizedAngle < startAngle) {
                    normalizedAngle += Math.PI * 2;
                }

                let accumulatedAngle = startAngle;
                const segment = points.find(p => {
                    const segmentAngle = (p.value / total) * Math.PI * 2;
                    accumulatedAngle += segmentAngle;
                    return normalizedAngle <= accumulatedAngle;
                });

                setHoveredSegment(segment || null);
            } else {
                setHoveredSegment(null);
            }
        };

        canvasRef.onmouseleave = () => setHoveredSegment(null);
    }

    function animate(prevData: typeof props.data, newData: typeof props.data, duration = 500) {
        const startTime = performance.now();

        function update(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth easing
            const t = progress < .5 ?
                4 * progress * progress * progress :
                1 - Math.pow(-2 * progress + 2, 3) / 2;

            // Create interpolated data
            const interpolated = newData.map((item, i) => ({
                ...item,
                value: prevData[i].value + (item.value - prevData[i].value) * t
            }));

            drawChart(interpolated, 1); // progress is now handled in value interpolation

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(update);
            }
        }

        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(update);
    }

    // Initialize on mount
    onMount(() => {
        if (!canvasRef) return;
        const initialData = props.data.map(item => ({ ...item, value: 0 }));
        drawChart(initialData);
        requestAnimationFrame(() => animate(initialData, props.data, props.duration ?? 500));
    });

    // Watch for data changes
    createEffect(() => {
        const { data, duration } = props;
        const prevData = internalData();

        if (JSON.stringify(prevData) !== JSON.stringify(data)) {
            animate(prevData, data, duration ?? 500);
            setInternalData(data);
        } else {
            drawChart(data);
        }
    });

    onCleanup(() => {
        cancelAnimationFrame(animationFrameId);
    });

    return (
        <div style={{ position: "relative" }}>
            <canvas
                width={diameter}
                height={diameter}
                ref={canvasRef}
            />

            {/* Tooltip position calculation updated */}
            {hoveredSegment() && (
                <div
                    style={{
                        position: "absolute",
                        left: `${hoveredSegment().x}px`,
                        top: `${hoveredSegment().y - 10}px`,
                        transform: "translate(-50%, -100%)",
                        background: "var(--primary-bg)",
                        padding: "0.5rem",
                        border: "1px solid var(--primary)",
                        "border-radius": "4px",
                        "pointer-events": "none",
                        "z-index": 1000,
                    }}
                >
                    <div style={{ color: hoveredSegment().color, "font-weight": "bold" }}>
                        {hoveredSegment().label}
                    </div>
                    <div>Value: {hoveredSegment().value}</div>
                    <div>{hoveredSegment().percentage.toFixed(1)}%</div>
                </div>
            )}

            {/* Legend stays the same */}
            <div
                style={{
                    display: "flex",
                    "flex-direction": "column",
                    gap: "0.5rem",
                    padding: "0.5rem",
                    position: "absolute",
                    right: "1rem",
                    top: "1rem",
                }}
            >
                {props.data.map((item) => (
                    <div style={{
                        display: "flex",
                        "align-items": "center",
                        gap: "0.5rem",
                    }}>
                        <div style={{
                            width: "15px",
                            height: "15px",
                            "background-color": item.color,
                            "border-radius": "2px",
                        }} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
