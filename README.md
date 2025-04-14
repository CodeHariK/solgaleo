
<div style="text-align: center;">
    <img src="./test/logo.png" alt="Logo" style="max-width: 30%; height: auto;" />
</div>

# Solgaleo

Solidjs ui library


## https://codeharik.github.io/solgaleo

## Installation
```js
bun install solgaleo
or
npm install solgaleo

--- Add script in index.html for theme

<script>
  if (
    localStorage.getItem("theme") === "night" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("night");
  } else {
    document.documentElement.classList.remove("night");
  }
</script>

```

## Import Components
```ts
--- Add components

import * as SOL from "solgaleo"

--- Individual components

import * as UI from "solgaleo/ui"
import * as NAV from "solgaleo/nav"
import * as FANCY from "solgaleo/fancy"
import * as ADV from "solgaleo/adv"
import * as SVG from "solgaleo/svg"
```

### Customize theme

```ts
import "./custom.css"
import * as UI from "solgaleo/ui"
UI.AddTheme("custom")
```
