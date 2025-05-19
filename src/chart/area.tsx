import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { DrawBezierCurve, DrawCatmullRomSpline, DrawCircle, DrawGrid, DrawLinearCurve, DrawRectangle, DrawTriangle, IsPointInRect } from "./canvas";

export type Point = {
    x: number;
    y: number;
    value: number;
    label: string;
    color: string;
    stackHeight?: number;
    percentage?: number;
    axisLabel?: string;
}

type AreaChartData = {
    label: string;
    values: number[];
    lineColor: string;
    areaColor?: string;
}

type AreaChartProps = {
    data: AreaChartData[];
    width: number;
    height: number;
    duration?: number;
    curveType?: 'linear' | 'catmull-rom' | 'cubic-bezier';
    chartType?: 'line' | 'bar' | 'stacked-bar';
    barWidth?: number;
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
            right: 20,
            bottom: 20,
            left: 20,
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

        DrawGrid(ctx, props.width, props.height, 50, 1, "#ccc");

        // Store points for hit testing
        const POINTS: Point[] = [];

        if (props.chartType === 'bar') {
            const barWidth = props.barWidth ?? drawWidth / (data[0].values.length * (data.length + 1));

            // Regular bar chart - bars start at x point and go right
            data.forEach((series, seriesIndex) => {
                series.values.forEach((val, i) => {
                    const barX = padding.left + (drawWidth * i) / series.values.length + (barWidth * seriesIndex);
                    const height = (val / maxY) * drawHeight;
                    const y = props.height - padding.bottom - height;

                    DrawRectangle(ctx,
                        { x: barX, y }, barWidth, height,
                        1, series.lineColor
                    );

                    // Store point data for hover
                    POINTS.push({
                        x: barX + barWidth / 2,
                        y: y,
                        value: val,
                        label: series.label,
                        color: series.lineColor,
                    });
                });
            });
        }

        if (props.chartType === 'stacked-bar') {
            const barWidth = props.barWidth ?? drawWidth / (data[0].values.length * (data.length + 1));

            // Stacked bar chart - bars align with x point
            data[0].values.forEach((_, i) => {
                let stackHeight = 0;
                const x = padding.left + (drawWidth * i) / data[0].values.length;

                data.forEach((series) => {
                    const val = series.values[i];
                    const height = (val / maxY) * drawHeight;
                    const y = props.height - padding.bottom - height - stackHeight;

                    DrawRectangle(ctx,
                        { x, y }, barWidth, height,
                        1, series.lineColor
                    );

                    // Store point data for hover
                    POINTS.push({
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

        if (props.chartType === 'line') {

            data.forEach((series, seriesIndex) => {
                // Start path for line
                ctx.beginPath();

                const points = series.values.map((val, i) => ({
                    x: padding.left + (drawWidth * i) / (series.values.length - 1),
                    y: props.height - padding.bottom - (val / maxY) * drawHeight
                }));

                points.forEach((point, i) => {
                    POINTS.push({
                        ...point,
                        value: series.values[i],
                        label: series.label,
                        color: series.lineColor,
                    });
                });

                if (props.curveType === 'linear') {
                    DrawLinearCurve(ctx, points, 2, series.lineColor);
                }
                else if (props.curveType === 'cubic-bezier') {
                    DrawBezierCurve(ctx, points, 2, series.lineColor);
                }
                else if (props.curveType === 'catmull-rom') {
                    DrawCatmullRomSpline(ctx, points);
                }

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

                    // Draw points with different shapes based on series index
                    switch (seriesIndex % 3) {
                        case 0:
                            DrawCircle(ctx, { x, y }, 4, true,
                                1, series.lineColor, null);
                            break;
                        case 1:
                            DrawRectangle(ctx, { x: x - 4, y: y - 4 }, 8, 8,
                                1, series.lineColor);
                            break;
                        case 2:
                            DrawTriangle(ctx, { x, y }, 4, 4, 0,
                                1, series.lineColor);
                            break;
                    }
                });
            });
        }

        ctx.restore();

        // Add canvas event listeners
        canvasRef.onmousemove = (e) => {
            const rect = canvasRef.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (props.chartType === 'bar' || props.chartType === 'stacked-bar') {
                // Calculate barWidth here so it's in scope
                const barWidth = props.barWidth ?? drawWidth / (data[0].values.length * (data.length + 1));

                // Find bar under cursor
                const point = POINTS.find(p => {
                    if (props.chartType === 'bar') {
                        const barHeight = (p.value / maxY) * drawHeight;
                        return IsPointInRect(
                            mouseX,
                            mouseY,
                            p.x - barWidth / 2,
                            p.y,
                            barWidth,
                            barHeight
                        );
                    } else {
                        return IsPointInRect(
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
                const point = POINTS.find(
                    p => Math.sqrt(Math.pow(p.x - mouseX, 2) + Math.pow(p.y - mouseY, 2)) < 10
                );
                setHoveredPoint(point || null);
            }
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

    // Create effect to watch all props
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
