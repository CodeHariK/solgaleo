import { createSignal } from "solid-js";
import { Banner, FlickerText, GlitterCard, Marquee, RainbowImage, RainbowText, Skeleton, Terminal, TransitionWidget, TypeWriter } from "../src/fancy/gen";
import { CssUI, Grid, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";
import { BottomBar, CssFANCY, IconCart, IconCheck, IconChevronLeft, IconDown, IconHeart, IconLogout, IconSearch, IconStar, IconSun, IconUser } from "../src/gen";
import { color } from "bun";
import { CssTEST } from "./gen";

export function FancyTest() {

  const [toggle, setToggle] = createSignal(false);

  return <App />

  return <GridLayout
    header={<TestHeader />}
  >

    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="rectangular" width={210} height={60} />
    <Skeleton variant="rounded" width={210} height={60} />

    {BannerTest()}

    <FlickerText style={{ "font-size": "50px" }}>Flicker text</FlickerText>

    <RainbowText style={{ "font-size": "50px" }}>Hello</RainbowText>

    <TransitionWidget
      showFirstWidget={toggle()}
      one={
        <button class={CssUI.OutlinedButton} style={{ "font-size": "80px" }} onclick={() => setToggle(prev => !prev)}>
          One
        </button>
      }
      two={
        <button class={CssUI.MaterialButton} style={{ "font-size": "30px" }} onclick={() => setToggle(prev => !prev)}>
          Two
        </button>
      }
    />

    <Marquee repeatCount={8} child={() =>
      <div class="border-basic p4">
        Hello how are you
      </div>
    } />

    <TypeWriter />

    <GlitterCard />

    <Terminal lines={[
      {
        text: "{ text: > pnpm dlx shadcn@latest init, input: true },",
        input: true,
        color: "yellow"
      },
      {
        text: "{ text: > pnpm dlx shadcn@latest init, input: true }",
        input: true,
        color: "lightgreen"
      },
    ]} />

    <RainbowImage size="300px" src="https://raw.githubusercontent.com/CodeHariK/Shark.run/main/public/images/SpaceShark512.webp"></RainbowImage>

  </GridLayout>
}

//FN:START
//Banner
//FN:DOC
export function BannerTest() {
  return <Banner title="Tip"
    info="Although most developers will stick to just one UI framework, Rocket supports multiple frameworks in the same project. This allows you to:"
  >
    <ol>
      <li>Choose the framework that is best for each component.
        <ol>
          <li>Nested item 1</li>
          <li>Nested item 2</li>
        </ol>
        ii    </li>
      <li>Learn a new framework without needing to start a new project.</li>
      <li>Collaborate with others even when working in different frameworks.</li>
      <li>Incrementally convert an existing site to another framework with no downtime.</li>
    </ol>
  </Banner>;
}
//FN:END


/*CSS:

:root {
  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray: #979797;
  --color-light-gray: #f5f5f5;
  --color-border: #e5e5e5;
  --color-blue: #0870ce;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  padding-bottom: 64px; 
}

.back-button {
  position: absolute;
  left: 16px;
  color: var(--color-black);
}

.title {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
}

.sort-filter {
  display: flex;
  border-bottom: 1px solid var(--color-border);
}

.divider {
  width: 1px;
  background-color: var(--color-border);
  margin: 12px 0;
}

.check-icon {
  color: var(--color-blue);
}

.product-card {
  margin-bottom: 32px;
}

.product-image {
  position: relative;
  aspect-ratio: 3 / 4;
  background-color: var(--color-light-gray);
  margin-bottom: 8px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
  
.favorite-button {
  background: none;
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 4px;
  color: var(--color-black);
}

.product-info {
  margin-top: 8px;
}

.product-price {
  font-size: 20px;
  font-weight: 500;
  color: var(--color-black);
}

.product-description {
  font-size: 14px;
  color: var(--color-gray);
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

*/


function App2() {
  // Mock data for products
  const products = [
    { id: 1, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
    { id: 2, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
    { id: 3, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
    { id: 4, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
  ]

  return (
    <div class="app-container">
      <Grid cols={2} rows={2} spacingX={1} style={{ padding: "0 16px" }}>
        {products.map((product) => (
          <div class="product-card" >
            <div class="product-image">
              <img src="https://placehold.co/225x300" alt="Product" />

              <button class="favorite-button">
                <IconHeart />
              </button>

            </div>
            <div class="product-info">
              <p class="product-price">{product.price}</p>
              <p class="product-description">{product.description}</p>
            </div>
          </div>
        ))}
      </Grid>

      <BottomBar />

    </div>
  )
}

/*CSS:


.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #ffffff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-image {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.product-info {
  padding: 16px;
  padding-bottom: 0;
}

.star {
  width: 20px;
  height: 20px;
  color: #ffcc43;
  fill: currentColor;
}

.selection-options {
  display: flex;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: 16px;
}

.option {
  flex: 1;
  padding: 16px 0;
  text-align: center;
  color: #a0a0a0;
  font-weight: 500;
}

.size-option {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #e5e5e5;
}

.size-option svg {
  margin-left: 8px;
}

.action-section {
  padding: 16px;
}

.add-to-bag {
  width: 100%;
  // padding: 16px 0;
  background-color: #a4aeeb;
  border-radius: 6px;
  border: none;
  color: #000000;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.product-description {
  margin-top: 24px;
  color: #979797;
}

.product-description p {
  margin-bottom: 16px;
}

*/

function App() {
  return (
    <div class="app-container">

      <header class="header">
        <button class={CssUI.IconButtonPlain}><IconChevronLeft /></button>
        <button class={CssUI.IconButton}><IconLogout /></button>
      </header>

      <main class="main-content">

        <div class="product-image"></div>

        <div class="product-info">

          <div class="price-favorite">
            <h1 class="price flex space-between items-center"><span>£173</span>
              <button class={CssUI.IconButtonPlain}>
                <IconHeart fill style={{ color: "#fb6f6f" }} />
              </button>

            </h1>
          </div>

          <h5 class="bold">Yellow Nike Sunshine Trainers</h5>

          <div class="mt2">
            {Array(5).fill(0).map((_, _i) => (
              <IconStar style={{ color: "#f9a51d" }} />
            ))}
          </div>

        </div>

        <div class="selection-options">
          <div class="option">COLOUR</div>
          <div class="option size-option">
            <span>SIZE</span>
            <IconDown />
          </div>
        </div>

        <div class="action-section">

          <div class="w-full">
            <button class="add-to-bag" style={{ width: "100%", background: "red" }}>ADD TO BAG</button>
            {/* <button class={CssUI.MaterialRoundButton} style={{ width: "100%" }}>ADD TO BAG</button> */}
          </div>
          <button class="add-to-bag">ADD TO BAG</button>

          <div class="product-description">
            <p>
              Lorem ipsum dolor sit amet consectetur. Enim nisi et volutpat sed bibendum molestie diam. Vestibulum
              posuere in lacus sit sit vulputate. Adipiscing sit ornare ultricies id quis. Quisque viverra eleifend leo
              elit convallis a parturient.
            </p>
            <p>
              Blandit purus eget nulla a eu urna etiam netus. Ut aenean integer et donec nulla cras velit integer
              adipiscing habitant.
            </p>
          </div>
        </div>
      </main>

      <BottomBar />

    </div>
  )
}
