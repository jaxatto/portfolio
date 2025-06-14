import React from 'react';
import Meta, { MetaProps } from '@components/Meta';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
} & MetaProps;

const Layout: React.FC<LayoutProps> = ({ children, title, metaDescription }) => (
  <div className={styles.wrapper}>
    <Meta title={title} metaDescription={metaDescription} />
    <Header />
    <main id='main-content'>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;