import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
    return (
        <div>
            <Header
                title="My Portfolio"
                links={[
                    { name: 'Projects', url: '#projects' },
                    { name: 'Skills', url: '#skills' },
                    { name: 'Contact', url: '#contact' }
                ]}
            />
            <section id="projects">
                <h2>Projects</h2>
                {/* Add project details here */}
            </section>
            <section id="skills">
                <h2>Skills</h2>
                {/* Add skills details here */}
            </section>
            <section id="contact">
                <h2>Contact</h2>
                {/* Add contact information here */}
            </section>
        </div>
    );
};

export default Home;