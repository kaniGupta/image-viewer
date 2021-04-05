import React, { Component } from 'react';
import axios from 'axios';

import Header from '../../common/header/Header';

import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instagramPosts: [],
      profilePicture: null,
    };
  }

  async componentDidMount() {
    const instagramApiResponse = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,username&access_token=${sessionStorage.getItem(
        'access-token'
      )}`
    );

    if (instagramApiResponse.data) {
      this.setState({
        instagramPosts: instagramApiResponse.data.data,
        profilePicture: instagramApiResponse.data.data[0].media_url,
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
        Profile
      </div>
    );
  }
}

export default Profile;
