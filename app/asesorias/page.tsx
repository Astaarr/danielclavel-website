export default function AsesoriasPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          Asesorias 1:1
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
          Rellena el Formulario para analizar tu caso y empezar a trabajar juntos para conseguir tu mejor version.
        </p>
      </header>

      <form className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_12px_28px_-22px_rgba(0,0,0,0.55)] dark:border-neutral-800 dark:bg-neutral-950 sm:p-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Nombre
          <input
            type="text"
            name="nombre"
            className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none transition focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            placeholder="Tu nombre"
          />
        </label>

        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Email
          <input
            type="email"
            name="email"
            className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none transition focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            placeholder="tu@email.com"
          />
        </label>

        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Objetivo
          <textarea
            name="objetivo"
            rows={4}
            className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none transition focus:border-amber-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
            placeholder="Que quieres trabajar en la asesoria?"
          />
        </label>

        <a
          href="https://forms.gle/LBuzjmRJ7cKpkzqH7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-xl border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
        >
          Ir al formulario
        </a>
      </form>
    </main>
  );
}
