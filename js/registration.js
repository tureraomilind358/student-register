// ======================================================
// CAREER INFOTECH
// STUDENT REGISTRATION
// GOOGLE SHEET JSONP
// ======================================================


const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz5YikkHzPW_CfPjHYB_xu6xTH2cTHVg6LystLD8BI1a_7FNpig2H-my_4xEvtKvcnb/exec";


const form =
  document.getElementById(
    "registrationForm"
  );


const submitBtn =
  document.getElementById(
    "submitBtn"
  );


const successMessage =
  document.getElementById(
    "successMessage"
  );


const registrationId =
  document.getElementById(
    "registrationId"
  );


// ======================================================
// FORM SUBMIT
// ======================================================

form.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


    const name =
      document
        .getElementById("name")
        .value
        .trim();


    const mobile =
      document
        .getElementById("mobile")
        .value
        .trim();


    const education =
      document
        .getElementById("education")
        .value;


    const address =
      document
        .getElementById("address")
        .value
        .trim();



    // ================================================
    // VALIDATION
    // ================================================

    if (name.length < 2) {

      alert(
        "Please enter your name."
      );

      return;

    }


    if (!/^[6-9]\d{9}$/.test(mobile)) {

      alert(
        "Please enter a valid 10 digit mobile number."
      );

      return;

    }


    if (!education) {

      alert(
        "Please select your education."
      );

      return;

    }


    if (address.length < 5) {

      alert(
        "Please enter your address."
      );

      return;

    }



    // ================================================
    // LOADING
    // ================================================

    submitBtn.disabled = true;

    submitBtn.innerText =
      "Registering...";



    // ================================================
    // JSONP CALLBACK
    // ================================================

    const callbackName =
      "registrationCallback_" +
      Date.now();



    window[callbackName] =
      function (response) {


        // Remove script

        const script =
          document.getElementById(
            callbackName
          );


        if (script) {

          script.remove();

        }


        // ==========================================
        // SUCCESS
        // ==========================================

        if (
          response.status ===
          "success"
        ) {


          form.style.display =
            "none";


          successMessage.style.display =
            "block";


          registrationId.innerText =
            response.data.Registration_ID;


        } else {


          alert(
            response.message ||
            "Registration failed."
          );


        }


        submitBtn.disabled =
          false;


        submitBtn.innerText =
          "Register Now";


        delete window[
          callbackName
        ];

      };



    // ================================================
    // BUILD URL
    // ================================================

    const params =
      new URLSearchParams({

        action:
          "registerStudent",

        name:
          name,

        mobile:
          mobile,

        education:
          education,

        address:
          address,

        callback:
          callbackName

      });



    // ================================================
    // CREATE JSONP SCRIPT
    // ================================================

    const script =
      document.createElement(
        "script"
      );


    script.id =
      callbackName;


    script.src =
      GOOGLE_SCRIPT_URL +
      "?" +
      params.toString();



    script.onerror =
      function () {


        alert(
          "Unable to connect to Google Sheet."
        );


        submitBtn.disabled =
          false;


        submitBtn.innerText =
          "Register Now";


        script.remove();


        delete window[
          callbackName
        ];

      };


    document.body.appendChild(
      script
    );

  });



// ======================================================
// NEW REGISTRATION
// ======================================================

function newRegistration() {

  form.reset();

  successMessage.style.display =
    "none";

  form.style.display =
    "block";

}