import ContactData from "./ContactData"
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PHONEBOOKS } from "../graphql/gql";

export default function ContactList({ filter }) {
    const [pageNum, setPageNum] = useState({ page: 2 })
    const { loading, error, data } = useQuery(GET_PHONEBOOKS, {
        variables: {page: 1, limit: 60, ...filter}
    })

    // const handleScroll = useCallback(() => {
    //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
    //         return;
    //     }
    //     setIsLoading(true);
    //     setError(null);
    //     if (contacts.page >= contacts.pages) return setIsLoading(false);
    //     dispatch(loadPage({ ...filter, ...pageNum, limit: contacts.limit }))
    //     setPageNum({ page: (pageNum.page + 1) })
    //     setIsLoading(false)
    // }, [pageNum, dispatch, contacts.page, contacts.pages, filter, isLoading, contacts.limit]);

    // useEffect(() => {

    //     setPageNum({ page: 2 })
    //     dispatch(loadContact({ ...filter, limit: contacts.limit }))
    // }, [dispatch, filter, contacts.limit])

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [isLoading, handleScroll]);

    if (loading) return <view className="loading">Loading...</view>;

    if (error) return <view className="error">Error! {error.message}</view>;


    console.log(data.getPhonebooks.phonebooks)

    if(error) console.log(error)
    const contactsNode = data.getPhonebooks.phonebooks.map((item, index) => (<ContactData contact={item} key={index} />));
    return (
        <div className="contact-list">
            {contactsNode}
        </div>
    )
}