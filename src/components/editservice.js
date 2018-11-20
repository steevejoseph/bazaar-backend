import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
//import { createService } from '../actions';
import axios from 'axios';
import { editservice } from '../actions';

class EditServices extends Component {
    renderList(){
        return this.props.account.map((info) => {
            return (
                <div className = "item" key{account.id}

                <button>
                className = "ui button primary"
                onClick = {() => this.props.editservice}
                
                </button>
            )

        });
    }

    componentDidMounts() {

        this.fetchData();
    }

        // axios.post('https://bazaar-backend.herokuapp.com/api/services/edit')
        //.then(response => console.log(response));
//        then(response => {

//            this.setState({details: response.data, function() {
//                console.log(this.state);

                
//                }
})
//        })
//    }



    render() {

//        const { handleSubmit } = this.props;
        return (
            <div>{this.renderList()}</div>

//            <div>
//                {this.props.text}
//                <button onClick={this.props.serviceName}>X</button>
//                <input value={this.props.serviceName} 
//                    onChange={evt => this.updateInputValue(evt)}
//                /> 
//                <button onClick={() => this.props.tags(this.inputValue)}>edit</button>

//            </div>
       );
   }
//}

export default reduxForm({
    validate,
    form: 'ServiceForm'
})(
    connect(null, {editservice})(EditServices)
);

