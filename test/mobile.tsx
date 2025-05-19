import { IconHeart } from "../src/gen"
import { BottomBar, MobileHeader } from "../src/nav/gen"
import { CssUI, Grid, GridLayout, Options, RatingsBar } from "../src/ui/gen"

/*CSS:

.product-card {
    margin-bottom: 32px;
}
.product-image {
    background: var(--primary-bg);
    display: flex;
    position: relative;
    aspect-ratio: 1 / 1;
}
.product-info {
    margin-top: 8px;
    padding: 16px;
    padding-bottom: 0;
}
.product-description {
    font-size: 14px;
    color: var(--surface);
    margin-top: 4px;
    overflow: hidden;
    
    margin-top: 24px;
}
.product-description p {
    margin-bottom: 16px;
}

*/

const products = [
    { id: 1, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
    { id: 2, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
    { id: 3, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
    { id: 4, price: "£173", description: "Lorem ipsum dolor sit amet consectetur. Consectetur sed varius." },
]

//FN:START
//MobileApp
//FN:DOC
export function MobileApp() {
    return (
        <GridLayout header={<MobileHeader />} footer={<BottomBar />}>

            <div class="product-image"></div>

            <div class="product-info">

                <div class="price-favorite">
                    <h1 class="price flex space-between items-center"><span>£173</span>
                        <button class={CssUI.ButtonIconPlain}>
                            <IconHeart fill style={{ color: "#fb6f6f" }} />
                        </button>
                    </h1>
                </div>

                <h5 class="bold">Yellow Nike Sunshine Trainers</h5>

                <RatingsBar ratings={5} />

            </div>

            <Options style={{ "margin-top": "16px" }} />

            <div class="p4">

                <button class={CssUI.ButtonMaterialRoundRev} style={{ width: "100%" }}>ADD TO BAG</button>

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

            <Grid cols={2} rows={2} spacingX={1} style={{ padding: "0 16px" }}>
                {products.map((product) => (
                    <div class="product-card" >
                        <div class="product-image">
                            <button class={CssUI.ButtonIconPlain} style={{
                                position: "absolute",
                                right: "8px",
                                bottom: "8px",
                            }}>
                                <IconHeart />
                            </button>

                        </div>
                        <div class="product-info">
                            <h5>{product.price}</h5>
                            <p class="product-description">{product.description}</p>
                        </div>
                    </div>
                ))}
            </Grid>

        </GridLayout>
    )
}
//FN:END
