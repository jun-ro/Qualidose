const cards = document.getElementsByClassName('card-container');

function loadImages() {
    for (let i = 0; i < cards.length; i++) {
        var currentCard = cards[i];

        // Access the child element with id 'name' within the current card
        var cardNameElement = currentCard.querySelector('#name');

        // Check if the element with id 'name' exists within the current card
        if (cardNameElement) {
            var cardName = cardNameElement.textContent || cardNameElement.innerText;

            // Use a closure to capture the correct reference to currentCard
            (function (card) {
                fetch(`/getMedImage?name=${cardName}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    card.querySelector('.image-container').style.backgroundImage = `url(${data.message})`;
                });
            })(currentCard);
        }
    }
}

document.addEventListener('DOMContentLoaded', loadImages);
