import React, { useReducer } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { CommonActions } from '@react-navigation/native';

import F4Context from './f4_context';
import F4Reducer from './f4_reducer';
import { doGet, doPost } from '../utils/apiActions';
import {
  LOADING,
  F4_POST_SUCC_BALANCE,
  F4_POST_BALANCE, 
} from './types';

const F4State = props => {
  const toast = useToast();

  const initialState = {
    loading: false,
    modalBalanceErr: false,
    balance: '',
    tokens: [], 
    error: [],
  };
  const [state, dispatch] = useReducer(F4Reducer, initialState);

  const postFileBalanceToCheck = async (navigation, file) => {
    dispatch({ type: LOADING, payload: true });
    doPost('api/Monitor/GetBalance/', {
      PublicKey: 'DjUaijUD1tavJyryfhngbvrJpgEdHjihtfK95yhteNWN',
      networkAlias: 'MainNet',
    })
      .then(({ data }) => {
        console.log("data: ",data);
        dispatch({ type: LOADING, payload: false });
        if (data.success) {
          if (data.balance >= 0.1) {
            navigation.goBack(CommonActions.goBack())
            dispatch({
              type: F4_POST_SUCC_BALANCE,
              payload: data,
            }); 
          } else {
            dispatch({ type: LOADING, payload: false });
          }
        }
      })
      .catch(error => {
        dispatch({ type: LOADING, payload: false });
        toast.show(error.message, {
          type: 'warning',
          duration: 3000,
          animationType: 'zoom-in',
        });
      }); 
  };
 
  return (
    <F4Context.Provider
      value={{
        loading: state.loading, 
        modalBalanceErr: state.modalBalanceErr,
        balance: state.balance,
        tokens: state.tokens, 
        error: state.error,
        postFileBalanceToCheck, 
      }}>
      {props.children}
    </F4Context.Provider>
  );
};

export default F4State;
