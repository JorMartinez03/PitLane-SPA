import { useParams } from 'react-router-dom'
import F1Dashboard from '../components/F1Dashboard.jsx'

export default function CalendarPage() {
  const { category } = useParams()

  return <F1Dashboard category={category} />
}
