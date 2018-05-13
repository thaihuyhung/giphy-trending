import React from 'react'
import Grid from 'material-ui/Grid'
import Avatar from '../Avatar'
import GifCard from '../GifCard'
import { withStyles } from 'material-ui/styles'

const styles = {
  userInfo: {
    padding: 8
  },
  link: {
    color: '#5c98c5',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: 4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'calc(100% - 50px)',
    '&:hover': {
      textDecoration: 'underline',
    }
  } 
}

const GifCardWrapper = ({ data, onOpenFullScreen, classes }) => {
  return (
    <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
      <GifCard data={data} onOpenFullScreen={onOpenFullScreen} />
      <Grid classes={{ container: classes.userInfo }} container justify="flex-start" alignItems="center">

        <Avatar 
          title={data.getIn(['user', 'name'])} 
          src={data.getIn(['user', 'avatar_url'])}
        />
          <a className={classes.link} href={data.getIn(['user', 'profile_url'])}>{data.getIn(['user', 'name'])}</a>    
      </Grid>     
    </Grid>
  );
};

export default withStyles(styles)(GifCardWrapper);