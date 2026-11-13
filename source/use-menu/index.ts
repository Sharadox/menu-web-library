"use client";
import { useEffect, useState } from "react";
import type { Menu, MenuOptions } from "@sharadox/menu-web-library/use-menu/type";

/**
 * A phone menu's behavior. While it is open the page behind stays put, and it closes on Escape, when the screen
 * widens past `wide` (a tablet turned), and on any link or button tapped in the bar or the menu: the logo, a section,
 * the language or the call to action alike.
 *
 * @example
 * const menu = useMenu({ wide: "(min-width: 1101px)" });
 * <header {...menu.closer}>… <button {...menu.toggle} aria-label="Menu" /></header>
 * {menu.open && <nav id="menu" {...menu.closer}>…</nav>}
 */
export function useMenu({ wide, id = "menu" }: MenuOptions): Menu {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const media = matchMedia(wide);
    const widen = () => media.matches && setOpen(false);
    addEventListener("keydown", escape);
    media.addEventListener("change", widen);
    return () => {
      root.style.overflow = "";
      removeEventListener("keydown", escape);
      media.removeEventListener("change", widen);
    };
  }, [open, wide]);
  return {
    open,
    close: () => setOpen(false),
    toggle: {
      "aria-expanded": open,
      "aria-controls": id,
      "data-menu-toggle": "",
      onClick: () => setOpen((current) => !current),
    },
    closer: {
      onClickCapture: (event) => {
        const target = event.target as Element;
        if (target.closest("[data-menu-toggle]") || !target.closest("a, button")) return;
        setOpen(false);
      },
    },
  };
}
