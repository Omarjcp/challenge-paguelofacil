import { all } from 'redux-saga/effects';
// import authSagas from './auth/saga';
import transactionsSagas from './transactions/saga';

export default function* rootSaga() {
  yield all([
    // authSagas(),
    transactionsSagas(),
  ]);
}
