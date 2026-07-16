interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className={`shrink-0 border-t border-border bg-surface px-3 py-2 text-center text-xs text-text-muted ${className}`}
    >
      made with{" "}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mx-1 inline-block h-3 w-3 text-red-500 align-middle"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>{" "}
      by{" "}
      <a
        href="https://www.walkeralfaro.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        Walker Alfaro
      </a>
    </footer>
  );
}
