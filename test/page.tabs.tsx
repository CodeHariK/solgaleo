import { Tabs } from "../src/gen";
import { GridLayout } from "../src/ui/gen";
import { TestHeader } from "./common";

export function TabTest() {

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
                    <Tabs
                        tabs={tabs()}
                        defaultTab="home"
                        id="two.light"
                        styles={{
                            container: { "flex-direction": "row" },
                            content: { margin: "1rem", padding: "1rem", border: "1px solid red", "border-radius": "20px" }
                        }}
                    />
                </div>

                <div style={{ border: "1px solid red", width: "100%" }}>
                    <Tabs
                        tabs={tabs()}
                        defaultTab="home"
                        id="two.night"
                        styles={{
                            level: { "flex-direction": "column" },
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
                    <Tabs
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
                    <Tabs
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
