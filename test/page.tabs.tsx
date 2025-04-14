import { createEffect } from "solid-js";
import { RoutedTabs } from "../src/gen";
import { GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

function updateCurrentPageUrl(basePath: string, params: string): void {
    // Create a URL object from the base path
    const url = new URL(basePath, window.location.origin); // Use the current origin

    // Split the params string into individual key-value pairs
    const pairs = params.split('&');

    // Add each parameter to the URL
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
            url.searchParams.set(key, decodeURIComponent(value)); // Decode value to handle any encoded characters
        }
    });

    // Update the current page URL without reloading
    window.history.pushState({}, '', url.toString());
}


export function TabTest() {

    createEffect(() => {
        updateCurrentPageUrl(location.pathname, "two.light=home&two.night=settings.profile&one.night=settings.account.security&one.light=settings.account.notifications");
    })

    return <GridLayout
        header={<TestHeader />}
        footer={<TestHeader />}
    >

        <div style={{ display: "flex", "flex-direction": "column", height: "100%" }}>

            <div style={{
                display: "flex",
                "flex-direction": "row",
                height: "100%",
            }}>

                <div style={{ border: "1px solid red", width: "100%" }}>
                    <RoutedTabs
                        tabs={tabs()}
                        defaultTab="home"
                        id="two.light"
                        styles={{
                            level: { "flex-direction": "column" },
                            container: { "flex-direction": "row" },
                            content: { margin: "1rem", padding: "1rem", border: "1px solid red", "border-radius": "20px" }
                        }}
                    />
                </div>

                <div style={{ border: "1px solid red", width: "100%" }}>
                    <RoutedTabs
                        tabs={tabs()}
                        defaultTab="home"
                        id="two.night"
                        styles={{
                            container: { "flex-direction": "row" },
                            content: { margin: "1rem", padding: "1rem", border: "1px solid red", "border-radius": "20px" }
                        }}
                    />
                </div>
            </div>

            <div style={{
                display: "flex",
                "flex-direction": "row",
                height: "100%",
            }}>

                <div style={{ border: "1px solid red", width: "100%" }}>
                    <RoutedTabs
                        tabs={tabs()}
                        defaultTab="home"
                        id="one.light"
                        styles={{
                            level: { "flex-direction": "column" },
                            content: { margin: "1rem", padding: "1rem", border: "1px solid red", "border-radius": "20px" }
                        }}
                    />
                </div>

                <div style={{ border: "1px solid red", width: "100%" }}>
                    <RoutedTabs
                        tabs={tabs()}
                        defaultTab="home"
                        id="one.night"
                        styles={{
                            content: { margin: "1rem", padding: "1rem", border: "1px solid red", "border-radius": "20px" }
                        }}
                    />
                </div>
            </div>

        </div>

    </GridLayout>
}

const tabs = () => [
    {
        id: 'home',
        label: 'Home',
        content: <div>Home Content</div>
    },
    {
        id: 'settings',
        label: 'Settings',
        children: [
            {
                id: 'profile',
                label: 'Profile',
                content: <div>Profile Settings</div>
            },
            {
                id: 'account',
                label: 'Account',
                children: [
                    {
                        id: 'security',
                        label: 'Security',
                        content: <div>Security Settings</div>
                    },
                    {
                        id: 'notifications',
                        label: 'Notifications',
                        content: <div>Notification Preferences</div>
                    }
                ]
            }
        ]
    }
];
