import {Routes, Route, useNavigate} from 'react-router-dom'
import {useState} from 'react'

import "./App.css"
import Home from "./components/Home"
import Detail from "./components/Detail"
import { useEffect } from 'react'
import MovieContext from './components/MovieContext'

const App = () => {
  const navigate = useNavigate()
  const [movie, setMovie] = useState([])

  useEffect(() => {
    navigate('/home')
  }, [])

  return (
    <>
      <MovieContext.Provider value={{movie, setMovie}}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<Detail movie={movie} />} />
        </Routes>
      </MovieContext.Provider>
    </>
  );
}

export default App
