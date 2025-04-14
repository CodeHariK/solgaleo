// /* @refresh reload */
import { render } from 'solid-js/web'
import { AdvTest } from './page.adv';
import { UiTest } from './page.ui';
import { NavTest } from './page.nav';
import { Route, Router } from '@solidjs/router';
import { GridLayout } from '../src/ui/gridlayout';
import { SvgTest } from './page.svg';
import { FancyTest } from './page.fancy';
import { TestHeader } from './common';
import { GridTest } from './page.grid';
import { TabTest } from './page.tabs';

// Theme customization
import "./custom.css"
import { AddTheme } from "../src/ui/theme_toggle"
AddTheme("custom")

render(() => <Router base="/solgaleo">
    <Route path="/" component={
        () => <GridLayout
            header={<TestHeader />}
        />
    } />
    <Route path="/nav" component={NavTest} />
    <Route path="/adv" component={AdvTest} />
    <Route path="/svg" component={SvgTest} />
    <Route path="/fancy" component={FancyTest} />
    <Route path="/ui" component={UiTest} />
    <Route path="/grid" component={GridTest} />
    <Route path="/tabs" component={TabTest} />
    <Route path="*" component={NotFound} />
</Router>,
    document.body!)


function NotFound() {
    return (
        <GridLayout
            header={<TestHeader />}
        >
            <div style={{
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "height": "100%"
            }}>
                <h1>404 - Page Not Found</h1>
            </div>
        </GridLayout>
    );
}
