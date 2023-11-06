import {useContext, useEffect, useState, useRef} from 'react'
import MovieContext from "./MovieContext"

const Detail = () => {
    const [movieDetail, setMovieDetail] = useState([])
    const {movie} = useContext(MovieContext)
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            fetch(`http://localhost:8080/movies/${movie}`)
                .then(res => res.json())
                .then(data => setMovieDetail(data))
        } else {
            isMounted.current = true
        }
    }, [])

    return (
        <>
            <div>
                {movieDetail.map((elem, indx) => {
                    return (
                        <>
                        <div key={indx}>
                            <img src={elem.poster_url} alt="Movie poster" className="movie-poster-img-lg"/>
                            <h4>{elem.title}</h4>
                            <h5>{elem.genre} | {elem.release_date} | {elem.rating} | {elem.runtime}</h5>
                            <p><strong>Directed By:</strong>&nbsp;{elem.director}</p>
                            <p><strong>Plot:</strong>&nbsp;{elem.synopsis}</p>

                        </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Detail