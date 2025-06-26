import React from 'react';
import Card from '@components/Card';
import { content } from './resources/content';
import styles from './CardGrid.module.scss';

type CardGridProps = {
  samples?: typeof content;
};

const CardGrid: React.FC<CardGridProps> = ({ samples }) => {
  const data = samples || content;
  return (
    <div className={styles['card-grid']}>
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

export default CardGrid;