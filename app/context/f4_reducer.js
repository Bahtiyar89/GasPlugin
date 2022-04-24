import { CommonActions } from '@react-navigation/native';
import { LOADING, F4_POST_SUCC_BALANCE, F4_POST_BALANCE } from './types';

export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case F4_POST_SUCC_BALANCE:
      let { balance, tokens } = action.payload;
      return { ...state, balance, tokens };
    default:
      return state;
  }
};
