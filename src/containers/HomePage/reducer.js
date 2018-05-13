import {
  QUERY_TRENDING,
  QUERY_TRENDING_ERROR,
  QUERY_TRENDING_SUCCESS,
  QUERY_COMMENTS,
  QUERY_COMMENTS_ERROR,
  QUERY_COMMENTS_SUCCESS
} from './constant';
import { fromJS } from 'immutable';

const initialState = fromJS({
  trendingGifs: [],
  trendingLoading: true,
  comments: [],
  commentsLoading: true
});

function trendingReducer(state = initialState, action) {
  switch (action.type) {
    case QUERY_TRENDING:
      return state
        .set('trendingLoading', true);
    case QUERY_TRENDING_SUCCESS:
      const { pagination, data } = action.data;
      const total = pagination ? pagination.total_count : 0;
      return state
        .set('trendingLoading', false)
        .set('trendingTotal', total)
        .set('trendingGifs', state.get('trendingGifs').concat(fromJS(data)));
    case QUERY_TRENDING_ERROR:
      return state
        .set('trendingLoading', false)
        .set('trendingGifs', fromJS(null));
    case QUERY_COMMENTS:
      return state
        .set('commentsLoading', true);
    case QUERY_COMMENTS_SUCCESS:
      return state
        .set('commentsLoading', false)
        .set('comments', fromJS(action.data));
    case QUERY_COMMENTS_ERROR:
      return state
        .set('commentsLoading', false)
        .set('comments', fromJS(null));
    default:
      return state;
  }
}

export default trendingReducer;