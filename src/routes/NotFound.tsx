import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-surface px-6 text-center">
      <p className="font-mono text-6xl font-bold text-primary">404</p>
      <div>
        <h1 className="text-2xl font-semibold text-text">Página no encontrada</h1>
        <p className="mt-2 text-text-muted">
          La ruta que buscas no existe o fue movida.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          to="/editor"
          className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-white transition hover:bg-primary-hover"
        >
          Abrir editor
        </Link>
        <a
          href="/"
          className="rounded-lg border border-border px-5 py-2.5 font-semibold text-text transition hover:border-primary"
        >
          Ir a la landing
        </a>
      </div>
    </div>
  );
}
