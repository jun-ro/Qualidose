const userIcon = document.querySelector('.user-icon');
const userName = document.querySelector('.username')

function grabUser() {
    // Assuming you have some logic here to get user data or token
    const userToken = localStorage.getItem('session_token'); // Replace with actual user token

    // Fetch user data using the getUser endpoint
    fetch(`/getUser?token=${userToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {

        if(data.error && data.error.name === "TokenExpiredError"){
            localStorage.removeItem('session_token')
            window.location = '/login'
        } 
        // Assuming your API response contains user information including an attribute like 'avatarSeed'
        const avatarSeed = data.message.username;

        // Assign the avatar to the userIcon
        assignUser(avatarSeed);
    })
    .catch(error => {
        console.error('Error fetching user:', error);
    });
}

function assignUser(avatarSeed) {
    // Use the avatarSeed to generate the DiceBear avatar URL
    const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${avatarSeed}`;

    // Set the background image of the userIcon
    userIcon.style.backgroundImage = `url("${avatarUrl}")`;
    userName.innerHTML = avatarSeed
}

document.addEventListener('DOMContentLoaded', grabUser);
