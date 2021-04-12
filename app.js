const button = document.querySelector("#joke_button");
const joke = document.querySelector('#joke');
const req = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist";


let setup = document.createElement('p');
let delivery = document.createElement('p');

let speakIt = function (jokeText) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = jokeText;
    window.speechSynthesis.speak(msg);
}

button.addEventListener("click", (e) => {


    setup.textContent = "";
    delivery.textContent = "";

    fetch(req)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    setup.textContent = data.setup;
                    if (setup.textContent != "") {
                        speakIt(data.setup)
                    }
                    joke.appendChild(setup);

                    setTimeout(() => {
                        delivery.textContent = data.delivery;
                        if (delivery.textContent != "") { speakIt(data.delivery) }
                        joke.appendChild(delivery)
                    }, 3000)
                });
            }
        )
        .catch(function (err) {
            console.log('Error connecting to joke api', err);
        });
    speakIt("");
})