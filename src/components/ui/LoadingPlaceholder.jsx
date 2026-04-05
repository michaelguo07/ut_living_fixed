export default function LoadingPlaceholder({ message = 'Searching for apartments…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-stone-300 bg-stone-50 py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#BF5700] border-t-transparent" />
      <p className="text-sm font-medium text-stone-600">{message}</p>
    </div>
  )
}
