
import * as yup from 'yup';
import { CheckboxGroup, Dropdown, RadioGroup, RatingsBar, Select, CssUI, SpaceDebugInfo, SpaceForm, SpaceFormError, Input, GridLayout, FileUploader, Accordion, AsyncButton, ProgressBar, ToggleSwitch } from '../src/ui/gen.ts';
import { IconCross, IconDown, IconFilter, IconHome } from '../src/svg/gen.ts';
import { TestHeader } from './common.tsx';
import { createSignal } from 'solid-js';
import { Modal } from '../src/nav/gen.ts';

export function UiTest() {

    const [progress, setProgress] = createSignal(64);

    //                 AllTheme().map((t) =>
    //                     <section class={t}>
    //                         {t}
    //                         <Story />
    //                     </section>)

    return <GridLayout
        header={<TestHeader />}
    >

        {ButtonTest(setProgress)}

        <ProgressBar progress={progress} />

        <Accordion
            title="Section 1"
            children={<div class="p8">"Content for section 1."</div>}
        />

        <Modal
            // fullScreen={true}
            anchor={{
                element: ([, setRef], [isVisible, setVisibiliy]) => {
                    return <button ref={setRef} class={CssUI.OutlinedButton}
                        onmousedown={() => { setVisibiliy(!isVisible()) }}
                    >
                        <IconFilter />
                        <span>Filter</span>
                        <IconDown />
                    </button>
                }
            }}
            child={() => {
                return (
                    <Dropdown<string>
                        handleItemClick={(data) => { console.log(data) }}
                        items={[
                            {
                                header: "Settings",
                                subitems: [
                                    {
                                        element: <span>Profile</span>,
                                        data: "profile",
                                        children: [
                                            {
                                                element: <span>Edit Info</span>,
                                                data: "profile.edit",
                                                children: [
                                                    {
                                                        element: <span>Profile</span>,
                                                        data: "profile",
                                                        children: [
                                                            {
                                                                element: <span>Edit Info</span>,
                                                                data: "profile.edit"
                                                            },
                                                            {
                                                                element: <span>Privacy</span>,
                                                                data: "profile.privacy"
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                element: <span>Privacy</span>,
                                                data: "profile.privacy"
                                            }
                                        ]
                                    },
                                    {
                                        element: <span>Account</span>,
                                        data: "account",
                                        children: [
                                            {
                                                element: <span>Security</span>,
                                                data: "account.security"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                header: "Names",
                                subitems: [
                                    {
                                        element: "The most popular",
                                        data: "Hello",
                                    },
                                    { element: <p> Increasing price </p>, },
                                ]
                            },
                            {
                                header: "Names",
                                subitems: [
                                    { element: <p> Newest </p>, },
                                    { element: <p> Decreasing price </p>, },
                                ]
                            },
                            {
                                subitems: [
                                    { element: <p> No. reviews </p>, },
                                    { element: <p> Discount % </p>, },
                                ]
                            },
                            { subitems: [] }
                        ]} />

                )
            }}
        />



        <SpaceForm
            id="Form"
            initialFormState={{
                values: {
                    "first_name": "Hello",
                    "hello": ["checkbox-3"],
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

            <CheckboxGroup header="Countries" name={"hello"} checkboxes={checkboxes} />

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
                    <button class={CssUI.IconButton} type="reset"><IconCross /></button>,
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
    {
        value: "checkbox-1",
        label: "I agree to the terms and conditions",
        helperText: "Terms and conditions apply.",
        disabled: false
    },
    {
        value: "checkbox-2",
        label: "I want to get promotional offers",
        helperText: "Get offers and updates.",
        disabled: false
    },
    {
        value: "checkbox-3",
        label: "I am 18 years or older",
        helperText: "Get offers and updates.",
        disabled: true
    }
];

const selectOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" }
];

//FN:START
//Buttons
//FN:DOC
export function ButtonTest(setProgress?: (progress: number) => void) {
    return <div style={{ "display": "flex", "align-items": "center", "flex-wrap": "wrap" }}>

        <button>BaseButton</button>

        <button class={CssUI.MaterialButton}>MaterialButton</button>

        <button class={CssUI.OutlinedButton}>OutlinedButton</button>

        <button class={CssUI.IconButton} onClick={() => {
            setProgress?.(80);
        }}><IconHome /></button>

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
            Click Me
        </AsyncButton>
    </div>;
}
//FN:END
