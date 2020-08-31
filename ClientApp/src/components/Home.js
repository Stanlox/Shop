import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className="text-center">
            <h3 className="display-4">Welcome to the home appliance sales website</h3>
        </div>
    );
  }
}
