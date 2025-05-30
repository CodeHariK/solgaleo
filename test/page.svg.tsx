import * as svg from '../src/svg/gen'
import { GridLayout } from '../src/ui/gridlayout.tsx';
import { CssTEST, TestHeader } from './gen.ts'

/*CSS:
.IconGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.IconItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    transition: all 0.2s;

    svg {
        border: 1px solid var(--primary);
    }
}

.IconItem:hover {
    background: var(--primary-bg);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.IconLabel {
    font-size: 0.75rem;
    color: #6b7280;
    text-align: center;
}
*/

const icons = [
    { component: svg.IconPhone, name: 'Phone' },
    { component: svg.IconKey, name: 'Key' },
    { component: svg.IconAddUser, name: 'Add User' },
    { component: svg.IconTableHeading, name: 'Table Heading' },
    { component: svg.IconPen, name: 'Pen' },
    { component: svg.IconCheck, name: 'Check' },
    { component: svg.IconCross, name: 'Cross' },
    { component: svg.IconFilterList, name: 'FilterList' },
    { component: svg.IconUnlock, name: 'Unlock' },
    { component: svg.IconLock, name: 'Lock' },
    { component: svg.IconEmail, name: 'Email' },
    { component: svg.IconError, name: 'Error' },
    { component: svg.IconBlock, name: 'Block' },
    { component: svg.IconStar, name: 'Star' },
    { component: svg.IconHeart, name: 'Heart' },
    { component: svg.IconCart, name: 'Cart' },
    { component: svg.IconDown, name: 'Down' },
    { component: svg.IconChevronLeft, name: 'Chevron Left' },
    { component: svg.IconChevronRight, name: 'Chevron Right' },
    { component: svg.IconSearch, name: 'Search' },
    { component: svg.IconFilter, name: 'Filter' },
    { component: svg.IconUser, name: 'User' },
    { component: svg.IconDelete, name: 'Delete' },
    { component: svg.IconLoading, name: 'Loading' },
    { component: svg.IconRocket, name: 'Rocket' },
    { component: svg.IconCopy, name: 'Copy' },
    { component: svg.IconHome, name: 'Home' },
    { component: svg.IconUpload, name: 'Upload' },
    { component: svg.IconLogout, name: 'Logout' },
    { component: svg.IconMoon, name: 'Moon' },
    { component: svg.IconSun, name: 'Sun' },
];

export function SvgTest() {
    return <GridLayout
        header={<TestHeader />}
    >
        <div class={CssTEST.IconGrid}>
            {icons.map(({ component: Icon, name }) => (
                <div class={CssTEST.IconItem}>
                    <Icon style={{ width: "4rem", height: "4rem" }} />
                    <span class={CssTEST.IconLabel}>{name}</span>
                </div>
            ))}
        </div>
    </GridLayout>
}

//FN:START
//Svg
//FN:DOC
export function tSvg() {
    return <div class={CssTEST.IconGrid}>
        {icons.map(({ component: Icon, name }) => (
            <div class={CssTEST.IconItem}>
                <Icon style={{ width: "4rem", height: "4rem" }} />
                <span class={CssTEST.IconLabel}>{name}</span>
            </div>
        ))}
    </div>

}
//FN:END
