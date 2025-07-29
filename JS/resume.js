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
function check_feedback() {
  const name = document.getElementById("user-name").value.trim();
  const feed = document.getElementById("user-feedback").value.trim();
  const regex = /^[a-zA-Z ]+$/;
  let result = document.getElementById("form-result");
  if (!regex.test(name)) {
    result.textContent = "Please! Enter a valid name";
    return;
  }
  if (feed === "") {
    result.textContent = "Please! Enter your feedback";
    return;
  }
  result.innerHTML = "Thank you! 🙂<br> Downloading My Resume";

  setTimeout(hideForm, 2000); //function , seconds
}

function hideForm() {
  const link = document.createElement("a");
  link.href = "myResume.pdf";
  link.download = "myResume.pdf";
  link.click();
  toggle_feedback();
  document.getElementById("user-name").value = "";
  document.getElementById("user-feedback").value = "";
  document.getElementById("form-result").textContent = "";
}
function clear_form(){
  document.getElementById("user-name").value = "";
  document.getElementById("user-feedback").value = "";
  document.getElementById("form-result").textContent = "";
  toggle_feedback();
}