export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json({ error: "No username" });
  }

  const res = await fetch(`https://api.github.com/users/${username}/repos`);

  const data = await res.json();

  // Clean + filter repos
  const filtered = data
    .filter((repo: any) => !repo.fork && repo.stargazers_count >= 0)
    .slice(0, 8) // limit results
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
