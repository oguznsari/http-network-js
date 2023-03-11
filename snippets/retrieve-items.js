const itemURL = "https://api.boot.dev/v1/courses_rest_api/learn-http/items";

const items = await getData(itemURL);

items.forEach((item) => {
  console.log(item.name);
});

async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "X-API-Key": "Testing",
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
