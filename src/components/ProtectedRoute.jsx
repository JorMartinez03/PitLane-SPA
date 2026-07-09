import { useAuth } from '../context/AuthContext.jsx'
import Paywall from './Paywall.jsx'

export default function ProtectedRoute({ children, requiredProfile = 'Premium' }) {
  const { profile } = useAuth()

  if (profile === 'Administrador') return children

  const profiles = { Gratuito: 0, Premium: 1, Administrador: 2 }
  if (profiles[profile] >= profiles[requiredProfile]) return children

  return <Paywall onBack={() => window.history.back()} />
}
