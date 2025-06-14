import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  metaDescription?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title, metaDescription }) => (
  <div className={styles.wrapper}>
    <Helmet>
      {title && <title>{title}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
    </Helmet>
    <Header />
    <main id='main-content'>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;