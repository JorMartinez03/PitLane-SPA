import { useAuth } from '../context/AuthContext.jsx'
import Paywall from './Paywall.jsx'

export default function ProtectedRoute({ children, requiredProfile = 'Premium' }) {
  const { profile } = useAuth()

  const profiles = { Gratuito: 0, Premium: 1 }
  if (profiles[profile] >= profiles[requiredProfile]) return children

  return <Paywall onBack={() => window.history.back()} />
}
