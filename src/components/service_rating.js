import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';

class Rating extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 3.5
        }

        this.changeRating = this.changeRating.bind(this);
       
    }

    changeRating(newRating){
        this.setState({ rating: newRating });
    }


    render(){

        return (
            <div>
                <div>
                    <Ratings
                        rating={3.403}
                        widgetDimensions="20px"
                        widgetSpacings="2px"
                    >
                        <Ratings.Widget widgetRatedColor="red" />
                        <Ratings.Widget widgetRatedColor="red" />
                        <Ratings.Widget widgetRatedColor="red" />
                        <Ratings.Widget widgetRatedColor="red" />
                        <Ratings.Widget widgetRatedColor="red"/>
                    </Ratings>
                </div>

                
            </div>
        );
    }

}
export default Rating;