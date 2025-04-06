import { Setter } from "solid-js";
import { Select } from "../input/dropdown";
import { SpaceForm } from "../input/spaceform";
import { TextInput } from "../input/textinput";
import { CrossIcon, DeleteIcon } from "../svg/svg";
import { IconButton, MaterialButton, OutlinedButton } from "../ui/button";

export function Modal1() {
    return (
        <div class="max-h-auto relative max-h-full w-full max-w-lg p-4">
            <div class="relative rounded-lg bg-white shadow night:bg-gray-800">

                <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 night:border-gray-700 md:p-5">
                    <h4>Account Information</h4>
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
                    <div class="flex gap-3 border-t border-gray-200 pt-4 night:border-gray-700 md:pt-5">
                        <MaterialButton>Save information</MaterialButton>
                        <OutlinedButton>Cancel</OutlinedButton>
                    </div>
                </SpaceForm>
            </div>
        </div >
    );
}

export function DeleteModal(setShow?: Setter<boolean>) {
    return <div class=" rounded-lg p-4 text-center shadow sm:p-5">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg p-2">
            <DeleteIcon />
            <span class="sr-only">Danger icon</span>
        </div>
        <h6 class="mb-3">Are you sure you want to delete this order from your account?</h6>
        <div class="flex items-center justify-center space-x-4">
            <OutlinedButton>No, cancel</OutlinedButton>
            <MaterialButton onClick={() => { if (setShow) setShow(false) }}>Yes, delete</MaterialButton>
        </div>
    </div>;
}
