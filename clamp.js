// clamp.js：清一个值（负数给零，非负原样返回）
export function clampOne(value) {
  return value < 0 ? 0 : value;
}
