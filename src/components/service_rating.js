import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';

class Rating extends Component {
    render(){
        return (
            <div>
                <Ratings
                    rating={this.props.overallRating}
                    widgetDimensions="20px"
                    widgetSpacings="2px"
                    >
                    <Ratings.Widget widgetRatedColor={this.props.starColor} />
                    <Ratings.Widget widgetRatedColor={this.props.starColor} />
                    <Ratings.Widget widgetRatedColor={this.props.starColor} />
                    <Ratings.Widget widgetRatedColor={this.props.starColor} />
                    <Ratings.Widget widgetRatedColor={this.props.starColor} />
                </Ratings>
            </div>
        );
    }
}

export default Rating;