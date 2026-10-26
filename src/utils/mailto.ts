import type React from 'react';

const localHosts = ['localhost', '127.0.0.1', '[::1]'];

const isLocalhost = () =>
  localHosts.includes(window.location.hostname) || window.location.hostname.endsWith('.localhost');

// A mailto link opens the mail client on every click, which gets in the way while the site runs
// locally. On localhost the click does nothing and the address goes to the console instead.
export const blockMailtoOnLocalhost = (href?: string) => (event: React.MouseEvent) => {
  if (href?.startsWith('mailto:') && isLocalhost()) {
    event.preventDefault();
    console.info(`Mail link blocked on localhost: ${href}`);
  }
};
