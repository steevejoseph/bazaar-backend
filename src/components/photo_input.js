import React, { Component } from 'react';
import axios from 'axios';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

class PhotoInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null,
		}
	}

	handleUploadFile() {
		const data = new FormData();
		const resource = this.props.resource;
		const resourceId = this.props.resourceId;

		data.append('image', this.state.image);
		// data.append('name', 'some value user types');
		// data.append('description', 'some value user types');

		axios
			.post(`${ROOT_URL}/photos/${resource}/${resourceId}/create`, data)
			.then(response => console.log(response))
			.catch(err => console.log(err));
	}

	renderSubmitButton() {
		if(this.state.image) {
			return ( 
			<button 
			  type="submit"
			  className="fa fa-upload fa-xs upload" 
			  onClick={this.handleUploadFile.bind(this)}
			/>);
		}
	}

	render() {
		return (
			<div>				
				<span className="file-input-wrapper">
 			        <i className="fa fa-file-image-o"></i>
			        <input
				      type="file" 
				      name="image" 
				      onChange={event => this.setState({ image: event.target.files[0] })}
				    />
			    </span>
			    {this.renderSubmitButton()}
			</div>
		);
	}
}

export default PhotoInput;