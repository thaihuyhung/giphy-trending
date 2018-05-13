import {
  QUERY_TRENDING,
  QUERY_TRENDING_ERROR,
  QUERY_TRENDING_SUCCESS,
  QUERY_COMMENTS,
  QUERY_COMMENTS_ERROR,
  QUERY_COMMENTS_SUCCESS
} from './constant';

export function queryTrending(param) {
  return {
    type: QUERY_TRENDING,
    param
  };
}

export function queryTrendingSuccess(data) {
  return {
    type: QUERY_TRENDING_SUCCESS,
    data
  };
}

export function queryTrendingError(error) {
  return {
    type: QUERY_TRENDING_ERROR,
    error
  };
}

export function queryComments(param) {
  return {
    type: QUERY_COMMENTS,
    param
  };
}

export function queryCommentsSuccess(data) {
  return {
    type: QUERY_COMMENTS_SUCCESS,
    data
  };
}

export function queryCommentsError(error) {
  return {
    type: QUERY_COMMENTS_ERROR,
    error
  };
}