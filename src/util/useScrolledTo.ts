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
            
            const targets = document.querySelectorAll(queryString);
            targets.forEach(t => observer.observe(t))

			return () => {
				observer.disconnect();
			};
		}
    }, [queryString, callback, thold]);
}