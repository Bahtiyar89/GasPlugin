import utility from '../../utils/Utility';
import { CLEAR_ERRORS } from '../types';
import {
  PRODUCT_SAVED,
  HIDE_MODAL,
  LOADING,
  BALANCE_CHECK,
} from './GoodsState';

export default (state, action) => {
  switch (action.type) {
    case PRODUCT_SAVED:
      const { FormData, arr, data: newProduct } = action.payload;
      console.log('FormData 1', FormData);
      console.log('arr 33', arr);
      console.log('data: ', newProduct);
      const product = {
        city_From: FormData[0].valString,
        city_To: FormData[1].valString,
        sender_DocID: FormData[8].valString,
        sender_INN: FormData[9].valString,
        sender_EMail: FormData[6].valString,
        sender_Addr: FormData[10].valString,
        recip_FIO: FormData[11].valString,
        recip_Tel: FormData[13].valString,
        recip_DocID: FormData[14].valString,
        recip_INN: FormData[15].valString,
        recip_EMail: FormData[12].valString,
        recip_Addr: FormData[16].valString,
        Price: FormData[4].valString,
        transactionId: newProduct.transactionId,
      };
      let newType1 = Object.assign([], arr);
      newType1.push(product);
      utility.setItemObject('calculator', newType1);
      return { ...state, modalSaveGood: true };
    case LOADING:
      return { ...state, loading: action.payload };
    case HIDE_MODAL:
      return { ...state, modalSaveGood: action.payload };
    case BALANCE_CHECK:
      console.log('balance red', action.payload);
      return { ...state, userBalance: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
