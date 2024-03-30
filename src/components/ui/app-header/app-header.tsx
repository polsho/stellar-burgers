import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

// const linkClassName = clsx({
//   link: true,
//   link_active: location.pathname === '/' ? true : false
// });

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              <Link
                to={'/'}
                className={clsx(styles.link, {
                  [styles.link_active]: /(^\/$)|(^\/ingredients)/.test(
                    location.pathname
                  )
                    ? true
                    : false
                })}
              >
                Конструктор
              </Link>
            </p>
          </>
          <>
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              <Link
                to={'/feed'}
                className={clsx(styles.link, {
                  [styles.link_active]: /^\/feed/.test(location.pathname)
                    ? true
                    : false
                })}
              >
                Лента заказов
              </Link>
            </p>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            <Link
              to={'/profile'}
              className={clsx(styles.link, {
                [styles.link_active]: /^\/profile/.test(location.pathname)
                  ? true
                  : false
              })}
            >
              {userName || 'Личный кабинет'}
            </Link>
          </p>
        </div>
      </nav>
    </header>
  );
};
