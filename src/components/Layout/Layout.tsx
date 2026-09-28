import React from 'react';
import Meta, { MetaProps } from '@components/Meta';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './Layout.module.scss';

// Layout component that wraps the main content of the application
// It includes a header, footer, and meta tags for SEO

type LayoutProps = {
  children: React.ReactNode; // Children elements to be rendered inside the layout
  showFooter?: boolean; // Flag to show or hide the footer
  className?: string; // Applies styles to main content
  narrow?: boolean; // Narrower content column (the Work page design)
} & MetaProps; // Extends MetaProps to include title and metaDescription for SEO

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  metaDescription,
  showFooter = true,
  className = '',
  narrow = false,
}) => (
  <div className={styles.page}>
    <span className={styles.decor} aria-hidden='true' />
    <div className={narrow ? `${styles.wrapper} ${styles.narrow}` : styles.wrapper}>
      <Meta title={title} metaDescription={metaDescription} />
      <Header />
      <main id='main-content' className={className} tabIndex={-1}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  </div>
);

export default Layout;
