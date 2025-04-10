import { CssFANCY } from "./gen";

/* CSS:

.STypewriter {
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
    return <p class={CssFANCY.STypewriter}>Hi there, I'm a Typewriter Animation made in pure CSS!</p>
}

/* CSS:
.STerminalWindow {
    z-index: 0;
    height: 100%;
    max-height: 400px;
    width: 100%;
    max-width: 32rem;
    border-radius: 0.75rem;
    border: 1px solid var(--sterm-border-color);
    background: var(--sterm-bg-color);

    pre {
        padding: 1rem;
    }

    code {
        display: grid;
        gap: 0.25rem;
        overflow: auto;
    }
}

.STerminalHeader {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-bottom: 1px solid var(--sterm-border-color);
    padding: 1rem;

    div {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;

        div {
            height: 0.5rem;
            width: 0.5rem;
            border-radius: 9999px;

            :nth-child(1) {
                background-color: #ef4444;
            }
            :nth-child(2) {
                background-color: #eab308;
            }
            :nth-child(3) {
                background-color: #22c55e;
            }
        }
    }
}

.STerminalLine {
    font-size: 0.875rem;
    font-weight: normal;
    letter-spacing: -0.025em;
}

*/

export function Terminal({ lines }: { lines: TerminalLine[] }) {
    return (
        <div class={CssFANCY.STerminalWindow}>
            <div class={CssFANCY.STerminalHeader}>
                <div><div /><div /><div /></div>
            </div>
            <pre>
                <code>
                    {lines.map((line, i) => {
                        const delay = i * 0.4;

                        return (
                            <span classList={{
                                [CssFANCY.STerminalLine]: true,
                                [CssFANCY.STypewriter]: line.input,
                            }} style={{
                                "animation-delay": line.input ? `${delay}s, ${delay}s;` : '',
                                color: line.color
                            }}>
                                {line.text}
                            </span>
                        );
                    })}
                </code>
            </pre>
        </div>
    );
}
