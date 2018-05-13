import {
  queryTrendingError,
  queryTrendingSuccess,
  queryCommentsError,
  queryCommentsSuccess
} from './action'
import serialize from '../../utils/serialize'
import { QUERY_TRENDING, QUERY_COMMENTS } from './constant'
import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* doQueryTrending({ param = {} }) {
  const { limit = 20, offset = 0 } = param;

  const query = serialize({
    limit,
    offset,
    api_key: 'FUzMhhnPstdHnTImlV219s1qvwRk4y0v'
  });
  const response = yield call([axios, 'get'], `https://api.giphy.com/v1/gifs/trending?${query}`);
  if (response.error) {
    yield put(queryTrendingError(response.error));
    return;
  }
  yield put(queryTrendingSuccess(response.data));
}

function* doQueryComments() {

  const response = yield call([axios, 'get'], '/api/documents');
  if (response.error) {
    yield put(queryCommentsError(response.error));
    return;
  }
  yield put(queryCommentsSuccess(response.data));
}

export default function* queryTrendingWatcher() {
  yield takeLatest(QUERY_TRENDING, doQueryTrending);
  yield takeLatest(QUERY_COMMENTS, doQueryComments);
}