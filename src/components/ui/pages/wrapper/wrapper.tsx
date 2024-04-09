import { FC } from 'react';
import styles from '../common.module.css';

type WrapperUIProps = {
  title: string;
  component: JSX.Element;
};

export const WrapperUI: FC<WrapperUIProps> = ({ title, component }) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-large'>{title}</h3>
      {component}
    </div>
  </main>
);
