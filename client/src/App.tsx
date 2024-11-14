import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import AttackPage from './pages/AttackPage/AttackPage'

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />}/>
        <Route path="/attack" element={<AttackPage />} />
        <Route path='*' element={<LoginPage/>} />
      </Routes>
    </div>
  )
}

export default App