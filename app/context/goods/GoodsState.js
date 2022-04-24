import React, { useReducer } from 'react';
import { useToast } from 'react-native-toast-notifications';
import basex from 'bs58-rn';
import Buffer from 'buffer';
import Sodium from 'react-native-sodium';
import Base64 from 'base64-js';

import utility from '../../utils/Utility';
import GoodsContext from './GoodsContext';
import GoodsReducer from './GoodsReducer';
import { doPost, doGetByBody } from '../../utils/apiActions';

export const LOADING = 'LOADING';
export const HIDE_MODAL = 'HIDE_MODAL';
export const PRODUCT_SAVED = 'PRODUCT_SAVED';
export const BALANCE_CHECK = 'BALANCE_CHECK';

const GoodsState = props => {
  const toast = useToast();
  const initialState = {
    userBalance: {},
    loading: false,
    modalSaveGood: false,
    error: [],
  };
  const [state, dispatch] = useReducer(GoodsReducer, initialState);

  const transactionExecute = async (
    FormData,
    transactionPackagedStr,
    file,
    arr,
  ) => {
    console.log('transactionPackagedStr', transactionPackagedStr);
    console.log('file exx', file);
    const ALPHABET =
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const base58 = basex(ALPHABET);

    let decodedFoBase58 = base58.decode(file?.sk);
    const decryptedMessageFromByteArray = Base64.fromByteArray(decodedFoBase58);
    console.log('dec', decryptedMessageFromByteArray);

    let decoded = base58.decode(transactionPackagedStr);
    const decrypted = Base64.fromByteArray(decoded);
    console.log('dec 333', decrypted);

    let dt = await Sodium.crypto_sign_detached(
      decrypted,
      decryptedMessageFromByteArray,
    );
    console.log('dt 333: ', dt);

    let signature = base58.encode(Buffer.Buffer.from(dt, 'base64'));
    console.log('signature:: ', signature);
    doPost('api/transaction/Execute', {
      authKey: '',
      NetworkAlias: 'MainNet',
      MethodApi: 'SmartMethodExecute',
      PublicKey: file.pk,
      TokenPublicKey: '35soygBAV35AvoJUBhGe9YjCygCBPai3FL6ZPRtKkaZD',
      TokenMethod: 'SetNewPost',
      TransactionSignature: signature,
      notSaveNewState: 0,
      Fee: 0.1,
      contractParams: FormData,
    })
      .then(({ data }) => {
        console.log('data resp execute: ', data);
        dispatch({ type: LOADING, payload: false });
        if (data.success) {
          dispatch({
            type: PRODUCT_SAVED,
            payload: { FormData, arr, data },
          });
        } else {
          dispatch({ type: LOADING, payload: false });
          toast.show(data.message, {
            type: 'warning',
            duration: 3000,
            animationType: 'zoom-in',
          });
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

  //Post a Good
  const postAGood = async (FormData, file, arr) => {
    console.log('FormData', FormData);
    console.log('file 1', file.pk);
    const contract = {
      authKey: '',
      NetworkAlias: 'MainNet',
      MethodApi: 'SmartMethodExecute',
      PublicKey: file.pk,
      TokenPublicKey: '35soygBAV35AvoJUBhGe9YjCygCBPai3FL6ZPRtKkaZD',
      TokenMethod: 'SetNewPost',
      notSaveNewState: 0,
      Fee: 0.1,
      contractParams: FormData,
    };
    console.log('contract: ', contract);
    dispatch({ type: LOADING, payload: true });
    doPost('api/transaction/pack', contract)
      .then(({ data }) => {
        console.log('data:Pack ', data);
        if (data.success) {
          transactionExecute(
            FormData,
            data.dataResponse.transactionPackagedStr,
            file,
            arr,
          );
        } else {
          dispatch({ type: LOADING, payload: false });
          toast.show(data.message, {
            type: 'warning',
            duration: 3000,
            animationType: 'zoom-in',
          });
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

  const postBalanceToCheck = async file => {
    dispatch({ type: LOADING, payload: true });
    doPost('api/Monitor/GetBalance/', {
      PublicKey: file?.pk,
      networkAlias: 'MainNet',
    })
      .then(({ data }) => {
        console.log('data: 2', data);
        dispatch({ type: LOADING, payload: false });
        if (data.success) {
          if (data.balance >= 0.1) {
            console.log('moree www', data);
            dispatch({
              type: BALANCE_CHECK,
              payload: data,
            });
          } else if (data != 0 && data.balance < 0.5) {
            toast.show(
              'Ваш баланс скоро закончиться. Пополните пожалуйста свой баланс!',
              {
                type: 'warning',
                duration: 3000,
                animationType: 'zoom-in',
              },
            );
          } else if (data.balance === 0) {
            dispatch({
              type: BALANCE_CHECK,
              payload: data,
            });
            console.log('data.balance === 0', data.balance === 0);
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

  const modalSaveGoodHide = hideModal => {
    dispatch({ type: HIDE_MODAL, payload: hideModal });
  };

  const balanceExecute = async (transactionPackagedStr, file) => {
    console.log('transactionPackagedStr', transactionPackagedStr);
    console.log('file exx', file);
    const ALPHABET =
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const base58 = basex(ALPHABET);

    let decodedFoBase58 = base58.decode(
      '43b7AeXY6zHDv8tK2PqZCbXH3CcvygEWxKQxzw6SEmX8u6xqCAHr5BbEekSwkpVJCw1CTAs38M2i5myox7tyU3SA',
    );
    const decryptedMessageFromByteArray = Base64.fromByteArray(decodedFoBase58);
    console.log('dec', decryptedMessageFromByteArray);

    let decoded = base58.decode(transactionPackagedStr);
    const decrypted = Base64.fromByteArray(decoded);
    console.log('dec 333', decrypted);

    let dt = await Sodium.crypto_sign_detached(
      decrypted,
      decryptedMessageFromByteArray,
    );
    console.log('dt 333: ', dt);

    let signature = base58.encode(Buffer.Buffer.from(dt, 'base64'));
    console.log('signature:: ', signature);
    doPost('api/transaction/Execute', {
      authKey: '',
      NetworkAlias: 'MainNet',
      MethodApi: 'TransferCs',
      PublicKey: 'DjUaijUD1tavJyryfhngbvrJpgEdHjihtfK95yhteNWN',
      ReceiverPublicKey: file.pk,
      Amount: 1,
      Fee: 0.2,
      UserData: '',
      TransactionSignature: signature,
    })
      .then(({ data }) => {
        console.log('daaattaaa:', data);
        dispatch({ type: LOADING, payload: false });
        if (data.success) {
          toast.show(`${1} Баланс добавлен усрешно`, {
            type: 'success',
            duration: 6000,
            animationType: 'zoom-in',
          });
        } else {
          toast.show(data.message, {
            type: 'warning',
            duration: 3000,
            animationType: 'zoom-in',
          });
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

  const addBalance = file => {
    dispatch({ type: LOADING, payload: true });
    doPost('api/transaction/pack', {
      PublicKey: 'DjUaijUD1tavJyryfhngbvrJpgEdHjihtfK95yhteNWN',
      ReceiverPublicKey: file.pk,
      networkAlias: 'MainNet',
      authKey: '',
      MethodApi: 'TransferCs',
      Amount: 1,
      Fee: 0.2,
      UserDat: '',
    })
      .then(({ data }) => {
        console.log('data:Pack ', data);
        if (data.success) {
          balanceExecute(data.dataResponse.transactionPackagedStr, file);
        } else {
          dispatch({ type: LOADING, payload: false });
          toast.show(data.message, {
            type: 'warning',
            duration: 3000,
            animationType: 'zoom-in',
          });
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
    <GoodsContext.Provider
      value={{
        error: state.error,
        modalSaveGood: state.modalSaveGood,
        loading: state.loading,
        userBalance: state.userBalance,
        postBalanceToCheck,
        postAGood,
        modalSaveGoodHide,
        addBalance,
      }}>
      {props.children}
    </GoodsContext.Provider>
  );
};

export default GoodsState;
