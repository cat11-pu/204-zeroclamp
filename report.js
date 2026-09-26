// report.js：报表（逐值清零，单次扫描）
import { clampOne } from "./clamp.js";

export function clampAll(values) {
  if (!values || values.length === 0) {
    const error = new Error("values must not be empty");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }
  const clamped = new Array(values.length);
  const cleared_at = [];
  let total = 0;
  for (let index = 0; index < values.length; index += 1) {
    const clampedValue = clampOne(values[index]);
    clamped[index] = clampedValue;
    if (values[index] < 0) {
      cleared_at.push(index);
    }
    total += clampedValue;
  }
  return { clamped: clamped, cleared_at: cleared_at, total: total };
}
