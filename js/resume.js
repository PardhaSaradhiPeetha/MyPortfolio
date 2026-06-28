window.addEventListener("load", ImgSecure);
function ImgSecure() {
  console.log(window.innerWidth);
  document.addEventListener("contextmenu", function (event) {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });
}

// Feedback form
function toggle_feedback() {
  const feedbackBox = document.getElementById("feedback-box");
  feedbackBox.classList.toggle("displayform");
}

function download_resume() {
  const link = document.createElement("a");
  link.href = "../docs/resume.pdf";
  link.download = "myResume.pdf";
  link.click();
}

function skip_feedback() {
  download_resume();
  clear_form();
}

function check_feedback() {
  const name = document.getElementById("user-name").value.trim();
  const feed = document.getElementById("user-feedback").value.trim();
  const regex = /^[a-zA-Z ]+$/;
  let result = document.getElementById("form-result");
  if (!regex.test(name)) {
    result.style.color = "#b91c1c";
    result.textContent = "Please! Enter a valid name";
    return;
  }
  if (feed === "") {
    result.style.color = "#b91c1c";
    result.textContent = "Please! Enter your feedback";
    return;
  }
  if (!window.EmailJSForms) {
    result.style.color = "#b91c1c";
    result.textContent = "EmailJS is not ready yet. Please try again.";
    return;
  }

  result.style.color = "#166534";
  result.textContent = "Sending feedback...";

  window.EmailJSForms.sendResumeFeedback({ name, feedback: feed })
    .then(() => {
      result.innerHTML = "Thank you!<br>Downloading my resume...";
      setTimeout(hideForm, 1200);
    })
    .catch((error) => {
      console.error("EmailJS resume feedback error:", error);
      result.style.color = "#b91c1c";
      result.textContent = "Sorry, we couldn't send your feedback right now.";
    });
}

function hideForm() {
  download_resume();
  toggle_feedback();
  document.getElementById("user-name").value = "";
  document.getElementById("user-feedback").value = "";
  document.getElementById("form-result").textContent = "";
  document.getElementById("form-result").style.color = "";
}
function clear_form() {
  document.getElementById("user-name").value = "";
  document.getElementById("user-feedback").value = "";
  document.getElementById("form-result").textContent = "";
  document.getElementById("form-result").style.color = "";
  toggle_feedback();
}