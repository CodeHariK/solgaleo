import { createSignal, onCleanup, onMount } from "solid-js";
import { VCarousel } from "../src/adv/gen";
import { Accordion, GridLayout, useSolContext } from "../src/ui/gen";
import { RandomColor } from "../src/utils/color";
import { TestHeader } from "./common";
import { CssTEST } from "./gen";

import Prism from "prismjs"; // Explicitly import Prism
import "prismjs/components/prism-typescript.min.js"; // Load Go syntax support
import { Marquee, RainbowImage, RainbowText } from "../src/gen";

/*CSS:*
.CodeCard {
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	transition: transform 0.2s ease-in-out;

	// :hover {
	//   transform: translateY(-2px);
	// }
}
*/

//FN:START
//1.Hello
//FN:DOC
export function Hello() {
	return <div class="flex flex-col items-center h-full">

		<RainbowImage style={{ margin: "2rem" }} size="200px" src="/solgaleo/logo.png" />

		<Marquee repeatCount={8} child={() => <RainbowText style={{ "font-size": "3rem", }} class="p2 border-basic" >
			SOLGALEO
		</RainbowText>} />

		<Marquee repeatCount={8} child={() =>
			<div class="border-basic p2">
				Hello how are you
			</div>
		} />
	</div >
}
//FN:END

export function RootPage() {

	const { getTheme } = useSolContext()

	const light = () => getTheme()?.type == "light"

	const [codeIndex, setCodeIndex] = createSignal(0);

	return <GridLayout

		childrenStyle={{
			"align-content": "center",
		}}

		header={<TestHeader />}

		left={<VCarousel
			children={CssTEST.Docs.map((c, i) => {
				return <div
					class={CssTEST.CodeCard}
					style={{
						"border": `2px solid ${RandomColor({ lightness: light() ? 50 : 30 })}`,
						"border-radius": "1rem",
						overflow: "clip"
					}}
					onClick={() => {
						console.log(i)
						setCodeIndex(i)
					}}
				>
					<Accordion
						open={c.doc == "Hello"}
						title={<div style={{
							background: i == codeIndex() ? "var(--primary-container)" : "",
							padding: ".7rem",
						}}>
							{c.doc}
						</div>}

						contentStyle={{
							padding: ".5rem",
						}}

						children={<Code code={c.data} lang="ts" />} />
				</div>
			})}
			listStyle={{ padding: "1rem" }}
			itemStyle={{}}
		/>}

		gridStyle={{
			"grid-template-columns": "minmax(200px, 50%) 1fr"
		}}
	>
		<>{CssTEST.Docs[codeIndex()].element()}</>
	</GridLayout>
}

export function Code({ code, lang }: { code: string; lang: string }) {
	let codeRef: HTMLPreElement | undefined;
	const [highlightedCode, _setHighlightedCode] = createSignal(code);

	const highlight = () => {
		requestAnimationFrame(() => {
			if (codeRef) {
				Prism.highlightElement(codeRef.querySelector("code") as HTMLElement);
			}
		});
	};

	onMount(highlight);
	onCleanup(() => {
		if (codeRef) codeRef.innerHTML = "";
	});

	return (
		<pre ref={codeRef} class="line-numbers" style={{ "white-space": 'pre' }}>
			<code class={`language-${lang}`} innerHTML={highlightedCode()
				.replace(/</g, '&lt;').replace(/>/g, '&gt;')}></code>
		</pre>);
}

