import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// A client-side route change does not reload the page, so a screen reader announces nothing and keyboard
// focus stays on the link that was clicked, now gone. After a navigation, focus moves to the new page's h1,
// which a screen reader reads out as the page's name (D-126). The first load is skipped so the skip link
// stays the first Tab stop, and so is a #hash link, which keeps its anchor.
const FocusOnRouteChange: React.FC = () => {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (hash) return;
    const heading = document.querySelector<HTMLElement>('main h1');
    if (!heading) return;
    // tabindex -1 makes a heading focusable from script only. It draws no ring (see main.css).
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
};

export default FocusOnRouteChange;
