import React from 'react';
import Card from '@pages/Work/components/Card';
import { content } from './resources/content';
import styles from './Grid.module.scss';

type GridProps = {
  samples?: typeof content;
};

const Grid: React.FC<GridProps> = ({ samples }) => {
  const data = samples || content;
  return (
    <div className={styles['work-grid']}>
      {data.map((props, i) => (
        <Card
          key={props.linkUrl}
          {...props}
          count={i + 1}
          total={data.length}
        />
      ))}
    </div>
  );
};

export default Grid;