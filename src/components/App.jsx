import { useState} from 'react';
//import { Component } from 'react';

import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './Container/Container'
import { Section } from './Section/Section'
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Wrapper } from './Wrapper/Wrapper';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';


export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContacts = ({ name, number }) => {
    //const { contacts } = this.state;

    const contactObj = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(currentName => currentName.name === name)
      ? toast.warn(`${name} is already in contact`)
      : setContacts([contactObj, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
    /*this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));/*/
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisiblContact = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const contactList = getVisiblContact();

  return (
    <Container>
      <Section title='Phonebook'>
        <ContactsForm onDataSubmit={addContacts} />
      </Section>
      <Section title='Contacts'>
        <Wrapper>
          <Filter value={filter} onFilterChange={changeFilter} />
          <ContactList contacts={contactList} onDeleteContact={deleteContact} />
        </Wrapper>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          draggable
        />
      </Section>
    </Container>
  );
}


/*export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };


  componentDidMount() {
    const contactEl = localStorage.getItem('contact');
    const parsContacts = JSON.parse(contactEl);

    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    };
  }


  componentDidUpdate(prevProps, prevState) {

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }
  

  addContacts = ({name, number}) => {
    const { contacts } = this.state;

    const contactObj = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(currentName => currentName.name === name)
      ? toast.warn(`${name} is already in contact`)
      : this.setState(prevState => ({contacts: [contactObj, ...prevState.contacts]}));
  };


  deleteContact = contactId => {
    console.log(contactId);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };


  getVisiblContact = () => {
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  };

  render() {
    const contactList = this.getVisiblContact();

    return (
      <Container>
        <Section title='Phonebook'>
          <ContactsForm onDataSubmit={this.addContacts} />
        </Section>
        <Section title='Contacts'>
          <Wrapper>
            <Filter value={this.state.filter} onFilterChange={this.changeFilter} />
            <ContactList contacts={contactList} onDeleteContact={this.deleteContact} />
          </Wrapper>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            draggable
          />
        </Section>
      </Container>
    );
  }
}*/
