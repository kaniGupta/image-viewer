import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import Header from '../../common/header/Header';

import './Home.css';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

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
          instagramDetailedPosts.push({ [id]: response.data });

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
    return (
      <div>
        <Header
          searchBox
          header="Image Viewer"
          searchBoxHandler={this.searchBoxHandler}
        />
      </div>
    );
  }
}

export default withRouter(Home);
