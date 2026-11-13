import { expect, test } from "vitest";
import { greeting } from "@sharadox/menu-web-library/greeting";

test("a greeting takes well under a millisecond", async ({ bench }) => {
  const result = await bench("greeting", () => greeting({ name: "Ana", language: "pt" })).run();
  expect(result.latency.mean).toBeLessThan(1);
});
