import React, { Component } from 'react'
import Card, { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Tooltip from 'material-ui/Tooltip'
import copy from 'copy-to-clipboard'

const styles = {
  card: {
    padding: 8
  },
  cardContent: {
    color: '#A1A1A1',
    padding: 0,
    paddingTop: 8,
    fontSize: 12,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  image: {
    cursor: 'pointer',
    height: 200,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain'
  },
  icon: {
    '&:not(:first-child)': {
      marginLeft: 8
    }
  },
  iconCopyLink: {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      transform: 'rotate(-30deg)',
      color: '#5c98c5'
    }
  },
  '@keyframes skeleton-animation': {
    '0%': {
      backgroundPosition: '-200px 0'
    },
    '100%': {
      backgroundPosition: 'calc(200px + 100%) 0'
    }
  },
  skeleton: {
    animation: 'skeleton-animation 1.2s ease-in-out infinite',
    backgroundColor: '#EEE',
    backgroundImage: 'linear-gradient(90deg, #EEE, #F5F5F5, #EEE) !important',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px 100%'
  }
}

class GifCard extends Component {
  state = {
    openFullScreen: false,
    loaded: false,
    imgSrc: ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data.get('id') !== this.props.data.get('id') || 
    nextState.imgSrc !== this.state.imgSrc || 
    nextState.openFullScreen !== this.state.openFullScreen;
  }

  onClose = () => {
    this.setState({ openFullScreen: false })
  }

  copyLink = () => {
    const { data } = this.props;
    copy(data.get('url'));
  }

  onOpenFullScreen = () => {
    const { data, onOpenFullScreen } = this.props;
    onOpenFullScreen(data.get('title'), data.getIn(['images', 'original', 'url']));
  }

  render() {
    const { data, classes } = this.props;
    const { loaded, imgSrc } = this.state;

    let image = new Image();
    image.onload = () => {
      this.setState({ 
        loaded: true,
        imgSrc: `url(${data.getIn(['images', 'fixed_height', 'webp'])})`
      })
    }
    image.onerror = () => {
      this.setState({ 
        loaded: true,
        imgSrc: `url(${data.getIn(['images', 'fixed_height', 'webp'])})`
      })
    }
    image.src = data.getIn(['images', 'fixed_height', 'webp']);
    image = null;

    return (
      <Grid key={data.get('id')}>
        <Card classes={{ root: classes.card }}>
          <div
            className={!loaded ? `${classes.skeleton} ${classes.image}` : classes.image}
            style={{
              backgroundImage: imgSrc
            }}
            title={data.get('title')}
            onClick={this.onOpenFullScreen}
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <Grid container justify="space-between" alignItems="center">
            <Tooltip title="Copy link" placement="bottom">
              <Icon onClick={this.copyLink} className={classes.iconCopyLink} classes={{ root: classes.icon }}>link</Icon>
            </Tooltip>
              <div>
                <Grid container justify="flex-end" alignItems="center">
                  <Icon classes={{ root: classes.icon }}>remove_red_eye</Icon>
                  <span>7,200</span>
                  <Icon classes={{ root: classes.icon }}>chat_bubble</Icon>
                  <span>10</span>
                  <Icon classes={{ root: classes.icon }}>favorite</Icon>
                  <span>432</span>
                </Grid>
              </div>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(GifCard);