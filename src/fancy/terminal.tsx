/* CSS:
.typewriter-animation {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid currentColor;
  animation: typing 1.2s steps(30, end) forwards, blink 0.75s step-end 4;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
*/

type TerminalLine = {
    text: string;
    color?: string; // Tailwind color class
    input?: boolean; // if true, apply typewriter + cursor
};

export function Terminal({
    lines,
}: {
    lines: TerminalLine[];
}) {
    return (
        <div class="z-0 h-full max-h-[400px] w-full max-w-lg rounded-xl border border-border bg-background">
            <pre class="p-4">
                <code class="grid gap-y-1 overflow-auto">
                    {lines.map((line, i) => {
                        const delay = i * 1.2;
                        const style = line.input
                            ? `animation-delay: ${delay}s; animation-fill-mode: forwards;`
                            : undefined;

                        const classes = [
                            "text-sm font-normal tracking-tight",
                            line.color || "",
                            line.input ? "typewriter-animation" : "",
                        ].filter(Boolean).join(" ");

                        return (
                            <span class={classes} style={style}>
                                {line.text}
                            </span>
                        );
                    })}
                </code>
            </pre>
        </div>
    );
}