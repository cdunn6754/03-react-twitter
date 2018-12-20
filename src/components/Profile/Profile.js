import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ProfileAvatar from './ProfileAvatar';
import AvatarDialog from './AvatarDialog';
import { getMessages } from '../../api/messageApi'; 

import './Profile.css';


class Profile extends Component {
  state = {
    avatar: 'https://via.placeholder.com/150x150',
    name: 'Paul',
    handle: '@jack',
    message_count: this.getMessages(),
    // star_count: '73',
    bio: 'Front end dev located in Denver',
    location: 'Denver, CO',
    link: 'github.com/git',
    birth_date: '03/02/1999',
    dialog_open: false
  }

  getMessages() {
    getMessages().then(res => {
      this.setState({star_count: this.addStars(res.data)});
      this.setState({message_count: res.data.length});
      this.setState({messages: this.renderMessageItem(res.data)});
    });
  }

  renderMessageItem(messagesList) {
    let htmlList = <li>Test Message</li>;
    messagesList.forEach(message => {
      htmlList += <li>{message.text}</li>
    })
    return htmlList;
  }

  addStars(messagesList) {
    let stars = 0;
    messagesList.forEach(message => {
      stars += message.stars;
    });
    return stars;
  }

  avatarClicked(e) {
     e.preventDefault();
     console.log('The link was clicked.');
  }

  changeAvatar = (url) => {
    console.log("Changing avatar");
    this.setState({avatar: url});
  }

  render() {
    return (
      <div className="ProfileContainer">
        <div className="ProfileHeader">
        <ProfileAvatar onClick={this.avatarClicked}  image={this.state.avatar} />
          <h1
            data-handle={this.state.handle}
            className="handle">{this.state.name}</h1>
          <ul className="InfoList">
            <li>messages: {this.state.message_count}</li>
            <li>likes: {this.state.star_count}</li>
          </ul>
        </div>
        <div className="InfoContainer">
          <p>
            {this.state.bio}
          </p>
          <div>
            <ul>
              {this.state.messages}
            </ul>
          </div>
          <ul className="InfoList">
            <li>{this.state.location}</li>
            <li>{this.state.link}</li>
            <li>{this.state.birth_date}</li>
          </ul>
        </div>
        <AvatarDialog changeAvatar={this.changeAvatar}/>
      </div>
    )
  }
};

export default Profile;
