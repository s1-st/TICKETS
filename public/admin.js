const API = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

/* CHECK ADMIN ACCESS */
if (!getToken()) {
  alert("Unauthorized");
  window.location.href = "admin-login.html";
}

/* CREATE EVENT */
async function createEvent() {
  await fetch(`${API}/events/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      date: date.value,
      location: location.value,
      price: price.value,
      totalSeats: seats.value
    })
  });

  loadEvents();
}

/* LOAD EVENTS */
async function loadEvents() {
  const res = await fetch(`${API}/events`);
  const data = await res.json();

  const container = document.getElementById("events");
  container.innerHTML = "";

  data.events.forEach(event => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.location}</p>
      <p>KES ${event.price}</p>

      <button onclick="deleteEvent('${event._id}')">
        Delete
      </button>
    `;

    container.appendChild(div);
  });
}

/* DELETE */
async function deleteEvent(id) {
  await fetch(`${API}/events/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });

  loadEvents();
}

loadEvents();
