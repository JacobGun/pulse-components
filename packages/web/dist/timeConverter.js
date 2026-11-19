/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/** Converts a time string (24h "HH:mm" or "HH:mm:ss",
 *  or 12h "h:mm am/pm" or "h:mm:ss am/pm")
 *  to and from a { hour, minute, second } object.
 */
const timeConverter = {
  fromAttribute(value) {
    if (!value) return null;
    value = value.trim().toLowerCase();
    // 24‑hour: "HH:mm" or "HH:mm:ss"
    let m = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.exec(value);
    if (m) {
      return {
        hour: Number(m[1]),
        minute: Number(m[2]),
        second: m[3] !== undefined ? Number(m[3]) : 0
      };
    }
    // 12‑hour: "h:mm am/pm" or "h:mm:ss am/pm"
    m = /^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?\s*(am|pm)$/.exec(value);
    if (m) {
      const h = Number(m[1]);
      const min = Number(m[2]);
      const sec = m[3] !== undefined ? Number(m[3]) : 0;
      const period = m[4];
      if (h < 1 || h > 12) return null;
      const base = h % 12; // 12 → 0
      const hour = period === "pm" ? base + 12 : base;
      return {
        hour,
        minute: min,
        second: sec
      };
    }
    return null;
  },
  toAttribute(value) {
    if (!value) return null;
    const hh = String(value.hour).padStart(2, "0");
    const mm = String(value.minute).padStart(2, "0");
    const ss = String(value.second ?? 0).padStart(2, "0");
    return `${hh}:${mm}:${ss}`; // always serialize as 24‑hour with seconds
  }
};

export { timeConverter };
//# sourceMappingURL=timeConverter.js.map
