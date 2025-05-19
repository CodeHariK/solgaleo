
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

### Example

```
--- simple example in /example directory
cd example
bun run dev

--- advance example /test
bun run test
bun run test:build
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

render(() => 
    <SolProvider
      initialData={{
          baseroute: '/solgaleo',
          customThemes: [{ name: "custom", type: "light" }],
      }}>
      
      <Router base="/solgaleo">
        <Route path="/" component={
          () => <GridLayout
            header={<TestHeader />}
          />
        } />
        <Route path="*" component={NotFound} />
      </Router>
      </SolProvider>, 
  document.body!)

** custom.css **

.custom {
  --spacing: 1rem;

  --primary: #f06432;
  --primary-bg: #ffdbcc8b;
  --secondary: #845ec2;
  --secondary-bg: #e4d8f7;
  --surface: #fffffcc6;
  --error: #B3261E;
  --error-bg: #F9DEDC;
  --disabled: #9CA3AF;
}

```
