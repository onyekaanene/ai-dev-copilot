export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json({ error: "Username required" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`,
  );

  const data = await res.json();

  const filtered = data
    .filter((repo: any) => !repo.fork)
    .slice(0, 8)
    .map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url,
    }));

  return Response.json(filtered);
}
