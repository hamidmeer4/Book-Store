import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageBook = () => {
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/all-books")
      .then(response => setAllBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // delete a book
  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:4000/books/${id}`)
      .then(response => {
        alert("Book is deleted successfully!");
        // Refresh the book list or update the state as needed
      })
      .catch(error => console.error('Error deleting book:', error));
  };
  return (
    <div className='px-4 my-12'>
       <h2 className="mb-8 text-3xl font-bold">Manage Your Book</h2>

       {/* table for book data  */}
       <Table striped className='lg:w-[1020px]'>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Book Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Prices</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {
            allBooks.map((book,index) =>  <Table.Body className="divide-y" key={book._id}>
               <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
             {book.bookTitle}
            </Table.Cell>
            <Table.Cell>{book.authorName}</Table.Cell>
            <Table.Cell>{book.category}</Table.Cell>
            <Table.Cell>$10.00</Table.Cell>
            <Table.Cell>
              <Link to={`/admin/dashboard/edit-books/${book._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5">
                Edit
              </Link>
              <button onClick={() => handleDelete(book._id)}  className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>Delete</button>
            </Table.Cell>
          </Table.Row>
            </Table.Body> 
            )
          }
       
      </Table>


    </div>
  )
}

export default ManageBook