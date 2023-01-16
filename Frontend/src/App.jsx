import React from 'react'
import All from './All'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import './index.css'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/all" element={<All />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App