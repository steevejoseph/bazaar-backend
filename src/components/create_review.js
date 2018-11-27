import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { createReview } from '../actions/index'
import { connect } from 'react-redux';

class CreateReview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            comment: ''
        }

        this.changeRating = this.changeRating.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.sendReview = this.sendReview.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    changeRating(newRating){
        this.setState({ rating: newRating });
    }

    onInputChange(comment){
        this.setState({ comment });
    }

    onSuccess() {
        this.props.successCallback();
        this.setState({ 
            rating: 0,
            comment: ''
         });
    }

    sendReview(){
        this.props.createReview(this.props.serviceId, this.state.comment, this.state.rating, this.onSuccess);
    }

    render(){
        return (
            <div className="create-review">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <h3>Create Review</h3>
                    </li>
                    <li className="list-group-item">
                        <div>
                            <h6>Overall Rating</h6>
                            <Ratings
                                rating={this.state.rating}
                                widgetRatedColors="red"
                                changeRating={this.changeRating}
                                widgetDimensions="20px"
                                widgetSpacings="2px"
                            >
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                            </Ratings>
                        </div>

                        <div className="textarea-review">
                            <textarea 
                                className="form-control"
                                type="text" 
                                autoComplete="off"
                                placeholder="What did you like or dislike?"
                                value={this.state.comment}
                                onChange={(event) => this.onInputChange(event.target.value)}
                            />
                        </div>
                        
                        <div onClick={this.sendReview}>
                            <button type="button" className="btn btn-danger">Submit</button>
                        </div>
                    </li>  
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, { createReview })(CreateReview);