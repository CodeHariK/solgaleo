import { type JSX } from "solid-js";

type IconProps = {
    className?: string;
    style?: JSX.CSSProperties;
    strokeWidth?: number;
    fill?: boolean;
};

/*CSS:
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.animate-spin {
    animation: spin 1s linear infinite;
}

svg {
    sol(--svg-size , 1.3rem);

    display: inline-block;
    // margin: .4rem;
    // border-radius: 1rem;
    // width: var(--svg-size);
    // height: var(--svg-size);
    width: 1em;
    height: 1em;
    color: currentColor;
    // background: var(--icon-bg);
    // sol(--svg-ring-width , 4px);
    // sol(--svg-ring-color , #3b82f680 , #3b82f680);
    // box-shadow: 0 0 #0000, 0 0 0 var(--svg-ring-width) var(--svg-ring-color), 0 0 #0000;
}
*/

export function IconPhone({ className, style, strokeWidth, fill }: IconProps) {

    return <svg
        viewBox="-2 -2 22 22"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
    >
        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
    </svg>
}

export function IconKey({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="-1 -1 26 26"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linejoin="round"
    >
        <path
            d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"
        ></path>
        <circle cx="16.5" cy="7.5" r=".5"></circle>
    </svg>
}

export function IconAddUser({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
    >
        <path
            d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
        </path>
    </svg>;
}

export function IconTableHeading({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="3 3 18 18"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
    </svg>;
}

export function IconPen({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="-2 -2 28 28"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path
            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
        </path>
    </svg>;
}

export function IconCheck({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="50 -900 840 840"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "currentColor" : "none"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
    </svg>
}

export function IconCross({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="2 2 16 16"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "currentColor" : "none"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
        </path>
    </svg>
}

export function IconFilterList({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 -960 960 960"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "currentColor" : "none"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
    </svg>
}

export function IconUnlock({ className, style, strokeWidth, fill }: IconProps) {

    return <svg
        viewBox="0 -960 960 960"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" />
    </svg>
}

export function IconLock({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 -960 960 960"
        style={style}
        class={className}
        stroke={fill ? "currentColor" : "none"}
        fill={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
    </svg>
}

export function IconEmail({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm0 0v1.5a2.5 2.5 0 0 0 2.5 2.5v0a2.5 2.5 0 0 0 2.5-2.5V12a9 9 0 1 0-9 9h4" />
    </svg>
}

export function IconError({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 -960 960 960"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
}

export function IconBlock({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 -960 960 960"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" />
    </svg>
}

export function IconStar({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 1 24 24"
        style={style}
        class={className}
        stroke={fill ? "currentColor" : "none"}
        fill={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
    </svg>

}

export function IconHeart({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
}

export function IconCart({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
}

export function IconDown({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
}

export function IconChevronLeft({ className, style, strokeWidth, fill }: IconProps) {

    return <svg
        viewBox="180 -800 640 640"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "currentColor" : "none"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z" />
    </svg>
}

export function IconChevronRight({ className, style, strokeWidth, fill }: IconProps) {

    return <svg
        viewBox="100 -800 640 640"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "currentColor" : "none"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
    </svg>
}

export function IconSearch({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>;
}

export function IconFilter({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
    </svg>
}

export function IconUser({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
}

export function IconDelete({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
    </svg>
}

export function IconLoading({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 100 101"
        style={style}
        class={["animate-spin", className].join(" ")}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
    </svg>
}

export function IconRocket({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="-1 -1 26 26"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "currentColor" : "none"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.43909 8.85483L1.44039 8.85354L4.96668 5.33815C5.30653 4.99386 5.7685 4.79662 6.2524 4.78972L6.26553 4.78963L12.9014 4.78962L13.8479 3.84308C16.9187 0.772319 20.0546 0.770617 21.4678 0.975145C21.8617 1.02914 22.2271 1.21053 22.5083 1.4917C22.7894 1.77284 22.9708 2.13821 23.0248 2.53199C23.2294 3.94517 23.2278 7.08119 20.1569 10.1521L19.2107 11.0983V17.7338L19.2106 17.7469C19.2037 18.2308 19.0067 18.6933 18.6624 19.0331L15.1456 22.5608C14.9095 22.7966 14.6137 22.964 14.29 23.0449C13.9663 23.1259 13.6267 23.1174 13.3074 23.0204C12.9881 22.9235 12.7011 22.7417 12.4771 22.4944C12.2533 22.2473 12.1006 21.9441 12.0355 21.6171L11.1783 17.3417L6.65869 12.822L4.34847 12.3589L2.38351 11.965C2.05664 11.8998 1.75272 11.747 1.50564 11.5232C1.25835 11.2992 1.07653 11.0122 0.979561 10.6929C0.882595 10.3736 0.874125 10.034 0.955057 9.7103C1.03599 9.38659 1.20328 9.09092 1.43909 8.85483ZM6.8186 10.8724L2.94619 10.096L6.32006 6.73268H10.9583L6.8186 10.8724ZM15.2219 5.21703C17.681 2.75787 20.0783 2.75376 21.1124 2.8876C21.2462 3.92172 21.2421 6.31895 18.783 8.77812L12.0728 15.4883L8.51172 11.9272L15.2219 5.21703ZM13.9042 21.0538L13.1279 17.1811L17.2676 13.0414V17.68L13.9042 21.0538Z"></path><path d="M9.31827 18.3446C9.45046 17.8529 9.17864 17.3369 8.68945 17.1724C8.56178 17.1294 8.43145 17.1145 8.30512 17.1243C8.10513 17.1398 7.91519 17.2172 7.76181 17.3434C7.62613 17.455 7.51905 17.6048 7.45893 17.7835C6.97634 19.2186 5.77062 19.9878 4.52406 20.4029C4.08525 20.549 3.6605 20.644 3.29471 20.7053C3.35607 20.3395 3.45098 19.9148 3.59711 19.476C4.01221 18.2294 4.78141 17.0237 6.21648 16.5411C6.39528 16.481 6.54504 16.3739 6.65665 16.2382C6.85126 16.0016 6.92988 15.678 6.84417 15.3647C6.83922 15.3466 6.83373 15.3286 6.82767 15.3106C6.74106 15.053 6.55701 14.8557 6.33037 14.7459C6.10949 14.6389 5.84816 14.615 5.59715 14.6994C5.47743 14.7397 5.36103 14.7831 5.24786 14.8294C3.22626 15.6569 2.2347 17.4173 1.75357 18.8621C1.49662 19.6337 1.36993 20.3554 1.30679 20.8818C1.27505 21.1464 1.25893 21.3654 1.25072 21.5213C1.24662 21.5993 1.24448 21.6618 1.24337 21.7066L1.243 21.7226L1.24235 21.7605L1.2422 21.7771L1.24217 21.7827L1.24217 21.7856C1.24217 22.3221 1.67703 22.7579 2.2137 22.7579L2.2155 22.7579L2.22337 22.7578L2.23956 22.7577C2.25293 22.7575 2.27096 22.7572 2.29338 22.7567C2.33821 22.7555 2.40073 22.7534 2.47876 22.7493C2.63466 22.7411 2.85361 22.725 3.11822 22.6932C3.64462 22.6301 4.36636 22.5034 5.13797 22.2464C6.58274 21.7653 8.3431 20.7738 9.17063 18.7522C9.21696 18.639 9.26037 18.5226 9.30064 18.4029C9.30716 18.3835 9.31304 18.364 9.31827 18.3446Z"></path>
    </svg>
}

export function IconCopy({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M17.5 14H19C20.1046 14 21 13.1046 21 12V5C21 3.89543 20.1046 3 19 3H12C10.8954 3 10 3.89543 10 5V6.5M5 10H12C13.1046 10 14 10.8954 14 12V19C14 20.1046 13.1046 21 12 21H5C3.89543 21 3 20.1046 3 19V12C3 10.8954 3.89543 10 5 10Z" />
    </svg>
}

export function IconHome({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 20 20"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
    </svg>
}

export function IconUpload({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
}

export function IconLogout({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 -960 960 960"
        style={style}
        class={className}
        fill={fill ? "none" : "currentColor"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
    </svg>
}


export function IconMoon({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 20 20"
        style={style}
        class={className}
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? "none" : "currentColor"}
        stroke-width={strokeWidth ?? 2}
    >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    </svg>
}

export function IconSun({ className, style, strokeWidth, fill }: IconProps) {
    return <svg
        viewBox="0 0 24 24"
        style={style}
        class={className}
        stroke={fill ? "none" : "currentColor"}
        fill={fill ? "currentColor" : "none"}
        stroke-width={strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
}
