import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';

class CreateReview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 0
        }

        this.changeRating = this.changeRating.bind(this);
       
    }

    changeRating(newRating){
        this.setState({ rating: newRating });
    }

    render(){
        return (
            <div>
                <ul className="col-md-4 list-group list-group-flush">
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
                            />
                        </div>
                    </li>  
                </ul>
            </div>
        );
    }
}

export default CreateReview;