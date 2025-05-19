export type Vector2 = {
    x: number;
    y: number;
}

export function CatmullRom(p0: number, p1: number, p2: number, p3: number, t: number) {
    const v0 = (p2 - p0) * 0.5;
    const v1 = (p3 - p1) * 0.5;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * p1 - 2 * p2 + v0 + v1) * t3 +
        (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 +
        v0 * t + p1;
}

export function DrawCatmullRomSpline(
    ctx: CanvasRenderingContext2D,
    points: Vector2[],
    segments: number = 10
): void {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = i > 0 ? points[i - 1] : points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i < points.length - 2 ? points[i + 2] : p2;

        for (let t = 0; t <= segments; t++) {
            const t1 = t / segments;
            const x = CatmullRom(p0.x, p1.x, p2.x, p3.x, t1);
            const y = CatmullRom(p0.y, p1.y, p2.y, p3.y, t1);
            ctx.lineTo(x, y);
        }
    }
}

export function DrawLinearCurve(
    ctx: CanvasRenderingContext2D,
    points: { x: number; y: number }[],
    lineWidth: number,
    color: string
): void {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

export function DrawBezierCurve(
    ctx: CanvasRenderingContext2D,
    points: { x: number; y: number }[],
    lineWidth: number,
    color: string,
    tension: number = 0.5
): void {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];

        // Calculate control points
        const cp1x = prev.x + (curr.x - prev.x) * tension;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * tension;
        const cp2y = curr.y;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, curr.x, curr.y);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

export function IsPointInRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

export function DrawLine(
    ctx: CanvasRenderingContext2D,
    point1: Vector2,
    point2: Vector2,
    lineWidth: number,
    color: string
) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

export function DrawGrid(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cellSize: number,
    lineWidth: number,
    color: string
) {
    // Draw vertical lines
    for (let x = 0; x <= width; x += cellSize) {
        DrawLine(
            ctx,
            { x, y: 0 },
            { x, y: height },
            lineWidth,
            color
        );
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += cellSize) {
        DrawLine(
            ctx,
            { x: 0, y },
            { x: width, y },
            lineWidth,
            color
        );
    }
}

export function DrawCircle(
    ctx: CanvasRenderingContext2D,
    center: Vector2,
    radius: number,
    fill: boolean,
    lineWidth: number,
    color: string,
    dashLength: number | null = null
) {
    ctx.beginPath();
    if (dashLength) {
        ctx.setLineDash([dashLength, dashLength]);
    }
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    if (dashLength) {
        ctx.setLineDash([]);
    }
}

export function DrawArc(
    ctx: CanvasRenderingContext2D,
    center: Vector2,
    radius: number,
    startAngle: number,
    endAngle: number,
    lineWidth: number,
    color: string
) {
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

export function DrawRectangle(
    ctx: CanvasRenderingContext2D,
    topLeft: Vector2,
    width: number,
    height: number,
    lineWidth: number,
    color: string
) {
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.fillRect(topLeft.x, topLeft.y, width, height);
}

export function DrawTriangle(
    ctx: CanvasRenderingContext2D,
    center: Vector2,
    dw: number,
    dh: number,
    rotation: number,
    lineWidth: number,
    color: string
) {
    // Save the context state
    ctx.save();

    // Translate to the triangle's center
    ctx.translate(center.x, center.y);

    // Rotate the context
    ctx.rotate(rotation);

    // Set styles
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;

    // Draw the triangle
    ctx.beginPath();
    ctx.moveTo(0, -dh); // Top vertex
    ctx.lineTo(-dw, dh); // Bottom-left vertex
    ctx.lineTo(dw, dh); // Bottom-right vertex
    ctx.closePath();

    // Fill and stroke the triangle
    ctx.fill();
    if (lineWidth) {
        ctx.stroke();
    }

    // Restore the context state
    ctx.restore();
}

export function DrawEllipse(
    ctx: CanvasRenderingContext2D,
    center: Vector2,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    lineWidth: number,
    color: string
) {
    ctx.beginPath();
    ctx.ellipse(center.x, center.y, radiusX, radiusY, rotation, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.fill();
}
