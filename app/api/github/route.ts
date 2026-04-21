export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json({ error: "No username" });
  }

  const res = await fetch(`https://api.github.com/users/${username}/repos`);

  const data = await res.json();

  return Response.json(data);
}
