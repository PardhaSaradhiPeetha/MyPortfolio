document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const submitButton = document.querySelector(".btn-submit");
    let successResetTimer = null;
    if (!contactForm) return;

    const resetSubmitButton = () => {
        if (!submitButton) return;
        submitButton.textContent = "Send Message";
        submitButton.classList.remove("is-sending", "is-sent");
        submitButton.disabled = false;
    };

    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (successResetTimer) {
            clearTimeout(successResetTimer);
            successResetTimer = null;
        }

        if (submitButton) {
            submitButton.textContent = "Sending...";
            submitButton.classList.add("is-sending");
            submitButton.disabled = true;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            resetSubmitButton();
            alert("Please fill in all fields");
            return;
        }

        if (!window.EmailJSForms) {
            resetSubmitButton();
            alert("EmailJS is not ready yet. Please try again in a moment.");
            return;
        }

        try {
            await window.EmailJSForms.sendContactEmail({ name, email, subject, message });
            contactForm.reset();
            if (submitButton) {
                submitButton.textContent = "Sent Successfully";
                submitButton.classList.remove("is-sending");
                submitButton.classList.add("is-sent");
                submitButton.disabled = true;
            }
            successResetTimer = setTimeout(() => {
                if (submitButton) {
                    resetSubmitButton();
                }
            }, 3000);
        } catch (error) {
            resetSubmitButton();
            alert("Sorry, we couldn't send your message right now.");
        }
    });

    contactForm.addEventListener("reset", () => {
        if (successResetTimer) {
            clearTimeout(successResetTimer);
            successResetTimer = null;
        }
        resetSubmitButton();
    });
});
