
import * as yup from 'yup';
import { CheckboxGroup, Dropdown, PositionBox, RadioGroup, RatingsBar, Select, CssUI, SpaceDebugInfo, SpaceForm, SpaceFormError, Input, GridLayout, ImageUploader } from '../src/ui/gen.ts';
import { IconCart, IconCross, IconDown, IconFilter, IconGoogle } from '../src/svg/gen.ts';
import { TestHeader } from './common.tsx';

export function UiTest() {

    return <ImageUploader uploadFunc={(formdata) => {
        console.log('File from FormData:', JSON.stringify(formdata.get('item')));

        return { valid: true, info: <p>{JSON.stringify(formdata.get('item'))}</p> }
    }} />

    return <GridLayout
        header={<TestHeader />}
    >

        <PositionBox
            name={<>{<IconCart />}{<span style={{ "white-space": "nowrap" }}>My Cart</span>}{<IconDown />}</>}>

            <div class="min-w-[300px] z-10 mx-auto space-y-4 overflow-hidden rounded-lg p-4 antialiased shadow-lg">

                <div>Cart is empty</div>

            </div>

        </PositionBox>

        <Dropdown<string>
            fn={(data) => { console.log(data) }}
            button={
                <button class={CssUI.OutlinedButton} >
                    <IconFilter />
                    <span>Filter</span>
                    <IconDown />
                </button>
            }
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

        <SpaceForm
            id="Form"
            initialFormState={{
                values: {
                    "first_name": "Hello",
                    "hello": ["checkbox-3"],
                    "country": "fr",
                    "countries": "USA"
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

            <CheckboxGroup header="Countries" id={"hello"} checkboxes={checkboxes} />

            <Select id="country" options={selectOptions} header="Country" />

            <RadioGroup
                id="countries"
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

            <Input name="password1" type="password" label='label' placeholder="placeholder"
                end={[
                    <button class={CssUI.IconButton} type="reset"><IconCross /></button>,
                ]} />
            <Input name="password2" type="password" placeholder="placeholder" />
            <Input name="range" type="range" header='range' placeholder="range" />

            <Input name="Name" type="text" placeholder="placeholder" label="Label"></Input>
            <Input textarea name="Area" type="text" placeholder="placeholder" label="Label"></Input>

            <RatingsBar ratings={3.8} reviews={5} />

            <SpaceFormError />

            <button type="submit">Submit</button>
            <button type="reset">Reset</button>

            <SpaceDebugInfo />
        </SpaceForm>

        <div style={{ "display": "flex", "align-items": "center", "flex-wrap": "wrap" }}>

            <button>BaseButton</button >
            <button class={CssUI.MaterialButton}>MaterialButton</button>
            <button class={CssUI.OutlinedButton}>OutlinedButton</button>
            <button class={CssUI.IconButton}><IconGoogle /></button>
        </div>

        <h1>h1: The electron is a subatomic particle with a negative one elementary electric charge.</h1>
        <h2>h2: The electron is a subatomic particle with a negative one elementary electric charge.</h2>
        <h3>h3: The electron is a subatomic particle with a negative one elementary electric charge.</h3>
        <h4>h4: The electron is a subatomic particle with a negative one elementary electric charge.</h4>
        <h5>h5: The electron is a subatomic particle with a negative one elementary electric charge.</h5>
        <h6>h6: The electron is a subatomic particle with a negative one elementary electric charge.</h6>
        <p>p: The electron is a subatomic particle with a negative one elementary electric charge.</p>

    </GridLayout>
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