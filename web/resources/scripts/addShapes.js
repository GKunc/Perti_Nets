let id = 0;

function addSquare(x = 50, y = 50) {
    let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    let id = setId();
    square.setAttribute("id", id);
    square.setAttribute("class", "shape square");
    square.setAttribute("x", x.toString());
    square.setAttribute("y", y.toString());
    square.setAttribute("width", "70");
    square.setAttribute("height", "20");

    $(".board").append(square);
    move(id, "square");
    select(id);
}

function addCircle(x = 50, y = 50, r = 30, color = "white") {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    let id = setId();
    circle.setAttribute("id", id);
    circle.setAttribute("class", "shape circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", r.toString());
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", color);

    $(".board").append(circle);
    move(id, "circle");
    select(id);
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
    select(id);
}

function addToken(circleObject) {

}