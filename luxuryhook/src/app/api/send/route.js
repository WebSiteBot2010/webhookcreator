import { NextResponse } from "next/server";

export async function POST(req) {
  const { webhook, content, embeds } = await req.json();

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, embeds })
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Errore invio webhook" }, { status: 500 });
  }
}
