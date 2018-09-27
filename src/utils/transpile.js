import React from 'react';
import transform, { _poly } from "./transform";

export const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map(key => scope[key]);

  // eslint-disable-next-line no-new-func
  const res = new Function("_poly", "React", ...scopeKeys, code);
  return res(_poly, React, ...scopeValues);
};

export function transpile(code = "", scope = {}) {
  evalCode(transform(code), scope);
}



