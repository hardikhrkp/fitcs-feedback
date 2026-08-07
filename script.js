document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    const misInput =
        document.getElementById("misid");

    const passwordInput =
        document.getElementById("password");

    const loginButton =
        document.getElementById("loginButton");

    const loading =
        document.getElementById("loading");

    const message =
        document.getElementById("message");

    const togglePassword =
        document.getElementById("togglePassword");


    /*
     * Remove an old session whenever
     * the login page is opened.
     */
    sessionStorage.removeItem("fitcsToken");
    sessionStorage.removeItem("fitcsName");
    sessionStorage.removeItem("fitcsMis");
    

    togglePassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.textContent = "Hide";

            } else {

                passwordInput.type = "password";

                togglePassword.textContent = "Show";
            }

        }
    );


    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const misid =
                misInput.value.trim();

            const password =
                passwordInput.value;


            hideMessage();


            if (!misid || !password) {

                showMessage(
                    "Please enter MIS ID and Password.",
                    "error"
                );

                return;
            }


            if (
                !CONFIG.API_URL ||
                CONFIG.API_URL.includes("PASTE_YOUR")
            ) {

                showMessage(
                    "API URL is not configured.",
                    "error"
                );

                return;
            }


            setLoading(true);


            try {

                const params =
                    new URLSearchParams();

                params.append(
                    "action",
                    "login"
                );

                params.append(
                    "misid",
                    misid
                );

                params.append(
                    "password",
                    password
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
                        "Server returned an error."
                    );
                }


                const data =
                    await response.json();


                if (data.status === "success") {

                    /*
                     * Save temporary session.
                     */

                    sessionStorage.setItem(
                        "fitcsToken",
                        data.token
                    );

                    sessionStorage.setItem(
                        "fitcsName",
                        data.name
                    );

                    sessionStorage.setItem(
                        "fitcsMis",
                        data.misid
                    );

                    sessionStorage.setItem("fitcsCategory", data.category);


                    showMessage(
                        "Login successful. Redirecting...",
                        "success"
                    );


                    setTimeout(
                        function () {

                            window.location.href =
                                "dashboard.html";

                        },
                        500
                    );

                } else {

                    showMessage(
                        data.message ||
                        "Invalid MIS ID or Password.",
                        "error"
                    );

                }

            } catch (error) {

                console.error(error);

                showMessage(
                    "Unable to connect to the server. Please try again.",
                    "error"
                );

            } finally {

                setLoading(false);

            }

        }
    );


    function setLoading(status) {

        loginButton.disabled =
            status;

        loading.classList.toggle(
            "hidden",
            !status
        );

    }


    function showMessage(text, type) {

        message.textContent =
            text;

        message.className =
            "message";

        if (type === "success") {

            message.classList.add(
                "success-message"
            );

        } else {

            message.classList.add(
                "error-message"
            );

        }

    }


    function hideMessage() {

        message.textContent = "";

        message.className =
            "message hidden";

    }

});
