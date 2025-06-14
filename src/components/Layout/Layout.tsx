import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './Layout.module.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.wrapper}>
    <Header />
    <main id='main-content'>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;