function start() {
    $('.shape').off();

    for(let i=0; i<selectedElements.length; i++) {
        let elementId = selectedElements[i];
        document.getElementById(elementId).classList.remove("selected");
        document.getElementById(elementId).setAttribute("stroke", "black");
    }
    clearList(selectedElements);
    console.log(selectedElements);
    addToken();
}


