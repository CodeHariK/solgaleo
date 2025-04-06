import "./fancy.gen.css"

/* CSS:

.typewriter-animation {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    width: 0;
    animation-name: typing;
    animation-duration: 1.2s, 0.75s;
    animation-timing-function: steps(30, end), step-end;
    animation-fill-mode: forwards, forwards;
    animation-iteration-count: 1, 4;
}

@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}
*/

type TerminalLine = {
    text: string;
    color?: string;
    input?: boolean;
};

export function TypeWriter() {
    return <p class="typewriter-animation">Hi there, I'm a Typewriter Animation made in pure CSS!</p>
}

export function Terminal({ lines }: { lines: TerminalLine[] }) {
    return (

        <div class="flex min-h-[350px] w-full items-center justify-center p-10">
            <div class="z-0 h-full max-h-[400px] w-full max-w-lg rounded-xl border border-border bg-background">
                <div class="flex flex-col gap-y-2 border-b border-border p-4">
                    <div class="flex flex-row gap-x-2">
                        <div class="h-2 w-2 rounded-full bg-red-500">
                        </div>
                        <div class="h-2 w-2 rounded-full bg-yellow-500">
                        </div>
                        <div class="h-2 w-2 rounded-full bg-green-500">
                        </div>
                    </div>
                </div>
                <pre class="p-4">
                    <code class="grid gap-y-1 overflow-auto">
                        <span class="text-sm font-normal tracking-tight">&gt; pnpm dlx shadcn@latest init</span>
                        <div class="grid text-sm font-normal tracking-tight text-green-500" style="opacity: 1; transform: none;">
                            <span>✔ Preflight checks.</span>
                        </div>
                        <div class="grid text-sm font-normal tracking-tight text-green-500" style="opacity: 1; transform: none;">
                            <span>✔ Installing dependencies.</span>
                        </div>
                        <div class="grid text-sm font-normal tracking-tight text-blue-500" style="opacity: 1; transform: none;">
                            <span>ℹ Updated 1 file:</span>
                            <span class="pl-2">- lib/utils.ts</span>
                        </div>
                        <span class="text-sm font-normal tracking-tight text-muted-foreground">Success! Project initialization completed.</span>


                        {lines.map((line, i) => {

                            const delay = i * 0.4;
                            const style = line.input
                                ? `animation-delay: ${delay}s, ${delay}s;`
                                : undefined;

                            const classes = [
                                "text-sm font-normal tracking-tight",
                                line.color || "",
                                line.input ? "typewriter-animation" : "",
                                "cursor"
                            ]
                                .filter(Boolean)
                                .join(" ");

                            return (
                                <span class={classes} style={style}>
                                    {line.text}
                                </span>
                            );
                        })}

                    </code>
                </pre>
            </div>
        </div>
    );
}
