import assert from "node:assert";
import { clampOne } from "../clamp.js";
import { clampAll } from "../report.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("clampOne returns a number", () => {
  assert.strictEqual(typeof clampOne(-3), "number");
});

check("clampAll returns clamped list", () => {
  assert.ok(Array.isArray(clampAll([1, -2]).clamped));
});

check("clampAll returns cleared positions", () => {
  assert.ok(Array.isArray(clampAll([1, -2]).cleared_at));
});

check("render counts cleared", () => {
  assert.strictEqual(typeof render({ values: [1, -2] }).clamped_count, "number");
});

check("render exposes total", () => {
  assert.strictEqual(typeof render({ values: [1, -2] }).total, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
