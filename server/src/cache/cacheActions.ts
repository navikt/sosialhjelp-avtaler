import { TokenSet } from 'openid-client';
import tokenCache from './tokenCache';

export function flush(): void {
  tokenCache.flushAll();
}

export function getTokenInCache(cacheKey: string): [cacheHit: true, value: string] | [cacheHit: false] {
  const tokenInCache: string | undefined = tokenCache.get(cacheKey);
  if (tokenInCache) {
    return [true, tokenInCache];
  }

  return [false];
}

export function setTokenInCache(cacheKey: string, tokenSet: TokenSet): void {
  if (tokenSet.access_token == null) return;

  tokenCache.set(cacheKey, tokenSet.access_token, (tokenSet.expires_in ?? 65) - 5);
}
