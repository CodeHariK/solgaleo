/*CSS:

.light {
    --mono-1: hsl(230, 8%, 24%);
    --mono-2: hsl(230, 6%, 44%);
    --mono-3: hsl(230, 4%, 64%);
    --hue-1: hsl(198, 99%, 37%);
    --hue-2: hsl(221, 87%, 60%);
    --hue-3: hsl(301, 63%, 40%);
    --hue-4: hsl(119, 34%, 47%);
    --hue-5: hsl(5, 74%, 59%);
    --hue-6: hsl(35, 99%, 36%);
    --hue-6-2: hsl(35, 99%, 40%);
    --syntax-fg: var(--mono-1);
    --syntax-bg: hsl(230, 1%, 98%);
    --syntax-gutter: hsl(230, 1%, 62%);
    --syntax-guide: hsla(230, 8%, 24%, 0.2);
    --syntax-accent: hsl(230, 100%, 66%);
    --syntax-selection-color: hsl(230, 1%, 90%);
    --syntax-cursor-line: hsla(230, 8%, 24%, 0.05)); 
}

.night {
    --mono-1: hsl(220, 14%, 71%);
    --mono-2: hsl(220, 9%, 55%);
    --mono-3: hsl(220, 10%, 40%);
    --hue-1: hsl(187, 47%, 55%);
    --hue-2: hsl(207, 82%, 66%);
    --hue-3: hsl(286, 60%, 67%);
    --hue-4: hsl(95, 38%, 62%);
    --hue-5: hsl(355, 65%, 65%);
    --hue-6: hsl(29, 54%, 61%);
    --hue-6-2: hsl(39, 67%, 69%);
    --syntax-fg: hsl(220, 14%, 71%);
    --syntax-bg: hsl(220, 13%, 18%);
    --syntax-gutter: hsl(220, 14%, 45%);
    --syntax-guide: hsla(220, 14%, 71%, 0.15);
    --syntax-accent: hsl(220, 100%, 66%);
    --syntax-selection-color: hsl(220, 13%, 28%);
    --syntax-cursor-line: hsla(220, 100%, 80%, 0.04);
}

code[class*="language-"],
pre[class*="language-"] {
    background: var(--syntax-bg);
    color: var(--mono-1);
    font-family: "Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
}

code[class*="language-"]::-moz-selection,
code[class*="language-"] *::-moz-selection,
pre[class*="language-"] *::-moz-selection {
    background: var(--syntax-selection-color);
    color: inherit;
}

code[class*="language-"]::selection,
code[class*="language-"] *::selection,
pre[class*="language-"] *::selection {
    background: var(--syntax-selection-color);
    color: inherit;
}

pre[class*="language-"] {
    padding: .5em;
    margin: 0;
    overflow: auto;
    border-radius: 0.3em;
}

:not(pre)>code[class*="language-"] {
    padding: 0.2em 0.3em;
    border-radius: 0.3em;
    white-space: normal;
}

.token.comment,
.token.prolog,
.token.cdata {
    color: var(--mono-3);
}

.token.doctype,
.token.punctuation,
.token.entity {
    color: var(--mono-1);
}

.token.attr-name,
.token.class-name,
.token.boolean,
.token.constant,
.token.number,
.token.atrule {
    color: var(--hue-6);
}

.token.keyword {
    color: var(--hue-3);
}

.token.property,
.token.tag,
.token.symbol,
.token.deleted,
.token.important {
    color: var(--hue-5);
}

.token.selector,
.token.string,
.token.char,
.token.builtin,
.token.inserted,
.token.regex,
.token.attr-value,
.token.attr-value>.token.punctuation {
    color: var(--hue-4);
}

.token.variable,
.token.operator,
.token.function {
    color: var(--hue-2);
}

.token.url {
    color: var(--hue-1);
}

.token.attr-value>.token.punctuation.attr-equals,
.token.special-attr>.token.attr-value>.token.value.css {
    color: var(--mono-1);
}

.language-css .token.selector {
    color: var(--hue-5);
}

.language-css .token.property {
    color: var(--mono-1);
}

.language-css .token.function,
.language-css .token.url>.token.function {
    color: var(--hue-1);
}

.language-css .token.url>.token.string.url {
    color: var(--hue-4);
}

.language-css .token.important,
.language-css .token.atrule .token.rule {
    color: var(--hue-3);
}

.language-javascript .token.operator {
    color: var(--hue-3);
}

.language-javascript .token.template-string>.token.interpolation>.token.interpolation-punctuation.punctuation {
    color: var(--hue-5);
}

.language-json .token.operator {
    color: var(--mono-1);
}

.language-json .token.null.keyword {
    color: var(--hue-6);
}

.language-markdown .token.url,
.language-markdown .token.url>.token.operator,
.language-markdown .token.url-reference.url>.token.string {
    color: var(--mono-1);
}

.language-markdown .token.url>.token.content {
    color: var(--hue-2);
}

.language-markdown .token.url>.token.url,
.language-markdown .token.url-reference.url {
    color: var(--hue-1);
}

.language-markdown .token.blockquote.punctuation,
.language-markdown .token.hr.punctuation {
    color: var(--mono-3);
    font-style: italic;
}

.language-markdown .token.code-snippet {
    color: var(--hue-4);
}

.language-markdown .token.bold .token.content {
    color: var(--hue-6);
}

.language-markdown .token.italic .token.content {
    color: var(--hue-3);
}

.language-markdown .token.strike .token.content,
.language-markdown .token.strike .token.punctuation,
.language-markdown .token.list.punctuation,
.language-markdown .token.title.important>.token.punctuation {
    color: var(--hue-5);
}

.token.bold {
    font-weight: bold;
}

.token.comment,
.token.italic {
    font-style: italic;
}

.token.entity {
    cursor: help;
}

.token.namespace {
    opacity: 0.8;
}

.token.token.tab:not(:empty):before,
.token.token.cr:before,
.token.token.lf:before,
.token.token.space:before {
    color: var(--syntax-guide);
}

div.code-toolbar>.toolbar.toolbar>.toolbar-item {
    margin-right: 0.4em;
}

div.code-toolbar>.toolbar.toolbar>.toolbar-item>button,
div.code-toolbar>.toolbar.toolbar>.toolbar-item>a,
div.code-toolbar>.toolbar.toolbar>.toolbar-item>span {
    background: var(--syntax-selection-color);
    color: var(--mono-2);
    padding: 0.1em 0.4em;
    border-radius: 0.3em;
}

.line-highlight.line-highlight {
    background: var(--syntax-cursor-line);
}

.line-highlight.line-highlight:before,
.line-highlight.line-highlight[data-end]:after {
    background: var(--syntax-selection-color);
    color: var(--mono-1);
    padding: 0.1em 0.6em;
    border-radius: 0.3em;
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
}

pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows>span:hover:before {
    background-color: var(--syntax-cursor-line);
}

.line-numbers.line-numbers .line-numbers-rows,
.command-line .command-line-prompt {
    border-right-color: var(--syntax-guide);
}

.line-numbers .line-numbers-rows>span:before,
.command-line .command-line-prompt>span:before {
    color: var(--syntax-gutter);
}

.prism-previewer-easing.prism-previewer-easing circle {
    fill: transparent;
}

*/
