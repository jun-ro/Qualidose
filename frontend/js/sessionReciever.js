function receiveData() {
    const sessionToken = localStorage.getItem('session_token');

    if (sessionToken) {
        // Redirect to the home page if already logged in
        if (window.location.pathname === "/login") {
            window.location.href = "/";
        }
    } else {
        // Redirect to the login page if not logged in
        if (window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
    }
}

// Call the function when the page is loaded
document.addEventListener('DOMContentLoaded', receiveData);

