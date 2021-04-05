import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';

import Header from '../../common/header/Header';

import './Home.css';

const styles = (theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instagramPosts: [],
      searchText: '',
    };
  }

  async componentDidMount() {
    console.log(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,username&access_token=${sessionStorage.getItem(
        'access-token'
      )}`
    );
    const instagramApiResponse = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,username&access_token=${sessionStorage.getItem(
        'access-token'
      )}`
    );

    if (instagramApiResponse.data) {
      this.setState({ instagramPosts: instagramApiResponse.data.data });
    }
  }

  searchBoxHandler = (event) => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header
          searchBox
          header="Image Viewer"
          searchBoxHandler={this.searchBoxHandler}
        />

        <div className="posts-grid">
          {this.state.instagramPosts.map(
            ({ id, caption, media_url, timestamp, username }, index) => {
              return (
                <Card key={`post-${id}`} className="post-card">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        DP
                      </Avatar>
                    }
                    title={username}
                    subheader={timestamp}
                  />
                  <CardMedia
                    className={classes.media}
                    image={media_url}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p">
                      {caption}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteBorderOutlined />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p">
                        &nbsp; 2 likes
                      </Typography>
                    </IconButton>
                  </CardActions>
                </Card>
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Home));
