// report.js：报表（基线：一律给空表）
import { clampOne } from "./clamp.js";

export function clampAll(values) {
  return { clamped: [], cleared_at: [], total: 0 };
}
