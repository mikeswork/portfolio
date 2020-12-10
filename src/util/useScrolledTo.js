import { useEffect } from 'react';

export default function useScrolledTo(queryString, callback, thold = 0) {
	useEffect(() => {
		// console.log("[useEffect]")
		if (
			"IntersectionObserver" in window &&
			"IntersectionObserverEntry" in window &&
			"intersectionRatio" in window.IntersectionObserverEntry.prototype
		) {
			let observer = new IntersectionObserver((entries) => {
                callback(entries[0].isIntersecting);
			}, {threshold: thold});
            
            const target = document.querySelector(queryString);
			if (target) observer.observe(target);

			return () => {
				observer.unobserve(target);
			};
		}
    }, [queryString, callback, thold]);
}