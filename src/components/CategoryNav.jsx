const CATEGORIES = ['F1', 'F2', 'F3']

const CATEGORY_COLORS = {
  F1: 'after:bg-f1-red',
  F2: 'after:bg-blue-500',
  F3: 'after:bg-emerald-500',
}

export default function CategoryNav({ activeCategory, onSelect }) {
  return (
    <nav className="flex justify-center gap-1 p-1 rounded-xl bg-f1-carbon border border-f1-gray w-fit mx-auto">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              relative px-6 py-2.5 text-sm font-semibold tracking-widest uppercase
              rounded-lg transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? 'text-white bg-f1-red shadow-lg shadow-f1-red/30'
                  : 'text-f1-silver hover:text-white hover:bg-white/5'
              }
            `}
          >
            {cat}
          </button>
        )
      })}
    </nav>
  )
}
