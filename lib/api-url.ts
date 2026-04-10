'use client';

import { withBasePath } from '@/lib/path-utils';

const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';

export function getAppUrl(path: string) {
  return withBasePath(path, basePath);
}

export function getApiUrl(path: string) {
  return withBasePath(path, basePath);
}
