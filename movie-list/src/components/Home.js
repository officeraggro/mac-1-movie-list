import { useEffect, useState, useRef , useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import MovieContext from './MovieContext'
import MovieList from './MovieList'

const Home = () => {
    const {setMovie} = useContext(MovieContext)
    const navigate = useNavigate()

    return (
      <>
        <div className="top-bar">
            <h1 className="top-title">Mini App 1: Movie List</h1>
        </div>
        <div className="banner-pad"></div>
        <MovieList />
      </>

    );
}

export default Home