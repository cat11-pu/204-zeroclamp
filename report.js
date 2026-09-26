// report.js：报表（一次扫描逐值清零，记下清零位置与合计）
import { clampOne } from "./clamp.js";

export function clampAll(values) {
  if (!Array.isArray(values) || values.length === 0) {
    const error = new Error("数值列表为空");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }

  const clamped = new Array(values.length);
  const cleared_at = [];
  let total = 0;

  for (let i = 0; i < values.length; i += 1) {
    const item = clampOne(values[i]);
    clamped[i] = item;
    if (values[i] < 0) {
      cleared_at.push(i);
    }
    total += item;
  }

  return { clamped, cleared_at, total };
}
