var net = [];

function addElementToList(object) {
    console.log(net)
}

function connect() {
    if(validateConnection()) {
        let x1, y1, x2, y2;
        let firstItem = document.getElementById(selectedElements[0]);
        let secondItem = document.getElementById(selectedElements[1]);
        [x1, y1] = getCoordinates(firstItem, 0);
        [x2, y2] = getCoordinates(secondItem, 1);
        addArrow(selectedElements[0], x1, y1, selectedElements[1], x2, y2);

        selectedElements.pop();
        firstItem.classList.remove("selected");
        firstItem.setAttribute("stroke", "black");

        selectedElements.pop();
        secondItem.classList.remove("selected");
        secondItem.setAttribute("stroke", "black");
    }
}

function validateConnection() {
    let firstElement = document.getElementById(selectedElements[0]);
    let secondElement = document.getElementById(selectedElements[1]);

    if(selectedElements.length != 2) {
        alert("Please select two items to connect!");
        return false;
    } else if(firstElement.getAttribute("class") == secondElement.getAttribute("class")) {
        alert("Can not connect objects of the same class!");
        selectedElements.pop();
        firstElement.classList.remove("selected");
        firstElement.setAttribute("stroke", "black");

        selectedElements.pop();
        secondElement.classList.remove("selected");
        secondElement.setAttribute("stroke", "black");
        return false;
    } else if(firstElement.getAttribute("class").includes("arrow") ||
              secondElement.getAttribute("class").includes("arrow")) {
        alert("Can not connect arrow object!");

        selectedElements.pop();
        firstElement.classList.remove("selected");
        firstElement.setAttribute("stroke", "black");

        selectedElements.pop();
        secondElement.classList.remove("selected");
        secondElement.setAttribute("stroke", "black");

        return false;
    }
    return true;
}
