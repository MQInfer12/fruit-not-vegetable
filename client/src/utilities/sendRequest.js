export const sendRequest = async (route, body, method = "POST") => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND}${route}`, {
      method: method,
      headers: body instanceof FormData ? undefined : {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: body instanceof FormData ? body : JSON.stringify(body)
    });
    if(res.ok) {
      const resJson = await res.json();
      return resJson;
    }
  } catch(e) {
    return e;
  }
}