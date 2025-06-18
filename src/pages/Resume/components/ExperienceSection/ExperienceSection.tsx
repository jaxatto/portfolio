import React from 'react';
import Role from '@pages/Resume/components/Role';
import { groupRoles, GroupedRole } from './helpers/groupRoles';
import { roles } from './data/roles';
import logos from './data/logos';
import styles from './ResumeSectionRole.module.scss';

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
                  <Role
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
              <Role
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