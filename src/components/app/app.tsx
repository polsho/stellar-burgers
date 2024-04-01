import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useDispatch } from '../../services/store';

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute
} from '@components';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { checkUserAuth } from '../../services/auth/actions';
import { WrapperUI } from '../ui/pages/wrapper/wrapper';
import { getMyOrders } from '../../services/my-orders/action';
import { getFeed } from '../../services/feed/action';

export const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
    dispatch(getMyOrders());
    dispatch(getFeed());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth component={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/ingredients/:id'
          element={
            <WrapperUI
              title='Детали ингредиента'
              component={<IngredientDetails />}
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute
              component={<WrapperUI title='' component={<OrderInfo />} />}
            />
          }
        />
        <Route
          path='/feed/:number'
          element={
            <ProtectedRoute
              onlyUnAuth
              component={<WrapperUI title='' component={<OrderInfo />} />}
            />
          }
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title=''
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title=''
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
