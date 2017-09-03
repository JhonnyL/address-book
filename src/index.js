import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import AddressBook from './components/AddressBook/AddressBook'
import ContactsForm from './components/AddressBook/ContactsForm'

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={AddressBook} />
      <Route path="/create" component={ContactsForm} />
      <Route path="/edit/:id" component={ContactsForm} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
