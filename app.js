function clearUi() {
    Array.from(document.getElementsByClassName('field')).forEach(function (element) {
        element.innerText = "";
    })
}


document.getElementById('reset').addEventListener('click', clearUi)
