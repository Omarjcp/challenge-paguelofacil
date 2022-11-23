/* eslint-disable prettier/prettier */
import {
  TRANSACTIONS_GET_LIST,
  TRANSACTIONS_GET_LIST_ERROR,
  TRANSACTIONS_GET_LIST_SUCCESS,
} from 'redux/constants';

export const getTransaction = (offset, limit, orderby, search, filter) => ({
  type: TRANSACTIONS_GET_LIST,
  payload: { offset, limit, orderby, search, filter },
});

export const getTransactionSuccess = (items) => ({
  type: TRANSACTIONS_GET_LIST_SUCCESS,
  payload: items,
});

export const getTransactionError = (error) => ({
  type: TRANSACTIONS_GET_LIST_ERROR,
  payload: error,
});
