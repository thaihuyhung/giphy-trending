import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Slide from 'material-ui/transitions/Slide';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress'
import Avatar from '../Avatar'
import Hidden from 'material-ui/Hidden';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = theme => ({
  title: {
    maxWidth: 'calc(100% - 48px)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  contentContainer: {
    height: 'calc(100vh - 64px)',
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 56px)',
      marginTop: 56
    }
  },
  img: {
    backgroundColor: '#000',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    width: 'calc(100% - 300px)',
    [theme.breakpoints.down('xs')]: {
      backgroundPosition: 'top',
      height: 'calc(100vh - 104px)',
      width: '100%'
    }
  },
  info: {
    background: '#F1F1F1',
    width: 300,
    padding: 8,
    boxSizing: 'border-box',
    overflowY: 'scroll',
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    }
  },
  icon: {
    color: '#A1A1A1'
  },
  infoHeader: {
    marginBottom: 16
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
    color: '#4f4f4f'
  },
  userName: {
    fontSize: 14,
    color: '#5c98c5',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 600,
    marginRight: 8
  },
  userAvatar: {
    width: 32,
    height: 32,
    marginRight: 8
  },
  commentItem: {
    '&:not(:last-child)': {
      marginBottom: 16
    }
  },
  commentWrapper: {
    background: '#FFF',
    padding: 8,
    borderRadius: 10,
    width: 'calc(100% - 40px)',
    boxSizing: 'border-box',
    fontSize: 13
  },
  tabs: {
    width: '100%',
    height: 48
  },
  tab: {
    width: '50%'
  }
})

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

class GifDetailModal extends Component {
  state = {
    imgSrc: '',
    loaded: false,
    selectedTab: 0
  }

  componentDidUpdate(prevProps) {
    const { src, queryComments } = this.props;
    if (prevProps.src !== src) {
      queryComments();
    }
  }

  handleClose = () => {
    const { close } = this.props;
    this.setState({
      loaded: false
    });
    close();
  }

  handleTabChange = (event, value) => {
    this.setState({
      selectedTab: value
    })
  }

  renderComment = (data) => {
    const { classes } = this.props;
    return (
      <Grid key={data.get('id')} classes={{ container: classes.commentItem }} container justify="flex-start" alignItems="flex-start">
        <Avatar classes={{ root: classes.userAvatar }} src={data.get('avatar')} />
        <div className={classes.commentWrapper}>
          <a className={classes.userName}>{data.get('fullName')}</a>
          {data.get('comment')}
        </div>
      </Grid>
    )
  }

  renderImage = () => {
    const { classes, title } = this.props;
    const { imgSrc } = this.state;
    return (
      <div
        key="image"
        className={classes.img}
        style={{
          backgroundImage: `url(${imgSrc})`
        }}
        title={title}
      />
    );
  }

  renderInfoPanel = () => {
    const { classes, comments } = this.props;
    return (
      <div key="info-panel" className={classes.info}>
        <Grid classes={{ container: classes.infoHeader }} container justify="space-between" alignItems="center">
          <div className={classes.infoItem}>
            <Icon classes={{ root: classes.icon }}>remove_red_eye</Icon>
            <div>7,200</div>
          </div>
          <div className={classes.infoItem}>
            <Icon classes={{ root: classes.icon }}>chat_bubble</Icon>
            <div>10</div>
          </div>
          <div className={classes.infoItem}>
            <Icon classes={{ root: classes.icon }}>favorite</Icon>
            <div>432</div>
          </div>
        </Grid>
        <div>
          {
            comments && comments.map(x => this.renderComment(x))
          }
        </div>
      </div>
    )
  }

  renderContent = () => {
    const { classes, src } = this.props;
    const { loaded, selectedTab } = this.state;
    if (!loaded && src) {
      let image = new Image();
      image.onload = () => {
        this.setState({
          loaded: true,
          imgSrc: src
        })
      }
      image.onerror = () => {
        this.setState({
          loaded: true
        })
      }
      image.src = src;
      image = null;
    }

    if (!loaded) {
      return (
        <Grid classes={{ container: classes.contentContainer }} key="items-loading" container justify="center" alignItems="center">
          <CircularProgress size={50} />
        </Grid>
      );
    }
    return (
      <Grid container classes={{ container: classes.contentContainer }}>
        <Hidden xsDown>
          {[
            this.renderImage(),
            this.renderInfoPanel()
          ]}
        </Hidden>
        <Hidden smUp>
          <Tabs classes={{ root: classes.tabs }} value={selectedTab} onChange={this.handleTabChange}>
            <Tab classes={{ root: classes.tab }} label="GIF" />
            <Tab classes={{ root: classes.tab }} label="Comments" />
          </Tabs>
          {selectedTab === 0 && this.renderImage()}
          {selectedTab === 1 && this.renderInfoPanel()}
        </Hidden>
      </Grid>
    );
  }

  render() {
    const { title, open, classes } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Typography classes={{ root: classes.title }} variant="title" color="inherit">
                {title}
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <Icon>close</Icon>
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        {this.renderContent()}
      </Dialog>
    );
  }
}

export default withStyles(styles)(GifDetailModal);