"use client";

import { useEffect, useState } from "react";

/**
 * Loads one CMS admin query in the browser once the page mounts. Static
 * export can't read the signed-in admin session at build time, so admin
 * screens render their shell first and fill in their data here. Returns
 * undefined until the query resolves.
 */
export function useAdminData<T>(loader: () => Promise<T>): T | undefined {
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    let active = true;
    loader()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((error) => console.error("[admin] failed to load data:", error));
    return () => {
      active = false;
    };
  }, [loader]);

  return data;
}
