const BASE_URL = "https://app.atera.com";

export class AteraApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: string,
  ) {
    super(`Atera API error ${status} ${statusText}: ${body}`);
    this.name = "AteraApiError";
  }
}

export interface AteraListResponse<T> {
  items: T[];
  totalItemCount: number;
  page: number;
  itemsInPage: number;
}

export class AteraClient {
  private apiKey: string;

  constructor() {
    const key = process.env.ATERA_API_KEY;
    if (!key) {
      throw new Error(
        "ATERA_API_KEY environment variable is required. " +
          "Get your API key from Atera Admin > Customer Facing > API.",
      );
    }
    this.apiKey = key;
  }

  private headers(): Record<string, string> {
    return {
      "X-API-KEY": this.apiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): string {
    const url = new URL(path, BASE_URL);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  async get<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    const url = this.buildUrl(path, params);
    const res = await fetch(url, { method: "GET", headers: this.headers() });
    if (!res.ok) {
      const body = await res.text();
      throw new AteraApiError(res.status, res.statusText, body);
    }
    return (await res.json()) as T;
  }

  async getList<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<AteraListResponse<T>> {
    return this.get<AteraListResponse<T>>(path, params);
  }

  async post<T>(
    path: string,
    body: Record<string, unknown>,
  ): Promise<T> {
    const url = this.buildUrl(path);
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new AteraApiError(res.status, res.statusText, text);
    }
    const text = await res.text();
    if (!text) return {} as T;
    return JSON.parse(text) as T;
  }

  async put<T>(
    path: string,
    body?: Record<string, unknown>,
  ): Promise<T> {
    const url = this.buildUrl(path);
    const res = await fetch(url, {
      method: "PUT",
      headers: this.headers(),
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new AteraApiError(res.status, res.statusText, text);
    }
    const text = await res.text();
    if (!text) return {} as T;
    return JSON.parse(text) as T;
  }

  async del(path: string): Promise<void> {
    const url = this.buildUrl(path);
    const res = await fetch(url, {
      method: "DELETE",
      headers: this.headers(),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new AteraApiError(res.status, res.statusText, body);
    }
  }
}

export function formatResponse(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

export function formatError(error: unknown) {
  const message =
    error instanceof AteraApiError
      ? `Atera API error (${error.status}): ${error.body}`
      : `Unexpected error: ${error instanceof Error ? error.message : String(error)}`;
  return {
    content: [{ type: "text" as const, text: message }],
    isError: true,
  };
}
