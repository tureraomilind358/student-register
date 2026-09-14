// ======================================================
// CAREER INFOTECH
// STUDENT REGISTRATION
// GOOGLE SHEET JSONP
// ======================================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyHqgeLsqYkqLmi0mzovE1_lFiUjlH0yDOpqmnYoaXDJthLXY1fkgyqucDQiIcUiPgw/exec";


// ======================================================
// GET ELEMENTS
// ======================================================

const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");
const registrationId = document.getElementById("registrationId");


// ======================================================
// CHECK FORM
// ======================================================

if (!form) {
  console.error("❌ registrationForm not found.");
}


// ======================================================
// FORM SUBMIT
// ======================================================

form.addEventListener("submit", function (event) {

  event.preventDefault();

 

  // ----------------------------------------------------
  // GET FORM VALUES
  // ----------------------------------------------------

  const name = document
    .getElementById("name")
    .value
    .trim();

  const mobile = document
    .getElementById("mobile")
    .value
    .trim();

  const education = document
    .getElementById("education")
    .value
    .trim();

  const address = document
    .getElementById("address")
    .value
    .trim();


  // ====================================================
  // PRINT FORM DATA
  // ====================================================



  // ====================================================
  // VALIDATION
  // ====================================================

  if (name.length < 2) {
    console.error("❌ Invalid name:", name);
    alert("Please enter your name.");
    return;
  }


  if (!/^[6-9]\d{9}$/.test(mobile)) {
    console.error("❌ Invalid mobile:", mobile);
    alert("Please enter a valid 10 digit mobile number.");
    return;
  }


  if (!education) {
    console.error("❌ Education is empty");
    alert("Please select your education.");
    return;
  }


  if (address.length < 5) {
    console.error("❌ Invalid address:", address);
    alert("Please enter your address.");
    return;
  }


  


  // ====================================================
  // LOADING
  // ====================================================

  submitBtn.disabled = true;
  submitBtn.innerText = "Registering...";


  // ====================================================
  // CREATE CALLBACK
  // ====================================================

  const callbackName =
    "registrationCallback_" + Date.now();

  // ====================================================
  // CREATE JSONP CALLBACK
  // ====================================================

  window[callbackName] = function (response) {

    // --------------------------------------------------
    // REMOVE SCRIPT
    // --------------------------------------------------

    const script = document.getElementById(callbackName);

    if (script) {
      script.remove();
    }


    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    if (
      response &&
      response.status === "success"
    ) {


      form.style.display = "none";

      successMessage.style.display = "block";


      // Support both response formats
      if (
        response.data &&
        response.data.Registration_ID
      ) {

        console.log(
          "🆔 Registration ID:",
          response.data.Registration_ID
        );

        registrationId.innerText =
          response.data.Registration_ID;

      } else if (
        response.data &&
        response.data.registrationId
      ) {

        registrationId.innerText =
          response.data.registrationId;

      } else {

        registrationId.innerText =
          "Registration Successful";

      }


    } else {

      alert(
        response && response.message
          ? response.message
          : "Registration failed."
      );

    }


    // --------------------------------------------------
    // RESET BUTTON
    // --------------------------------------------------

    submitBtn.disabled = false;
    submitBtn.innerText = "Register Now";


    // --------------------------------------------------
    // DELETE CALLBACK
    // --------------------------------------------------

    delete window[callbackName];

  };


  // ====================================================
  // BUILD PARAMETERS
  // ====================================================

  const params = new URLSearchParams();

  params.append("action", "registerStudent");
  params.append("name", name);
  params.append("mobile", mobile);
  params.append("education", education);
  params.append("address", address);
  params.append("callback", callbackName);

  // ====================================================
  // BUILD FINAL URL
  // ====================================================

  const finalURL =
    GOOGLE_SCRIPT_URL + "?" + params.toString();


  // ====================================================
  // CREATE JSONP SCRIPT
  // ====================================================

  const script =
    document.createElement("script");

  script.id = callbackName;
  script.src = finalURL;
  script.async = true;


  // ====================================================
  // ERROR HANDLING
  // ====================================================

  script.onerror = function () {


    console.error(
      "Failed URL:",
      finalURL
    );

    alert(
      "Unable to connect to Google Sheet."
    );


    submitBtn.disabled = false;
    submitBtn.innerText = "Register Now";


    script.remove();

    delete window[callbackName];

  };


  // ====================================================
  // SEND REQUEST
  // ====================================================

  document.body.appendChild(script);

});


// ======================================================
// NEW REGISTRATION
// ======================================================

function newRegistration() {

  form.reset();

  successMessage.style.display = "none";

  form.style.display = "block";

  submitBtn.disabled = false;

  submitBtn.innerText = "Register Now";

}