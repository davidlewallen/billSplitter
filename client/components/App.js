import React, { Component } from 'react';

import BillList from './BillList'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<BillList />
		)
	}
}