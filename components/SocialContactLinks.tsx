import { CONTACT } from "@/lib/contact";

const iconBtn =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand-dark";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.17 0-3.553.012-4.793.069-1.06.048-1.634.23-2.015.382-.507.197-.87.433-1.252.815-.382.382-.618.745-.815 1.252-.152.381-.334.955-.382 2.015-.057 1.24-.069 1.623-.069 4.793s.012 3.553.069 4.793c.048 1.06.23 1.634.382 2.015.197.507.433.87.815 1.252.382.382.745.618 1.252.815.381.152.955.334 2.015.382 1.24.057 1.623.069 4.793.069s3.553-.012 4.793-.069c1.06-.048 1.634-.23 2.015-.382.507-.197.87-.433 1.252-.815.382-.382.618-.745.815-1.252.152-.381.334-.955.382-2.015.057-1.24.069-1.623.069-4.793s-.012-3.553-.069-4.793c-.048-1.06-.23-1.634-.382-2.015-.197-.507-.433-.87-.815-1.252-.382-.382-.745-.618-1.252-.815-.381-.152-.955-.334-2.015-.382-1.24-.057-1.623-.069-4.793-.069zM12 7.378a4.622 4.622 0 100 9.244 4.622 4.622 0 000-9.244zm0 7.602a2.98 2.98 0 110-5.96 2.98 2.98 0 010 5.96zm5.806-7.77a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.78l-.933.312a12.04 12.04 0 005.516 5.516l.312-.933a1.5 1.5 0 011.78-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V4.5A1.5 1.5 0 012 3.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SocialContactLinks({
  labels,
  showEmail = true,
  showPhone = true,
  showSocial = true,
  layout = "stacked",
  className = "",
}: {
  labels: {
    email: string;
    phone: string;
    instagram: string;
    facebook: string;
  };
  showEmail?: boolean;
  showPhone?: boolean;
  showSocial?: boolean;
  layout?: "stacked" | "inline";
  className?: string;
}) {
  const rowClass =
    layout === "inline"
      ? "flex flex-wrap items-center gap-3"
      : "flex flex-col gap-3";

  return (
    <div className={`${rowClass} ${className}`}>
      {(showEmail || showPhone) && (
        <ul className="space-y-2 text-sm">
          {showPhone && (
            <li>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="group flex items-center gap-2.5 font-medium text-foreground transition hover:text-brand-dark"
              >
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-dark"
                  aria-hidden
                >
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted">{labels.phone}</span>
                  {CONTACT.phoneDisplay}
                </span>
              </a>
            </li>
          )}
          {showEmail && (
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-2.5 font-medium text-foreground transition hover:text-brand-dark"
              >
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-dark"
                  aria-hidden
                >
                  <MailIcon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted">{labels.email}</span>
                  {CONTACT.email}
                </span>
              </a>
            </li>
          )}
        </ul>
      )}

      {showSocial && (
        <div className="flex items-center gap-2">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            aria-label={labels.instagram}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            aria-label={labels.facebook}
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>
      )}
    </div>
  );
}
