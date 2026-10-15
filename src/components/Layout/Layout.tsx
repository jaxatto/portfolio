import React from 'react';
import clsx from 'clsx';
import Meta, { MetaProps } from '@components/Meta';
import Header from '@components/Header';
import Footer, { FooterVariant } from '@components/Footer';
import styles from './Layout.module.css';

// Layout component that wraps the main content of the application
// It includes a header, footer, and meta tags for SEO
// NOTE: Header and Footer are full width (their decorations bleed to the viewport edge);
// only <main> is constrained to the site width.

type LayoutProps = {
  children: React.ReactNode; // Children elements to be rendered inside the layout
  showFooter?: boolean; // Flag to show or hide the footer
  footerVariant?: FooterVariant; // 'quiet' on Home, 'accent' elsewhere (D-024)
  className?: string; // Applies styles to main content
  legacy?: boolean; // Old SCSS pages: opts in to the global legacy link and dark-mode rules (default). Home sets false.
} & MetaProps; // Extends MetaProps to include title and metaDescription for SEO

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  metaDescription,
  showFooter = true,
  footerVariant,
  className = '',
  legacy = true,
}) => (
  <div className={legacy ? 'legacy' : undefined}>
    <Meta title={title} metaDescription={metaDescription} />
    <Header />
    <main id='main-content' className={clsx(styles.main, className)} tabIndex={-1}>
      {children}
    </main>
    {showFooter && <Footer variant={footerVariant} />}
  </div>
);

export default Layout;
