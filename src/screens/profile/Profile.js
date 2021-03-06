import React, { Component } from 'react';
import axios from 'axios';
import { GridList, GridListTile, Typography } from '@material-ui/core';

import Header from '../../common/header/Header';

import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instagramPosts: [],
      username: '',
      profilePicture: null,
    };
  }

  async componentDidMount() {
    const instagramApiResponse = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,username&access_token=${sessionStorage.getItem(
        'access-token'
      )}`
    );

    console.log(instagramApiResponse.data.data);

    if (instagramApiResponse.data) {
      this.setState({
        instagramPosts: instagramApiResponse.data.data,
        profilePicture: instagramApiResponse.data.data[0].media_url,
        username: instagramApiResponse.data.data[0].username,
        fullName: 'UpGrad Education',
      });
    }
  }

  render() {
    return (
      <div>
        <Header
          profileBox
          header="Image Viewer"
          searchBoxHandler={this.searchBoxHandler}
          profilePicture={this.state.profilePicture}
        />
        <section id="user-details-section">
          <img
            src={this.state.profilePicture}
            alt="Display"
            className="user-details-picture"
          />
          <div className="user-details">
            <Typography variant="h4" component="h4">
              {this.state.username}
            </Typography>
            <div className="user-follow-details">
              <Typography variant="body2">
                Posts: {this.state.instagramPosts.length}
              </Typography>
              <Typography variant="body2">Follow: 4</Typography>
              <Typography variant="body2">Followed By: 6</Typography>
            </div>

            <Typography variant="body1">{this.state.fullName}</Typography>
          </div>
        </section>
        <section id="user-posts">
          {this.state.instagramPosts && (
            <GridList cellHeight={350} cols={3}>
              {this.state.instagramPosts.map(({ id, caption, media_url }) => (
                <GridListTile key={`grid${id}`}>
                  <img src={media_url} alt={`InstagramPost${caption}`} />
                </GridListTile>
              ))}
            </GridList>
          )}
        </section>
      </div>
    );
  }
}

export default Profile;
