const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const PATCH = "PATCH";
const DEL = "DELETE";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};

async function fetchData({
  path,
  method,
  data,
  authToken,
  headers,
  isCustomHeader,
  isFormData,
  onUnauthorized,
  onError
}) {
  const response = await fetch(path, {
    method: method,
    body: !!data ? JSON.stringify(data) : null,
    headers: isCustomHeader
      ? ({
        ...headers,
        ...(isFormData ? ({ "Content-type": "multipart/form-data" }) : ({ "Content-Type": "application/json" }))
      })
      : ({
        ...defaultHeaders,
        ...(isFormData ? ({ "Content-type": "multipart/form-data" }) : ({ "Content-Type": "application/json" })),
        ...(authToken !== "" ? { Authorization: `Bearer ${authToken}` } : {})
      })
  }).then((response) => {
    if (response.status === 204) {
      return {};
    } else if (response.status === 401 && !!onUnauthorized) {
      return onUnauthorized(response);
    } else if (response.status >= 500 && !!onError) {
      return onError(response);
    } else {
      return response.json();
    }
  });

  return response;
}

export function httpService(onUnauthorized, onError) {
  return {
    get: (path, headers, authToken, isCustomHeader) =>
      fetchData({
        path: path,
        method: GET,
        data: null,
        authToken: authToken,
        headers: headers,
        isCustomHeader: isCustomHeader,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    post: (path, data, headers, authToken, isCustomHeader, isFormData) =>
      fetchData({
        path: path,
        method: POST,
        data: data,
        authToken: authToken,
        headers: headers,
        isCustomHeader: isCustomHeader,
        isFormData: isFormData,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    put: (path, data, headers, authToken, isCustomHeader, isFormData) =>
      fetchData({
        path: path,
        method: PUT,
        data: data,
        authToken: authToken,
        headers: headers,
        isCustomHeader: isCustomHeader,
        isFormData: isFormData,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    patch: (path, data, headers, authToken, isCustomHeader, isFormData) =>
      fetchData({
        path: path,
        method: PATCH,
        data: data,
        authToken: authToken,
        headers: headers,
        isCustomHeader: isCustomHeader,
        isFormData: isFormData,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    del: (path, headers, authToken, isCustomHeader) =>
      fetchData({
        path: path,
        method: DEL,
        data: null,
        authToken: authToken,
        headers: headers,
        isCustomHeader: isCustomHeader,
        onUnauthorized: onUnauthorized,
        onError: onError
      })
  };
}

export default httpService;
