import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import ExtrasPage from './pages/ExtrasPage.jsx'
import ClasificacionesPage from './pages/ClasificacionesPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar/:category" element={<CalendarPage />} />
        <Route path="/extras" element={<ExtrasPage />} />
        <Route path="/clasificaciones/:category" element={<ClasificacionesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
