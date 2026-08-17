const TOKEN_KEY = "mothmer_token";

/** Get stored auth token (client-side only). */
export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** Save auth token as a cookie (client-side only). */
export function setToken(token: string): void {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

/** Remove auth token cookie (client-side only). */
export function clearToken(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_KEY}=; max-age=0; path=/`;
}

/** Check if user is logged in (client-side only). */
export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
