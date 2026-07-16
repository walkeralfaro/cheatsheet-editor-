import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppStore } from "../store/useAppStore";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    className: `transition-all duration-700 ${
      visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`,
  };
}

function Row({ shortcut, label }: { shortcut: string; label: string }) {
  const parts = shortcut.split(" + ");
  return (
    <div className="flex items-center justify-between border-b border-dashed border-border py-1.5 text-sm last:border-b-0">
      <span>{label}</span>
      <span className="flex items-center gap-0.5">
        {parts.map((part, i) => (
          <span key={i} className="flex items-center gap-0.5">
            {i > 0 && <span className="text-xs text-text-muted">+</span>}
            <kbd className="rounded-md bg-key-bg px-1.5 py-0.5 font-mono text-xs font-bold text-key-text shadow-[0_1px_0_rgba(0,0,0,0.12)]">
              {part}
            </kbd>
          </span>
        ))}
      </span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-[14px] border border-border bg-surface-alt p-6 transition-all hover:translate-y-[-4px] hover:border-primary hover:shadow-[0_16px_36px_rgba(2,6,23,0.1)]">
      <div className="mb-3.5 grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-lg text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-[1.05rem] font-semibold tracking-[-0.01em]">{title}</h3>
      <p className="text-[0.95rem] text-text-muted">{text}</p>
    </div>
  );
}

export default function Landing() {
  const darkMode = useAppStore((s) => s.darkMode);
  const toggleDark = useAppStore((s) => s.toggleDark);

  const heroReveal = useReveal();
  const featuresReveal = useReveal();
  const faqReveal = useReveal();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Cheatsheet Editor",
            description:
              "Crea cheatsheets de atajos de teclado, comandos y snippets en segundos. 100% local, sin inicio de sesión y privado: tus datos nunca salen de tu navegador.",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: {
              "@type": "Person",
              name: "Walker Alfaro",
              url: "https://www.walkeralfaro.com",
            },
          }),
        }}
      />

      <header className="sticky top-0 z-10 border-b border-border bg-surface/85 backdrop-saturate-180 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-6">
          <div className="flex items-center gap-2.5 font-bold tracking-tight">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Cheatsheet Editor
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDark}
              className="inline-grid h-10 w-10 place-items-center rounded-xl border border-border bg-transparent text-lg text-text transition-colors hover:border-primary"
              aria-label="Cambiar tema"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-sm transition-all hover:translate-y-[-2px] hover:bg-primary-hover hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)]"
            >
              Abrir editor
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section
          ref={heroReveal.ref}
          className={heroReveal.className + " px-6 pb-16 pt-24 text-center md:pt-28"}
        >
          <span className="mb-5 inline-block rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            100% local · sin login
          </span>
          <h1 className="mx-auto max-w-[16ch] text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text">
            Crea cheatsheets que de verdad usas
          </h1>
          <p className="mx-auto mt-4 max-w-[56ch] text-[clamp(1.05rem,2.2vw,1.3rem)] text-text-muted">
            Reúne atajos de teclado, comandos y snippets en una sola hoja limpia.
            Rápido, privado y siempre a tu alcance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-sm transition-all hover:translate-y-[-2px] hover:bg-primary-hover hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)]"
            >
              Abrir editor gratis
            </Link>
            <a
              href="#caracteristicas"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-semibold text-text transition-all hover:translate-y-[-2px] hover:border-primary"
            >
              Ver características
            </a>
          </div>

          <div
            className="mx-auto mt-14 max-w-[920px] overflow-hidden rounded-[14px] border border-border bg-surface-alt shadow-[0_24px_60px_rgba(2,6,23,0.12)]"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2.5 border-b border-border px-4 py-3 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Cheatsheet Editor
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-4">
                <h4 className="mb-3 text-sm font-semibold text-text-muted">Editor (VS Code)</h4>
                <Row shortcut="Ctrl + K" label="Comentar línea" />
                <Row shortcut="Ctrl + Shift + F" label="Buscar en archivos" />
                <Row shortcut="Shift + Alt + F" label="Formatear" />
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <h4 className="mb-3 text-sm font-semibold text-text-muted">Terminal</h4>
                <Row shortcut="Ctrl + L" label="Limpiar pantalla" />
                <Row shortcut="Tab" label="Autocompletar" />
                <Row shortcut="Ctrl + R" label="Historial" />
              </div>
            </div>
          </div>
        </section>

        <section
          ref={featuresReveal.ref}
          className={featuresReveal.className + " px-6 py-20"}
          id="caracteristicas"
        >
          <h2 className="mb-9 text-center text-[clamp(1.6rem,4vw,2.2rem)] font-bold tracking-[-0.02em]">
            Por qué Cheatsheet Editor
          </h2>
          <div className="mx-auto grid max-w-[1080px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            <FeatureCard
              icon="⚡"
              title="100% local"
              text="Corre en tu navegador, sin servidor. Abre y edita al instante, incluso sin conexión."
            />
            <FeatureCard
              icon="🔒"
              title="Sin inicio de sesión"
              text="No hay cuentas ni registros. Entras y creas tu primera hoja en segundos."
            />
            <FeatureCard
              icon="🛡️"
              title="Privado"
              text="Tus datos se guardan en tu dispositivo. Nunca se suben a la nube ni a terceros."
            />
            <FeatureCard
              icon="🖨️"
              title="Imprimible"
              text="Exporta o imprime tu hoja lista para pegar en tu escritorio o llevar contigo."
            />
          </div>
        </section>

        <section
          ref={faqReveal.ref}
          className={faqReveal.className + " px-6 pb-24"}
        >
          <h2 className="mb-9 text-center text-[clamp(1.6rem,4vw,2.2rem)] font-bold tracking-[-0.02em]">
            Preguntas frecuentes
          </h2>
          <div className="mx-auto max-w-[1080px]">
            <details className="mb-3 rounded-xl border border-border bg-surface-alt px-5" open>
              <summary className="cursor-pointer list-none py-3.5 font-semibold after:float-right after:text-primary after:content-['+'] open:after:content-['\2013']">
                ¿Mis datos se suben a la nube?
              </summary>
              <p className="mb-4 text-text-muted">
                No. Todo se guarda localmente en tu navegador (localStorage). Nada sale de tu
                dispositivo y no hay servidores involucrados.
              </p>
            </details>
            <details className="mb-3 rounded-xl border border-border bg-surface-alt px-5">
              <summary className="cursor-pointer list-none py-3.5 font-semibold after:float-right after:text-primary after:content-['+'] open:after:content-['\2013']">
                ¿Necesito crear una cuenta?
              </summary>
              <p className="mb-4 text-text-muted">
                No. La aplicación no tiene inicio de sesión ni registro. La abres y empiezas a crear
                cheatsheets de inmediato.
              </p>
            </details>
            <details className="mb-3 rounded-xl border border-border bg-surface-alt px-5">
              <summary className="cursor-pointer list-none py-3.5 font-semibold after:float-right after:text-primary after:content-['+'] open:after:content-['\2013']">
                ¿Funciona sin internet?
              </summary>
              <p className="mb-4 text-text-muted">
                Sí. Una vez cargada, funciona de forma local. Ideal para consultar tus atajos aunque
                pierdas conexión.
              </p>
            </details>
            <details className="mb-3 rounded-xl border border-border bg-surface-alt px-5">
              <summary className="cursor-pointer list-none py-3.5 font-semibold after:float-right after:text-primary after:content-['+'] open:after:content-['\2013']">
                ¿Puedo imprimir o exportar mi hoja?
              </summary>
              <p className="mb-4 text-text-muted">
                Sí. La vista de impresión está optimizada para llevar tu cheatsheet en físico o
                guardarlo como PDF.
              </p>
            </details>
            <div className="mt-8 flex justify-center">
              <Link
                to="/editor"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-sm transition-all hover:translate-y-[-2px] hover:bg-primary-hover hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)]"
              >
                Crear mi cheatsheet
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-text-muted">
        <div className="px-6">
          Cheatsheet Editor — hecho con cariño por{" "}
          <a
            href="https://www.walkeralfaro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary no-underline"
          >
            Walker Alfaro
          </a>
        </div>
      </footer>
    </>
  );
}
