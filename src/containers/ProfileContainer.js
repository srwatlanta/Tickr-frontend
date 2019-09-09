import React, { Component } from 'react';
import UserDisplayContainer from './UserDisplayContainer'

class ProfileContainer extends Component {
    constructor(){
        super()
    }

    render() {
        console.log(this.props)
        return (
            <div>
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
              {this.props.user.username}
            </div>
        );
    }
}

export default ProfileContainer;