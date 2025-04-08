/* @refresh reload */
import { render } from 'solid-js/web'

// @ts-ignore
import { AdvTest, FancyTest, InputTest } from './gen'

// import * as Solgaleo from "solgaleo";

// Solgaleo.AddTheme("custom")

// render(() => <AdvTest />, document.body!)
// render(() => <InputTest />, document.body!)
render(() => <FancyTest />, document.body!)
// render(() => <GridLayout left={<List />} />, document.body!)

// render(() => <Storybook />, document.body!)

// const tabs = [
//     {
//         id: 'home',
//         label: 'Home',
//         content: <div>Home Content</div>
//     },
//     {
//         id: 'settings',
//         label: 'Settings',
//         children: [
//             {
//                 id: 'profile',
//                 label: 'Profile',
//                 content: <div>Profile Settings</div>
//             },
//             {
//                 id: 'account',
//                 label: 'Account',
//                 children: [
//                     {
//                         id: 'security',
//                         label: 'Security',
//                         content: <div>Security Settings</div>
//                     },
//                     {
//                         id: 'notifications',
//                         label: 'Notifications',
//                         content: <div>Notification Preferences</div>
//                     }
//                 ]
//             }
//         ]
//     }
// ];

// render(() => <Router>
//     <Route
//         path="/"
//         component={() => (
//             <>
//                 <div style={{ background: "white", color: "black" }}>
//                     <RoutedTabs
//                         tabs={tabs}
//                         defaultTab="home"
//                         baseRoute="/"
//                         id="light"
//                     />
//                 </div>

//                 <div style={{ background: "#6a3568", color: "white" }}>
//                     <RoutedTabs
//                         tabs={tabs}
//                         defaultTab="home"
//                         baseRoute="/"
//                         id="night"
//                     />
//                 </div>
//             </>
//         )} />
// </Router>,
//     document.body!)
