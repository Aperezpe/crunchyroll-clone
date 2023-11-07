export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: unknown,
  args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<HttpResponse<T>>  {
  return await http<T>(new Request(path, args));
}

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function http<T>(
  request: RequestInfo
): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(
    request
  );

  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex) {
    console.log("Error when parsing: ", ex)
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

