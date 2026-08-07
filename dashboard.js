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
            sessionStorage.getItem("fitcsCategory");

        /*
         * Prevent direct dashboard access.
         */

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


        /*
         * Display faculty information.
         */

        document.getElementById(
            "facultyName"
        ).textContent =
            facultyName;


        document.getElementById(
            "facultyMis"
        ).textContent =
            facultyMis;

        document.getElementById("facultyCategory").textContent =
    facultyCategory;

        document.getElementById(
            "profileInitial"
        ).textContent =
            facultyName
                .charAt(0)
                .toUpperCase();


        /*
         * Logout
         */

        document.getElementById(
            "logoutButton"
        ).addEventListener(
            "click",
            logout
        );


        loadFeedback();

        checkAcknowledgement();


        async function loadFeedback() {

            const loading =
                document.getElementById(
                    "feedbackLoading"
                );


            const container =
                document.getElementById(
                    "feedbackContainer"
                );


            const count =
                document.getElementById(
                    "feedbackCount"
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
                            body: params.toString()
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Unable to load feedback."
                    );

                }


                const data =
                    await response.json();


                loading.classList.add(
                    "hidden"
                );


                /*
                 * Session expired.
                 */

                if (
                    data.status ===
                    "unauthorized"
                ) {

                    alert(
                        "Your session has expired. Please login again."
                    );

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


                /*
                 * Update server-authoritative
                 * faculty information.
                 */

                document.getElementById(
                    "facultyName"
                ).textContent =
                    data.name;


                document.getElementById(
                    "facultyMis"
                ).textContent =
                    data.misid;


                document.getElementById(
                    "profileInitial"
                ).textContent =
                    data.name
                        .charAt(0)
                        .toUpperCase();


                const feedbackList =
                    Array.isArray(
                        data.feedback
                    )
                        ? data.feedback
                        : [];


                const total =
                    feedbackList.length;


                count.textContent =
                    total +
                    (
                        total === 1
                            ? " Feedback"
                            : " Feedbacks"
                    );


                container.innerHTML =
                    "";


                if (total === 0) {

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


                feedbackList.forEach(
                    function (
                        feedback,
                        index
                    ) {


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


                        const text =
                            document.createElement(
                                "div"
                            );


                        text.className =
                            "feedback-text";


                        /*
                         * textContent protects
                         * against HTML injection.
                         */

                        text.textContent =
                            feedback;


                        card.appendChild(
                            number
                        );


                        card.appendChild(
                            text
                        );


                        container.appendChild(
                            card
                        );

                    }
                );


            } catch (error) {

                console.error(error);


                loading.classList.add(
                    "hidden"
                );


                message.className =
                    "message error-message";


                message.textContent =
                    "Could not load feedback. Please try again later.";

            }

        }

        document.getElementById("submitAck").addEventListener("click", async function () {

            if (!document.getElementById("agree").checked) {
                alert("Please accept the acknowledgement.");
                return;
            }
        
            let remarks = document.getElementById("remarks").value;
        
            let token = sessionStorage.getItem("fitcsToken");
        
            let params = new URLSearchParams();
        
            params.append("action", "acknowledgement");
            params.append("token", token);
            params.append("remarks", remarks);
        
            let response = await fetch(CONFIG.API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params.toString()
            });
        
            let data = await response.json();
        
            if(data.status=="success"){

                document.getElementById("submitAck").disabled=true;
            
                document.getElementById("agree").disabled=true;
            
                document.getElementById("remarks").disabled=true;
            
                document.getElementById("agree").checked=true;
            
                document.getElementById("ackStatus").innerHTML=
                "✅ Acknowledged on "+data.datetime;
            
            }
        
        });

        async function checkAcknowledgement(){

            let token = sessionStorage.getItem("fitcsToken");
        
            let params = new URLSearchParams();
        
            params.append("action","checkAcknowledgement");
            params.append("token",token);
        
            let response = await fetch(CONFIG.API_URL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body:params.toString()
            });
        
            let data = await response.json();
        
            if(data.status=="already"){
        
                document.getElementById("agree").checked=true;
        
                document.getElementById("agree").disabled=true;
        
                document.getElementById("remarks").value=data.remarks;
        
                document.getElementById("remarks").disabled=true;
        
                document.getElementById("submitAck").disabled=true;
        
                document.getElementById("ackStatus").innerHTML=
                "✅ Acknowledged on "+data.datetime;
        
            }
        
        }

        function logout() {

            sessionStorage.removeItem(
                "fitcsToken"
            );

            sessionStorage.removeItem(
                "fitcsName"
            );

            sessionStorage.removeItem(
                "fitcsMis"
            );


            window.location.replace(
                "index.html"
            );

        }

    }
);
