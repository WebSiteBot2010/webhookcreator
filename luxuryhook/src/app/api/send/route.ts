import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { webhook, content, embed } = await req.json();

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        embeds: embed ? [embed] : []
      })
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Errore invio webhook" }, { status: 500 });
  }
}
