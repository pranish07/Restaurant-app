import React from 'react'
import { Route, Routes } from 'react-router'
import { DishDetail } from './pages/DishDetail/DishDetail'
import { Home } from './pages/Home/Home'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/restaurants/:id" element={<DishDetail />} />
      </Routes>
    </div>
  )
}
