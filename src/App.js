import React, { useState } from "react";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import "./index.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const onInputChange = e => {
    setSearchTerm(e.target.value);
  };

  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
    const result = await axios.get(`${API_URL}?q=${searchTerm}`);
    setBooks(result.data);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    fetchBooks();
  };

  const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


  const bookAuthors = authors => {
    if(authors === undefined){
      return authors;
    }
    if (authors.length <= 2) {
      authors = authors.join(", ");
    } 
    else if (authors.length > 2) {
      let lastAuthor = " and " + authors.slice(-1);
      authors.pop();
      authors = authors.join(", ");
      authors += lastAuthor;
    }
    return authors;
  };
  const changeBg = color => {
    document.body.style.backgroundColor = "white";
  };
  const classes = useStyles();

  
return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h">Search for Books</Typography>
        <form className={classes.form}  onSubmit={onSubmitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="search"
            autoFocus
            onChange={onInputChange}
            value={searchTerm}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => changeBg("red")}
          >
            Search
          </Button>
        </form>
      </div>
    
    <ul>
        {books.items.map((book, index) => {
          return(
            <li key={index}>
              <div>
                <img
                
                  alt={`${book.volumeInfo.title} book`}
                  src={`http://books.google.com/books/content?id=${
                    book.id
                  }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                  
                />
                <div>
                <Typography component="h3" variant="h" >{book.volumeInfo.title}
                
                </Typography>
                  <h3>
                  By: {bookAuthors(book.volumeInfo.authors)}
                    </h3>
                  <p> {book.volumeInfo.publishedDate}</p>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
      </Container>
);
      }
      

    /*
    <section>
      <form onSubmit={onSubmitHandler}>
        <label>
          <span>Search for books</span>
          <input
            type="search"
            value={searchTerm}
            onChange={onInputChange}
          />
          <button type="submit">Search</button>
        </label>
      </form>
      <ul>
        {books.items.map((book, index) => {
          return (
            <li key={index}>
              <div>
                <img
                  alt={`${book.volumeInfo.title} book`}
                  src={`http://books.google.com/books/content?id=${
                    book.id
                  }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                />
                <div>
                  <h3>{book.volumeInfo.title}</h3>
                  <h3>
                  By: {bookAuthors(book.volumeInfo.authors)}
                    </h3>
                  <p> {book.volumeInfo.publishedDate}</p>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
*/
export default App;
