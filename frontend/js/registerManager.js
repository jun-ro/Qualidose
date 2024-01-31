const registerButton = document.querySelector('.Register');
const userValue = document.querySelector('#user');
const passValue = document.querySelector('#password');

registerButton.addEventListener('click', async (e) => {
    const username = userValue.value;
    const password = passValue.value;

    if (username !== "" && password !== "") {
        try {
            const response = await fetch('/register', {
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
            if(data.message === "User registered successfully."){
                window.location = '/login'
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

});