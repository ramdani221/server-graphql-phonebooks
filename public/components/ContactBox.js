import ContactList from './ContactList';
import ContactBar from './ContactBar';
import { useState } from 'react';

export default function ContactBox() {

    const [filter, setFilter] = useState({ keyword: '', sort: 'asc' });

    const filterContact = (keyword) => {
        setFilter({ ...filter, keyword });
    }

    const sortContatc = (sort) => {
        setFilter({ ...filter, sort })
    }

    return (
        <div className="App-header">
            <ContactBar find={filterContact} sort={sortContatc} />
            <ContactList filter={filter} />
        </div>
    )
}