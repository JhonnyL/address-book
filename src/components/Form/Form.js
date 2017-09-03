import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import { isValid } from '../Validator/Validator';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorFields: [],
      passedFields: [],
    };

    this.onBlur = this.onBlur.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  onBlur(key, value) {
    const { errorFields, passedFields } = this.state;

    const field = this.props.fields.find(({ id }) => id === key);
    const passed = passedFields.filter(p => p !== key);
    const errors = errorFields.filter(e => e !== key);

    isValid(field.validations, value)
      ? passed.push(key)
      : errors.push(key);

    this.setState({
      errorFields: errors,
      passedFields: passed,
    });
  }

  onSelect(key, value) {
    this.onBlur(key, value);
    this.props.onChange(key, value);
  }

  onSubmit(e) {
    if (this.isValid()) {
      this.props.onSubmit();
    }

    e.preventDefault();
  }

  isValid() {
    const errorFields = [];
    const passedFields = [];

    this.props.fields.forEach((field) => {
      isValid(field.validations, field.value)
        ? passedFields.push(field.id)
        : errorFields.push(field.id);
    });

    this.setState({
      errorFields,
      passedFields,
    });

    return errorFields.length === 0;
  }

  renderField(field) {
    const { errorFields, passedFields } = this.state;

    let feedback = null;
    let formGroupStyle = '';
    let inputStyle = '';

    switch (true) {
      case passedFields.includes(field.id):
        formGroupStyle = ' has-success';
        inputStyle = ' form-control-success';
        break;
      case errorFields.includes(field.id):
        feedback = field.errorMessage;
        formGroupStyle = ' has-danger';
        inputStyle = ' form-control-danger';
        break;
    }

    return (
      <div key={field.id} className={`form-group${formGroupStyle}`}>
        <label className="form-control-label" htmlFor={field.id}>
          {field.label}
        </label>
        {
          (() => {
            switch (field.type) {
              case 'select':
                return (<Select
                  id={field.id}
                  className={inputStyle}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={this.onSelect}
                  options={field.options}
                />);
              case 'text':
              default:
                return (<Input
                  id={field.id}
                  className={inputStyle}
                  placeholder={field.placeholder}
                  value={field.value}
                  onBlur={this.onBlur}
                  onChange={this.props.onChange}
                />);
            }
          })()
        }
        {
          feedback && (
            <div className="form-control-feedback">{feedback}</div>
          )
        }
      </div>
    );
  }

  render() {
    return (
      <form>
        {
          this.props.fields.map(field => this.renderField(field))
        }
        <button
          type="submit"
          className="btn btn-primary mr-2"
          style={{ cursor: 'pointer' }}
          onClick={this.onSubmit}
        >
          Submit
        </button>
        <Link
          to="/"
          type="button"
          className="btn btn-secondary"
          style={{ cursor: 'pointer' }}
        >
          Cancel
        </Link>
      </form>
    );
  }
}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
