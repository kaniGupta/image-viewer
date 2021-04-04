import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  withStyles,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import Header from '../../common/header/Header';

import './Home.css';

const styles = (theme) => ({
  root: {
    maxWidth: 345,
  },
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
      instagramDetailedPosts: [],
      searchText: '',
    };
  }

  async componentDidMount() {
    const instagramApiResponse = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption&access_token=${sessionStorage.getItem(
        'access-token'
      )}`
    );

    if (instagramApiResponse.data) {
      this.setState({ instagramPosts: instagramApiResponse.data.data });
    }

    this.state.instagramPosts.forEach(({ id }) => {
      axios
        .get(
          `https://graph.instagram.com/${id}?fields=id,media_type,media_url,username,timestamp&access_token=${sessionStorage.getItem(
            'access-token'
          )}`
        )
        .then((response) => {
          const instagramDetailedPosts = [...this.state.instagramDetailedPosts];
          instagramDetailedPosts.push(response.data);

          this.setState({ instagramDetailedPosts });
        })
        .catch((error) => {
          console.log(error);
        });
    });
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

        {this.state.instagramDetailedPosts.map(
          ({ id, media_url, username, timestamp }, index) => {
            const captionInfo = this.state.instagramPosts[index];

            return (
              <Card key={`post-${id}`} className={classes.root}>
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
                    {captionInfo.caption}
                  </Typography>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Home));
