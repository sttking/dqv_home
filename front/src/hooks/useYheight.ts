"use client";

import { useEffect, useState } from "react";

export const useYheight = () => {
  const [yHeight, setYHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setYHeight(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return yHeight;
};
