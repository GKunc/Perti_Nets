function build() {
    $('.shape').off();

    for(let i=0; i<selectedElements.length; i++) {
        let elementId = selectedElements[i];
        document.getElementById(elementId).classList.remove("selected");
        document.getElementById(elementId).setAttribute("stroke", "black");
    }
    clearList(selectedElements);
    addToken();
    for(let i=0; i<netMatrix.length; i++) {
        netMatrix[i].push(placesMatrix);
    }
    console.log(netMatrix)
}

function start() {
    console.log("Start");
}

function stop() {
    console.log("Start");
}
