import React from 'react';
import Link from '@components/Link';
import DotsRow from '@components/Divider';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer>
            <DotsRow count={6} />

            <div className={styles['footer-wrapper']}>
                <div className={styles.text}>
                    <h2 className={styles.title}>Let's work together</h2>
                    <p className={styles.description}>I'm exploring staff-level roles on teams solving product problems at scale.</p>
                </div>
                <div className={styles['footer-links']}>
                    <Link
                        href='mailto:hello@jaxengeldesign.com'
                        iconName='arrow-top-right'
                    >
                        <span className="sr-only">Email me at</span>hello@jaxengeldesign.com <span className='sr-only'>(opens email client)</span>
                    </Link>
                    <Link
                        href='https://www.linkedin.com/in/jaxengel/'
                        newTab
                        iconName='arrow-top-right'
                    >
                        <span className="sr-only">Connect with me on</span>LinkedIn <span className='sr-only'>(opens in a new tab)</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;