const API = "http://localhost:3000";

async function loadEvents() {
  const res = await fetch(`${API}/events`);
  const data = await res.json();

  const container = document.getElementById("events");

  data.events.forEach(event => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <p>📍 ${event.location}</p>
      <p>💰 KES ${event.price}</p>
      <button onclick="buy('${event._id}')">
        Buy Ticket
      </button>
    `;

    container.appendChild(div);
  });
}

async function buy(eventId) {
  const email = localStorage.getItem("email");

  const phone = prompt("Enter phone number (2547...)");

  const res = await fetch(`${API}/payments/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      phone,
      eventId
    })
  });

  const data = await res.json();
  alert("Check phone for payment request");
}

loadEvents();
