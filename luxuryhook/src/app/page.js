"use client";

import { useState } from "react";

export default function Home() {
  const [webhook, setWebhook] = useState("");
  const [content, setContent] = useState("");
  const [embeds, setEmbeds] = useState([
    { title: "", description: "", color: "#d4af37" },
  ]);

  const addEmbed = () => setEmbeds([...embeds, { title: "", description: "", color: "#d4af37" }]);
  const updateEmbed = (i, key, value) => {
    const newEmbeds = [...embeds];
    newEmbeds[i][key] = value;
    setEmbeds(newEmbeds);
  };

  const send = async () => {
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        webhook,
        content,
        embeds: embeds.filter(e => e.title || e.description).map(e => ({
          title: e.title,
          description: e.description,
          color: parseInt(e.color.replace("#", ""), 16)
        }))
      })
    });
    alert("Webhook inviato ✨");
  };

  return (
    <main className="min-h-screen p-10 bg-black text-white flex flex-col gap-6">
      <h1 className="text-5xl font-bold text-yellow-500 text-center mb-6">LuxuryHook ✨</h1>

      <div className="flex flex-col md:flex-row gap-8">

        {/* EDITOR */}
        <div className="flex-1 bg-zinc-900 p-6 rounded-xl space-y-4">
          <input
            placeholder="Webhook URL"
            className="w-full"
            onChange={e => setWebhook(e.target.value)}
          />
          <textarea
            placeholder="Messaggio"
            className="w-full"
            onChange={e => setContent(e.target.value)}
          />

          <h2 className="text-yellow-400 font-bold">Embeds</h2>

          {embeds.map((embed, i) => (
            <div key={i} className="mb-4 p-3 bg-zinc-800 rounded">
              <input
                placeholder="Titolo"
                className="w-full mb-2"
                value={embed.title}
                onChange={e => updateEmbed(i, "title", e.target.value)}
              />
              <textarea
                placeholder="Descrizione"
                className="w-full mb-2"
                value={embed.description}
                onChange={e => updateEmbed(i, "description", e.target.value)}
              />
              <input
                type="color"
                value={embed.color}
                onChange={e => updateEmbed(i, "color", e.target.value)}
              />
            </div>
          ))}

          <button onClick={addEmbed}>Aggiungi Embed</button>
          <button onClick={send} className="mt-4">Invia Webhook</button>
        </div>

        {/* PREVIEW */}
        <div className="flex-1 bg-zinc-800 p-6 rounded-xl">
          <h2 className="text-gray-400 text-lg mb-4">Anteprima</h2>

          {content && <div className="mb-4">{content}</div>}

          {embeds.filter(e => e.title || e.description).map((embed, i) => (
            <div key={i} className="p-4 rounded border-l-4 mb-4" style={{ borderColor: embed.color }}>
              <h3 className="font-bold">{embed.title}</h3>
              <p>{embed.description}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
