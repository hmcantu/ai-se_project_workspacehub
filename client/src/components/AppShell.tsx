import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navClassName = ({ isActive }: { isActive: boolean }) =>
  [
    // Below `sm` links render as full-width stacked rows (block + list
    // stretch); from `sm` up they shrink back to inline pills.
    "block px-4 py-2.5 text-sm transition active:opacity-70 sm:py-2",
    isActive
      ? "pointer-events-none rounded-[28px] border border-slate-200 bg-white font-semibold text-ink"
      : "rounded-[8px] font-medium text-ink sm:text-slate-500 sm:hover:text-ink",
  ].join(" ");

const logoutButtonClassName =
  "rounded-[12px] bg-ink px-[18px] py-2.5 text-sm font-medium text-white transition hover:opacity-80 active:opacity-70";

/**
 * App layout with a responsive header.
 *
 * Breakpoints:
 * - >= `nav` (1080px): logo, inline nav links, and user info in a single row.
 * - < `nav`: links collapse behind a hamburger toggle; when open they render
 *   in wrapping rows underneath the header. Username and logout stay in the
 *   header row.
 * - < `sm` (640px): the name/role text leaves the header row; links stack
 *   vertically as full-width rows; an initials avatar with the user's name,
 *   email, and logout renders in a footer at the bottom of the panel.
 */
export const AppShell = () => {
  const { logout, organization, user, isFeatureEnabled } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Reset to the normal inline layout when the viewport grows past the `nav`
  // breakpoint, so the menu isn't left open (or reopened) after resizing.
  // Keep this width in sync with `screens.nav` in tailwind.config.js.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1080px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const initials = [user?.firstName?.[0], user?.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  const avatar = (
    <span
      aria-hidden="true"
      className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] font-bold text-ink"
    >
      {initials}
    </span>
  );

  const userInfo = (
    <div>
      <p className="text-sm font-semibold text-ink">
        {user?.firstName} {user?.lastName}
      </p>
      <p className="text-xs capitalize text-slate-500">{user?.role}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 md:px-6">
        <header className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase text-brand">
                {organization?.slug}
              </p>
              <p className="text-2xl font-extrabold text-ink">WorkspaceHub</p>
            </div>
            {/* `order-last w-full` drops the nav onto its own row below the
                header when collapsed; at >= nav it returns to DOM order,
                sitting inline between the logo and the user section. */}
            <nav
              className={[
                "order-last w-full nav:order-none nav:block nav:w-auto",
                menuOpen ? "" : "hidden",
              ].join(" ")}
              id="primary-nav"
            >
              <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-2">
                <li>
                  <NavLink className={navClassName} onClick={closeMenu} to="/">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navClassName}
                    onClick={closeMenu}
                    to="/projects"
                  >
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navClassName}
                    onClick={closeMenu}
                    to="/tasks"
                  >
                    Tasks
                  </NavLink>
                </li>
                {isFeatureEnabled("scheduling") ? (
                  <li>
                    <NavLink
                      className={navClassName}
                      onClick={closeMenu}
                      to="/bookings"
                    >
                      Bookings
                    </NavLink>
                  </li>
                ) : null}
                <li>
                  <NavLink
                    className={navClassName}
                    onClick={closeMenu}
                    to="/settings/organization"
                  >
                    Organization
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navClassName}
                    onClick={closeMenu}
                    to="/settings/features"
                  >
                    Feature Flags
                  </NavLink>
                </li>
              </ul>
              {/* Below `sm`, user identity and logout live in a panel footer
                  instead of the header row. */}
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 px-2 pt-4 sm:hidden">
                <div className="flex items-center gap-3">
                  {avatar}
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  className={logoutButtonClassName}
                  onClick={logout}
                  type="button"
                >
                  Log out
                </button>
              </div>
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">{userInfo}</div>
              <button
                className={`hidden sm:block ${logoutButtonClassName}`}
                onClick={logout}
                type="button"
              >
                Log out
              </button>
              <button
                aria-controls="primary-nav"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="rounded-[8px] border border-slate-200 bg-white p-2.5 text-ink transition hover:bg-slate-50 active:opacity-70 nav:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                type="button"
              >
                {menuOpen ? (
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    viewBox="0 0 20 20"
                    width="20"
                  >
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    viewBox="0 0 20 20"
                    width="20"
                  >
                    <path d="M3 5h14M3 10h14M3 15h14" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>
        <main className="mt-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
