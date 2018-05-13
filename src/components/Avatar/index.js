import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {

  },
  skeleton: {
    animation: 'skeleton-animation 1.2s ease-in-out infinite',
    backgroundColor: '#EEE',
    backgroundImage: 'linear-gradient(90deg, #EEE, #F5F5F5, #EEE) !important',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px 100%'
  }
}

class CustomAvatar extends Component {
  state = {
    loaded: false,
    imgSrc: ''
  }

  render() {
    const { title, src, classes } = this.props;
    const { imgSrc, loaded } = this.state;
    if (!loaded) {
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

    return (
      <Avatar 
        className={!loaded ? classes.skeleton : ''}
        classes={{ root: classes.root }} 
        alt={title} 
        src={imgSrc}
      />
    );
  }
}

export default withStyles(styles)(CustomAvatar);