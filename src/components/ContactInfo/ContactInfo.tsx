import React from 'react';
import styles from './ContactInfo.module.scss';

const details = [
  {
    label: 'Location',
    value: 'Fort Worth, TX · Remote',
  },
  {
    label: 'Email',
    value: 'hello@jaxengeldesign.com',
    href: 'mailto:hello@jaxengeldesign.com',
  },
  {
    label: 'Phone',
    value: '512-948-6910',
    href: 'tel:5129486910',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jaxengel',
    href: 'https://linkedin.com/in/jaxengel',
  },
  {
    label: 'Portfolio',
    value: 'jaxengeldesign.com',
    href: 'https://jaxengeldesign.com',
  },
];

const ContactInfo: React.FC = () => (
  <ul>
    {details.map((item) => (
      <li key={item.label}>
        {item.href ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            {item.value}
          </a>
        ) : (
          item.value
        )}
      </li>
    ))}
  </ul>
);

export default ContactInfo;