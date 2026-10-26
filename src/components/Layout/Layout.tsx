import React from 'react';
import clsx from 'clsx';
import Meta, { MetaProps } from '#components/Meta';
import Header from '#components/Header';
import Footer from '#components/Footer';
import BackToTop from '#components/BackToTop';
import styles from './Layout.module.css';

// NOTE: Header and Footer are full width (their decorations bleed to the viewport edge);
// only <main> is constrained to the site width.

type LayoutProps = {
  children: React.ReactNode; // Children elements to be rendered inside the layout
  showFooter?: boolean; // Flag to show or hide the footer
  footerBand?: boolean; // Dark-mode band behind the footer (default on); Home turns it off (D-049)
  className?: string; // Applies styles to main content
  backToTop?: boolean; // Floating "Back to top" button for long pages (D-096)
  headerLabel?: string[]; // Lines of text in the nav's left slot instead of the brand link (D-097, D-098)
} & MetaProps; // Extends MetaProps to include title and metaDescription for SEO

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  metaDescription,
  showFooter = true,
  footerBand,
  className = '',
  backToTop = false,
  headerLabel,
}) => (
  <div id="top" tabIndex={-1} className={styles.root}>
    <Meta title={title} metaDescription={metaDescription} />
    <Header label={headerLabel} />
    <main id="main-content" className={clsx(styles.main, className)} tabIndex={-1}>
      {children}
    </main>
    {backToTop && <BackToTop />}
    {showFooter && <Footer band={footerBand} />}
  </div>
);

export default Layout;
