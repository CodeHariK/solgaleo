import { AA, Header, IMG } from "../src/nav/header";
import { ThemeToggle } from "../src/ui/theme_toggle";

//FN:START
//Header
//FN:DOC
export function TestHeader() {
    return <Header
        title={<AA href="/">
            <IMG src="/logo.png" alt="solgaleo" />
            <p>Solgaleo</p>
        </AA>}
        links={[
            <AA href={'/nav'} title='Nav'>Nav</AA>,
            <AA href={'/adv'} title='Adv' >Adv</AA>,
            <AA href={'/svg'} title='Svg' >Svg</AA>,
            <AA href={'/fancy'} title='Fancy' >Fancy</AA>,
            <AA href={'/ui'} title='Ui' >Ui</AA>,
            <AA href={'/grid'} title='Grid'>Grid</AA>,
            <AA href="/tabs" >Tab</AA>,
            <AA href="/tabs?two.light=Root.Pictures.Vacation" >Tabs</AA>,
        ]}
        right={[
            <ThemeToggle />
        ]}
    />;
}
//FN:END
