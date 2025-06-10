import React from 'react';
import Header from '../components/Header';
import styles from './Work.module.scss';
import profileImg from '../assets/jax-engel.png';

const Home: React.FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className={styles['banner-wrapper']}>
                <div className={styles.banner}>
                    <div className={styles['image-wrapper']}>
                        <img className={styles.image} src={profileImg} alt="Jax Engel" />
                        <span className={styles.bubble} role="img" aria-label="Waving hand">👋</span>
                    </div>                    <div className={styles.text}>
                        <h1>Hello, I'm Jax!</h1>
                        <p>
                            I design product experiences that are{' '}
                            <span className={styles.underline}>accessible</span>, scalable, and built on{' '}
                            <span className={styles.underline}>systems-level thinking</span>.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles['work-intro-wrapper']}>
                <div className="dots-row">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} className="dot" />
                    ))}
                </div>
                <h2 className={styles.heading}>
                    Here are a few product challenges I've helped solve
                </h2>
            </div>
            <main>
                Sample content
            </main>
        </div>
    );
};

export default Home;