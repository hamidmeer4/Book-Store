import { useState,useEffect } from 'react';
import axios from 'axios'
import React from 'react'
import BookCard from '../components/BookCard';


const OtherBooks = () => {
    const [books , setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/all-books")
          .then(response => setBooks(response.data.slice(0, 8)))
          .catch(error => console.error('Error fetching books:', error));
      }, []);

    return (
        <div>
            <BookCard books={books} headline= "Other Books"/>
        </div>
    )
    }
export default OtherBooks