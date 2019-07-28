import React, { Component } from 'react';
import axios from 'axios';
import GetInput from './GetInput';
import MatchedData from './MatchedData';
import RenderPopup from './RenderPopup';

class Discover extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person1: {},
			person2: {},
			data: [],
			renderFlag: false,
			popupFlag: false,
		};

		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.disableSubmit = this.disableSubmit.bind(this);
		this.discoverMatch = this.discoverMatch.bind(this);
		this.showPopup = this.showPopup.bind(this);
		this.hidePopup = this.hidePopup.bind(this);
		this.redirectUrl = this.redirectUrl.bind(this);
	}

	handleChange1(event) {
		this.setState({
			person1: { name: event.target.value },
			renderFlag: false,
		});
	}

	handleChange2(event) {
		this.setState({
			person2: { name: event.target.value },
			renderFlag: false,
		});
	}

	handleFocus() {
		this.setState({ renderFlag: false });
	}

	disableSubmit() {
		const { person1, person2 } = this.state;
		return !(person1.name && person2.name);
	}

	async discoverMatch(e) {
		e.preventDefault();
		const { person1, person2 } = this.state;
		const response = await axios.post('/discover', {
			person1: person1.name, person2: person2.name,
		});
		this.setState({
			person1: response.data[0],
			person2: response.data[1],
			data: response.data[2],
		});
		this.setState({ renderFlag: true });
	}

	async showPopup(e) {
		const response = await axios.get(`/search/person/${e.target.id}`);
		this.setState({
			popupPerson: response.data,
			popupFlag: true,
		});
	}

	hidePopup() {
		this.setState({
			popupFlag: false,
		});
	}

	redirectUrl(e) {
		const { history } = this.props;
		history.push(`/movie/${e.target.id}`);
	}

	render() {
		const {
			person1, person2, data, renderFlag, popupFlag, popupPerson,
		} = this.state;

		return (
			<div id="discover-match-component">

				<h1>Six Degrees of Kevin Bacon</h1>
				<form
					className="flex-col"
					onSubmit={this.discoverMatch}
				>
					<div id="personAB-div">
						<GetInput
							label="Person A"
							type="text"
							input={person1.name}
							placeholder="Angelina Jolie"
							handleChange={this.handleChange1}
							handleFocus={this.handleFocus}
						/>
						<GetInput
							label="Person B"
							type="text"
							input={person2.name}
							placeholder="Jennifer Aniston"
							handleChange={this.handleChange2}
							handleFocus={this.handleFocus}
						/>
					</div>

					<button type="submit" disabled={this.disableSubmit()}>
Check!
					</button>
				</form>

				{renderFlag
				&& (
					<MatchedData
						person1={person1}
						person2={person2}
						data={data}
						showPopup={this.showPopup}
						redirectUrl={this.redirectUrl}
					/>
				)
				}

				{popupFlag
					&& (
						<RenderPopup
							person={popupPerson}
							hidePopup={this.hidePopup}
						/>
					)}

			</div>
		);
	}
}


export default Discover;
