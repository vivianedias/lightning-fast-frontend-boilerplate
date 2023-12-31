import log from "./logger";
import fetch from "cross-fetch";

type OptionsType = {
  body?: Record<string, any>;
  method?: string;
  headers?: Record<string, any>;
};

type ConfigType = {
  body: string | null;
} & Omit<OptionsType, "body">;

interface ResponseError extends Error {
  status?: number;
}

export default async function fetcher(endpoint: string, options?: OptionsType) {
  const config: ConfigType = {
    body: options?.body ? JSON.stringify(options?.body) : null,
    method: options?.method || "GET",
    headers: getHeaders(options?.headers),
  };

  const res = await fetch(endpoint, config);

  if (!res.ok) {
    log.error(`Response from a request that has thrown an error`, res);
    const error: ResponseError = new Error(
      `An error occurred while making the request: ${res.statusText}`
    );
    error.status = res.status;
    throw error;
  }

  const contentType = res.headers.get("content-type");
  const isResJson = contentType
    ? contentType.indexOf("application/json") > -1
    : true;

  if (isResJson) return res.json();

  return res.text();
}

function getHeaders(customHeaders = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  return { ...headers, ...customHeaders };
}
