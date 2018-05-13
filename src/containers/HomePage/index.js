import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { queryTrending, queryComments } from './action'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import GifCardWrapper from '../../components/GifCardWrapper'
import InfiniteScroll from 'react-infinite-scroller'
import { fromJS } from 'immutable'
import { CircularProgress } from 'material-ui/Progress'
import GifDetailModal from '../../components/GifDetailModal'

const styles = theme => ({
  container: {
    background: '#F4F4F4',
    minHeight: 'calc(100vh - 64px)',
    boxSizing: 'border-box',
    padding: 24,
    [theme.breakpoints.down('xs')]: {
      padding: 8
    }
  }
})

class HomePage extends Component {
  state = {
    openFullScreen: false,
    selectedImageUrl: ''
  }

  componentDidMount() {
    const { queryTrending } = this.props;
    queryTrending();
  }

  loadMore = () => {
    const { gifs, loading, queryTrending } = this.props;
    if (!loading) {
      queryTrending({
        offset: gifs.size
      })
    }
  }

  onOpenFullScreen = (title, url) => {
    this.setState({
      openFullScreen: true,
      selectedImageTitle: title,
      selectedImageUrl: url
    })
  }

  onCloseFullScreen = () => {
    this.setState({
      openFullScreen: false,
      selectedImageTitle: '',
      selectedImageUrl: ''
    })
  }

  render() {
    const { gifs, total, classes, comments, queryComments } = this.props;
    const { openFullScreen, selectedImageTitle, selectedImageUrl } = this.state;
    const loader = (
      <Grid key="items-loading" container justify="center" alignItems="center">
        <CircularProgress size={50} />
      </Grid>
    )
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={gifs.size < total}
        loader={loader}
      >
        <Grid 
          key="items"
          classes={{ container: classes.container }} 
          container 
          spacing={16} 
          alignItems="stretch"
        >
        {
          gifs && gifs.map((gif, index) => <GifCardWrapper data={gif} key={index} onOpenFullScreen={this.onOpenFullScreen} />)
        }
        </Grid>
        <GifDetailModal
          title={selectedImageTitle} 
          src={selectedImageUrl} 
          open={openFullScreen} 
          close={this.onCloseFullScreen} 
          queryComments={queryComments}
          comments={comments}
        />
      </InfiniteScroll>
    )
  }
}

const mapStateToProps = state => ({
  gifs: state.getIn(['home', 'trendingGifs'], fromJS([])),
  total: state.getIn(['home', 'trendingTotal'], 0),
  loading: state.getIn(['home', 'trendingLoading']),
  comments: state.getIn(['home', 'comments']),
})

const mapDispatchToProps = {
  queryTrending,
  queryComments
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  withStyles(styles)
)(HomePage);