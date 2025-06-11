import React from 'react';
import styles from './Footer.module.scss';
import Icon from './Icon';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className={styles['footer-wrapper']}>
                <div className={styles.text}>
                    <h2 className="heading-large">Let's work together</h2>
                    <p className="body-large">I'm exploring staff-level roles on teams solving complex product challenges.</p>
                </div>
                <div className={styles['footer-links']}>
                    <div className={styles['link-wrapper']}>
                        <a href="mailto:hello@jaxengeldesign.com">hello@jaxengeldesign.com</a>
                        <Icon name="arrow-top-right" />
                    </div>
                    <div className={styles['link-wrapper']}>
                        <a href="">LinkedIn</a>
                        <Icon name="arrow-top-right" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;