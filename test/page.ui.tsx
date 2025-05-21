
import * as yup from 'yup';
import { CheckboxGroup, RadioGroup, RatingsBar, Select, CssUI, SpaceDebugInfo, SpaceForm, SpaceFormError, Input, GridLayout, FileUploader, Accordion, AsyncButton, ProgressBar, ToggleSwitch, Grid, GridItem, Options, CustomSelect } from '../src/ui/gen.ts';
import { IconCross, IconDown, IconFilter, IconHome, } from '../src/svg/gen.ts';
import { TestHeader } from './common.tsx';
import { createSignal, For, JSX } from 'solid-js';
import { Modal, TreeView } from '../src/nav/gen.ts';
import { Dashboard } from './demo.dashboard.tsx';

export function UiTest() {

    const [progress, setProgress] = createSignal(64);

    //                 AllTheme().map((t) =>
    //                     <section class={t}>
    //                         {t}
    //                         <Story />
    //                     </section>)

    return <Dashboard />

    return <GridLayout
        header={<TestHeader />}
    >

        {ButtonTest(setProgress)}

        <ProgressBar progress={progress} />

        <Accordion
            title="Accordion"
            children={<div class="p8">Content for Accordion</div>}
        />

        <Modal
            // fullScreen={true}
            anchor={{
                element: ([, setRef], [isVisible, setVisibiliy]) => {
                    return <button ref={setRef} class={CssUI.ButtonOutlined}
                        onmousedown={() => { setVisibiliy(!isVisible()) }}
                    >
                        <IconFilter />
                        <span>Filter</span>
                        <IconDown />
                    </button>
                }
            }}
            child={TestTree}
        />

        <SpaceForm
            id="Form"
            initialFormState={{
                values: {
                    "first_name": "Hello",
                    "multi": ["checkbox-3"],
                    "country": "fr",
                    "countries": "USA",
                    "range": 20,
                },
                status: {},
                errors: {},
                formerror: ""
            }}
            schema={validationSchema}

            onSubmit={(state) => {
                console.log(state)
            }}
        >

            <CheckboxGroup header="single" name={"single"} options={checkboxes} />
            <CheckboxGroup header="multi" multiple name={"multi"} options={checkboxes} />
            <CheckboxGroup header="singlechip" name={"singlechip"} variant='chip' options={checkboxes} />
            <CheckboxGroup header="multichip" multiple name={"multichip"} variant='chip' options={checkboxes} />

            <CustomSelect
                id="single-select"
                options={checkboxes}
                onChange={(value) => console.log(value)}
                multiple={false}
            />

            <CustomSelect
                id="multi-select"
                options={checkboxes}
                onChange={(values) => console.log(values)}
                multiple={true}
            />

            <Select name="country" options={selectOptions} header="Country" />

            <RadioGroup
                name="countries"
                header="Countries"
                horizontal
                options={[
                    { value: "USA", label: "United States" },
                    { value: "Germany", label: "Germany" },
                    { value: "Spain", label: "Spain" },
                    { value: "United Kingdom", label: "United Kingdom" },
                    { value: "China", label: "China (disabled)", disabled: true }
                ]}
            />

            <ToggleSwitch name="toggle" onChange={(newState) => {
                console.log("Toggle is now:", newState ? "On" : "Off");
            }} />

            <Input name="password1" type="password" label='label' placeholder="placeholder"
                end={[
                    <button class={CssUI.ButtonIcon} type="reset"><IconCross /></button>,
                ]} />
            <Input name="password2" type="password" placeholder="placeholder" />
            <Input name="range" type="range" header='range' placeholder="range" />

            <Input name="Name" type="text" placeholder="placeholder" label="Label"></Input>
            <Input textarea name="Area" type="text" placeholder="placeholder" label="Label"></Input>

            <RatingsBar ratings={3.8} reviews={5} />

            <FileUploader
                name='pic'
                accept={["image/*", "application/*"]}
                uploadFunc={async () => {
                    return {
                        valid: false,
                        info: <>Hello</>
                    }
                }} />

            <SpaceFormError />

            <button type="submit">Submit</button>
            <button type="reset">Reset</button>

            <SpaceDebugInfo />

        </SpaceForm>

        <h1>{para(1)}</h1>
        <h2>{para(1)}</h2>
        <h3>{para(1)}</h3>
        <h4>{para(1)}</h4>
        <h5>{para(1)}</h5>
        <h6>{para(1)}</h6>
        <p>{para(3)}</p>

        <Grid
            cols={{ xs: 3, sm: 4, md: 6, lg: 8 }}
            rows={{ xs: 3, sm: 4, md: 6, lg: 8 }}
            spacingX={{ xs: 0.5, sm: 1, md: 1.5, lg: 2 }}
            spacingY={{ xs: 0.5, sm: 1, md: 1.5, lg: 2 }}
        >
            <For each={Array.from({ length: 8 })}>
                {(_, index) => (
                    <GridItem>
                        <Item>{index() + 1}</Item>
                    </GridItem>
                )}
            </For>
            <GridItem height={3} width={3}>
                <Item>3x3</Item>
            </GridItem>
            <GridItem colStart={1} rowStart={1} height={2} width={2}>
                <Item>Hello</Item>
            </GridItem>
            <For each={Array.from({ length: 8 })}>
                {(_, index) => (
                    <GridItem>
                        <Item>{index() + 1}</Item>
                    </GridItem>
                )}
            </For>
        </Grid>

        <Grid spacingX={1} spacingY={1} cols={4} rows={4}>
            <For each={Array.from({ length: 8 })}>
                {(_, index) => (
                    <GridItem>
                        <Item>{index() + 1}</Item>
                    </GridItem>
                )}
            </For>
            <GridItem height={3} width={3}>
                <Item>3x3</Item>
            </GridItem>
            <GridItem colStart={1} rowStart={1} height={2} width={2}>
                <Item>Hello</Item>
            </GridItem>
            <For each={Array.from({ length: 8 })}>
                {(_, index) => (
                    <GridItem>
                        <Item>{index() + 1}</Item>
                    </GridItem>
                )}
            </For>
        </Grid>

    </GridLayout>
}

function para(repeat: number) {
    return <div class='p1 border-basic'>{Array(repeat).fill("The electron is a subatomic particle with a negative one elementary electric charge.")}</div>
}

export const validationSchema = yup.object().shape({
    Name: yup.string().required('First name is required').min(3),
    // company: yup.string().required('Company is required'),
    // phone: yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{3}$/, 'Phone number must be in the format 123-45-678').required('Phone number is required'),
    // website: yup.string().url('Must be a valid URL').required('Website URL is required'),
    // visitors: yup.number().positive('Must be a positive number').required('Unique visitors are required'),
    // email: yup.string().email('Invalid email address').required('Email address is required'),
    // password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    // confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    // remember: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});


const checkboxes = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana", helperText: "banana", disabled: true },
    { value: "blueberry", label: "Blueberry" },
    { value: "mango", label: "Mango" },
];

const selectOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada", disabled: true },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" }
];

//FN:START
//Buttons
//FN:DOC
export function ButtonTest(setProgress?: (progress: number) => void) {
    return <div>

        <div>
            <button>Button</button>
            <button class={CssUI.ButtonGradient}>ButtonGradient</button>
            <button class={CssUI.ButtonErrorRound}>ButtonError</button>
            <button class={CssUI.ButtonRev}>ButtonRev</button>
            <button class={CssUI.ButtonRound}>ButtonRound</button>
            <button class={CssUI.ButtonRoundRev}>ButtonRoundRev</button>
            <button class={CssUI.ButtonRoundRev} disabled>Disabled ButtonRoundRev</button>
        </div>

        <div>
            <button class={CssUI.ButtonIconPlain}><IconHome /></button>
            <button class={CssUI.ButtonIconMaterial}><IconHome /></button>
            <button class={CssUI.ButtonIconMaterialRev}><IconHome /></button>
            <button class={CssUI.ButtonIcon} onClick={() => {
                setProgress?.(80);
            }}><IconHome /></button>
        </div>

        <div>
            <button class={CssUI.ButtonMaterial}>ButtonMaterial</button>
            <button class={CssUI.ButtonMaterialRound}>ButtonMaterialRound</button>
            <button class={CssUI.ButtonMaterialRev}>ButtonMaterialRev</button>
            <button class={CssUI.ButtonMaterialRoundRev}>ButtonMaterialRoundRev</button>
        </div>

        <div>
            <button class={CssUI.ButtonOutlined}>ButtonOutlined</button>
            <button class={CssUI.ButtonErrorOutlined}>ButtonErrorOutlined</button>
            <button class={CssUI.ButtonOutlinedRound}>ButtonOutlinedRound</button>
            <button class={CssUI.ButtonOutlinedPlain}>ButtonOutlinedPlain</button>
            <button class={CssUI.ButtonOutlinedRoundPlain}>ButtonOutlinedRoundPlain</button>
        </div>

        <div>
            <AsyncButton onClick={async (): Promise<void> => {
                // Simulate an async operation (e.g., API call)
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const shouldFail = Math.random() < 0.5; // 50% chance to fail
                        if (shouldFail) {
                            reject(new Error("Something went wrong!"));
                        } else {
                            resolve(); // Resolve without returning a value
                        }
                    }, 2000);
                });
            }}>
                AsyncButton
            </AsyncButton>

            <button class={CssUI.ButtonElevated}>Elevated</button>
        </div>

        <Options />

    </div>;
}
//FN:END

//FN:START
//TreeView
//FN:DOC
export function TestTree() {
    return <TreeView
        id="testtree"
        onClick={(data) => { console.log(data.data); }}
        style={{
            "flex-direction": "row"
        }}
        data={[
            {
                id: "settings",
                label: "settings",
                header: "Settings",
                children: [
                    {
                        id: "profile",
                        label: <span>Profile</span>,
                        data: "profile",
                        children: [
                            {
                                id: "editInfo",
                                label: <span>Edit Info</span>,
                                data: "profile.edit",
                                children: [
                                    {
                                        id: "profile",
                                        label: <span>Profile</span>,
                                        data: "profile",
                                        children: [
                                            {
                                                id: "editInfo",
                                                label: <span>Edit Info</span>,
                                                data: "profile.edit"
                                            },
                                            {
                                                id: "privacy",
                                                label: <span>Privacy</span>,
                                                data: "profile.privacy"
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                id: "privacy",
                                label: <span>Privacy</span>,
                                data: "profile.privacy"
                            }
                        ]
                    },
                    {
                        id: "account",
                        label: <span>Account</span>,
                        data: "account",
                        children: [
                            {
                                id: "security",
                                label: <span>Security</span>,
                                data: "account.security"
                            }
                        ]
                    }
                ]
            },
            {
                id: "names",
                label: "names",
                header: "Names",
                open: true,
                children: [
                    {
                        id: "themostpopular",
                        label: "The most popular",
                        data: "Hello",
                    },
                    {
                        id: "increasingprice",
                        label: <p> Increasing price </p>,
                    },
                ]
            },
        ]} />;
}
//FN:END

export function Item(props: { children: JSX.Element | string }) {
    return (
        <div
            style={{
                color: "var(--primary-bg)",
                background: "var(--primary)",
                padding: "1rem",
                height: "100%",
                "border-radius": "6px",
                "align-content": "center",
                "text-align": "center",
            }}
        >
            {props.children}
        </div>
    );
}
