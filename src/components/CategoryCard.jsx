import { Link } from 'react-router-dom'

const GRADIENTS = {
  F1: 'from-red-600 to-red-800',
  F2: 'from-blue-500 to-blue-700',
  F3: 'from-emerald-500 to-emerald-700',
  IndyCar: 'from-indigo-500 to-indigo-700',
  NASCAR: 'from-amber-500 to-amber-700',
  WEC: 'from-purple-500 to-purple-700',
  MotoGP: 'from-orange-500 to-orange-700',
}

const LABELS = {
  F1: 'Fórmula 1',
  F2: 'Fórmula 2',
  F3: 'Fórmula 3',
}

export default function CategoryCard({ category, raceCount, to, gradient, label }) {
  const bgGradient = gradient || GRADIENTS[category] || 'from-f1-gray to-f1-carbon'
  const displayLabel = label || LABELS[category] || category

  return (
    <Link
      to={to || `/calendar/${category}`}
      className={`
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${bgGradient}
        p-8 transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5
        cursor-pointer
      `}
    >
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/5 rounded-full blur-xl transition-transform duration-300 group-hover:scale-150" />
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-black/10 rounded-full blur-xl" />

      <div className="relative">
        <span className="block text-6xl font-black text-white/10 select-none">
          {category.slice(0, 2).toUpperCase()}
        </span>
        <h3 className="text-2xl font-bold text-white mt-1">
          {displayLabel}
        </h3>
        <p className="text-white/60 text-sm font-medium mt-1">
          {raceCount} carrera{raceCount !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="relative mt-6 flex items-center gap-1 text-white/40 text-sm font-medium group-hover:text-white/70 transition-colors">
        <span>Ver calendario</span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
      </div>
    </Link>
  )
}
