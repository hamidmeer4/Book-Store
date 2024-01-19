import { Button, Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react";
import axios from "axios";
import { useState } from "react";

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non Fiction",
    "Mistery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "BibbloGraphy",
    "Autobigraphy",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );

  const handleChanceSelectedValue = (e) => {
    setSelectedBookCategory(e.target.value);
  };
  // handle Book Sumission

  const handleBookSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPdfUrl = form.bookPdfUrl.value;
    
    const bookObj = {
      bookTitle,authorName,imageURL,category,bookDescription,bookPdfUrl

    }
    console.log(bookObj)
    setSelectedBookCategory(bookObj)
  // send data to the database using Axios
  axios
  .post("http://localhost:4000/upload-books", bookObj, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    alert("Book uploaded successfully!");
    form.reset();
  })
  .catch((error) => {
    console.error("Error uploading book:", error);
    // Handle error as needed
  });
};
  return (
    <div className="px-4 my-6">
      <h2 className="mb-8 text-3xl font-bold">Uplaod a book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1020px] flex-col flex-wrap gap-4">
        {/* First Row  */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput
              id="bookTitle"
              name="bookTitle"
              type="text"
              placeholder="Enter Book Title"
              required
            />
          </div>

          {/* Author Name */}

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput
              id="authorName"
              name="authorName"
              type="text"
              placeholder="Author Name"
              required
            />
          </div>
        </div>



        {/*  Row  */}
        {/* image Url  */}

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image Url" />
            </div>
            <TextInput
              id="imageURL"
              name="imageURL"
              type="text"
              placeholder="Book Image Url "
              required
            />
          </div>

          {/* Category */}

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>

            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={selectedBookCategory}
              onChange={handleChanceSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
         

        {/* book Description */}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea
           id="bookDescription"
           name="bookDescription"
            placeholder="Write your book description..."
            required
            className="w-full "
            rows={4}
          />

        </div>

        {/* Book Upload pdf */}

        <div>
        <div className="mb-2 block">
          <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
        </div>
        <TextInput id="bookPdfUrl" name="bookPdfUrl" type="text" placeholder="book pdf url" required />
      </div>

      <Button type="submit" className="mt-5">Upload Book</Button>

      </form>
    </div>
  );
};

export default UploadBook;
