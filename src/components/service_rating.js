import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';

class Rating extends Component {
    render(){
        return (
            <div>
                <div>
                    <Ratings
                        rating={this.props.overallRating}
                        widgetDimensions="20px"
                        widgetSpacings="2px"
                    >
                        <Ratings.Widget widgetRatedColor="red" />
                        <Ratings.Widget widgetRatedColor="red" />
                        <Ratings.Widget widgetRatedColor="red" />
                        <Ratings.Widget widgetRatedColor="red" />
                        <Ratings.Widget widgetRatedColor="red" />
                    </Ratings>
                </div>
            </div>
        );
    }
}

export default Rating;