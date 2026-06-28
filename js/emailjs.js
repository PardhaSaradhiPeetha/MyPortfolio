function initializeEmailJSForms() {
    const DEFAULT_CONFIG = {
        publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
        contactServiceId: "YOUR_CONTACT_SERVICE_ID",
        contactTemplateId: "YOUR_CONTACT_TEMPLATE_ID",
        resumeServiceId: "YOUR_RESUME_SERVICE_ID",
        resumeTemplateId: "YOUR_RESUME_TEMPLATE_ID",
    };

    const config = { ...DEFAULT_CONFIG, ...(window.EMAILJS_CONFIG || {}) };

    function ensureEmailJSInitialized() {
        if (!window.emailjs) {
            throw new Error("EmailJS SDK is not loaded");
        }

        if (config.publicKey && config.publicKey !== DEFAULT_CONFIG.publicKey) {
            window.emailjs.init(config.publicKey);
        }
    }

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
        ensureEmailJSInitialized();

        if (!config.contactServiceId || !config.contactTemplateId) {
            throw new Error("Missing EmailJS contact service/template IDs");
        }

        return window.emailjs.send(
            config.contactServiceId,
            config.contactTemplateId,
            buildContactPayload(formData)
        );
    }

    async function sendResumeFeedback(formData) {
        ensureEmailJSInitialized();

        if (!config.resumeServiceId || !config.resumeTemplateId) {
            throw new Error("Missing EmailJS resume service/template IDs");
        }

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
