/* @refresh reload */
import { render } from 'solid-js/web'
import { Storybook } from './storybook.tsx'

import "../src/css/input.css"
import "../src/css/index.css"
import { Route, Router } from '@solidjs/router'
import { RoutedTabs } from './tab.tsx'

// import * as Solgaleo from "solgaleo";

// Solgaleo.AddTheme("custom")

// render(() => <Storybook />, document.body!)

const tabs = [
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

render(() => <Router>
    <Route
        path="/"
        component={() => (
            <>
                <div style={{ background: "white", color: "black" }}>
                    <RoutedTabs
                        tabs={tabs}
                        defaultTab="home"
                        baseRoute="/"
                        id="light"
                    />
                </div>

                <div style={{ background: "#6a3568", color: "white" }}>
                    <RoutedTabs
                        tabs={tabs}
                        defaultTab="home"
                        baseRoute="/"
                        id="night"
                    />
                </div>
            </>
        )} />
</Router>,
    document.body!)
