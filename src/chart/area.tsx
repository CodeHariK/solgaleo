import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

// Update the interface to include area color options and chart type
interface Point {
    x: number;
    y: number;
    value: number;
    label: string;
    color: string;
    stackHeight?: number;  // Add optional stackHeight for stacked bars
}

interface AreaChartProps {
    data: {
        label: string;
        values: number[];
        lineColor: string;
        areaColor?: string;
    }[];
    width: number;
    height: number;
    smooth?: boolean;
    duration?: number;
    curveType?: 'catmull-rom' | 'cubic-bezier';
    chartType?: 'line' | 'bar' | 'stacked-bar';
    barWidth?: number;
}

// Add helper function for Catmull-Rom spline
function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number) {
    const v0 = (p2 - p0) * 0.5;
    const v1 = (p3 - p1) * 0.5;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * p1 - 2 * p2 + v0 + v1) * t3 +
        (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 +
        v0 * t + p1;
}

function isPointInRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

export function AreaChart(props: AreaChartProps) {
    const [hoveredPoint, setHoveredPoint] = createSignal<Point | null>(null);
    const [internalData, setInternalData] = createSignal(props.data);
    let canvasRef: HTMLCanvasElement;
    let animationFrameId: number;

    function drawChart(data: typeof props.data) {
        if (!canvasRef) return;
        const ctx = canvasRef.getContext("2d");
        if (!ctx) return;

        // Clear with full rect
        ctx.clearRect(0, 0, props.width, props.height);
        ctx.save();

        // Update padding - remove right padding since legend is now in HTML
        const padding = {
            top: 20,
            right: 20, // Reduced from 120
            bottom: 20,
            left: 40,
        };

        // Calculate drawing area
        const drawWidth = props.width - padding.left - padding.right;
        const drawHeight = props.height - padding.top - padding.bottom;

        // For stacked bars, we need to calculate max of sums
        const maxY = props.chartType === 'stacked-bar'
            ? Math.max(...data[0].values.map((_, i) =>
                data.reduce((sum, series) => sum + series.values[i], 0)
            )) * 1.1
            : Math.max(...data.flatMap((d) => d.values)) * 1.1;

        // Draw grid
        const stepsY = 5;
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;

        // Horizontal grid lines
        for (let i = 0; i <= stepsY; i++) {
            const y = padding.top + (drawHeight * i) / stepsY;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(props.width - padding.right, y);
            ctx.stroke();

            // Add Y axis labels
            ctx.fillStyle = "#666";
            ctx.textAlign = "right";
            ctx.fillText(
                ((maxY * (stepsY - i)) / stepsY).toFixed(1),
                padding.left - 5,
                y + 4
            );
        }

        // Vertical grid lines
        ctx.strokeStyle = "#eee";
        for (let i = 0; i < data[0].values.length; i++) {
            const x = padding.left + (drawWidth * i) / (data[0].values.length - 1);
            ctx.beginPath();
            ctx.moveTo(x, padding.top);
            ctx.lineTo(x, props.height - padding.bottom);
            ctx.stroke();
        }

        // Store points for hit testing
        const points: Point[] = [];

        if (props.chartType === 'bar' || props.chartType === 'stacked-bar') {
            const barWidth = props.barWidth ?? drawWidth / (data[0].values.length * (data.length + 1));

            if (props.chartType === 'bar') {
                // Regular bar chart - bars start at x point and go right
                data.forEach((series, seriesIndex) => {
                    series.values.forEach((val, i) => {
                        const x = padding.left + (drawWidth * i) / series.values.length;
                        const barX = x + (barWidth * seriesIndex); // Remove centering offset
                        const height = (val / maxY) * drawHeight;
                        const y = props.height - padding.bottom - height;

                        ctx.beginPath();
                        ctx.fillStyle = series.lineColor;
                        ctx.fillRect(barX, y, barWidth, height);

                        // Store point data for hover
                        points.push({
                            x: barX + barWidth / 2,
                            y: y,
                            value: val,
                            label: series.label,
                            color: series.lineColor,
                        });
                    });
                });
            } else {
                // Stacked bar chart - bars align with x point
                data[0].values.forEach((_, i) => {
                    let stackHeight = 0;
                    const x = padding.left + (drawWidth * i) / data[0].values.length;

                    data.forEach((series) => {
                        const val = series.values[i];
                        const height = (val / maxY) * drawHeight;
                        const y = props.height - padding.bottom - height - stackHeight;

                        ctx.beginPath();
                        ctx.fillStyle = series.lineColor;
                        ctx.fillRect(x, y, barWidth, height);

                        // Store point data for hover
                        points.push({
                            x: x + barWidth / 2,
                            y: y + height / 2,
                            value: val,
                            label: series.label,
                            color: series.lineColor,
                            stackHeight: stackHeight + height,
                        });

                        stackHeight += height;
                    });
                });
            }
        } else {
            // Original line chart code
            data.forEach((series) => {
                // Start path for line
                ctx.beginPath();

                series.values.forEach((val, i) => {
                    const x = padding.left + (drawWidth * i) / (series.values.length - 1);
                    const y = props.height - padding.bottom - (val / maxY) * drawHeight;

                    // Store point data for hover
                    points.push({
                        x, y, value: val,
                        label: series.label,
                        color: series.lineColor,
                    });

                    // Draw line segments
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else if (props.smooth) {

                        const prevX = padding.left + (drawWidth * (i - 1)) / (series.values.length - 1);
                        const prevY = props.height - padding.bottom - (series.values[i - 1] / maxY) * drawHeight;

                        if (props.curveType === 'cubic-bezier') {
                            // Cubic bezier interpolation
                            const cp1x = prevX + (x - prevX) * 0.5;
                            const cp1y = prevY;
                            const cp2x = x - (x - prevX) * 0.5;
                            const cp2y = y;
                            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                        } else {
                            // Default to Catmull-Rom
                            const p0y = i > 1 ? series.values[i - 2] : series.values[i - 1];
                            const p1y = series.values[i - 1];
                            const p2y = val;
                            const p3y = i < series.values.length - 1 ? series.values[i + 1] : val;

                            const py0 = props.height - padding.bottom - (p0y / maxY) * drawHeight;
                            const py1 = props.height - padding.bottom - (p1y / maxY) * drawHeight;
                            const py2 = y;
                            const py3 = props.height - padding.bottom - (p3y / maxY) * drawHeight;

                            for (let t = 0; t < 1; t += 0.1) {
                                const cy = catmullRom(py0, py1, py2, py3, t);
                                const cx = padding.left + (drawWidth * (i - 1 + t)) / (series.values.length - 1);
                                ctx.lineTo(cx, cy);
                            }
                            ctx.lineTo(x, y);
                        }

                    } else {
                        ctx.lineTo(x, y);
                    }
                });

                // Stroke the line
                ctx.strokeStyle = series.lineColor;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Fill area only if areaColor is provided
                if (series.areaColor) {
                    ctx.lineTo(props.width - padding.right, props.height - padding.bottom);
                    ctx.lineTo(padding.left, props.height - padding.bottom);
                    ctx.closePath();
                    ctx.fillStyle = series.areaColor;
                    ctx.fill();
                }

                // Draw points on top of lines
                series.values.forEach((val, i) => {
                    const x = padding.left + (drawWidth * i) / (series.values.length - 1);
                    const y = props.height - padding.bottom - (val / maxY) * drawHeight;

                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(x, y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = series.lineColor;
                    ctx.fill();
                    // ctx.strokeStyle = "#fff";
                    // ctx.lineWidth = 2;
                    // ctx.stroke();
                    ctx.restore();
                });
            });
        }

        // Add canvas event listeners
        canvasRef.onmousemove = (e) => {
            const rect = canvasRef.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (props.chartType === 'bar' || props.chartType === 'stacked-bar') {
                // Calculate barWidth here so it's in scope
                const barWidth = props.barWidth ?? drawWidth / (data[0].values.length * (data.length + 1));

                // Find bar under cursor
                const point = points.find(p => {
                    if (props.chartType === 'bar') {
                        const barHeight = (p.value / maxY) * drawHeight;
                        return isPointInRect(
                            mouseX,
                            mouseY,
                            p.x - barWidth / 2,
                            p.y,
                            barWidth,
                            barHeight
                        );
                    } else {
                        return isPointInRect(
                            mouseX,
                            mouseY,
                            p.x - barWidth / 2,
                            p.y - (p.stackHeight ?? 0) / 2,
                            barWidth,
                            p.stackHeight ?? barWidth
                        );
                    }
                });
                if (point) {
                    // Update point coordinates to mouse position for bars
                    setHoveredPoint({
                        ...point,
                        x: mouseX,
                        y: mouseY
                    });
                } else {
                    setHoveredPoint(null);
                }
            } else {
                const point = points.find(
                    p => Math.sqrt(Math.pow(p.x - mouseX, 2) + Math.pow(p.y - mouseY, 2)) < 10
                );
                setHoveredPoint(point || null);
            }
        };

        canvasRef.onmouseleave = () => setHoveredPoint(null);

        ctx.restore();
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

    // Update onMount to pass duration
    onMount(() => {
        if (!canvasRef) return;
        const initialData = props.data.map(series => ({
            ...series,
            values: Array(series.values.length).fill(0)
        }));
        drawChart(initialData);
        requestAnimationFrame(() => animate(initialData, props.data, props.duration ?? 500));
    });

    // Update effect to pass duration
    createEffect(() => {
        const newData = props.data;
        const prevData = internalData();

        if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
            animate(prevData, newData, props.duration ?? 500);
            setInternalData(newData);
        }
    });

    onCleanup(() => {
        cancelAnimationFrame(animationFrameId);
    });

    return (
        <div style={{ position: "relative" }}>

            <canvas width={props.width} height={props.height} ref={canvasRef} />

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
                    <div
                        style={{
                            color: hoveredPoint().color,
                            "font-weight": "bold",
                        }}
                    >
                        {hoveredPoint().label}
                    </div>
                    <div>Value: {hoveredPoint().value}</div>
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
                {props.data.map((series) => (
                    <div
                        style={{
                            display: "flex",
                            "align-items": "center",
                            gap: "0.5rem",
                        }}
                    >
                        <div
                            style={{
                                width: "15px",
                                height: "15px",
                                "background-color": series.lineColor,
                                "border-radius": "2px",
                            }}
                        />
                        <span>{series.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
