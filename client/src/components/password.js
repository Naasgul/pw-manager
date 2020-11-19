async function getPassword(passwordID) {
  const response = await fetch(`api/passwords/${passwordID}`);
  const password = await response.text();
  return password;
}

export default getPassword;

export async function deletePasswordById(passwordID) {
  await fetch(`api/passwords/${passwordID}`, { method: "DELETE" });
}

export async function postPassword(body) {
  await fetch(`api/passwords/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  console.log(body);
}
