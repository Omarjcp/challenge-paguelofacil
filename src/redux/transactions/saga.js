/* eslint-disable prettier/prettier */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  baseUrl,
  serviceTransactions,
  idMerchant,
  txType,
} from '../../constants/defaultValues';

import { TRANSACTIONS_GET_LIST } from '../constants';

import { getTransactionError, getTransactionSuccess } from './actions';

const getTransactionsRequest = async (orderby, search, filter) => {
  const dateFilter = `dateTms%24bt${filter.dateTms}T00%3A00%3A00%3A%3A${filter.todayDate}T23%3A59%3A59`;

  const conditionalSearch =
    search && `%7CcodOper%2Cemail%2CcardholderFullName%24lk%25${search}%25`;

  const conditionalCodOperation =
    filter.codOper && `%7CcodOper%24lk%25${filter.codOper}%25`;

  const conditionalStatus = filter.status && `%7Cstatus%24eq${filter.status}`;

  const conditionalEmail = filter.email && `%7Cemail%24lk%25${filter.email}%25`;

  const amountMinOrMax = filter.amountMin || filter.amountMax;

  const conditionalAmount =
    amountMinOrMax &&
    `%7Camount%24bt${filter.amountMin || 0}%3A%3A${
      filter.amountMax || Infinity
    }`;

  const conditionalCardType =
    filter.cardType && `%7CcardType%24eq${filter.cardType}`;

  const response = await axios.get(
    `${
      baseUrl + serviceTransactions
    }?conditional=${`${dateFilter}${conditionalCodOperation}${conditionalStatus}${conditionalEmail}${conditionalAmount}${conditionalCardType}${conditionalSearch}`}%7CidMerchant%24eq${idMerchant}%7CtxType%24ne${txType}`,
    {
      params: {
        sort: orderby,
      },
      headers: {
        Authorization:
          'brEyQRSzMm2UwQa5v0NsobRa3U8nH5xT|DIRoTGMS2wH4frTu5mfCMTuco',
      },
    }
  );

  return response;
};

function* getTransactionsItems({ payload }) {
  try {
    const { offset, limit, orderby, search, filter } = payload;
    const { data } = yield call(
      getTransactionsRequest,
      orderby,
      search,
      filter
    );
    yield put(getTransactionSuccess({ ...data, offset, limit, filter }));
  } catch (error) {
    yield put(getTransactionError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(TRANSACTIONS_GET_LIST, getTransactionsItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList)]);
}
