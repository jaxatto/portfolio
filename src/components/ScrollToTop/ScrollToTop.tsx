import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// React Router keeps the scroll position when the route changes, so a link in the page footer (the
// "More of my work" cards) would open the next study at the bottom. A new page opens at the top
// (D-115). Back and forward (POP) keep whatever the browser restores, and a #hash link keeps its anchor.
const ScrollToTop: React.FC = () => {
	const { pathname, hash } = useLocation();
	const navigationType = useNavigationType();

	useEffect(() => {
		if (navigationType === 'POP' || hash) return;
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
	}, [pathname, hash, navigationType]);

	return null;
};

export default ScrollToTop;
