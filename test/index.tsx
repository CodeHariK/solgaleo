/* @refresh reload */
import { render } from 'solid-js/web'

// import { InputTest } from './page.ui';
import { NavTest } from './page.nav';
import { Route, Router } from '@solidjs/router';
import { RoutedTabs } from '../src/nav/gen';
// import { SvgTest } from './page.svg';

// import * as Solgaleo from "solgaleo";

// Solgaleo.AddTheme("custom")

// render(() => <SvgTest />, document.body!)
// render(() => <AdvTest />, document.body!)
// render(() => <InputTest />, document.body!)
// render(() => <NavTest />, document.body!)
// render(() => <FancyTest />, document.body!)
// render(() => <GridLayout left={<List />} />, document.body!)

// render(() => <Storybook />, document.body!)

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

render(() => <Router>
    <Route
        path="/"
        component={() => (
            <>
                <RoutedTabs
                    tabs={tabs()}
                    defaultTab="home"
                    baseRoute="/"
                    id="light"
                />

                <RoutedTabs
                    tabs={tabs()}
                    defaultTab="home"
                    baseRoute="/"
                    id="night"
                />
            </>
        )} />
</Router>,
    document.body!)
