export default function Loading() {
  return (
    <section className="wrap py-20">
      <div className="h-10 w-52 rounded bg-slate-800 animate-pulse mb-10" />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-28 rounded-2xl bg-slate-800/70 animate-pulse mb-4"
        />
      ))}
    </section>
  )
}
