import { useEffect } from 'react';

// Helper function to handle scroll and pagination
const useInfiniteScroll = ({ rootAppRef, currentPageRef, loadMore, threshold = 0.1 }) => {
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

        viewPortElement.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            viewPortElement.removeEventListener('scroll', handleScroll);
        };
    }, [pageElement, viewPortElement, loadMore, threshold]);
};

export { useInfiniteScroll };