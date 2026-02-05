export default function CTA() {
  return (
    <section className="px-6 py-24 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 rounded-[3rem] bg-linear-to-br from-primary to-buksu-blue p-10 text-white shadow-2xl shadow-primary/20 lg:flex-row lg:p-20">
        <div className="flex max-w-125 flex-col gap-4 text-center lg:text-left">
          <h2 className="text-4xl leading-tight font-black lg:text-5xl">Ready to lead with precision?</h2>
          <p className="text-lg font-medium opacity-90">Experience the gold standard of attendance management at BukSU.</p>
        </div>
        <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
          <input
            className="h-14 min-w-75 rounded-2xl border-white/20 bg-white/10 px-6 text-white transition-all placeholder:text-white/60 focus:bg-white/20 focus:ring-white"
            placeholder="Your student email"
            type="email"
          />
          <button className="h-14 rounded-2xl bg-white px-10 font-black text-primary shadow-xl transition-all hover:bg-slate-100 active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
