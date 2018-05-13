import { all, fork } from "redux-saga/lib/effects";
import homePageWatcher from  '../HomePage/saga';

export default function* rootSaga() {
  yield all([
    fork(homePageWatcher)
  ]);
}
