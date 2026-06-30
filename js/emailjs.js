function initializeEmailJSForms() {
    const config = {
        publicKey: "96fGY5-jsjexomExI",

        contactServiceId: "service_mmeqsl8",
        contactTemplateId: "template_ve1bqee",

        resumeServiceId: "service_mmeqsl8",
        resumeTemplateId: "template_0s3x2gk",
    };

    if (!window.emailjs) {
        throw new Error("EmailJS SDK is not loaded");
    }

    // Initialize EmailJS once
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

    function buildResumePayload(formData) {
        return {
            from_name: formData.name,
            feedback: formData.feedback,
            resume_url: `${window.location.origin}/docs/resume.pdf`,
        };
    }

    async function sendContactEmail(formData) {
        return window.emailjs.send(
            config.contactServiceId,
            config.contactTemplateId,
            buildContactPayload(formData)
        );
    }

    async function sendResumeFeedback(formData) {
        return window.emailjs.send(
            config.resumeServiceId,
            config.resumeTemplateId,
            buildResumePayload(formData)
        );
    }

    window.EmailJSForms = {
        sendContactEmail,
        sendResumeFeedback,
    };
}

initializeEmailJSForms();