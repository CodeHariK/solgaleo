import { createSignal, onMount, createEffect, onCleanup } from "solid-js";
import { DrawCircle, DrawLine } from "./canvas";
import { Point } from "./area";

interface RadarChartProps {
    data: {
        label: string;
        values: number[];
        color: string;
        fillColor?: string;
    }[];
    labels: string[];
    duration?: number;
    gridCount?: number;
    padding?: number;  // Single padding number
    style?: {
        fontSize?: number;
        fontColor?: string;
        gridColor?: string;
        axisColor?: string;
    };
    width?: string;
    height?: string;
    radius?: number;
}

export function RadarChart(props: RadarChartProps) {
    const [hoveredPoint, setHoveredPoint] = createSignal<Point | null>(null);
    const [internalData, setInternalData] = createSignal(props.data);
    let canvasRef: HTMLCanvasElement;
    let containerRef: HTMLDivElement;
    let resizeObserver: ResizeObserver;
    let animationFrameId: number;

    const gridCount = props.gridCount ?? 5;

    function calculateDimensions() {
        if (!containerRef) return { radius: 100, diameter: 200 }; // Default values

        const rect = containerRef.getBoundingClientRect();
        const minSize = Math.min(rect.width, rect.height);
        const radius = props.radius ?? (minSize / 2 - (props.padding ?? 20));
        const diameter = radius * 2;

        return { radius, diameter };
    }

    function normalizeData(data: typeof props.data): typeof props.data {
        // Find max value for each axis across all series
        const maxValues = props.labels.map((_, axisIndex) =>
            Math.max(...data.map(series => Math.abs(series.values[axisIndex])))
        );

        // Normalize each value by dividing by its axis max
        return data.map(series => ({
            ...series,
            values: series.values.map((value, i) =>
                maxValues[i] === 0 ? 0 : value / maxValues[i]
            )
        }));
    }

    function updateCanvasSize() {
        if (!containerRef || !canvasRef) return;
        const { diameter } = calculateDimensions();
        const padding = props.padding ?? 20;
        const totalSize = diameter + (padding * 2);

        canvasRef.width = totalSize;
        canvasRef.height = totalSize;

        drawChart(internalData());
    }

    function drawChart(data: typeof props.data, progress = 1) {
        if (!canvasRef) return;
        const ctx = canvasRef.getContext('2d');
        if (!ctx) return;

        const { radius, diameter } = calculateDimensions();
        const padding = props.padding ?? 20;

        // Adjust canvas size to include padding
        const totalDiameter = diameter + (padding * 2);

        // Clear and prepare canvas
        ctx.clearRect(0, 0, totalDiameter, totalDiameter);
        ctx.save();

        // Center coordinates now include padding
        const centerX = radius + padding;
        const centerY = radius + padding;
        const angleStep = (Math.PI * 2) / props.labels.length;

        // Get style values with defaults
        const style = {
            fontSize: props.style?.fontSize ?? 12,
            fontColor: props.style?.fontColor ?? 'red',
            gridColor: props.style?.gridColor ?? '#ddd',
            axisColor: props.style?.axisColor ?? '#ddd'
        };

        // Apply font settings
        ctx.font = `${style.fontSize}px sans-serif`;

        // Normalize data before drawing
        const normalizedData = normalizeData(data);
        const POINTS: Point[] = [];

        // Draw data first
        normalizedData.forEach(series => {
            const points: { x: number; y: number }[] = [];

            // Calculate points
            series.values.forEach((val, i) => {
                const angle = -Math.PI / 2 + i * angleStep;
                const normalizedValue = val * progress;
                const x = centerX + Math.cos(angle) * (radius * normalizedValue);
                const y = centerY + Math.sin(angle) * (radius * normalizedValue);

                points.push({ x, y });
            });

            // Draw filled area
            if (series.fillColor && points.length > 2) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                points.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.closePath();
                ctx.fillStyle = series.fillColor;
                ctx.fill();
            }

            // Draw connecting lines
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            points.forEach(point => {
                ctx.lineTo(point.x, point.y);
            });
            ctx.lineTo(points[0].x, points[0].y); // Close the shape
            ctx.strokeStyle = series.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Store points for hover detection and draw point markers
            points.forEach((point, i) => {
                POINTS.push({
                    x: point.x,
                    y: point.y,
                    value: data[series.label]?.values[i] ?? 0,
                    label: series.label,
                    axisLabel: props.labels[i],
                    color: series.color
                });

                DrawCircle(
                    ctx,
                    point,
                    4,
                    true,
                    1,
                    series.color,
                    null
                );
            });
        });

        // Draw grid after data
        for (let g = 1; g <= gridCount; g++) {
            const gridRadius = (radius * g) / gridCount;
            ctx.beginPath();
            ctx.strokeStyle = style.gridColor;
            ctx.setLineDash([2, 2]);
            ctx.arc(centerX, centerY, gridRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw axes
        props.labels.forEach((_, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            DrawLine(
                ctx,
                { x: centerX, y: centerY },
                {
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius
                },
                1,
                style.axisColor
            );
        });

        // Update label positioning
        ctx.textAlign = 'center';
        ctx.fillStyle = style.fontColor;
        props.labels.forEach((label, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            const labelRadius = radius + (padding * 0.5); // Use half padding for label distance
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;
            ctx.fillText(label, x, y);
        });

        ctx.restore();

        // Add hover detection
        canvasRef.onmousemove = (e) => {
            const rect = canvasRef.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const point = POINTS.find(p =>
                Math.sqrt(Math.pow(p.x - mouseX, 2) + Math.pow(p.y - mouseY, 2)) < 10
            );

            setHoveredPoint(point || null);
        };

        canvasRef.onmouseleave = () => setHoveredPoint(null);
    }

    function animate(prevData: typeof props.data,
        newData: typeof props.data,
        duration = props.duration ?? 500
    ) {
        const startTime = performance.now();

        function update(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth easing function
            const t = progress < .5 ?
                4 * progress * progress * progress :
                1 - Math.pow(-2 * progress + 2, 3) / 2;

            // Create interpolated data
            const interpolated = newData.map((series, i) => ({
                ...series,
                values: series.values.map((target, j) => {
                    const start = (prevData[i]?.values[j] ?? 0);
                    return start + (target - start) * t;
                })
            }));

            drawChart(interpolated);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(update);
            }
        }

        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(update);
    }

    onMount(() => {
        resizeObserver = new ResizeObserver(updateCanvasSize);
        resizeObserver.observe(containerRef);

        const initialData = props.data.map(series => ({
            ...series,
            values: Array(series.values.length).fill(0)
        }));
        updateCanvasSize();
        requestAnimationFrame(() => animate(initialData, props.data, props.duration ?? 500));
    });

    createEffect(() => {
        // Destructure all props to track them
        const {
            data,
            duration,
        } = props;

        // Get current state
        const prevData = internalData();

        // If data changed, animate
        if (JSON.stringify(prevData) !== JSON.stringify(data)) {
            animate(prevData, data, duration ?? 500);
            setInternalData(data);
        } else {
            // If other props changed but data didn't, just redraw
            drawChart(data);
        }
    });

    onCleanup(() => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver?.disconnect();
    });

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: props.width ?? '100%',
                height: props.height ?? '100%',
            }}
        >
            <canvas ref={canvasRef} />

            {/* Tooltip */}
            {hoveredPoint() && (
                <div
                    style={{
                        position: "absolute",
                        left: `${hoveredPoint().x}px`,
                        top: `${hoveredPoint().y - 10}px`,
                        transform: "translate(-50%, -100%)",
                        background: "var(--primary-bg)",
                        padding: "0.5rem",
                        border: "1px solid var(--primary)",
                        "border-radius": "4px",
                        "pointer-events": "none",
                        "z-index": 1000,
                    }}
                >
                    <div style={{ color: hoveredPoint().color, "font-weight": "bold" }}>
                        {hoveredPoint().label}
                    </div>
                    <div>{hoveredPoint().axisLabel}: {hoveredPoint().value}</div>
                </div>
            )}

            {/* Legend */}
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
                {props.data.map(series => (
                    <div style={{
                        display: "flex",
                        "align-items": "center",
                        gap: "0.5rem",
                    }}>
                        <div style={{
                            width: "15px",
                            height: "15px",
                            "background-color": series.color,
                            "border-radius": "2px",
                        }} />
                        <span>{series.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
