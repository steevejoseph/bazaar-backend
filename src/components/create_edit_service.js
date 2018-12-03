import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createService, editService } from '../actions';
import { CREATE_EDIT_CATEGORIES as CATEGORIES } from '../constants';
import Markdown from 'markdown-to-jsx';
import { MARKDOWN_OPTIONS } from '../constants';

class CreateEditService extends Component {    
    constructor(props) {
        super(props);

        this.state = {
            description: this.props.isEdit && this.props.service ? this.props.service.description : ''
        }

        this.renderDropdown = this.renderDropdown.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
    }

    componentDidMount() {
        if ((this.props.isEdit && !this.props.service) || !this.props.user)
            this.props.history.push('/');
        
        else if (this.props.isEdit) {
            var options = []

            if (this.props.service.options)
                options = JSON.parse(this.props.service.options);
            
            this.props.initialize({ 
                serviceName: this.props.service.name,
                category: this.props.service.tags,
                description: this.props.service.description,
                starterPrice: this.props.service.price,
                standardPrice: options.length > 1 ? options[1].price : '',
                superPrice: options.length > 2 ? options[2].price : '',
                starterDescription: options.length > 0 ? options[0].description : '',
                standardDescription: options.length > 1 ? options[1].description : '',
                superDescription: options.length > 2 ? options[2].description : '',
            });
        }

    }

    updateDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    renderInputField(field) {
        const { meta: {touched, error} } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid ' : touched && !error ? 'is-valid' : ''}`;

        return (
            <div>
                <input 
                    type="text" 
                    className={className}
                    autoComplete="off"
                    placeholder={field.label}
                    {...field.input} 
                />
                <p className="text-danger">
                    {touched ? error : ''}
                </p>
            </div>
        );
    }

    renderTextarea(field) {
        const { meta: {touched, error} } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid ' : touched && !error ? 'is-valid' : ''}`;
        
        return (
            <div className="h-100">
                <textarea 
                    type="text" 
                    className={`${className} h-100`}
                    autoComplete="off"
                    placeholder={field.label}
                    {...field.input} 
                />
                <p className="text-danger">
                    {touched ? error : ''}
                </p>
            </div>
        );
    }

    renderSelectOptions() {
        return _.map(CATEGORIES, category => {
            return (
                <option key={category} value={category}>{category}</option>
            )
        });
    }

    renderDropdown(field) {
        const { meta: {touched, error } } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid' : touched && !error ? 'is-valid' : ''}`;

        return (
            <div>
                <select className={className} {...field.input} >
                    {this.renderSelectOptions()}
                </select>
                <p className="text-danger">
                    {touched ? error : ''}
                </p>
            </div>
        );
    }

    onSubmit(values) {
        if (!this.props.isEdit) {
            values = { 
                ...values, 
                user:this.props.user
            }
            this.props.createService(values, (id) => {
                this.props.history.push(`/services/${id}`);
            });
        } else {
            values = {
                ...values, 
                id: this.props.service._id
            }
            this.props.editService(values, (id) => {
                this.props.history.push(`/services/${id}`);
            });
        }
    }
    
    renderOptionTabs() {
        return (
            <div className="option-tabs nav nav-tabs text-center nav-justified" id="nav-tab" role="tablist">
                <a 
                    className={`nav-item nav-link ${'active'}`} 
                    id={`tab-starter`} 
                    data-toggle="tab" 
                    role="tab" 
                    aria-controls={`starter`} 
                    aria-selected={`nav-item nav-link ${'true'}`} 
                    href={`#starter`}
                    >
                    Starter Tier
                </a>
                <a 
                    className={`nav-item nav-link`} 
                    id={`tab-standard`} 
                    data-toggle="tab" 
                    role="tab" 
                    aria-controls={`standard`} 
                    aria-selected={`nav-item nav-link false`} 
                    href={`#standard`}
                    >
                    Standard Tier
                </a>
                <a 
                    className={`nav-item nav-link`} 
                    id={`tab-super`} 
                    data-toggle="tab" 
                    role="tab" 
                    aria-controls={`super`} 
                    aria-selected={`nav-item nav-link false`} 
                    href={`#super`}
                    >
                    Super Tier
                </a>
            </div>
        );
    }

    renderOptionContent() {
        return (
            <div className="option-info tab-content pt-3 px-4 pb-1" id="nav-tabContent">
                <div 
                    className={`tab-pane show active`} 
                    id='starter'
                    role="tabpanel" 
                    aria-labelledby={`tab-starter`} 
                    >
                    <Field 
                        label="Price"
                        name="starterPrice"
                        component={this.renderInputField}
                    />
                    <Field 
                        label="Description (What makes this tier different from the rest)"
                        name="starterDescription"
                        component={this.renderTextarea}
                    />
                </div>
                <div 
                    className={`tab-pane`} 
                    id='standard'
                    role="tabpanel" 
                    aria-labelledby={`tab-standard`} 
                    >
                    <Field 
                        label="Price"
                        name="standardPrice"
                        component={this.renderInputField}
                    />
                    <Field 
                        label="Description (What makes this tier different from the rest)"
                        name="standardDescription"
                        component={this.renderTextarea}
                    />
                </div>
                <div 
                    className={`tab-pane`} 
                    id='super'
                    role="tabpanel" 
                    aria-labelledby={`tab-super`} 
                    >
                    <Field 
                        label="Price"
                        name="superPrice"
                        component={this.renderInputField}
                    />
                    <Field 
                        label="Description (What makes this tier different from the rest)"
                        name="superDescription"
                        component={this.renderTextarea}
                    />
                </div>
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="create-edit-form container">
                <h1 className="title pb-2">{this.props.isEdit ? 'Edit your service' : 'Create a new service'}</h1>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field 
                        label="Service Name"
                        name="serviceName"
                        component={this.renderInputField}
                    />
                    <Field 
                        label="Category"
                        name="category"
                        component={this.renderDropdown}
                    />
                        <div className="options text-muted pb-3">
                            <nav>
                                {this.renderOptionTabs()}
                            </nav>
                            {this.renderOptionContent()}
                        </div>
                    <div className="row pb-3">
                        <div className="col-6">
                            <Field 
                                label="Overall Description (Markdown)"
                                name="description"
                                component={this.renderTextarea}
                                onChange={this.updateDescription}
                            />
                        </div>
                        <div className="col-6">
                            <Markdown options={MARKDOWN_OPTIONS} className={this.state.description == '' ? 'text-muted' : ''}>
                                {this.state.description == '' ? '####Start typing to see a preview...' : this.state.description} 
                            </Markdown>
                        </div>
                    </div>
                    <div className="form-group pt-3">
                        <button type="submit" className="btn btn-danger">{this.props.isEdit ? 'Save' : 'Submit'}</button>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.serviceName) 
        errors.serviceName = "Enter a service name.";

    if (values.serviceName && values.serviceName.length > 60) 
        errors.serviceName = "Try making your service name shorter.";

    if (!values.category) 
        errors.category = "Choose a category.";
    else if (values.category == "Category") 
        errors.category = "Choose a category.";

    if (!values.description) 
        errors.description = "Enter a description.";

    if (!values.starterPrice) 
        errors.starterPrice = "Enter a price.";
    else if (values.starterPrice) {
        if (values.starterPrice[0] === '$') 
            values.starterPrice = values.starterPrice.substring(1);

        const parse = parseInt(values.starterPrice);

        if (parse)
            values.starterPrice = `$${parse}`;
        else {
            values.starterPrice = ''
            errors.starterPrice = "Enter only numbers.";
        }
    }

    if (values.standardPrice) {
        if (values.standardPrice[0] === '$') 
            values.standardPrice = values.standardPrice.substring(1);

        const parse = parseInt(values.standardPrice);

        if (parse)
            values.standardPrice = `$${parse}`;
        else {
            values.standardPrice = ''
            errors.standardPrice = "Enter only numbers.";
        }
    }

    if (values.superPrice) {
        if (values.superPrice[0] === '$') 
            values.superPrice = values.superPrice.substring(1);

        const parse = parseInt(values.superPrice);

        if (parse)
            values.superPrice = `$${parse}`;
        else {
            values.superPrice = ''
            errors.superPrice = "Enter only numbers.";
        }
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        user:state.user.user,
        service: state.services.serviceToEdit
    };
}

export default reduxForm({
    validate,
    form: 'CreateEditServiceForm'
})(
    withRouter(connect(mapStateToProps, {createService, editService})(CreateEditService))
);