export function RandomColor({ saturation = 40, lightness = 60 }) {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
