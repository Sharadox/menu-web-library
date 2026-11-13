# @sharadox/menu-web-library

Phone menus that behave, whatever they look like. `useMenu` is the behavior; the design stays with each site.

```tsx
import { useMenu } from "@sharadox/menu-web-library/use-menu";

const menu = useMenu({ wide: "(min-width: 1101px)" });

<header {...menu.closer}>
  <a href="/">Logo</a>
  <button type="button" {...menu.toggle} aria-label={menu.open ? "Close menu" : "Open menu"} />
</header>;
{
  menu.open && (
    <nav id="menu" data-lenis-prevent {...menu.closer}>
      …
    </nav>
  );
}
```

- **`useMenu({ wide, id? })`** returns `{ open, close, toggle, closer }`:
  - `toggle`: spread on the menu button. It opens and closes the menu and sets `aria-expanded` and `aria-controls` (`id`, "menu" by default).
  - `closer`: spread on the bar and on the menu. Any link or button tapped inside, other than the menu button, closes the menu: the logo, a section, the language or the call to action.
  - While open, the page behind doesn't scroll, and Escape or a screen wider than `wide` (a tablet turned) closes it.
- **Build the menu for every screen:** put it beside the bar, not inside it (a blurred bar would shrink it to the bar's size), and let it scroll when it doesn't fit, as on a phone held sideways (`overflow-y: auto`; with smooth scrolling, `data-lenis-prevent`).

## Develop

`pnpm verify` runs formatting, lint, type-check, tests with 100% coverage and the build. Branches follow `<feature>.development` → `development` → `index`, and releases are `v<version>` tags on `index`.

## License

Licença Sharadox de Código Aberto, versão 0.1.0. See [português](LICENCA.md) (the binding text) and the [English translation](LICENSE.md).
