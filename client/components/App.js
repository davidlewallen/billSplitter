import React, { Component } from 'react';

import BillList from './BillList'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null
      billArray: []
    }
  }

  componentWillMount() {
    this.setState({ billArray: populateBills() })
  }
  populateBills() {
  }

  render() {
    return (
      <div className="app-container">
        {this.state.currentUser === null
          ? <Auth />
          : <BillList />
        }
      </div>
    )
  }
}