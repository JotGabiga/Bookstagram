import React, { useEffect, useState } from "react";
import "./BookPage.scss";
import bookCover from "./assets/book-cover.jpg";
import bookcrossing from "./assets/bookcrossing.png";
import Button from "@material-ui/core/Button";
import { StylesProvider } from "@material-ui/core/styles";
import ratingStar from "./assets/star-solid.svg";
import TextField from "@material-ui/core/TextField";
import RatingStars from "../RatingStars/RatingStars";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const BookPage = (props) => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [book, setBook] = useState({});

  useEffect(() => {
    axios
      .get(`https://bookcrossing-api.herokuapp.com/books/${id}`)
      .then((res) => {
        // console.log(res.data)
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err)
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function printElements(array) {
    return array.join(", ");
  }

  return (
    <section className="bookPage">
      <StylesProvider injectFirst>
        <section className="bookSection">
          <aside className="bookCoverSec">
            <img src={book.cover} alt="book cover"></img>
          </aside>
          <section className="bookDesSec">
            <section className="bookDes">
              <header>{book.title}</header>
              <h6>{printElements(book.authors)}</h6>
              <h6>{printElements(book.tags)}</h6>
            </section>
            <section className="actionSection">
              <div className="ratingSection">
                <h6>Oceń książkę</h6>
                <div className="ratingStarsSection">
                  <RatingStars votes={book.votes}></RatingStars>
                </div>
                <text>Ocena: {book.rating || 0} /10</text>
              </div>
              <section className="bookcrossingSection">
                <Button
                  classes={{ root: "button", label: "button-label" }}
                  variant="contained"
                >
                  <img src={bookcrossing} alt="bookcrossing" />
                </Button>
                <section className="bookcrossingSectionDes">
                  <h6>Bookcrossing</h6>
                  <text>27 użytkowników chcę wymienić tę ksiązkę </text>
                </section>
              </section>
            </section>
            <article>{book.description}</article>
            <Button
              classes={{ root: "basicButton", label: "basicButton-label" }}
              variant="contained"
            >
              Dodaj na półkę
            </Button>
          </section>
        </section>
        <section className="commentSection">

        <div className="profileDiv"></div>


        
            <section className="commentInputSection">
             
              <form noValidate autoComplete="off">
                <TextField
                  style={{
                    width: "100%",
                  }}
                  label="Dodaj komentarz"
                />
              </form>
              <section className="checkboxSec">
            <FormControlLabel
              control={<Checkbox name="checkedC" />}
              label="Uwaga Spoiler! Ten temat może zawierać treści zdradzające fabułę."
            />
            <button>
              Usuń
            </button>
             <Button
              classes={{ root: "basicButton", label: "basicButton-label" }}
              variant="contained"
            >
              Dodaj
            </Button>
          </section>
            </section>
            
         





        </section>
      </StylesProvider>
    </section>
  );
};
export default BookPage;
