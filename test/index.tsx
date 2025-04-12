/* @refresh reload */
import { render } from 'solid-js/web'

import { AdvTest } from './page.adv';
import { InputTest } from './page.ui';
import { NavTest } from './page.nav';
import { Route, Router } from '@solidjs/router';
import { GridLayout } from '../src/ui/gridlayout';
import { SvgTest } from './page.svg';
import { FancyTest } from './page.fancy';
import { TestHeader } from './common';
import { GridTest } from './page.grid';
import { TabTest } from './page.tabs';

// import * as Solgaleo from "solgaleo";

// Solgaleo.AddTheme("custom")

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
    <Route path="/grid" component={GridTest} />
    <Route path="/tabs" component={TabTest} />
</Router>,
    document.body!)
