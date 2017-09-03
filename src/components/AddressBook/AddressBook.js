import React, { Component } from 'react';
import countries from 'country-list';
import { Link } from 'react-router-dom';
import { findAll, remove } from '../Storage/Repository';

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    findAll('contact').then((contacts) => {
      this.setState({ contacts });
    });
  }

  onDelete(item) {
    remove('contact', item.id).then(() => {
      findAll('contact').then(contacts => this.setState({ contacts }));
    });
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="container my-5">
        <h1>Address Book</h1>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th style={{ width: '70px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              contacts && contacts.length ? contacts.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.firstName}</td>
                  <td>{entry.lastName}</td>
                  <td>{entry.emailAddress}</td>
                  <td>{countries().getName(entry.country)}</td>
                  <td>
                    <div className="row">
                      <div className="col">
                        <Link to={`/edit/${entry.id}`}>
                          <i className="fa fa-pencil" />
                        </Link>
                      </div>
                      <div className="col">
                        <button
                          className="btn btn-link p-0"
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.onDelete(entry)}
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No contacts had been added
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <Link className="btn btn-primary" to="/create">
          Add New
        </Link>
      </div>
    );
  }
}

export default AddressBook;
