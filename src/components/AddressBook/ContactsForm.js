import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import countries from 'country-list';
import Form from '../Form/Form';
import { create, find, update } from '../Storage/Repository';
import { isEmail, isRequired } from '../Validator/Validator';

class ContactsForm extends Component {
  static getCountryOptions() {
    const countryList = countries().getCodeList();

    return Object.keys(countryList).map(key => ({
      value: key,
      label: countryList[key],
    }));
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      country: '',
      shouldRedirect: false,
    };

    this.countryList = ContactsForm.getCountryOptions();
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      find('contact', id).then((data) => {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          emailAddress: data.emailAddress,
          country: data.country,
        });
      });
    }
  }

  onChange(key, value) {
    const state = Object.assign({}, this.state);
    state[key] = value;
    this.setState(state);
  }

  onCreate() {
    const { firstName, lastName, emailAddress, country } = this.state;

    create('contact', {
      firstName,
      lastName,
      emailAddress,
      country,
    }).then(() => this.setState({ shouldRedirect: true }));
  }

  onUpdate() {
    const { id } = this.props.match.params;
    const { firstName, lastName, emailAddress, country } = this.state;

    update('contact', id, {
      firstName,
      lastName,
      emailAddress,
      country,
    }).then(() => this.setState({ shouldRedirect: true }));
  }

  render() {
    const { id } = this.props.match.params;
    const { firstName, lastName, emailAddress, country, shouldRedirect } = this.state;

    const onSubmit = id ? this.onUpdate : this.onCreate;
    const title = id ? 'Edit contact' : 'Add new contact';

    return (
      <div className="container my-5">
        <h1>{title}</h1>
        <Form
          fields={[{
            id: 'firstName',
            type: 'text',
            label: 'First Name',
            placeholder: 'Enter first name',
            value: firstName,
            validations: [isRequired],
            errorMessage: 'Enter a First Name',
          }, {
            id: 'lastName',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter last name',
            value: lastName,
            validations: [isRequired],
            errorMessage: 'Enter a Last Name',
          }, {
            id: 'emailAddress',
            type: 'text',
            label: 'Email Address',
            placeholder: 'Enter email address',
            value: emailAddress,
            validations: [isRequired, isEmail],
            errorMessage: 'Enter a valid Email Address',
          }, {
            id: 'country',
            type: 'select',
            label: 'Country',
            placeholder: 'Enter Country',
            value: country,
            options: this.countryList,
            validations: [isRequired],
            errorMessage: 'Enter a Country',
          }]}
          onSubmit={onSubmit}
          onChange={this.onChange}
        />
        {
          shouldRedirect && (
            <Redirect to={'/'} />
          )
        }
      </div>
    );
  }
}

ContactsForm.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ContactsForm;
