import React, { Component } from 'react';
import Rating from './service_rating';
import _ from 'lodash';

class ServiceReviewsList extends Component {

    renderReviewList(){
        return _.map(this.props.comments, comment => {
            return (
                <li className="list-group-item" key={comment._id}>
                    <h6>
                        <Rating overallRating={comment.rateing} />
                        {comment.comment}
                    </h6>
                </li>
            )
        });
    }
    
    render(){
        if(!this.props.comments){
            return (
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <h3>No Reviews Yet</h3>
                    </li>
                </ul>
            );
        }

        return (
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                            <h3>
                                Reviews ({this.props.comments.length})
                            </h3>
                    </li>
                    {this.renderReviewList()}
                </ul>
            </div>
        );
    }
}

export default ServiceReviewsList;