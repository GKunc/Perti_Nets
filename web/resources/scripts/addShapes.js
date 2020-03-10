let id = 0;

function addSquare() {
    let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("id", setId());
    square.setAttribute("class", "shape square");
    square.setAttribute("x", "50");
    square.setAttribute("y", "50");
    square.setAttribute("width", "70");
    square.setAttribute("height", "20");

    $(".board").append(square);
    move("square");
    select("square")
}

function addCircle() {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("id", setId());
    circle.setAttribute("class", "shape circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "30");
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", "white");

    $(".board").append(circle);
    move("circle");
    select("circle");
}

function addArrow(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {

    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("id", setId());
    line.setAttribute("class", "shape arrow");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", "black");
    line.setAttribute("marker-end", "url(#arrow)");
    $(".board").prepend(line);
    select("arrow");
}
