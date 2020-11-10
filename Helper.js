const axios = require('axios');

async function getAllBooks() {
    try {
      const response = await axios.get('http://localhost:3090/books');
      console.log(response.data);
      return response.data; 
    } catch (error) {
      console.error(error);
    }
}

async function getBookByID(id) {
    try {
      const response = await axios.get(`http://localhost:3090/books/${id}`);
      console.log(response.data);
      return response.data; 
    } catch (error) {
      console.error(error);
    }
}

async function DeleteBook(id) {
    try {
        let res = await axios.delete(`http://localhost:3090/books/delete/${id}`);
        console.log(res.status);
        return true; 
      } catch (error) {
        console.error(error);
        return false;
      }
    
}

async function InsertBook(params) {
    try {

        params = {
            title: params.title,
            author: params.author,
            date_of_publication: params.date,
            book_category: params.category,
          }
    
        let res = await axios.post('http://localhost:3090/books/add', params);
    
        console.log(res.data);

        return true; 
      } catch (error) {
        console.error(error);
        return false;
      }
    
}

async function UpdateBook(id,params) {
    try {

        params = {
            title: params.title,
            author: params.author,
            date_of_publication: params.date,
            book_category: params.category,
          }
    
        let res = await axios.put(`http://localhost:3090/books/update/${id}`, params);
    
        console.log(res.data);

        return true; 
      } catch (error) {
        console.error(error);
        return false;
      }
    
}

let categories = ['Fantasy','Adventure','Romance','Contemporary','Mystery','Horror','Paranormal','Historical Fiction','Science Fiction','Memoir','Cooking','Motivational','Health','Humor'];


module.exports = 
{
    getAllBooks,getBookByID,DeleteBook,InsertBook,UpdateBook,categories
}