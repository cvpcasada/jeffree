export const loadScript = id => window.System.import(id).then(module => module.default || module);
export const loadScripts = (ids = []) => Promise.all(ids.map(loadScript));
