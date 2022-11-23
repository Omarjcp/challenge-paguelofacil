/* eslint-disable prettier/prettier */
import {
  TRANSACTIONS_GET_LIST,
  TRANSACTIONS_GET_LIST_SUCCESS,
  TRANSACTIONS_GET_LIST_ERROR,
} from '../constants';

const INIT_STATE = {
  transfersPerPage: null,
  allTransfer: null,
  totalTransfer: 0,
  loading: true,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TRANSACTIONS_GET_LIST:
      return { ...state, loading: true };

    case TRANSACTIONS_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        allTransfer: action.payload.data,
        transfersPerPage: action.payload.data.slice(
          action.payload.offset,
          action.payload.limit
        ),
        totalTransfer: action.payload.data.length,
      };

    case TRANSACTIONS_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
