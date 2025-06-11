import React from 'react';
import styles from './Footer.module.scss';
import Link from './Link';
import DotsRow from './DotsRow';

const Footer: React.FC = () => {
    return (
        <footer>
            <DotsRow count={6} />

            <div className={styles['footer-wrapper']}>
                <div className={styles.text}>
                    <h2 className='heading-large'>Let's work together</h2>
                    <p className='body-large'>I'm exploring staff-level roles on teams solving complex product challenges.</p>
                </div>
                <div className={styles['footer-links']}>
                    <Link
                        href='mailto:hello@jaxengeldesign.com'
                        iconName='arrow-top-right'
                    >
                        hello@jaxengeldesign.com
                    </Link>
                    <Link
                        href='https://www.linkedin.com/in/jaxengel/'
                        newTab
                        iconName='arrow-top-right'
                    >
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;