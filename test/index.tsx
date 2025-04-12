/* @refresh reload */
import { render } from 'solid-js/web'

import { AdvTest } from './page.adv';
import { InputTest } from './page.ui';
import { NavTest } from './page.nav';
import { Route, Router } from '@solidjs/router';
import { RoutedTabs } from '../src/nav/gen';
import { GridLayout, List } from '../src/ui/gridlayout';
import { SvgTest } from './page.svg';
import { FancyTest } from './page.fancy';
import { TestHeader } from './common';

// import * as Solgaleo from "solgaleo";

// Solgaleo.AddTheme("custom")

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
    <Route path="/" component={
        () => <GridLayout
            header={<TestHeader />}
        />
    } />
    <Route path="/nav" component={NavTest} />
    <Route path="/adv" component={AdvTest} />
    <Route path="/svg" component={SvgTest} />
    <Route path="/fancy" component={FancyTest} />
    <Route path="/input" component={InputTest} />
    <Route path="/grid" component={() => <GridLayout left={<List />} />} />
    <Route
        path="/tabs"
        component={() => (
            <>
                <RoutedTabs
                    tabs={tabs()}
                    defaultTab="home"
                    id="light"
                />

                <RoutedTabs
                    tabs={tabs()}
                    defaultTab="home"
                    id="night"
                />
            </>
        )} />
</Router>,
    document.body!)
