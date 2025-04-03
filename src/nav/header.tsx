import { JSX } from "solid-js/jsx-runtime";
import { OutlinedButton } from "../ui/button";
import { PositionBox } from "../input/position";
import { DownIcon, UserIcon } from "../svg/svg";

export const Header = ({ iconSrc, title, links, rightChildren }: { iconSrc?: string, title?: JSX.Element, links?: JSX.Element, rightChildren?: JSX.Element }) => (
    <header>
        <nav class="antialiased max-w-screen-xl px-4 mx-auto 2xl:px-0 py-0 flex items-center justify-between">

            <div class="flex items-center space-x-8">
                <a href="/" title="" class="">
                    <div class="flex items-center space-x-2">
                        {iconSrc && <div class="min-w-16"><img class="block w-auto h-12" src={iconSrc} /></div>}
                        {title}
                    </div>
                </a>

                <ul class="hidden lg:flex items-center justify-start gap-2 md:gap-2 py-3 sm:justify-center">
                    {links}
                </ul>
            </div>

            <div class="flex items-center lg:space-x-2">
                {rightChildren}
            </div>

        </nav >
    </header >
);

export const TransitionModal = ({ transition, children }: { transition: boolean, children?: JSX.Element }) => {
    return (
        <TransitionWidget showFirstWidget={transition}
            one={
                <PositionBox name={<p>{UserIcon()}{<span>Account</span>}{DownIcon()}</p>} align={{ x: 0, y: 1 }}>
                    <div class="z-50 m-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow night:bg-gray-700 night:divide-gray-600" id="user-dropdown">
                        <div class="px-4 py-3">
                            <span class="block text-sm text-gray-900 night:text-white">Person</span>
                            <span class="block text-sm text-gray-500 truncate night:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul class="py-2" aria-labelledby="user-menu-button">
                            {children} {/* Accept header links dynamically */}
                        </ul>
                    </div>
                </PositionBox>
            }
            two={<OutlinedButton><a href="/login">Log In</a></OutlinedButton>}>
        </TransitionWidget>
    );
};

const TransitionWidget = (props: { showFirstWidget: boolean, one: JSX.Element, two: JSX.Element }) => {
    return (
        <div class="relative">
            <div
                class={`transition-opacity duration-[10sec] ease-in-out ${props.showFirstWidget ? 'opacity-100' : 'opacity-0 hidden'
                    }`}
            >
                {props.one}
                {/* <div class="bg-blue-500 text-white p-4 rounded">
                    <h2 class="text-lg">Widget One</h2>
                </div> */}
            </div>

            <div
                class={`transition-opacity duration-[10sec] ease-in-out ${props.showFirstWidget ? 'opacity-0 hidden' : 'opacity-100'
                    }`}
            >
                {props.two}
                {/* <div class="bg-green-500 text-white p-4 rounded">
                    <h2 class="text-lg">Widget Two</h2>
                </div> */}
            </div>
        </div>
    );
};

export const HeaderLinks = (props: { href: string, title: string, fn?: (href: string) => void }) => {
    const handleLinkClick = (event: MouseEvent) => {
        event.preventDefault();
        console.log(props.href)
        if (props.fn) props.fn(props.href);
        setTimeout(() => {
            location.reload()
        }, 10)
    };

    return <li>
        <a onClick={handleLinkClick} href={props.href} title={props.title}
            class="block px-4 py-2 text-sm">
            {props.title}
        </a>
    </li>;
}
