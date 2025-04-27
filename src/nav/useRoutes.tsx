import { createSignal, onMount, onCleanup } from 'solid-js';

export function useRoutes(id: string, updateContent: (route: string) => void) {
    const [route, setRoute] = createSignal();

    function updateRoute() {
        const states = ParseUrlParams();
        updateContent(states[id]);
    }

    onMount(() => {
        updateRoute();
        window.addEventListener('route-change', updateRoute);
        // window.addEventListener('popstate', updateContent);
    });
    onCleanup(() => {
        window.removeEventListener('route-change', updateRoute);
        // window.removeEventListener('popstate', updateContent);
    });

    return [route, setRoute] as const;
}

export function UpdateQueryParam(key: string, value: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url.toString());
    RouteChange()
}

export function ParseUrlParams() {
    const params = new URLSearchParams(location.search);
    const result: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }
    return result;
}

export function RouteChange() {
    let oldRoute = window.location.href
    setTimeout(() => {
        const routeChangeEvent = new CustomEvent('route-change', {
            detail:
            {
                oldRoute: oldRoute,
                newRoute: window.location.href,
            }
        });
        window.dispatchEvent(routeChangeEvent);
    }, 10)
}
