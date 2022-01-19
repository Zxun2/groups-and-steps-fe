import { ContentType, RequestsType } from "../types";
interface HttpOptions {
  method: string;
  headers: {
    [key: string]: string;
  };
  body?: string;
}

async function request(
  method: RequestsType,
  params: ContentType,
  error: string,
  url: string
) {
  const options: HttpOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (params.content) {
    options.body = JSON.stringify(params.content);
  }

  if (params.headers) {
    options.headers = { ...options.headers, ...params.headers };
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || error);
  }

  return data;
}

export default request;
