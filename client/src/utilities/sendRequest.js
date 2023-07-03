export const sendRequest = async (route, body, method = "POST") => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND}${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    });
    if(res.ok) {
      const resJson = await res.json();
      return resJson;
    }
  } catch(e) {
    console.log(e);
  }
}