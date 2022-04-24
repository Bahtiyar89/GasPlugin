import utility from '../../utils/Utility';
import { CommonActions } from '@react-navigation/native';
import { CLEAR_ERRORS } from '../types';
import {
  F4_POST_SUCC_BALANCE,
  LOGOUT,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FALSE_REDIRECT,
  VARIFY_OK,
  LOADING,
  CHECKOUT_ORDER,
  GET_CHECKOUT_ORDER,
  BALANCE_0,
  CLOSE_MODAL_BALANCE,
  REGISTER_SUCCESS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case GET_CHECKOUT_ORDER:
      let aa = utility.getItemObject('calculator');
      console.log('aa: ', aa);
      return {
        ...state,
        calculateArray: utility.getItemObject('calculator'),
      };
    case CHECKOUT_ORDER:
      console.log('reducer 33: ', action.payload);
      console.log('state 33: ', state);
      return {
        ...state,
        calculateArray: [...state.calculateArray, action.payload],
      };
    case VARIFY_OK:
      console.log('adddd', CommonActions.navigate({ name: 'Login' }));
      CommonActions.navigate({ name: 'Login' });
      return {
        ...state,
      };
    case F4_POST_SUCC_BALANCE:
      console.log('reducerrr: ', action.payload);
      let { data: balance, file } = action.payload;
      console.log('balance 3: ', balance);

      utility.setItemObject('user', {
        fio: 'bahMah',
        email: 'b@mail.ru',
        password: '123',
        phone_number: '123343',
        username: 'bbb',
      });
      return {
        ...state,
        user: {
          fio: 'bahMah',
          email: 'b@mail.ru',
          password: '123',
          phone_number: '123343',
          username: 'bbb',
        },
        file,
        isSigned: true,
        loading: false,
      };
    case BALANCE_0:
      return {
        ...state,
        modalBalanceErr: true,
        loading: false,
      };
    case CLOSE_MODAL_BALANCE:
      return { ...state, modalBalanceErr: false };
    case REGISTER_SUCCESS:
      const { file: files, navigation } = action.payload;
      console.log('fileeee: ', files);
      utility.setItemObject('wkeys', files);
      navigation.goBack();
      return {
        ...state,
        isSigned: true,
        loading: false,
        user: {
          fio: 'bahMah',
          email: 'b@mail.ru',
          password: '123',
          phone_number: '123343',
          username: 'bbb',
        },
      };

    case LOGIN_SUCCESS:
      console.log('action.payload', action.payload);
      utility.setItemObject('user', action.payload);
      //  utility.setItem('token', action.payload.token);
      return {
        ...state,
        isSigned: true,
        loading: false,
        user: action.payload,
      };
    case FALSE_REDIRECT:
      return {
        ...state,
        redirectToReferrer: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      // localStorage.removeItem('token');
      return {
        ...state,
        balance,
        user: {
          fio: 'bahMah',
          email: 'b@mail.ru',
          password: '123',
          phone_number: '123343',
          username: 'bbb',
        },
        isSigned: true,
        loading: false,
      };
    case LOGOUT:
      utility.removeItem('token');
      utility.removeItem('user');
      utility.removeItem('wkeys');
      console.log('LOGOUT : ');
      return {
        ...state,
        isSigned: false,
        loading: false,
        user: null,
        error: [],
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
