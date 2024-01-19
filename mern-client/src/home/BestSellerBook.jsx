import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../components/BookCard'

const BestSellerBook = () => {
    const [books , setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/all-books")
          .then(response => setBooks(response.data.slice(0, 8)))
          .catch(error => console.error('Error fetching books:', error));
      }, []);
    return (
        <div>
            <BookCard books={books} headline= "Best Seller Books"/>
        </div>
    )
}

export default BestSellerBook