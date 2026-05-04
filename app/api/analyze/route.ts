export async function POST(req: Request) {
  try {
    const body = await req.json();
    const repos = body.repos;

    /*
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
      */

    const prompt = `
        You are a senior software engineer reviewing a developer's GitHub.

        Repos:
        ${JSON.stringify(repos, null, 2)}

        Return ONLY valid JSON in this format:

        {
          "score": number (1-10),
          "summary": "short summary",
          "strengths": ["point 1", "point 2"],
          "weaknesses": ["point 1", "point 2"],
          "improvements": ["point 1", "point 2"]
        }

        Do not include any text outside JSON.
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

     const rawText = data?.content?.[0]?.text || "";

     // Remove markdown ```json ... ```
     const cleanedText = rawText
       .replace(/```json/g, "")
       .replace(/```/g, "")
       .trim();

     console.log("Cleaned text:", cleanedText);

let parsed;

try {
  parsed = JSON.parse(cleanedText);
} catch (err) {
  console.error("JSON Parse Error:", err);

  parsed = {
    score: 0,
    summary: "AI response could not be parsed",
    strengths: [],
    weaknesses: [],
    improvements: [],
  };
}

    return Response.json(parsed);
  } catch (error) {
    console.error("ERROR:", error);

    return Response.json({
      score: 0,
      summary: "Error generating AI feedback",
      strengths: [],
      weaknesses: [],
      improvements: [],
    });
  }
}

