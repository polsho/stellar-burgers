import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/ingredients/slice';
import { useLocation, useParams } from 'react-router-dom';
import { selectOrders } from '../../services/feed/slice';
import { selectMyOrders } from '../../services/my-orders/slice';

export const OrderInfo: FC = () => {
  const params = useParams();
  const location = useLocation();
  const from = location.state;
  const orders = /^\/profile/.test(location.pathname)
    ? useSelector(selectMyOrders)
    : useSelector(selectOrders);
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = orders?.find((o) => o.number.toString() === params.number);

  const ingredients = useSelector(selectIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients?.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
