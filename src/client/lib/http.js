class HttpError extends Error {
  constructor(url, res) {
    super(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}

function checkError(res, url) {
  if (!res.ok) {
    throw new HttpError(url, res);
  }
}

export async function fetchJson(url, options) {
  const res = await fetch(url, options);
  checkError(res, url);
  return await res.json();
}

export async function postJson(url, { json, method }) {
  const res = await fetch(url, {
    body: JSON.stringify(json),
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  checkError(res, url);
}
