import { useState, useEffect } from 'react';

export default function useScrolledTo(targetId, threshold = 0.5) {
    const [scrolledToTarget, setScrolledToTarget] = useState(false);

	useEffect(() => {
		// console.log("[useEffect]")
		if (
			"IntersectionObserver" in window &&
			"IntersectionObserverEntry" in window &&
			"intersectionRatio" in window.IntersectionObserverEntry.prototype
		) {
			let observer = new IntersectionObserver((entries) => {
				setScrolledToTarget(entries[0].isIntersecting);
			}, {threshold: threshold});
            
            const target = document.querySelector(`#${targetId}`);
			if (target) observer.observe(target);

			return () => {
				observer.disconnect();
			};
		}
    });
    
    return scrolledToTarget;
}