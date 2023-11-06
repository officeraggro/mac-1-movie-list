import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieContext from "./MovieContext";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    synopsis: "",
    release_date: "",
    rating: "",
    runtime: "",
    director: "",
    poster_url: "",
    imdb_score: "",
    user_score: "",
    user_review: "",
    watch: false,
    to_watch: false
  })

  const { setMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const handleClick = (id) => {
    setMovie(id);
    navigate(`/movie/${id}`);
  };

  const handleChange = (e) => {
    setNewMovie((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    })
    )
  }

  const handleNewMovieSubmit = (e) => {
    e.preventDefault()
    
    const postNewMovie = async () => {
        const response = await fetch('http://localhost:8080/movies', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newMovie)
        })
    }
    postNewMovie()
    window.location.reload(false)
  }

  return (
    <>
      <div className="movie-list-container">
        <div className="searchbar">
          <form className="search">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="movie-flex-container">
          {movies
            .filter((elem) => {
              return search.toLowerCase() === ""
                ? elem
                : elem.title.toLowerCase().includes(search);
            })
            .map((elem, indx) => {
              return (
                <>
                  <div className="movie-flex-card" key={indx}>
                    <img
                      src={elem.poster_url}
                      alt="Movie poster"
                      className="movie-poster-img-sm"
                      onClick={(e) => handleClick(elem.id)}
                    />
                    <div className="movie-flex-vitals">
                      <h4 className="movie-title">{elem.title}</h4>
                      <p className="movie-vitals">
                        {elem.release_date} | {elem.rating} | {elem.runtime}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="new-movie-container">
          <form className="movie-input" onSubmit={handleNewMovieSubmit}>
            <h3>Fill out the form below to add a new movie</h3>
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="genre">Genre</label>
            <br />
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="synopsis">Plot</label>
            <br />
            <input
              type="text"
              placeholder="Synopsis"
              name="synopsis"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="release_date">Release Date</label>
            <br />
            <input
              type="text"
              placeholder="Release Date"
              name="release_date"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="rating">Rating</label>
            <br />
            <input
              type="text"
              placeholder="Rating"
              name="rating"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="runtime">Runtime</label>
            <br />
            <input
              type="text"
              placeholder="Runtime"
              name="runtime"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="director">Director</label>
            <br />
            <input
              type="text"
              placeholder="Director"
              name="director"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="poster_url">Link to poster image</label>
            <br />
            <input
              type="text"
              placeholder="Poster"
              name="poster_url"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="imdb_score">iMDB Score</label>
            <br />
            <input
              type="text"
              placeholder="Score"
              name="imdb_score"
              onChange={handleChange}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MovieList;

// Parking Lot


