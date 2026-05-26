import { motion } from 'framer-motion'

export function Skeleton({ className = '', rounded = 'rounded-xl' }) {
  return <div className={`shimmer ${rounded} ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-bg-card border border-border-default space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

export function StatsSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl bg-bg-card border border-border-default space-y-2">
          <Skeleton className="h-5 w-5 rounded-lg" />
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-2 w-12" />
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-bg-card border border-border-default">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-7 w-24 rounded-lg" />
      </div>
      <Skeleton className="h-44 w-full rounded-xl" />
    </div>
  )
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-bg-card border border-border-default">
          <Skeleton className="w-9 h-9 rounded-xl" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-36" />
          </div>
          <div className="text-right space-y-1.5">
            <Skeleton className="h-3 w-16 ml-auto" />
            <Skeleton className="h-2 w-12 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="w-10 h-10 rounded-full border-[3px] border-border-default border-t-primary animate-spin mb-3" />
      <p className="text-xs text-text-muted font-medium">Loading...</p>
    </motion.div>
  )
}

export function PriceTick({ value, prevValue, prefix = '₹', size = 'text-lg' }) {
  const isUp = value >= prevValue
  const changed = value !== prevValue
  return (
    <motion.span
      key={value}
      initial={changed ? { color: isUp ? '#22C55E' : '#EF4444' } : {}}
      animate={{ color: '#FFFFFF' }}
      transition={{ duration: 1.5 }}
      className={`${size} font-bold text-text-primary tabular-nums`}
    >
      {prefix}{value?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </motion.span>
  )
}

export function ChangeIndicator({ change, pct, size = 'text-xs' }) {
  if (change === undefined || pct === undefined) return null
  const isUp = change >= 0
  return (
    <span className={`inline-flex items-center gap-1 ${size} font-bold ${isUp ? 'text-success' : 'text-error'}`}>
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d={isUp
          ? "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
          : "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
        } clipRule="evenodd" />
      </svg>
      {isUp ? '+' : ''}{change.toFixed(2)} ({isUp ? '+' : ''}{pct.toFixed(2)}%)
    </span>
  )
}
