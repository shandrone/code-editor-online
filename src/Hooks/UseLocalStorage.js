import { useEffect, useState } from "react";

const PRE = "Online-Code-Editor";

export default function UseLocalStorage(key, initialVal) {
  const preKey = PRE + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(preKey);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialVal === "function") {
      return initialVal();
    } else {
      return initialVal;
    }
  });

  useEffect(() => {
    localStorage.setItem(preKey, JSON.stringify(value));
  }, [preKey, value]);

  return [value, setValue];
}
