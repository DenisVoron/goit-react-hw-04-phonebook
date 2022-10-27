import { useState, useEffect} from 'react';

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
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contactHook')) ?? [];
  });
  const [filter, setFilter] = useState('');

  const addContacts = ({ name, number }) => {

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
  };

  useEffect(() => {
    window.localStorage.setItem('contactHook', JSON.stringify(contacts))
  }, [contacts]);

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
