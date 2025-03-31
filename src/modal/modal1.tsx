import { IconButton, MaterialButton, OutlinedButton } from "../components/button";
import { H4 } from "../components/heading";
import { Select } from "../components/select";
import { SpaceForm } from "../components/spaceform";
import { CrossIcon } from "../components/svg";
import { TextInput } from "../components/textinput";

export function Modal1() {
    return (
        <div class="max-h-auto relative max-h-full w-full max-w-lg p-4">
            <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">

                <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                    <H4>Account Information</H4>
                    <IconButton>
                        <CrossIcon />
                    </IconButton>
                </div>

                <SpaceForm class="p-4 md:p-5" id="AccountForm">
                    <div class="mb-5 gap-4">

                        <TextInput name="pickuppoint" label='Pick-up point*' type="text" placeholder="Enter the pick-up point name" />
                        <TextInput name="firstname" label='Your Full Name*' type="text" placeholder="Enter your first name" />
                        <TextInput name="email" label='Your Email*' type="text" placeholder="Enter your email here" />

                        <Select header="Country" id="country" options={[
                            { value: "us", label: "United States" },
                            { value: "ca", label: "Canada" },
                            { value: "fr", label: "France" },
                            { value: "de", label: "Germany" }
                        ]} />

                        <TextInput area name="delivery_address" label='Delivery Address*' type="text" placeholder="Enter here your address" />

                    </div>
                    <div class="flex gap-3 border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                        <MaterialButton>Save information</MaterialButton>
                        <OutlinedButton>Cancel</OutlinedButton>
                    </div>
                </SpaceForm>
            </div>
        </div >
    );
}