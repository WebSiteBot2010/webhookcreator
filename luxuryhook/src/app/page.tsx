"use client";

import { useState } from "react";

export default function Home() {
  const [webhook, setWebhook] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#d4af37");

  const send = async () => {
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        webhook,
        content,
        embed: title || description ? {
          title,
          description,
          color: parseInt(color.replace("#", ""), 16)
        } : null
      })
    });

    alert("Messaggio inviato ✨");
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-10 gap-6">
      
      <h1 className="text-4xl font-bold text-yellow-500">
        LuxuryHook ✨
      </h1>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">

        {/* Editor */}
        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
          <input
            placeholder="Webhook URL"
            className="w-full p-2 rounded bg-zinc-800"
            onChange={(e) => setWebhook(e.target.value)}
          />

          <textarea
            placeholder="Messaggio"
            className="w-full p-2 rounded bg-zinc-800"
            onChange={(e) => setContent(e.target.value)}
          />

          <h2 className="text-yellow-400 font-bold">Embed</h2>

          <input
            placeholder="Titolo"
            className="w-full p-2 rounded bg-zinc-800"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrizione"
            className="w-full p-2 rounded bg-zinc-800"
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <button
            onClick={send}
            className="w-full bg-yellow-500 hover:bg-yellow-600 p-2 rounded font-bold"
          >
            Invia Webhook
          </button>
        </div>

        {/* Preview stile Discord */}
        <div className="bg-zinc-800 p-6 rounded-xl">
          <h2 className="text-lg mb-4 text-gray-400">Anteprima</h2>

          {content && (
            <div className="mb-4">
              <p>{content}</p>
            </div>
          )}

          {(title || description) && (
            <div
              className="p-4 rounded border-l-4"
              style={{ borderColor: color }}
            >
              <h3 className="font-bold">{title}</h3>
              <p className="text-gray-300">{description}</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
