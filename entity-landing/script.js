const TELEGRAM_URL = "https://t.me/+nbN4-E3_45k5NTc1";

function trackEvent(eventName, payload = {}) {
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, payload);
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
}

document.querySelectorAll(".telegram-cta").forEach((ctaButton) => {
  ctaButton.addEventListener("click", () => {
    trackEvent("telegram_cta_click", { destination: TELEGRAM_URL });
  });
});

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form && formMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    const hasEmptyField = Object.values(payload).some((value) => !value);
    if (hasEmptyField) {
      formMessage.textContent = "Please fill in all fields before submitting.";
      return;
    }

    formMessage.textContent = "Submitting your details...";

    try {
      // Replace this placeholder request with your backend/CRM endpoint.
      await new Promise((resolve) => setTimeout(resolve, 700));
      trackEvent("lead_form_submit", { lead_source: "meta_ads_landing_page" });
      formMessage.textContent =
        "Thanks! Our team will reach out soon. You can also join the Telegram channel now.";
      form.reset();
    } catch (error) {
      formMessage.textContent = "Something went wrong. Please try again in a moment.";
    }
  });
}
