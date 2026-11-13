import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { useMenu } from "@sharadox/menu-web-library/use-menu";

let widen = () => {};
let wide = false;
vi.stubGlobal(
  "matchMedia",
  () =>
    ({
      get matches() {
        return wide;
      },
      addEventListener: (_: string, listener: () => void) => void (widen = listener),
      removeEventListener: () => {},
    }) as unknown as MediaQueryList,
);
afterEach(() => {
  cleanup();
  wide = false;
});

function Bar() {
  const menu = useMenu({ wide: "(min-width: 900px)" });
  return (
    <>
      <header {...menu.closer}>
        <a href="#top">Logo</a>
        <span>Words</span>
        <button type="button" {...menu.toggle} aria-label="Menu">
          <span>lines</span>
        </button>
      </header>
      {menu.open && (
        <nav id="menu" {...menu.closer}>
          <a href="#one">One</a>
          <button type="button" onClick={menu.close}>
            Close
          </button>
        </nav>
      )}
    </>
  );
}

const toggle = () => screen.getByRole("button", { name: "Menu" });
const isOpen = () => toggle().getAttribute("aria-expanded") === "true";

test("the button opens and closes it, locking the page behind while open", () => {
  render(<Bar />);
  expect(toggle().getAttribute("aria-controls")).toBe("menu");
  fireEvent.click(screen.getByText("lines"));
  expect(isOpen()).toBe(true);
  expect(document.documentElement.style.overflow).toBe("hidden");
  fireEvent.click(toggle());
  expect(isOpen()).toBe(false);
  expect(document.documentElement.style.overflow).toBe("");
});

test("any link or button in the bar or menu closes it; other taps do not", () => {
  render(<Bar />);
  fireEvent.click(toggle());
  fireEvent.click(screen.getByText("Words"));
  expect(isOpen()).toBe(true);
  fireEvent.click(screen.getByText("One"));
  expect(isOpen()).toBe(false);
  fireEvent.click(toggle());
  fireEvent.click(screen.getByText("Logo"));
  expect(isOpen()).toBe(false);
  fireEvent.click(toggle());
  fireEvent.click(screen.getByText("Close"));
  expect(isOpen()).toBe(false);
});

test("Escape and a wider screen close it", () => {
  render(<Bar />);
  fireEvent.click(toggle());
  act(() => void dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" })));
  expect(isOpen()).toBe(true);
  act(() => void dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })));
  expect(isOpen()).toBe(false);
  fireEvent.click(toggle());
  act(() => widen());
  expect(isOpen()).toBe(true);
  wide = true;
  act(() => widen());
  expect(isOpen()).toBe(false);
});
