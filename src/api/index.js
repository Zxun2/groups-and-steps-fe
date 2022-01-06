async function request(method, params, error, url) {
  const options = {
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
