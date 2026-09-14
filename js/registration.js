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

  console.log("======================================");
  console.log("🚀 STUDENT REGISTRATION STARTED");
  console.log("======================================");


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

  console.log("📌 Form Data:");
  console.log({
    name: name,
    mobile: mobile,
    education: education,
    address: address
  });


  console.log("Name:", name);
  console.log("Mobile:", mobile);
  console.log("Education:", education);
  console.log("Address:", address);


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


  console.log("✅ Frontend validation successful");


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


  console.log("📞 Callback Name:", callbackName);


  // ====================================================
  // CREATE JSONP CALLBACK
  // ====================================================

  window[callbackName] = function (response) {

    console.log("======================================");
    console.log("📥 GOOGLE APPS SCRIPT RESPONSE");
    console.log("======================================");

    console.log("Response:", response);
    console.log("Status:", response ? response.status : null);
    console.log("Message:", response ? response.message : null);
    console.log("Data:", response ? response.data : null);


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

      console.log("✅ Registration successful");

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

        console.log(
          "🆔 Registration ID:",
          response.data.registrationId
        );

        registrationId.innerText =
          response.data.registrationId;

      } else {

        console.warn(
          "⚠️ Registration successful but Registration ID not found."
        );

        registrationId.innerText =
          "Registration Successful";

      }


    } else {

      console.error(
        "❌ Registration failed:",
        response
      );

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
  // PRINT PARAMETER DATA
  // ====================================================

  console.log("======================================");
  console.log("📤 DATA BEING SENT TO GOOGLE SHEET");
  console.log("======================================");

  console.log("Action:", "registerStudent");
  console.log("Name:", name);
  console.log("Mobile:", mobile);
  console.log("Education:", education);
  console.log("Address:", address);
  console.log("Callback:", callbackName);


  // Print complete object
  console.log("📦 Sending Object:", {
    action: "registerStudent",
    name: name,
    mobile: mobile,
    education: education,
    address: address,
    callback: callbackName
  });


  // ====================================================
  // BUILD FINAL URL
  // ====================================================

  const finalURL =
    GOOGLE_SCRIPT_URL + "?" + params.toString();


  // ====================================================
  // PRINT FINAL URL
  // ====================================================

  console.log("======================================");
  console.log("🌐 GOOGLE APPS SCRIPT URL");
  console.log("======================================");

  console.log(finalURL);


  // Also print encoded parameters
  console.log("🔗 Query Parameters:");
  console.log(params.toString());


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
      "❌ Google Apps Script connection failed."
    );

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

  console.log("🚀 Sending request now...");

  document.body.appendChild(script);

  console.log("✅ JSONP script added to page.");

});


// ======================================================
// NEW REGISTRATION
// ======================================================

function newRegistration() {

  console.log("🔄 Starting new registration");

  form.reset();

  successMessage.style.display = "none";

  form.style.display = "block";

  submitBtn.disabled = false;

  submitBtn.innerText = "Register Now";

}