import React, { useState, useEffect, useContext, createContext } from "react";
import "../../styles/home.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";


// Creamos un contexto para almacenar los libros favoritos
export const FavoritesContext = createContext();

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [popularBooks, setPopularBooks] = useState([]);
	const [romanceBooks, setRomanceBooks] = useState([]);
	const [suspenseBooks, setSuspenseBooks] = useState([]);
 	const [favorites, setFavorites] = useState([]);

  // Función para agregar un libro a favoritos
  const addToFavorites = (book) => {
    setFavorites([...favorites, book]);
  };

  useEffect(() => {
    // Función para obtener libros por categoría
    const fetchBooksByCategory = async (category, setter) => {
      try {
        const response = await fetch(`https://openlibrary.org/subjects/${category}.json?limit=6`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setter(data.works);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    // Obtenemos libros populares, de romance y de suspense al cargar el componente
    fetchBooksByCategory('popular', setPopularBooks);
    fetchBooksByCategory('romance', setRomanceBooks);
    fetchBooksByCategory('suspense', setSuspenseBooks);
  }, []);

  return (
    <Container>
      <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      <div className="grid-container">
        <Row>
          <h2>Libros populares</h2>
          {popularBooks.map((book) => (
            <Col className="col-2" key={book.key} md={2}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </div>
      <div className="grid-container">
        <Row>
          <h2>Mis libros favoritos</h2>
          {favorites.map((book) => (
            <Col key={book.key} md={2}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </div>
      <div className="grid-container">
        <Row>
          <h2>Libros de Romance</h2>
          {romanceBooks.map((book) => (
            <Col key={book.key} md={2}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </div>
      <div className="grid-container">
        <Row>
          <h2>Libros de Suspense</h2>
          {suspenseBooks.map((book) => (
            <Col key={book.key} md={2}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </div>
      </FavoritesContext.Provider>
    </Container>
  );
};

const BookCard = ({ book }) => {
  const { addToFavorites } = useContext(FavoritesContext);

  return (
    <Card className="d-flex flex-column h-100">
      <Card.Img className="card-img-top" variant="top" src={`https://covers.openlibrary.org/b/id/${book.cover_id ? book.cover_id : 'default'}-M.jpg`} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.authors[0].name}</Card.Text>
		    <Link to={`/books${book.key}`}>
          <button className="btn btn-success">VER LIBRO</button>
        </Link>
        
        <button className="btn btn-danger" onClick={() => addToFavorites(book)}><i className="fa fa-heart"></i></button>
      </Card.Body>
    </Card>
  );
};

export default Home;