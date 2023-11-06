import { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieContext from "./MovieContext";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
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
      </div>
    </>
  );
};

export default MovieList;

// Parking Lot


