import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrders, selectTotal } from '../../services/feed/slice';
import { getFeed } from '../../services/feed/action';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getFeed());
  }, [orders]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
