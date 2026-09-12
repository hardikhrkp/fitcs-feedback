document.addEventListener(
    "DOMContentLoaded",
    function () {

const OBSERVER_QUESTIONS = [
    { id: "q1", type: "rating", required: true, question: "How you rate the content knowledge of the presenter?", options: [
        ["1", "Exhibits exceptional expertise in subject matter; provides comprehensive and innovative insights beyond expectations."],
        ["2", "Displays advanced knowledge of content; consistently offers insightful and nuanced explanations."],
        ["3", "Demonstrates solid knowledge of subject matter; consistently provides accurate and relevant information."],
        ["4", "Shows basic understanding of content; occasionally provides accurate information but lacks depth."],
        ["5", "Demonstrates limited understanding of subject matter; frequently provides inaccurate or incomplete information."]]},
    { id: "q2", type: "rating", required: true, question: "How you rate the communication skill (A) of the presenter?", options: [
        ["1", "Communication is exceptionally clear and dynamic; captivates students' interest and fosters active learning."],
        ["2", "Communication is clear and interactive; maintains students' attention and encourages participation."],
        ["3", "Communicates effectively, yet inclined towards one-sided discourse."],
        ["4", "Communication is occasionally unclear; struggles to maintain students' attention."],
        ["5", "Communication is unclear and ineffective; struggles to convey ideas to students."]]},
    { id: "q3", type: "rating", required: true, question: "How do you rate the skills of Communication-English (B) of the presenter?", options: [
        ["1", "Demonstrates outstanding English communication and consistently communicates in English across all contexts, with clear and accurate pronunciation, fluency, and a wide range of vocabulary used appropriately and effectively."],
        ["2", "Shows strong English communication skills regularly with clear pronunciation, speaks fluently with occasional hesitations and uses a broad vocabulary."],
        ["3", "Communicates in English most of the time, with generally understandable pronunciation reflecting basic fluency with occasional interruptions, and uses basic vocabulary."],
        ["4", "English communication is inconsistent and pronunciation errors are frequent, impacting understanding due to limited vocabulary."],
        ["5", "Struggles with English communication and rarely communicates in English, with unclear pronunciation as well as disfluent with constant interruptions, and vocabulary is very limited and often incorrect."]]},
    { id: "q4", type: "rating", required: true, question: "How will you rate the Organization and Preparation of Lecture of the presenter?", options: [
        ["1", "Meticulously prepared for every session; demonstrates exceptional organization and utilizes diverse resources effectively."],
        ["2", "Consistently well-prepared for lessons; organizes materials effectively and delivers structured sessions."],
        ["3", "Generally prepared for lessons; organizes materials adequately but may lack some coherence."],
        ["4", "Sometimes appears prepared for lessons; occasionally lacks necessary materials or resources."],
        ["5", "Often appears unprepared for lessons; lacks organization and materials."]]},
    { id: "q5", type: "rating", required: true, question: "How you rate the use of Audio-visual aids & Technology by the presenter?", options: [
        ["1", "Utilizes a variety of teaching aids effectively to enhance learning and engagement, demonstrating creativity and relevance."],
        ["2", "Incorporates teaching aids appropriately to support learning objectives, with good variety and relevance."],
        ["3", "Uses teaching aids adequately, but may lack variety or fail to fully enhance the learning experience."],
        ["4", "Relies heavily on teaching aids without clear purpose or relevance, detracting from the learning process."],
        ["5", "Minimal or ineffective use of teaching aids, with little impact on learning outcomes."]]},
    { id: "q6", type: "rating", required: true, question: "How you rate the Teaching and Explanation of the presenter?", options: [
        ["1", "Provides exceptional explanations that are easily understandable and captivating with innovative teaching methods & techniques; fosters deep understanding and critical thinking."],
        ["2", "Consistently delivers clear and engaging explanations; utilizes varied teaching methods & techniques effectively."],
        ["3", "Generally provides clear and coherent explanations; adapts teaching methods & techniques according to students' needs."],
        ["4", "Sometimes provides clear explanations; lacks consistency in executing teaching methods and techniques."],
        ["5", "Provides explanations that are confusing and difficult to follow; struggles to connect with students."]]},
    { id: "q7", type: "rating", required: true, question: "How you rate the engagement session of the presenter?", options: [
        ["1", "Exceptionally adept at fostering student interaction and engagement; cultivates a dynamic and collaborative atmosphere where students are actively involved in learning."],
        ["2", "Actively promotes student interaction and engagement; creates a supportive and interactive learning environment."],
        ["3", "Generally fosters student interaction; encourages participation, and responds to student inquiries."],
        ["4", "Occasionally attempts to engage students; interaction lacks enthusiasm and fails to stimulate interest."],
        ["5", "Rarely engages students in interactive activities; interaction with students is limited and ineffective."]]},
    { id: "q8", type: "rating", required: true, question: "How do you rate the Classroom management skills of the presenter?", options: [
        ["1", "Exhibits exceptional classroom management skills creating a harmonious and productive learning environment."],
        ["2", "Demonstrates effective classroom management skills promoting student participation."],
        ["3", "Successfully establishes and maintains a positive classroom environment conducive to learning and involvement."],
        ["4", "Struggles to maintain proper management of class and enforcing rules inconsistently."],
        ["5", "Demonstrates inconsistent classroom management skills leading to frequent disruptions and lack of control."]]},
    { id: "q9", type: "rating", required: true, question: "How do you rate the Summarising and Closing of Session of the presenter?", options: [
        ["1", "Delivers a comprehensive, coherent summary that synthesizes all key points, actively involves students, and ties back to learning objectives with strong reinforcement and a memorable closing."],
        ["2", "Provides a clear and accurate summary, with some student involvement, effectively connecting to learning objectives and using reinforcement techniques."],
        ["3", "Offers a basic summary covering the main points, with limited student interaction, a vague connection to learning objectives, and minimal reinforcement."],
        ["4", "Summary is disorganized or incomplete, with little student involvement, unclear connection to objectives, and weak reinforcement."],
        ["5", "Fails to provide a meaningful summary, with no student involvement, no connection to objectives, and no reinforcement, ending the session abruptly."]]},
    { id: "q10", type: "rating", required: true, question: "How do you rate the Assessment of Learning by the presenter?", options: [
        ["1", "The teacher consistently integrates a variety of assessment methods (e.g., questioning, quizzes, discussions) to check for understanding throughout the session, providing immediate and personalized feedback, and adjusts instruction based on assessment results. All students demonstrate a clear understanding of the material."],
        ["2", "The teacher uses multiple assessment strategies regularly to monitor understanding, gives timely feedback, and makes minor instructional adjustments as needed. Most students show a good understanding of the material."],
        ["3", "The teacher uses basic assessment techniques (e.g., simple questioning) to gauge student understanding at key points, provides some feedback, and adjusts instruction sometimes. A majority of students demonstrate a general understanding of the material."],
        ["4", "The teacher rarely checks for understanding, relying on limited assessment methods, with delayed or minimal feedback. Few students demonstrate a satisfactory understanding of the material."],
        ["5", "The teacher fails to assess learning effectively during the session, with no meaningful feedback provided, leading to significant gaps in student understanding and engagement."]]},
    { id: "q11", type: "rating", required: true, question: "How do you rate the Fostering Critical Thinking in students by the presenter?", options: [
        ["1", "The teacher consistently promotes deep analysis and problem-solving, encouraging students to evaluate assumptions and apply knowledge in new ways."],
        ["2", "The teacher frequently prompts critical thinking through discussions and problem-solving, providing constructive feedback."],
        ["3", "The teacher sometimes encourages deeper thought and analysis, with some opportunities for critical engagement."],
        ["4", "The teacher rarely engages students in critical thinking, focusing mostly on surface-level learning."],
        ["5", "The teacher does not foster critical thinking, relying solely on rote memorization with no feedback on analytical skills."]]},
    { id: "q12", type: "single", required: true, question: "How do you rate the Punctuality of the presenter?", options: [
        ["1", "The teaching staff reached the class on time."],
        ["2", "The teaching staff reached the class late due to some genuine reason."],
        ["3", "The teaching staff reached the class late without any genuine reason."],
        ["4", "The teaching staff reached the class late by more than 10 minutes."],
        ["5", "The teaching staff did not reach class."]
    ]},
    { id: "q17", type: "rating", required: true, question: "Was the teacher’s attire appropriate?", options: [
        ["1", "Excellent – Highly appropriate and professional"],
        ["2", "Very Good – Appropriate and professional"],
        ["3", "Good – Generally appropriate"],
        ["4", "Satisfactory – Somewhat appropriate"],
        ["5", "Needs Improvement – Not appropriate/professional"]
    ] },
    { id: "q18", type: "textarea", required: true, question: "Interaction with students and doubt-solving", placeholder: "Enter your observation..." },
    { id: "q20", type: "textarea", required: true, question: "Effective utilization of lecture duration", placeholder: "Enter your observation..." },
    { id: "q21", type: "textarea", required: true, question: "Strengths Observed", placeholder: "Mention the key strengths observed..." },
    { id: "q22", type: "textarea", required: true, question: "Areas for Improvement", placeholder: "Mention areas that can be improved..." },
    { id: "q23", type: "textarea", required: true, question: "Suggestions/Recommendations by Observer", placeholder: "Enter your suggestions or recommendations..." },
];

function renderObserverQuestions() {
    const container = document.getElementById("observerQuestions");
    if (!container) return;
    container.innerHTML = "";

    const scaleNote = document.createElement("div");
    scaleNote.className = "observer-scale-note";
    scaleNote.innerHTML = "<strong>Rating Scale:</strong> 1 = Most Positive &nbsp;→&nbsp; 5 = Most Negative";
    container.appendChild(scaleNote);

    OBSERVER_QUESTIONS.forEach(function(q, index) {
        const card = document.createElement("div");
        card.className = "observer-question-card";
        card.dataset.questionId = q.id;

        const title = document.createElement("div");
        title.className = "observer-question-title";
        title.innerHTML = "<span class=\"question-number\">" + (index + 1) + "</span>" + escapeHtml(q.question) + (q.required ? " <span class=\"required-star\">*</span>" : "");
        card.appendChild(title);

        if (q.type === "rating" || q.type === "single") {
            const options = document.createElement("div");
            options.className = q.type === "rating" ? "rating-options" : "single-options";
            q.options.forEach(function(opt, optIndex) {
                const label = document.createElement("label");
                label.className = q.type === "rating" ? "rating-option" : "single-option";
                const input = document.createElement("input");
                input.type = "radio";
                input.name = q.id;
                input.value = opt[0];
                input.required = !!q.required;
                const text = document.createElement("span");
                text.textContent = opt[0] + (q.type === "rating" ? " – " : " ") + opt[1];
                label.appendChild(input);
                label.appendChild(text);
                options.appendChild(label);
            });
            card.appendChild(options);
        } else if (q.type === "yesno") {
            const options = document.createElement("div");
            options.className = "yesno-options";
            ["Yes", "No"].forEach(function(value) {
                const label = document.createElement("label");
                label.className = "yesno-option";
                const input = document.createElement("input");
                input.type = "radio";
                input.name = q.id;
                input.value = value;
                input.required = !!q.required;
                label.appendChild(input);
                const text = document.createElement("span");
                text.textContent = value;
                label.appendChild(text);
                options.appendChild(label);
            });
            card.appendChild(options);
        } else {
            const textarea = document.createElement("textarea");
            textarea.name = q.id;
            textarea.rows = 4;
            textarea.placeholder = q.placeholder || "Enter your response...";
            textarea.required = !!q.required;
            textarea.className = "observer-answer-textarea";
            card.appendChild(textarea);
        }

        container.appendChild(card);
    });
}

renderObserverQuestions();


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
        // CHANGE PASSWORD
        // ==========================================

        const changePasswordButton =
            document.getElementById("changePasswordButton");

        const changePasswordModal =
            document.getElementById("changePasswordModal");

        const changePasswordForm =
            document.getElementById("changePasswordForm");

        const changePasswordMessage =
            document.getElementById("changePasswordMessage");

        const savePasswordButton =
            document.getElementById("savePasswordButton");

        function openChangePassword() {
            changePasswordForm.reset();
            hidePasswordMessage();
            changePasswordModal.classList.remove("hidden");
            changePasswordModal.setAttribute("aria-hidden", "false");
            setTimeout(function () {
                document.getElementById("currentPassword").focus();
            }, 50);
        }

        function closeChangePassword() {
            changePasswordModal.classList.add("hidden");
            changePasswordModal.setAttribute("aria-hidden", "true");
            changePasswordForm.reset();
            hidePasswordMessage();
        }

        function showPasswordMessage(text, type) {
            changePasswordMessage.textContent = text;
            changePasswordMessage.className = "password-message " + (type === "success" ? "password-success" : "password-error");
        }

        function hidePasswordMessage() {
            changePasswordMessage.textContent = "";
            changePasswordMessage.className = "password-message hidden";
        }

        if (changePasswordButton) {
            changePasswordButton.addEventListener("click", openChangePassword);
        }

        document.getElementById("closeChangePassword").addEventListener("click", closeChangePassword);
        document.getElementById("cancelChangePassword").addEventListener("click", closeChangePassword);
        document.getElementById("changePasswordOverlay").addEventListener("click", closeChangePassword);

        changePasswordForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            hidePasswordMessage();

            const currentPassword = document.getElementById("currentPassword").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (!currentPassword || !newPassword || !confirmPassword) {
                showPasswordMessage("Please fill in all password fields.", "error");
                return;
            }

            if (newPassword.length < 6) {
                showPasswordMessage("New password must be at least 6 characters.", "error");
                return;
            }

            if (newPassword !== confirmPassword) {
                showPasswordMessage("New password and confirm password do not match.", "error");
                return;
            }

            if (currentPassword === newPassword) {
                showPasswordMessage("New password must be different from the current password.", "error");
                return;
            }

            savePasswordButton.disabled = true;
            savePasswordButton.textContent = "Changing...";

            try {
                const params = new URLSearchParams();
                params.append("action", "changePassword");
                params.append("token", token);
                params.append("currentPassword", currentPassword);
                params.append("newPassword", newPassword);

                const response = await fetch(CONFIG.API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    body: params.toString()
                });

                const data = await response.json();

                if (data.status === "unauthorized") {
                    logout();
                    return;
                }

                if (data.status !== "success") {
                    throw new Error(data.message || "Unable to change password.");
                }

                showPasswordMessage("Password changed successfully.", "success");
                changePasswordForm.reset();

                setTimeout(function () {
                    closeChangePassword();
                }, 1200);

            } catch (error) {
                console.error(error);
                showPasswordMessage(error.message || "Unable to connect to the server. Please try again.", "error");
            } finally {
                savePasswordButton.disabled = false;
                savePasswordButton.textContent = "Change Password";
            }
        });


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

    const facultyInput = document.getElementById("facultySelect");
    const facultyValue = document.getElementById("facultySelectValue");
    const button = document.getElementById("submitFeedback");

    if (!facultyValue.value || !facultyInput.value.trim()) {
        showObserverMessage("Please search and select a valid faculty member.", "error");
        return;
    }

    const answers = {};
    let firstInvalid = null;

    OBSERVER_QUESTIONS.forEach(function(q) {
        let value = "";

        if (q.type === "textarea") {
            const el = document.querySelector('[name="' + q.id + '"]');
            value = el ? el.value.trim() : "";
            if (q.required && !value && !firstInvalid) firstInvalid = el;
        } else {
            const el = document.querySelector('input[name="' + q.id + '"]:checked');
            value = el ? el.value : "";
            if (q.required && !value && !firstInvalid) {
                firstInvalid = document.querySelector('input[name="' + q.id + '"]');
            }
        }

        answers[q.id] = value;
    });

    if (firstInvalid) {
        showObserverMessage("Please answer all required questions.", "error");
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    button.disabled = true;

    try {
        const params = new URLSearchParams();
        params.append("action", "addFeedback");
        params.append("token", token);
        params.append("facultyMisId", facultyValue.value);
        params.append("feedback", JSON.stringify(answers));

        const response = await fetch(CONFIG.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: params.toString()
        });

        const data = await response.json();

        if (data.status === "success") {
            showObserverMessage(
                data.emailSent
                    ? "✓ Feedback submitted successfully and email notification sent."
                    : "✓ Feedback submitted successfully.",
                "success"
            );

            facultyInput.value = "";
            facultyValue.value = "";

            OBSERVER_QUESTIONS.forEach(function(q) {
                if (q.type === "textarea") {
                    const el = document.querySelector('[name="' + q.id + '"]');
                    if (el) el.value = "";
                } else {
                    document.querySelectorAll('input[name="' + q.id + '"]').forEach(function(el) {
                        el.checked = false;
                    });
                }
            });

            loadFeedback();
        } else {
            showObserverMessage(
                data.message || "Unable to submit feedback.",
                "error"
            );
        }
    } catch (error) {
        console.error("Observer feedback submission error:", error);
        showObserverMessage("Unable to connect to the server.", "error");
    } finally {
        button.disabled = false;
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
