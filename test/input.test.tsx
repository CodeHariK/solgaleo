
import * as yup from 'yup';
import { CheckboxGroup, Dropdown, PositionBox, RadioGroup, RatingsBar, SearchInput, Select, SpaceDebugInfo, SpaceForm, SpaceFormError, TextInput } from '../src/input/solgaleo.input';
import { CartIcon, DownIcon } from '../src/svg/svg';

import "../src/input/input.gen.css"

export function InputTest() {
    return <>

        <PositionBox
            name={<>{CartIcon()}{<span style={{ "white-space": "nowrap" }}>My Cart</span>}{DownIcon()}</>}>

            <div class="secbg min-w-[300px] z-10 mx-auto space-y-4 overflow-hidden rounded-lg p-4 antialiased shadow-lg">

                <div>Cart is empty</div>

            </div>

        </PositionBox>

        <Dropdown<string>
            fn={(data) => { console.log(data) }}
            items={[
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

            <SearchInput name="search" placeholder="placeholder" />

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

            <TextInput name="password" type="password" placeholder="placeholder" />
            <TextInput name="value" type="range" header='value' placeholder="value" />

            <TextInput name="Name" type="text" placeholder="Hello Name"
                label="Label"
            ></TextInput>
            <TextInput area name="Area" type="text" placeholder="Hello Area"
                label="Label"
            ></TextInput>
            {RatingsBar({ ratings: 3.8, reviews: 5 })}

            <SpaceFormError />

            <button type="submit">Submit</button>
            <button type="reset">Reset</button>

            <SpaceDebugInfo />
        </SpaceForm>
    </>
}

export const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    // company: yup.string().required('Company is required'),
    phone: yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{3}$/, 'Phone number must be in the format 123-45-678').required('Phone number is required'),
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