import { createContext, useContext, useState } from "react";

export const PlayContext = createContext();

export const PlayProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </PlayContext.Provider>
  );
};

export const useLyricsContext = () => useContext(PlayContext);
