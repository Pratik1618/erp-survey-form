export function withBasePath(path: string, basePath = '') {
  if (!path.startsWith('/')) {
    throw new Error(`Path must start with "/". Received: ${path}`);
  }

  if (!basePath || basePath === '/') {
    return path;
  }

  return `${basePath}${path}`;
}

export function stripBasePath(pathname: string, basePath = '') {
  if (!basePath || basePath === '/' || !pathname.startsWith(basePath)) {
    return pathname;
  }

  const strippedPath = pathname.slice(basePath.length);

  return strippedPath || '/';
}
