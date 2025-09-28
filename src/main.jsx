import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero'
import Congrats from './pages/Congrats'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/congrats" element={<Congrats />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)