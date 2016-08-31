import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div>
				Server is up and running!!!
				<button>
					<a href="/api/oauth/google/login">
					Login
					</a>
				</button>
			</div>
		)
	}
}