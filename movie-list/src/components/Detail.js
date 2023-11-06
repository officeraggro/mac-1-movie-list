import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import MovieContext from "./MovieContext";

const Detail = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [userReview, setUserReview] = useState({
    user_score: "",
    user_review: ""
  })
  const { movie } = useContext(MovieContext);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      fetch(`http://localhost:8080/movies/${movie}`)
        .then((res) => res.json())
        .then((data) => setMovieDetail(data));
    } else {
      isMounted.current = true;
    }
  }, []);


  const handleReviewSubmit = (e) => {
    e.preventDefault()
   
    const updateUserReview = async () => {
        const response = await fetch(`http://localhost:8080/movies/${movie}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userReview),
        });
    }
    updateUserReview()
    window.location.reload(false);
  }

  return (
    <>
      <div>
        <Link to="/home">Back</Link>
        {movieDetail.map((elem, indx) => {
          return (
            <>
              <div key={indx} className="movie-detail-grid">
                <div className="movie-detail-left-item">
                  <img
                    src={elem.poster_url}
                    alt="Movie poster"
                    className="movie-poster-img-lg"
                  />
                </div>
                <div className="movie-detail-right-item">
                  <h4>{elem.title}</h4>
                  <h5>
                    {elem.genre} | {elem.release_date} | {elem.rating} |{" "}
                    {elem.runtime}
                  </h5>
                  <h5>IMDb Rating: &#11088; {elem.imdb_score}/10</h5>
                  {movieDetail.user_score !== "" ? (
                    <h5>Your Rating &#11088; {elem.user_score}/10</h5>
                  ) : (
                    <h5>Your Rating &#11088; -/10</h5>
                  )}
                  <p>
                    <strong>Directed By:</strong>&nbsp;{elem.director}
                  </p>
                  <p>
                    <strong>Plot:</strong>&nbsp;{elem.synopsis}
                  </p>
                  {movieDetail.user_score !== ""
                  ? <p><strong>Your review:</strong> {elem.user_review}</p>
                  : <p><strong>Not reviewed</strong></p>
                  }
                  <h4>Add your own score and review</h4>
                  <form className="user-rating" onSubmit={handleReviewSubmit}>
                    <label htmlFor="rating">Add a rating</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Rating..."
                      name="rating"
                      id="user_score"
                      required
                      onChange={(e) =>
                        setUserReview((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                    />
                    <br />
                    <label htmlFor="review">Add a review</label>
                    <br />
                    <br />
                    <textarea
                      name="review"
                      id="user_review"
                      rows="10"
                      cols="30"
                      required
                      onChange={(e) =>
                        setUserReview((prev) => ({
                          ...prev,
                          [e.target.id]: e.target.value,
                        }))
                      }
                    />
                    <br />
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Detail;
