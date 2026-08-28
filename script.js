
// -------------------------------------------------------
// PASSWORT:
// Ändere hier das Passwort für die Einladung.
// WICHTIG: Bei GitHub Pages ist dies nur ein einfacher
// Frontend-Schutz und kein vollständig sicherer Login.
// -------------------------------------------------------
const PAGE_PASSWORD = "askimmm";

const passwordScreen = document.getElementById("passwordScreen");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const mainPage = document.getElementById("mainPage");

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value === PAGE_PASSWORD) {
    passwordScreen.classList.add("hidden");
    mainPage.classList.remove("hidden");
    passwordError.classList.add("hidden");
    sessionStorage.setItem("dateInviteUnlocked", "yes");
  } else {
    passwordError.classList.remove("hidden");
    passwordInput.select();
  }
});

if (sessionStorage.getItem("dateInviteUnlocked") === "yes") {
  passwordScreen.classList.add("hidden");
  mainPage.classList.remove("hidden");
}

// -------------------------------------------------------
// WICHTIG:
// Ersetze die folgende URL durch deinen Formspree-Endpunkt.
// Beispiel: https://formspree.io/f/abcdwxyz
// -------------------------------------------------------
const FORM_ENDPOINT = "https://formspree.io/f/xzebbzqb";

const form = document.getElementById("dateForm");
const answerField = document.getElementById("answerField");
const timeField = document.getElementById("timeField");
const timePanel = document.getElementById("timePanel");
const mainChoices = document.getElementById("mainChoices");
const customTime = document.getElementById("customTime");
const submitTime = document.getElementById("submitTime");
const backButton = document.getElementById("backButton");
const statusBox = document.getElementById("status");

document.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.dataset.answer;

    if (answer === "Andere Uhrzeit") {
      mainChoices.classList.add("hidden");
      timePanel.classList.remove("hidden");
      customTime.focus();
      return;
    }

    sendAnswer(answer);
  });
});

submitTime.addEventListener("click", () => {
  if (!customTime.value) {
    showStatus("Bitte wähle zuerst eine Uhrzeit aus. 💕", "error");
    return;
  }

  sendAnswer("Andere Uhrzeit", customTime.value);
});

backButton.addEventListener("click", () => {
  timePanel.classList.add("hidden");
  mainChoices.classList.remove("hidden");
  hideStatus();
});

async function sendAnswer(answer, time = "") {
  answerField.value = answer;
  timeField.value = time;

  disableButtons(true);
  showStatus("Deine Antwort wird gerade verschickt … 💌");

  // Falls noch kein Formspree-Endpunkt eingetragen wurde,
  // wird eine verständliche Meldung angezeigt.
  if (!FORM_ENDPOINT.startsWith("https://formspree.io/f/")) {
    showStatus(
      "Die Seite ist fertig – es fehlt nur noch dein Formspree-Endpunkt in script.js, damit du die Benachrichtigung bekommst.",
      "error"
    );
    disableButtons(false);
    return;
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Formular konnte nicht gesendet werden.");
    }

    const niceTime = time ? ` um ${time} Uhr` : "";

    if (answer === "Ja") {
      showStatus("Yay! 💖 Deine Antwort wurde verschickt. Ich freue mich schon sehr!");
    } else if (answer === "Andere Uhrzeit") {
      showStatus(`Danke 💕 Deine gewünschte Uhrzeit${niceTime} wurde verschickt.`);
    } else {
      showStatus("Danke für deine ehrliche Antwort. 🤍 Sie wurde verschickt.");
    }

    mainChoices.classList.add("hidden");
    timePanel.classList.add("hidden");
  } catch (error) {
    showStatus(
      "Leider konnte die Antwort gerade nicht verschickt werden. Bitte versuche es noch einmal.",
      "error"
    );
    disableButtons(false);
  }
}

function showStatus(message, type = "success") {
  statusBox.textContent = message;
  statusBox.className = `status ${type}`;
}

function hideStatus() {
  statusBox.classList.add("hidden");
  statusBox.textContent = "";
}

function disableButtons(disabled) {
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = disabled;
  });
}
