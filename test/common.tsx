import { Header, HeaderLinks } from "../src/nav/header";

export function TestHeader() {
    return <Header
        title={"Solgaleo"}
        links={[
            <HeaderLinks href='/nav' title='Nav' />,
            <HeaderLinks href='/adv' title='Adv' />,
            <HeaderLinks href='/svg' title='Svg' />,
            <HeaderLinks href='/fancy' title='Fancy' />,
            <HeaderLinks href='/input' title='Input' />,
            <HeaderLinks href='/grid' title='Grid' />,
        ]} />;
}
