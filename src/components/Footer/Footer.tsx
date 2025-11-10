import React from 'react';
import Link from '@components/Link';
import Divider from '@components/Divider';
import { content } from './resources/content';
import styles from './Footer.module.scss';

// Page level footer component

const Footer: React.FC = () => {
    return (
        <footer>
            <Divider />

            <div className={styles['footer-wrapper']}>
                <div className={styles.text}>
                    <h2 className={styles.title}>{content.title}</h2>
                    <p className={styles.description}>{content.description}</p>
                </div>
                <div className={styles['footer-links']}>
                    {/* <Link
                        href={content.email.src}
                        iconName='arrow-top-right'
                    >
                        <span className="sr-only">{content.email.preText}</span>{content.email.label} <span className='sr-only'>{content.email.srOnly}</span>
                    </Link> */}
                    <Link
                        href={content.linkedin.src}
                        newTab
                        iconName='arrow-top-right'
                    >
                        {content.linkedin.preText} {content.linkedin.label} <span className='sr-only'>{content.linkedin.srOnly}</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;