import { contactInfo } from '#data/constants/contactInfo';

export const content = {
	title: "Let's work together",
	description:
		'Looking for remote Staff Product Designer or Design Technologist roles.',
	email: {
		preText: 'Email me at',
		label: contactInfo.email.label,
		src: contactInfo.email.src,
		srOnly: '(opens email client)',
	},
	resume: {
		label: 'Resume',
		src: contactInfo.resume.src,
		ariaLabel: 'Resume (opens in a new tab)',
	},
	linkedin: {
		label: 'LinkedIn',
		src: contactInfo.linkedin.src,
		ariaLabel: 'LinkedIn (opens in a new tab)',
	},
	github: {
		label: 'GitHub',
		src: contactInfo.github.src,
		ariaLabel: 'GitHub (opens in a new tab)',
	},
};
