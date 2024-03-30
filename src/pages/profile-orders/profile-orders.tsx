import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectMyOrders } from '../../services/my-orders/slice';
import { getMyOrders } from '../../services/my-orders/action';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);
  const orders: TOrder[] = useSelector(selectMyOrders);

  return <ProfileOrdersUI orders={orders} />;
};
