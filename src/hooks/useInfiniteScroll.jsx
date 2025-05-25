import { useEffect, useRef } from 'react';

const useInfiniteScroll = (fetchData, moreItems, loading) => {
    const viewRef = useRef(null);
    const lastElementRef = useRef(null);

    useEffect(() => {
        if (loading || !moreItems) return;

        if (viewRef.current) {
            viewRef.current.disconnect();
        }

        viewRef.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && moreItems) {
                    fetchData();
                }
            },
            {
                rootMargin: '100px',
                threshold: 0.1,
            }
        );

        const currentElement = lastElementRef.current;
        if(currentElement){
            viewRef.current.observe(currentElement)
        }
        return () =>{
            if(viewRef.current){
                viewRef.current.disconnect()
            }
        }
    }, [fetchData,moreItems,loading,lastElementRef]);
    return{lastElementRef};
};

export default useInfiniteScroll
