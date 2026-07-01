function initializeEmailJSForms() {
    const config = {
        publicKey: "96fGY5-jsjexomExI",

        contactServiceId: "service_mmeqsl8",
        contactTemplateId: "template_ve1bqee",
    };

    if (!window.emailjs) {
        throw new Error("EmailJS SDK is not loaded");
    }

    window.emailjs.init({
        publicKey: config.publicKey,
    });

    function buildContactPayload(formData) {
        return {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
        };
    }

    async function sendContactEmail(formData) {
        return window.emailjs.send(
            config.contactServiceId,
            config.contactTemplateId,
            buildContactPayload(formData)
        );
    }

    window.EmailJSForms = {
        sendContactEmail,
    };
}

initializeEmailJSForms();
