export const debounce = (callback: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null; // Local variable

    return (...args: any[]) => { // Inner function
        if (timeoutId) {
            clearTimeout(timeoutId); // Clear the previous timeout
        }
        timeoutId = setTimeout(() => { // Set a new timeout
            callback(...args); // Call the callback with the arguments
        }, delay);
    };
};
