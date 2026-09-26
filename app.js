// app.js：渲染结果
import { clampOne } from "./clamp.js";
import { clampAll } from "./report.js";

export function render(spec) {
  const values = spec.values || [];
  const view = clampAll(values);
  const clamped = view.clamped || [];
  return { clamped: clamped, cleared_at: view.cleared_at || [],
           clamped_count: (view.cleared_at || []).length, total: view.total || 0,
           raw_total: values.reduce((sum, item) => sum + item, 0),
           count: clamped.length, biggest: clamped.reduce((best, item) => Math.max(best, item), 0) };
}
