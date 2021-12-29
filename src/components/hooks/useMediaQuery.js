import { useEffect, useState } from "react";

// Custom hook for Window UI Media Queries
export const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener(null, handler);
    return () => mediaMatch.removeEventListener(null, handler);
  });
  return matches;
};
