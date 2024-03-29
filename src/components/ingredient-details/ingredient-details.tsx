import { FC } from 'react';
import { useParams } from 'react-router';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/ingredients/slice';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const params = useParams();

  /** TODO: взять переменную из стора */
  const ingredientData = ingredients?.find((i) => i._id === params.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
