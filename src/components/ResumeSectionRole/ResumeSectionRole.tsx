import React from 'react';
import styles from './ResumeSectionRole.module.scss';
import { roles } from './roles';
import logos from './logos';
import ResumeRole from '@components/ResumeRole';
import { groupRoles, GroupedRole } from './groupRoles';

const groupedRoles: GroupedRole[] = groupRoles(roles);

const ResumeSectionRole: React.FC = () => (
  <section className={styles.section}>
    <h2 className={styles.heading}>Experience</h2>
    <div className={styles.rolesColumn}>
      {groupedRoles.map((item, idx) =>
        Array.isArray(item) ? (
          <div className={styles.visaGroup} key={`visa-group-${idx}`}>
            {item.map((role, visaIdx) => {
              const LogoComponent = logos[role.logo as string];
              return (
                <div key={`${role.company}-${role.title}-${role.startDate}-${visaIdx}`} className={styles.visaRole}>
                  <ResumeRole
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
              <ResumeRole
                key={item.company + item.title}
                {...item}
                logo={LogoComponent ? <LogoComponent /> : null}
              />
            );
          })()
        )
      )}
    </div>
  </section>
);

export default ResumeSectionRole;