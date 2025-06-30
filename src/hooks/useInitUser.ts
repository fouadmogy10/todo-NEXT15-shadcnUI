"use client";

import { useEffect } from "react";

export function useInitUser() {
  useEffect(() => {
    fetch("/api/user/init").catch(() => {});
  }, []);
}
