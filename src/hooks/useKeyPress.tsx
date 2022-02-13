import { useEffect, useState } from "react";

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }: { key: string }) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
};
