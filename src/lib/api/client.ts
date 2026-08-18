import type { ApiErrorResponse, ApiResponse } from "@/lib/api/types";
import { localizeApiData } from "@/lib/api/localize";

import { getToken } from "@/lib/api/auth";

const baseUrl =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://mock-api-plum.vercel.app";

if (!baseUrl) {
  throw new Error("Missing API_BASE_URL environment variable.");
}

type QueryParameters = Record<string, string | number | boolean | undefined>;

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

function createUrl(path: string, query?: QueryParameters) {
  const url = new URL(path, baseUrl);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

const REQUEST_TIMEOUT_MS = 25_000;

export async function request<TData>(
  path: string,
  options: RequestInit = {},
  query?: QueryParameters,
): Promise<ApiResponse<TData>> {
  const token = getToken();

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(createUrl(path, query), {
      ...options,
      headers,
      signal: controller.signal,
      // Cache GET requests for 1 hour to avoid repeated slow calls on Vercel
      next: options.method && options.method !== "GET" ? undefined : { revalidate: 3600 },
    });
  } finally {
    clearTimeout(timeoutId);
  }

  const payload = (await response.json()) as
    | ApiResponse<TData>
    | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const error = payload as ApiErrorResponse;
    throw new ApiRequestError(
      error.message,
      response.status,
      error.error?.code,
      error.error?.details,
    );
  }

  return {
    ...payload,
    data: localizeApiData(
      payload.data,
      typeof query?.lang === "string" &&
        (query.lang === "ar" || query.lang === "en")
        ? query.lang
        : undefined,
    ),
  };
}
