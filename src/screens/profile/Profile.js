import React, { Component } from 'react';
import axios from 'axios';

import Header from '../../common/header/Header';

import './Profile.css';
import { Typography } from '@material-ui/core';

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
            alt="Display Picture"
            className="user-details-picture"
          />
          <div className="user-details">
            <Typography variant="h4" component="h4">
              {this.state.username}
            </Typography>
            <div className="user-follow-details">
              <Typography variant="body2" component="body2">
                Posts: {this.state.instagramPosts.length}
              </Typography>
              <Typography variant="body2" component="body2">
                Follow: 4
              </Typography>
              <Typography variant="body2" component="body2">
                Followed By: 6
              </Typography>
            </div>

            <Typography variant="body1" component="body1">
              UpGrad Education
            </Typography>
          </div>
        </section>
        <section id="user-posts"></section>
      </div>
    );
  }
}

export default Profile;
