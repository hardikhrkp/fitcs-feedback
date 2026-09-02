document.addEventListener(
    "DOMContentLoaded",
    function () {


        const token =
            sessionStorage.getItem(
                "fitcsToken"
            );


        const facultyName =
            sessionStorage.getItem(
                "fitcsName"
            );


        const facultyMis =
            sessionStorage.getItem(
                "fitcsMis"
            );


        const facultyCategory =
            sessionStorage.getItem(
                "fitcsCategory"
            );


        const facultyRole =
            sessionStorage.getItem(
                "fitcsRole"
            );


        // ==========================================
        // CHECK LOGIN
        // ==========================================

        if (
            !token ||
            !facultyName ||
            !facultyMis
        ) {

            window.location.replace(
                "index.html"
            );

            return;

        }


        // ==========================================
        // DISPLAY PROFILE
        // ==========================================

        document.getElementById(
            "facultyName"
        ).textContent =
            facultyName;


        document.getElementById(
            "facultyMis"
        ).textContent =
            facultyMis;


        document.getElementById(
            "facultyCategory"
        ).textContent =
            facultyCategory || "-";


        document.getElementById(
            "facultyRole"
        ).textContent =
            facultyRole || "Faculty";


        document.getElementById(
            "profileInitial"
        ).textContent =
            facultyName
                .charAt(0)
                .toUpperCase();


        // ==========================================
        // SHOW OBSERVER SECTION
        // ==========================================

        if (
            facultyRole
                .trim()
                .toLowerCase()
                ===
            "faculty + observer"
        ) {

            document
                .getElementById(
                    "observerSection"
                )
                .classList
                .remove("hidden");


            loadFacultyList();

        }


        // ==========================================
        // LOGOUT
        // ==========================================

        document
            .getElementById(
                "logoutButton"
            )
            .addEventListener(
                "click",
                logout
            );


        // ==========================================
        // LOAD FEEDBACK
        // ==========================================

        loadFeedback();


        // ==========================================
        // SUBMIT OBSERVER FEEDBACK
        // ==========================================

        const submitFeedback =
            document.getElementById(
                "submitFeedback"
            );


        if (submitFeedback) {

            submitFeedback
                .addEventListener(
                    "click",
                    submitObserverFeedback
                );

        }


        // ==========================================
        // LOAD FACULTY FEEDBACK
        // ==========================================

        async function loadFeedback() {

            const loading =
                document.getElementById(
                    "feedbackLoading"
                );


            const container =
                document.getElementById(
                    "feedbackContainer"
                );


            const message =
                document.getElementById(
                    "feedbackMessage"
                );


            try {

                const params =
                    new URLSearchParams();


                params.append(
                    "action",
                    "feedback"
                );


                params.append(
                    "token",
                    token
                );


                const response =
                    await fetch(
                        CONFIG.API_URL,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8"

                            },

                            body:
                                params.toString()

                        }
                    );


                const data =
                    await response.json();


                if (
                    data.status ===
                    "unauthorized"
                ) {

                    logout();

                    return;

                }


                if (
                    data.status !==
                    "success"
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to load feedback."
                    );

                }


                loading.classList.add(
                    "hidden"
                );


                container.innerHTML =
                    "";


                const feedbackList =
                    Array.isArray(
                        data.feedback
                    )
                        ? data.feedback
                        : [];


                document.getElementById(
                    "feedbackCount"
                ).textContent =
                    feedbackList.length +
                    (
                        feedbackList.length === 1
                            ? " Feedback"
                            : " Feedbacks"
                    );


                if (
                    feedbackList.length === 0
                ) {

                    const empty =
                        document.createElement(
                            "div"
                        );


                    empty.className =
                        "no-feedback";


                    empty.textContent =
                        "No feedback is available at the moment.";


                    container.appendChild(
                        empty
                    );


                    return;

                }


                /*
                 * Display every feedback.
                 */

                for (
                    let i = 0;
                    i < feedbackList.length;
                    i++
                ) {

                    await createFeedbackCard(
                        feedbackList[i],
                        i
                    );

                }


            } catch (error) {

                console.error(error);


                loading.classList.add(
                    "hidden"
                );


                message.className =
                    "message error-message";


                message.textContent =
                    "Could not load feedback. Please try again.";

            }

        }


        // ==========================================
        // CREATE FEEDBACK CARD
        // ==========================================

        async function createFeedbackCard(
            item,
            index
        ) {

            const container =
                document.getElementById(
                    "feedbackContainer"
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "feedback-card";


            const number =
                document.createElement(
                    "div"
                );


            number.className =
                "feedback-number";


            number.textContent =
                "Feedback #" +
                (index + 1);


            const observer =
                document.createElement(
                    "div"
                );


            observer.className =
                "feedback-meta";


            observer.innerHTML =
                "<strong>Observer:</strong> " +
                escapeHtml(
                    item.observerName
                );


            const date =
                document.createElement(
                    "div"
                );


            date.className =
                "feedback-meta";


            date.innerHTML =
                "<strong>Date:</strong> " +
                escapeHtml(
                    item.date
                );


            const text =
                document.createElement(
                    "div"
                );


            text.className =
                "feedback-text";


            text.textContent =
                item.feedback;


            card.appendChild(
                number
            );


            card.appendChild(
                observer
            );


            card.appendChild(
                date
            );


            card.appendChild(
                text
            );


            /*
             * Create acknowledgement area.
             */

            const ackSection =
                document.createElement(
                    "div"
                );


            ackSection.className =
                "ack-section";


            const ackTitle =
                document.createElement(
                    "h3"
                );


            ackTitle.textContent =
                "Acknowledgement";


            ackSection.appendChild(
                ackTitle
            );


            const ackLabel =
                document.createElement(
                    "label"
                );


            ackLabel.className =
                "ack-label";


            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            const labelText =
                document.createTextNode(
                    " I have read and understood this feedback."
                );


            ackLabel.appendChild(
                checkbox
            );


            ackLabel.appendChild(
                labelText
            );


            ackSection.appendChild(
                ackLabel
            );


            const remarks =
                document.createElement(
                    "textarea"
                );


            remarks.className =
                "remarks-box";


            remarks.rows = 4;


            remarks.placeholder =
                "Enter your remarks / concern (Optional)...";


            ackSection.appendChild(
                remarks
            );


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "ack-button";


            button.textContent =
                "Submit Acknowledgement";


            ackSection.appendChild(
                button
            );


            const status =
                document.createElement(
                    "div"
                );


            status.className =
                "ack-status";


            ackSection.appendChild(
                status
            );


            card.appendChild(
                ackSection
            );


            container.appendChild(
                card
            );


            /*
             * Check whether this feedback
             * has already been acknowledged.
             */

            await checkAcknowledgement(
                item.feedbackId,
                checkbox,
                remarks,
                button,
                status
            );


            /*
             * Submit acknowledgement.
             */

            button.addEventListener(
                "click",
                async function () {

                    if (
                        !checkbox.checked
                    ) {

                        alert(
                            "Please tick 'I have read and understood this feedback.'"
                        );

                        return;

                    }


                    button.disabled =
                        true;


                    try {

                        const params =
                            new URLSearchParams();


                        params.append(
                            "action",
                            "acknowledgement"
                        );


                        params.append(
                            "token",
                            token
                        );


                        params.append(
                            "feedbackId",
                            item.feedbackId
                        );


                        params.append(
                            "remarks",
                            remarks.value.trim()
                        );


                        const response =
                            await fetch(
                                CONFIG.API_URL,
                                {

                                    method:
                                        "POST",

                                    headers: {

                                        "Content-Type":
                                            "application/x-www-form-urlencoded;charset=UTF-8"

                                    },

                                    body:
                                        params.toString()

                                }
                            );


                        const data =
                            await response.json();


                        if (
                            data.status ===
                            "success"
                        ) {

                            checkbox.disabled =
                                true;


                            remarks.disabled =
                                true;


                            button.disabled =
                                true;


                            status.textContent =
    "✓ Acknowledged on " +
    (
        data.datetime ||
        (
            data.date && data.time
                ? data.date + ", " + data.time
                : "Date unavailable"
        )
    );


                            status.className =
                                "ack-status acknowledged";

                        }

                        else if (
                            data.status ===
                            "already"
                        ) {

                            checkbox.checked =
                                true;


                            checkbox.disabled =
                                true;


                            remarks.disabled =
                                true;


                            button.disabled =
                                true;


                            status.textContent =
                                "✓ Acknowledged on " +
                                data.date +
                                ", " +
                                data.time;


                        }

                        else {

                            button.disabled =
                                false;


                            alert(
                                data.message ||
                                "Unable to submit acknowledgement."
                            );

                        }


                    } catch (error) {

                        console.error(
                            error
                        );


                        button.disabled =
                            false;


                        alert(
                            "Unable to connect to the server."
                        );

                    }

                }
            );

        }


        // ==========================================
        // CHECK ACKNOWLEDGEMENT
        // ==========================================

       async function checkAcknowledgement(
    feedbackId,
    checkbox,
    remarks,
    button,
    status
) {

    try {

        const params =
            new URLSearchParams();

        params.append(
            "action",
            "checkAcknowledgement"
        );

        params.append(
            "token",
            token
        );

        params.append(
            "feedbackId",
            feedbackId
        );

        const response =
            await fetch(
                CONFIG.API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8"
                    },

                    body:
                        params.toString()
                }
            );

        const data =
            await response.json();


        if (
            data.status === "already"
        ) {

            /*
             * Checkbox
             */

            checkbox.checked = true;

            checkbox.disabled = true;


            /*
             * Disable original controls
             */

            remarks.disabled = true;

            button.disabled = true;


            /*
             * Show acknowledgement date/time
             */

            status.textContent =
                "✓ Acknowledged on " +
                data.date +
                ", " +
                data.time;

            status.className =
                "ack-status acknowledged";


            /*
             * Show the actual acknowledgement
             * submitted by the faculty.
             */

            const acknowledgementBox =
                document.createElement("div");

            acknowledgementBox.className =
                "submitted-acknowledgement";


            const title =
                document.createElement("div");

            title.className =
                "submitted-ack-title";

            title.textContent =
                "Your Submitted Acknowledgement";


            const responseText =
                document.createElement("div");

            responseText.className =
                "submitted-ack-text";

            responseText.textContent =
                data.response ||
                "Acknowledgement submitted without remarks.";


            acknowledgementBox.appendChild(
                title
            );

            acknowledgementBox.appendChild(
                responseText
            );


            /*
             * Put acknowledgement above
             * the old textarea.
             */

            remarks.parentNode.insertBefore(
                acknowledgementBox,
                remarks
            );

        }


    } catch (error) {

        console.error(
            "Acknowledgement check failed:",
            error
        );

    }

}


        // ==========================================
        // LOAD FACULTY LIST FOR OBSERVER
        // ==========================================

       // ==========================================
// LOAD FACULTY LIST FOR OBSERVER
// ==========================================

async function loadFacultyList() {

    try {

        const params =
            new URLSearchParams();

        params.append(
            "action",
            "facultyList"
        );

        params.append(
            "token",
            token
        );

        const response =
            await fetch(
                CONFIG.API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8"
                    },

                    body:
                        params.toString()
                }
            );

        const data =
            await response.json();


        if (
            data.status !==
            "success"
        ) {

            console.error(
                data.message
            );

            return;

        }


        // ==========================================
        // GET SEARCH INPUT ELEMENTS
        // ==========================================

        const facultyInput =
            document.getElementById(
                "facultySelect"
            );

        const facultyOptions =
            document.getElementById(
                "facultyOptions"
            );

        const facultyValue =
            document.getElementById(
                "facultySelectValue"
            );


        // Clear previous values

        facultyInput.value = "";
        facultyValue.value = "";
        facultyOptions.innerHTML = "";


        // ==========================================
        // STORE FACULTY MAP
        // ==========================================

        facultyInput._facultyMap =
            new Map();


        // ==========================================
        // CREATE SEARCH OPTIONS
        // ==========================================

        data.faculty.forEach(
            function (faculty) {

                /*
                 * Don't allow observer
                 * to select themselves.
                 */

                if (
                    String(
                        faculty.misid
                    )
                    ===
                    String(facultyMis)
                ) {

                    return;

                }


                const displayText =
                    faculty.name +
                    " (" +
                    faculty.misid +
                    ")";


                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    displayText;


                facultyOptions.appendChild(
                    option
                );


                /*
                 * Store:
                 *
                 * "Faculty Name (MIS ID)"
                 *
                 *              ↓
                 *
                 * actual MIS ID
                 */

                facultyInput._facultyMap.set(
                    displayText,
                    String(
                        faculty.misid
                    )
                );

            }
        );


        // ==========================================
        // HANDLE FACULTY SELECTION
        // ==========================================

        function updateSelectedFaculty() {

            const selectedText =
                facultyInput.value.trim();


            const selectedMisId =
                facultyInput._facultyMap.get(
                    selectedText
                );


            /*
             * Only store MIS ID when the
             * user selected a valid option.
             */

            facultyValue.value =
                selectedMisId || "";

        }


        facultyInput.oninput =
            updateSelectedFaculty;

        facultyInput.onchange =
            updateSelectedFaculty;


    } catch (error) {

        console.error(
            "Unable to load faculty list:",
            error
        );

    }

}


   // ==========================================
// SUBMIT OBSERVER FEEDBACK
// ==========================================

async function submitObserverFeedback() {

    const facultyInput =
        document.getElementById(
            "facultySelect"
        );

    const facultyValue =
        document.getElementById(
            "facultySelectValue"
        );

    const feedback =
        document.getElementById(
            "observerFeedback"
        );

    const button =
        document.getElementById(
            "submitFeedback"
        );


    // ==========================================
    // VALIDATE FACULTY
    // ==========================================

    if (
        !facultyValue.value ||
        !facultyInput.value.trim()
    ) {

        showObserverMessage(
            "Please search and select a valid faculty member.",
            "error"
        );

        return;

    }


    // ==========================================
    // VALIDATE FEEDBACK
    // ==========================================

    if (
        !feedback.value.trim()
    ) {

        showObserverMessage(
            "Please enter feedback.",
            "error"
        );

        return;

    }


    // Disable button while submitting

    button.disabled =
        true;


    try {

        const params =
            new URLSearchParams();


        // ==========================================
        // API PARAMETERS
        // ==========================================

        params.append(
            "action",
            "addFeedback"
        );


        params.append(
            "token",
            token
        );


        /*
         * IMPORTANT
         *
         * facultyValue contains the
         * actual MIS ID of the selected faculty.
         */

        params.append(
            "facultyMisId",
            facultyValue.value
        );


        params.append(
            "feedback",
            feedback.value.trim()
        );


        // ==========================================
        // SEND REQUEST
        // ==========================================

        const response =
            await fetch(
                CONFIG.API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8"
                    },

                    body:
                        params.toString()
                }
            );


        const data =
            await response.json();


        // ==========================================
        // SUCCESS
        // ==========================================

        if (
            data.status ===
            "success"
        ) {

            showObserverMessage(
                "✓ Feedback submitted successfully.",
                "success"
            );


            // Clear faculty selection

            facultyInput.value =
                "";

            facultyValue.value =
                "";


            // Clear feedback

            feedback.value =
                "";


            // Refresh feedback list

            loadFeedback();

        }


        // ==========================================
        // SERVER ERROR
        // ==========================================

        else {

            showObserverMessage(
                data.message ||
                "Unable to submit feedback.",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Observer feedback submission error:",
            error
        );


        showObserverMessage(
            "Unable to connect to the server.",
            "error"
        );


    } finally {

        button.disabled =
            false;

    }

}


        // ==========================================
        // OBSERVER MESSAGE
        // ==========================================

        function showObserverMessage(
            text,
            type
        ) {

            const message =
                document.getElementById(
                    "observerMessage"
                );


            message.textContent =
                text;


            message.className =
                "message";


            if (
                type === "success"
            ) {

                message.classList.add(
                    "success-message"
                );

            } else {

                message.classList.add(
                    "error-message"
                );

            }

        }


        // ==========================================
        // LOGOUT
        // ==========================================

        function logout() {

            sessionStorage.clear();

            window.location.replace(
                "index.html"
            );

        }


        // ==========================================
        // HTML ESCAPE
        // ==========================================

        function escapeHtml(value) {

            const div =
                document.createElement(
                    "div"
                );


            div.textContent =
                value || "";


            return div.innerHTML;

        }

    }
);
