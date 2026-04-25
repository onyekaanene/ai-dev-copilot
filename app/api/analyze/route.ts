export async function POST(req: Request) {
  try {
    const body = await req.json();
    const repos = body.repos;

    const prompt = `
      You are a senior software engineer reviewing a junior developer's GitHub.

      Repos:
      ${JSON.stringify(repos, null, 2)}

      Give:
      1. Overall rating (1–10)
      2. Key weaknesses
      3. Specific improvements
      4. What is missing to get hired

      Be concise and structured.
      `;


    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();

    console.log("Claude response:", JSON.stringify(data, null, 2));

    return Response.json({
      result: data?.content?.[0]?.text || "No AI response returned",
    });
  } catch (error) {
    console.error("ERROR:", error);

    return Response.json({
      result: "Error generating AI feedback",
    });
  }
}
