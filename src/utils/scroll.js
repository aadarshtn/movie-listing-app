import { useEffect } from 'react';

// Helper function to handle scroll and pagination
const useInfiniteScroll = ({ rootAppRef, currentPageRef, loadMore, threshold = 0.2 }) => {
    const { current: viewPortElement } = rootAppRef;
    const { current: pageElement } = currentPageRef;
    useEffect(() => {
        if (!viewPortElement || !pageElement) return;
        // Function to handle scroll events
        const handleScroll = () => {
            const scrollTop = viewPortElement.scrollY || viewPortElement.scrollTop;
            const windowHeight = viewPortElement.innerHeight || viewPortElement.clientHeight;
            const documentHeight = pageElement.innerHeight || pageElement.clientHeight;

            // Check if the user has scrolled past the threshold
            if (scrollTop + windowHeight >= documentHeight * threshold) {
                loadMore();
            }
        };

        // Debounce function to limit the rate of function calls
        const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };

        // Attach the scroll event listener with debounce
        const debouncedHandleScroll = debounce(handleScroll, 50);
        viewPortElement.addEventListener('scroll', debouncedHandleScroll);

        // Cleanup event listener on component unmount
        return () => {
            viewPortElement.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, [loadMore, threshold]);
};

export { useInfiniteScroll };