import {useEffect, useRef} from 'react';

type TimeoutHook = () => {
    set: (callback: () => void, delay: number) => void;
    clear: () => void;
};

const useTimeout: TimeoutHook = () => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    const set = (callback: () => void, delay: number) => {
        clear();
        timeoutRef.current = setTimeout(callback, delay);
    };

    const clear = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        return clear;
    }, []);

    return {set, clear};
};

export default useTimeout;
