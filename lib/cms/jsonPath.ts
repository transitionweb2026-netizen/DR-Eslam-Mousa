/** Minimal dot-path get/set for editing page_sections.content (nested JSON). */

export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function setPath<T extends Record<string, unknown>>(obj: T, path: string, value: unknown): T {
  const keys = path.split(".");
  const next: Record<string, unknown> = { ...obj };
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const existing = cursor[key];
    cursor[key] = existing && typeof existing === "object" ? { ...(existing as Record<string, unknown>) } : {};
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;
  return next as T;
}
