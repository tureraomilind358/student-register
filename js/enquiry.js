const API_BASE =
    'https://script.google.com/macros/s/AKfycbyHqgeLsqYkqLmi0mzovE1_lFiUjlH0yDOpqmnYoaXDJthLXY1fkgyqucDQiIcUiPgw/exec';



const form =
    document.getElementById('enquiryForm');

const submitBtn =
    document.getElementById('submitBtn');

const successMessage =
    document.getElementById('successMessage');



/* =========================
   JSONP API
========================= */

function callAPI(params) {

    return new Promise(function(resolve, reject) {

        const callbackName =
            'callback_' + Date.now();

        params.callback = callbackName;

        const query =
            new URLSearchParams(params).toString();

        const script =
            document.createElement('script');

        const timeout =
            setTimeout(function() {

                cleanup();

                reject(
                    new Error(
                        'Server request timed out'
                    )
                );

            }, 20000);


        window[callbackName] =
            function(response) {

                cleanup();

                resolve(response);

            };


        script.src =
            API_BASE + '?' + query;


        script.onerror =
            function() {

                cleanup();

                reject(
                    new Error(
                        'Unable to connect to Google Apps Script'
                    )
                );

            };


        document.body.appendChild(script);


        function cleanup() {

            clearTimeout(timeout);

            delete window[callbackName];

            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }

        }

    });

}



/* =========================
   FORM SUBMIT
========================= */

form.addEventListener(
    'submit',
    async function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                'studentName'
            ).value.trim();


        const mobile =
            document.getElementById(
                'mobile'
            ).value.trim();


        const whatsapp =
            document.getElementById(
                'whatsapp'
            ).value.trim();


        const email =
            document.getElementById(
                'email'
            ).value.trim();


        const qualification =
            document.getElementById(
                'qualification'
            ).value;


        const course =
            document.getElementById(
                'course'
            ).value;


        const batch =
            document.getElementById(
                'batch'
            ).value;


        const careerGoal =
            document.getElementById(
                'careerGoal'
            ).value;


        const source =
            document.getElementById(
                'source'
            ).value;


        const message =
            document.getElementById(
                'message'
            ).value.trim();



        /* =========================
           MOBILE VALIDATION
        ========================= */

        if (!/^[6-9]\d{9}$/.test(mobile)) {

            alert(
                'Please enter a valid 10-digit mobile number.'
            );

            return;

        }


        if (
            whatsapp &&
            !/^[6-9]\d{9}$/.test(whatsapp)
        ) {

            alert(
                'Please enter a valid WhatsApp number.'
            );

            return;

        }



        /* =========================
           BUTTON
        ========================= */

        submitBtn.disabled = true;

        submitBtn.textContent =
            'Submitting...';



        try {

            const response =
                await callAPI({

                    action: 'registerEnquiry',

                    Student_Name: name,

                    Mobile_Number: mobile,

                    WhatsApp_Number: whatsapp,

                    Email: email,

                    Qualification: qualification,

                    Course_Interested: course,

                    Preferred_Batch: batch,

                    Career_Goal: careerGoal,

                    Enquiry_Source: source,

                    Message: message

                });



            if (
                response &&
                response.status === 'success'
            ) {

                document.getElementById(
                    'enquiryId'
                ).textContent =
                    response.data.enquiryId;


                form.style.display =
                    'none';


                successMessage.style.display =
                    'block';

            }

            else {

                alert(
                    response.message ||
                    'Unable to submit enquiry.'
                );

            }


        }

        catch (error) {

            console.error(error);

            alert(
                'Something went wrong. Please try again.'
            );

        }

        finally {

            submitBtn.disabled = false;

            submitBtn.textContent =
                'Submit Enquiry';

        }

    }
);



/* =========================
   NEW ENQUIRY
========================= */

function newEnquiry() {

    form.reset();

    form.style.display =
        'block';

    successMessage.style.display =
        'none';

}