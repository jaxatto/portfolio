import React from 'react';
import { groupRoles, GroupedRole } from './helpers/groupRoles';
import styles from './ExperienceSection.module.css';
import ExperienceCard from '#pages/Resume/components/ExperienceCard';

import { ExperienceCardProps } from '#pages/Resume/components/ExperienceCard';
import ActBlueLogo from '@/assets/logos/actblue-logo.svg';
import AlbertsonsLogo from '@/assets/logos/albertsons-logo.svg';
import FireHydrantLogo from '@/assets/logos/firehydrant-logo.svg';
import IndeedLogo from '@/assets/logos/indeed-logo.svg';
import RoutableLogo from '@/assets/logos/routable-logo.svg';
import ServiceNowLogo from '@/assets/logos/servicenow-logo.svg';
import VisaLogo from '@/assets/logos/visa-logo.svg';
import ToyotaLogo from '@/assets/logos/toyota-logo.svg';

const logos: Record<
	string,
	React.FC<React.SVGProps<SVGSVGElement>> | undefined
> = {
	actblue: ActBlueLogo,
	albertsons: AlbertsonsLogo,
	firehydrant: FireHydrantLogo,
	indeed: IndeedLogo,
	routable: RoutableLogo,
	servicenow: ServiceNowLogo,
	toyota: ToyotaLogo,
	visa: VisaLogo,
};

const roles: ExperienceCardProps[] = [
	{
		title: 'UX Design Engineer',
		company: 'Toyota North America',
		startDate: '2025',
		endDate: 'Present',
		location: 'Hybrid - Plano, TX',
		callout: '',
		theme: '',
		logo: 'toyota',
	},
	{
		title: 'Staff UI/UX Designer',
		company: 'ServiceNow',
		startDate: '2024',
		endDate: '2025',
		location: 'Remote',
		callout:
			'Shaping internal platforms and AI tooling to support workflows for sales, comms, and IT.',
		theme: 'primary',
		logo: 'servicenow',
	},
	{
		title: 'Senior Product Designer',
		company: 'Albertsons',
		startDate: '2023',
		endDate: '',
		location: 'Remote',
		callout: '',
		theme: '',
		logo: 'albertsons',
	},
	{
		title: 'Senior Product Designer',
		company: 'ActBlue',
		startDate: '2022',
		endDate: '2023',
		location: 'Remote',
		callout:
			'Connected big tools to little tools. Reduced total support costs by $1.5M annually.',
		theme: 'secondary',
		logo: 'actblue',
	},
	{
		title: 'Senior Product Designer',
		company: 'Routable',
		startDate: '2023',
		endDate: '',
		location: 'Remote',
		callout: '',
		theme: '',
		logo: 'routable',
	},
	{
		title: 'Senior Product Designer',
		company: 'FireHydrant',
		startDate: '2020',
		endDate: '2021',
		location: 'Remote',
		callout: '',
		logo: 'firehydrant',
	},
	{
		title: 'UX Designer',
		company: 'Indeed',
		startDate: '2020',
		endDate: '',
		location: 'Remote',
		callout: '',
		logo: 'indeed',
	},
	{
		title: 'Senior UX Engineer',
		company: 'Visa',
		startDate: '2017',
		endDate: '2020',
		location: 'Austin, TX',
		callout:
			'Reinvented enterprise omnichannel software for fraud, analytics, and transaction tokenization.',
		logo: 'visa',
	},
	{
		title: 'UX Engineer',
		company: 'Visa',
		startDate: '2015',
		endDate: '2017',
		location: 'Austin, TX',
		callout:
			'Crafted, built, and implemented a new framework library serving hundreds of developers globally.',
		logo: 'visa',
	},
];

const groupedRoles: GroupedRole[] = groupRoles(roles);

const ExperienceSection: React.FC = () => (
	<section className={styles.wrapper}>
		<div className={styles.content}>
			{groupedRoles.map((item, idx) =>
				Array.isArray(item) ? (
					<div
						className={`${styles['visa-group']} tertiary-experience-card experience-card-group`}
						key={`visa-group-${idx}`}
					>
						{item.map((role, visaIdx) => {
							const LogoComponent = logos[role.logo as string];
							return (
								<div
									key={`${role.company}-${role.title}-${role.startDate}-${visaIdx}`}
									className={styles.visaRole}
								>
									<ExperienceCard
										{...role}
										logo={LogoComponent ? <LogoComponent /> : null}
									/>
								</div>
							);
						})}
					</div>
				) : (
					(() => {
						const LogoComponent = logos[item.logo as string];
						return (
							<ExperienceCard
								key={item.company + item.title}
								{...item}
								className={styles.card}
								logo={LogoComponent ? <LogoComponent /> : null}
							/>
						);
					})()
				),
			)}
		</div>
	</section>
);

export default ExperienceSection;
