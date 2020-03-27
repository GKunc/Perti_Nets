function addTransition(x = 50, y = 50) {
    let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    let id = setTransitionId();
    square.setAttribute("id", "t" + id);
    square.setAttribute("class", "shape square");
    square.setAttribute("x", x.toString());
    square.setAttribute("y", y.toString());
    square.setAttribute("width", "70");
    square.setAttribute("height", "20");

    $(".board").append(square);
    selectEventHandler();
    moveEventHandler();

    let newTransition = [];
    if(placesCounter !== 0) {
        for(let i=0; i<placesCounter; i++) {
            newTransition.push(0);
        }
    }
    netMatrix.push(newTransition);
}

function addPlace(x = 50, y = 50, r = 30, color = "white") {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    let id = setPlaceId();
    circle.setAttribute("id", "p" + id);
    circle.setAttribute("class", "shape circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", r.toString());
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", color);

    $(".board").append(circle);
    selectEventHandler();
    moveEventHandler();

    placesCounter++;
    for(let i=0; i<netMatrix.length; i++) {
        netMatrix[i].push(0);
    }
}

function addArrow(id1, x1 = 0, y1 = 0, id2, x2 = 0, y2 = 0) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let id = id1 + ';' + id2;
    line.setAttribute("id", id);
    line.setAttribute("class", "shape arrow");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", "black");
    line.setAttribute("marker-end", "url(#arrow)");
    $(".board").append(line);
    selectEventHandler();
}

function addTokenToPlace(id, x, y) {
    let token = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    token.setAttribute("id", id);
    token.setAttribute("class", "shape token");
    token.setAttribute("cx", x.toString());
    token.setAttribute("cy", y.toString());
    token.setAttribute("r", "10");
    token.setAttribute("stroke", "black");
    token.setAttribute("fill", "black");
    $(".board").append(token);
}

function removeTokenFromPlace(id) {
    let documentElement = document.querySelector('.board');
    let elementToRemove = document.getElementById(id);
    documentElement.removeChild(elementToRemove);
    removeElementById(tokens, id)
}