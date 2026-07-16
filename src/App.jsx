import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LiveRaceProvider } from './context/LiveRaceContext.jsx'
import OfflineIndicator from './components/OfflineIndicator.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const CalendarPage = lazy(() => import('./pages/CalendarPage.jsx'))
const ExtrasPage = lazy(() => import('./pages/ExtrasPage.jsx'))
const ClasificacionesPage = lazy(() => import('./pages/ClasificacionesPage.jsx'))
const LiveRacePage = lazy(() => import('./pages/LiveRacePage.jsx'))
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage.jsx'))
const AdminPanelPage = lazy(() => import('./pages/AdminPanelPage.jsx'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-f1-black flex items-center justify-center">
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-f1-carbon rounded-lg w-48 mx-auto" />
        <div className="h-4 bg-f1-carbon rounded-lg w-32 mx-auto" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LiveRaceProvider>
        <OfflineIndicator />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendar/:category" element={<CalendarPage />} />
            <Route path="/extras" element={<ExtrasPage />} />
            <Route path="/clasificaciones/:category" element={<ClasificacionesPage />} />
            <Route path="/en-vivo" element={<LiveRacePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </LiveRaceProvider>
    </BrowserRouter>
  )
}
