const messageInput = document.getElementById("message");
const embedTitle = document.getElementById("embedTitle");
const embedDesc = document.getElementById("embedDesc");
const preview = document.getElementById("preview");
const addEmbedBtn = document.getElementById("addEmbed");
const sendBtn = document.getElementById("send");

let embeds = [];

function updatePreview() {
  preview.innerHTML = `
    <p>${messageInput.value}</p>
    ${embeds.map(e => `
      <div style="background:#2a2f36;padding:10px;border-radius:6px;margin-top:10px;">
        <strong>${e.title}</strong><br>
        <span>${e.description}</span>
      </div>
    `).join("")}
  `;
}

messageInput.addEventListener("input", updatePreview);

addEmbedBtn.addEventListener("click", () => {
  embeds.push({
    title: embedTitle.value,
    description: embedDesc.value
  });

  embedTitle.value = "";
  embedDesc.value = "";

  updatePreview();
});

sendBtn.addEventListener("click", async () => {
  const webhook = document.getElementById("webhook").value;

  const payload = {
    content: messageInput.value,
    embeds: embeds
  };

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  alert("Webhook inviato!");
});
