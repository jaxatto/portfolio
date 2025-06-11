// src/components/Layout.tsx
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="wrapper">
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;