import type { MouseEvent } from "react";

export interface MenuOptions {
  /** The media query where the bar has room for everything, so the menu closes: "(min-width: 1101px)". */
  wide: string;
  /** The menu element's id, for the button's `aria-controls`. Defaults to "menu". */
  id?: string;
}

export interface Menu {
  open: boolean;
  close: () => void;
  /** Spread on the menu button: it opens and closes the menu, and says so to assistive technology. */
  toggle: {
    "aria-expanded": boolean;
    "aria-controls": string;
    "data-menu-toggle": "";
    onClick: () => void;
  };
  /** Spread on the bar and on the menu: any link or button tapped inside them, other than the menu button, closes it. */
  closer: { onClickCapture: (event: MouseEvent<HTMLElement>) => void };
}
