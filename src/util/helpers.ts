export function images(name: string) {
  // 'import.meta.url' provides the absolute path of the current module
  const t = new URL(`../img/${name}`, import.meta.url).href;
  return t;
}
