function LoadElements() {
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        var currentKey = localStorage.key(i);
        var storedValue = localStorage.getItem(currentKey);

        if (parseInt(currentKey)) {
            try {
                var parsedValue = JSON.parse(storedValue);

                console.log(parsedValue)

                // Include the object in the array if it has the expected properties
                if (
                    parsedValue.hasOwnProperty('Time') &&
                    parsedValue.hasOwnProperty('Name')
                ) {
                    var newElement = document.createElement('div')
                    newElement.className = 'card-container'
                    newElement.innerHTML = `
                            <div class="image-container"></div>
            <div class="text-container">
                <p id="name">${parsedValue.Name}</p>
                <p class="time">${parsedValue.Time}</p>
            </div>
                `

                document.querySelector('.main').appendChild(newElement)
                }
            } catch (error) {

            }
        }

    }
}

LoadElements()