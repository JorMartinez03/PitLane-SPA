import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import ExtrasPage from './pages/ExtrasPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar/:category" element={<CalendarPage />} />
        <Route path="/extras" element={<ExtrasPage />} />
      </Routes>
    </BrowserRouter>
  )
}
