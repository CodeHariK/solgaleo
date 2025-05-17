import { createSignal } from "solid-js";
import { Banner, FlickerText, GlitterCard, Marquee, RainbowImage, RainbowText, Skeleton, Terminal, TransitionWidget, TypeWriter } from "../src/fancy/gen";
import { CssUI, GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  color: var(--color-black);
  background-color: var(--color-white);
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  padding-bottom: 64px; 
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-white);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-border);
  position: relative;
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

.sort-button,
.filter-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 16px;
  font-weight: 500;
  color: var(--color-black);
}

.sort-button svg,
.filter-button svg {
  margin-left: 8px;
}

.divider {
  width: 1px;
  background-color: var(--color-border);
  margin: 12px 0;
}

.check-icon {
  color: var(--color-blue);
}

.items-count {
  padding: 16px;
  text-align: center;
  color: var(--color-gray);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 0 16px;
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

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
k  justify-content: space-around;
  align-items: center;
  height: 64px;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-border);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-black);
}

*/


function App1() {
    // Mock data for products
    const products = [
        { id: 1, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
        { id: 2, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
        { id: 3, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
        { id: 4, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
    ]

    return (
        <div class="app-container">
            {/* Header */}
            <header class="header">
                <div class="header-content">
                    <a href="#" class="back-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 12H5M5 12L12 19M5 12L12 5"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </a>
                    <h1 class="title">NEW IN</h1>
                </div>

                {/* Sort and Filter */}
                <div class="sort-filter">
                    <button class="sort-button">
                        SORT
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"

                            />
                        </svg>
                    </button>
                    <div class="divider"></div>
                    <button class="filter-button">
                        FILTER
                        <svg
                            class="check-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"

                            />
                        </svg>
                    </button>
                </div>

                {/* Items count */}
                <div class="items-count">1,536 items found</div>
            </header>

            {/* Product Grid */}
            <main class="product-grid">
                {products.map((product) => (
                    <div class="product-card" >
                        <div class="product-image">
                            <img src="https://via.placeholder.com/225x300" alt="Product" />
                            <button class="favorite-button">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="product-info">
                            <p class="product-price">{product.price}</p>
                            <p class="product-description">{product.description}</p>
                        </div>
                    </div>
                ))}
            </main>

            {/* Bottom Navigation */}
            <nav class="bottom-nav">
                <a href="#" class="nav-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
                        <path d="M12 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M12 20V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M4 12L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M22 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M19.7782 4.22183L18.364 5.63604" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M5.63604 18.364L4.22183 19.7782" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M19.7782 19.7782L18.364 18.364" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M5.63604 5.63604L4.22183 4.22183" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </a>
                <a href="#" class="nav-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
                        <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </a>
                <a href="#" class="nav-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </a>
                <a href="#" class="nav-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </a>
                <a href="#" class="nav-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </a>
            </nav>
        </div>
    )
}

/*CSS:

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 100vw;
  overflow-x: hidden;
}

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

.icon-button {
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #000000;
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

.yellow-dot {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: #ffcc43;
}

.product-info {
  padding: 16px;
  padding-bottom: 0;
}

.price-favorite {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #000000;
}

.favorite-button {
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #000000;
}

.product-title {
  font-size: 1.25rem;
  color: #000000;
  margin-top: 4px;
}

.rating {
  display: flex;
  margin-top: 8px;
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
  padding: 16px 0;
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

.footer {
  position: sticky;
  bottom: 0;
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000000;
  text-decoration: none;
}


*/

function App() {
    const [isFavorite, setIsFavorite] = createSignal(false)

    return (
        <div class="app-container">
            <header class="header">
                <button class="icon-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <button class="icon-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                </button>
            </header>

            <main class="main-content">
                <div class="product-image">
                    <div class="yellow-dot"></div>
                </div>

                <div class="product-info">
                    <div class="price-favorite">
                        <h1 class="price">£173</h1>
                        <button
                            class="favorite-button"
                            onClick={() => setIsFavorite(!isFavorite())}
                            aria-label={isFavorite() ? "Remove from favorites" : "Add to favorites"}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill={isFavorite() ? "black" : "none"}
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>
                    <h2 class="product-title">Yellow Nike Sunshine Trainers</h2>

                    <div class="rating">
                        {Array(5)
                            .fill(0)
                            .map((_, i) => (
                                <svg class="star" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                            ))}
                    </div>
                </div>

                <div class="selection-options">
                    <div class="option">COLOUR</div>
                    <div class="option size-option">
                        <span>SIZE</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                </div>

                <div class="action-section">
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

            <footer class="footer">
                <a href="#" class="nav-item">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                </a>
                <a href="#" class="nav-item">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </a>
                <a href="#" class="nav-item">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                </a>
                <a href="#" class="nav-item">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </a>
                <a href="#" class="nav-item">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </a>
            </footer>
        </div>
    )
}
