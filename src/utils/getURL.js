const KEY = "81010102f442208"

export async function getURL(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`https://api.imgur.com/3/image/`, {
    headers: {
      "Authorization": `Client-ID ${KEY}`,
    },
    method: "POST",
    body: formData,
  })
  const { data: { link } } = await res.json();

  return link
}