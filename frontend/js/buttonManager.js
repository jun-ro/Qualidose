const editButton = document.querySelector('.edit');
const addButton = document.querySelector('.add');
const closeaddButton = document.querySelector('.addclose')
const cardElements = document.getElementsByClassName('card-container');
const addnewButton = document.querySelector('.addnew')


let debounce = false;

editButton.addEventListener('click', () => {
    if (!debounce) {
        for (let i = 0; i < cardElements.length; i++) {
            const currentCard = cardElements[i];

            // Insert the close button at the top of the card's content
            currentCard.insertAdjacentHTML('afterbegin', `<button class="close">X</button>`);

            // Add an event listener to the close button
            const closeButton = currentCard.querySelector('.close');
            closeButton.addEventListener('click', () => {
                currentCard.remove()
            });
        }

        debounce = true;
    } else {
        for (let i = 0; i < cardElements.length; i++) {
            const currentCard = cardElements[i];

            // Remove existing close buttons
            const existingCloseButtons = currentCard.querySelectorAll('.close');
            existingCloseButtons.forEach(button => button.remove());
        }
        debounce = false
    }
});


closeaddButton.addEventListener('click', () => {
    const addContainer = document.querySelector('.add-container')
    const topValue = parseInt(window.getComputedStyle(addContainer).getPropertyValue('top'))

    if (topValue < 268) {
        addContainer.style.animation = 'popdown 0.3s forwards'
    } else {
        addContainer.style.animation = 'moveup 0.3s forwards'
    }
})


addButton.addEventListener('click', () => {
    const addContainer = document.querySelector('.add-container')
    const topValue = parseInt(window.getComputedStyle(addContainer).getPropertyValue('top'))

    if (topValue < 268) {
        addContainer.style.animation = 'popdown 0.3s forwards'
    } else {
        addContainer.style.animation = 'moveup 0.3s forwards'
    }
})

addnewButton.addEventListener('click', () => {
    const hourElement = document.querySelector('.hour');
    const minuteElement = document.querySelector('.minutes');
    const nameElement = document.querySelector('.name');

    const hourValue = parseInt(hourElement.value, 10); // Parse the value to an integer
    const minuteValue = parseInt(minuteElement.value, 10); // Parse the value to an integer

    if (hourValue >= 0 && hourValue <= 24 && minuteValue >= 0 && minuteValue < 60) {
        // Valid hour and minute values, proceed with your logic

        // Format the hour and minute values
        const formattedHour = hourValue.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        const formattedMinute = minuteValue.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });

        // Determine AM or PM
        const period = hourValue < 12 ? 'AM' : 'PM';

        // Convert to 12-hour format
        const formattedTime = `${(hourValue % 12 || 12)}:${formattedMinute} ${period}`;

        // Create a new card with the formatted time and other values
        const newCard = document.createElement('div');
        newCard.classList.add('card-container');

        // Add other elements (e.g., image-container, name, etc.) as needed
        newCard.innerHTML = `
            <div class="image-container"></div>
            <div class="text-container">
                <p id="name">${nameElement.value}</p>
                <p class="time">${formattedTime}</p>
            </div>
         `;

        // Append the new card to the container or wherever you want to place it

        document.querySelector('.main').appendChild(newCard);

        // Load the images

        fetch(`/getMedImage?name=${nameElement.value}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                newCard.querySelector('.image-container').style.backgroundImage = `url(${data.message})`;
            });

        // Local Storage

        var medicineObject = {
            Name: nameElement.value,
            Time: formattedTime
        }

        localStorage.setItem(document.getElementsByClassName('card-container').length.toString(), JSON.stringify(medicineObject))

        // Clear input values for the next entry

        hourElement.value = '';
        minuteElement.value = '';
        nameElement.value = '';

    } else {
        // Handle invalid input values (show an error message, etc.)
        console.log('Invalid hour or minute value.');
    }
});
