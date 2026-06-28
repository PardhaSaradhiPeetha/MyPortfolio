document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields");
            return;
        }

        if (!window.EmailJSForms) {
            alert("EmailJS is not ready yet. Please try again in a moment.");
            return;
        }

        try {
            await window.EmailJSForms.sendContactEmail({ name, email, subject, message });
            contactForm.reset();
            alert("Thanks! Your message was sent successfully.");
        } catch (error) {
            console.error("EmailJS contact form error:", error);
            alert("Sorry, we couldn't send your message right now.");
        }
    });
});
