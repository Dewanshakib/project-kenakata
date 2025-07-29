export async function getSession() {
  try {
    const res = await fetch(process.env.BACKEND_URL! + "/api/users/session", {
      method: "GET",
    });
    const data = await res?.json();
    const user = data.user;
    return user;
  } catch (error) {
    console.log(`Error while getting session`, error);
  }
}
