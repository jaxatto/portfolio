import React from 'react';
import Divider from '@components/Divider';
import { groupRoles, GroupedRole } from './helpers/groupRoles';
import { roles } from './resources/roles';
import logos from './resources/logos';
import styles from './ExperienceSection.module.scss';
import ExperienceCard from '@pages/Resume/components/ExperienceCard';

const groupedRoles: GroupedRole[] = groupRoles(roles);

const ExperienceSection: React.FC = () => (
  <section className={styles.wrapper}>
    <Divider variant='section-header' text='Experience' contentAlign="left" />
    <div className={styles.content}>
      {groupedRoles.map((item, idx) =>
        Array.isArray(item) ? (
          <div className={`${styles['visa-group']} tertiary-experience-card experience-card-group`} key={`visa-group-${idx}`}>
            {item.map((role, visaIdx) => {
              const LogoComponent = logos[role.logo as string];
              return (
                <div key={`${role.company}-${role.title}-${role.startDate}-${visaIdx}`} className={styles.visaRole}>
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
        )
      )}
    </div>
  </section>
);

export default ExperienceSection;