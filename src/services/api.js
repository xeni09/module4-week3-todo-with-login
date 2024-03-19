export async function postLogin({ username, password }) {
  const response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("Wrong Login. Please try again");
  }

  const { token } = await response.json();
  return token;
}
