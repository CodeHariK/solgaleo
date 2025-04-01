import { JSX, JSXElement } from "solid-js";
import { OutlinedButton } from "./button";
import { PositionBox2 } from "./dropdown";
import { DownIcon, UserIcon } from "./svg";

export const Header = ({ links, rightChildren: rightChildren }: { links?: JSX.Element, rightChildren?: JSX.Element }) => (
    <header>
        <nav class="antialiased">
            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-0">
                <div class="flex items-center justify-between">

                    <div class="flex items-center space-x-8">
                        <a href="/" title="" class="">
                            <div class="flex items-center space-x-2">
                                <img class="block w-auto h-12" src="https://cdn-icons-png.flaticon.com/128/12244/12244295.png" alt="" />
                                {/* <H4>Atlantic</H4> */}
                            </div>
                        </a>

                        <ul class="hidden lg:flex items-center justify-start gap-2 md:gap-2 py-3 sm:justify-center">
                            {links}
                        </ul>
                    </div>

                    <div class="flex items-center lg:space-x-2">
                        {rightChildren}
                    </div>
                </div>

            </div>
        </nav >
    </header >
);

export const TransitionModal = ({ transition, children }: { transition: boolean, children?: JSX.Element }) => {
    return (
        <TransitionWidget showFirstWidget={transition}
            one={
                <PositionBox2 name={<p>{UserIcon()}{<span>Account</span>}{DownIcon()}</p>} align={{ x: 0, y: 1 }}>
                    <div class="z-50 m-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow night:bg-gray-700 night:divide-gray-600" id="user-dropdown">
                        <div class="px-4 py-3">
                            <span class="block text-sm text-gray-900 night:text-white">Bonnie Green</span>
                            <span class="block text-sm text-gray-500 truncate night:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul class="py-2" aria-labelledby="user-menu-button">
                            {children} {/* Accept header links dynamically */}
                        </ul>
                    </div>
                </PositionBox2>
            }
            two={<OutlinedButton><a href="/login">Log In</a></OutlinedButton>}>
        </TransitionWidget>
    );
};

const TransitionWidget = (props: { showFirstWidget: boolean, one: JSXElement, two: JSXElement }) => {
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
        <a onClick={handleLinkClick} href={props.href} title={props.title} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 night:hover:bg-gray-600 night:text-gray-200 night:hover:text-white">
            {props.title}
        </a>
    </li>;
}
