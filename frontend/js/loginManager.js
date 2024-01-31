const loginButton = document.querySelector('.Login');
const userValue = document.querySelector('#user');
const passValue = document.querySelector('#password');

loginButton.addEventListener('click', async (e) => {
    const username = userValue.value;
    const password = passValue.value;

    if (username !== "" && password !== "") {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if(data.message == "Login successful."){
                localStorage.setItem("session_token", data.token)
                window.location = "/"
            } 

        } catch (error) {
            console.error('Error:', error);
        }
    }

});