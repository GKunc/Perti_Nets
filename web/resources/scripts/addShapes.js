function addSquare() {
    var square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("class", "shape square");
    square.setAttribute("x", "50");
    square.setAttribute("y", "50");
    square.setAttribute("width", "70");
    square.setAttribute("height", "20");
    $(".board").append(square);
    move("square");
    select("square")
    // select("square");
}

function addCircle() {
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "shape circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "30");
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", "white");
    $(".board").append(circle);
    move("circle");
    select("circle");
    // select("circle");
}

function drawArrow() {
    $(".shape").onclick
    addArrow(x1, y1, x2, y2);
}
function addArrow(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", "arrow");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", "black");

    $(".board").append(line);
    move("arrow");
}

function move(class_name) {
    $("." + class_name).on('mousedown', function(e) {
        $(this).removeClass("selected");
        $(this).addClass('active');

        $(this).parents().on('mousemove', function(e) {
            if(class_name == "circle") {
                $(".active").attr("cx", e.pageX - 150);
                $(".active").attr("cy", e.pageY);
            } else if(class_name == "square") {
                $(".active").attr("x", e.pageX - 150);
                $(".active").attr("y", e.pageY - 10);
            } else if(class_name == "arrow") {
                $(".active").attr("x1", e.pageX - 150);
                $(".active").attr("y1", e.pageY - 10);
                $(".active").attr("x2", e.pageX - 150);
                $(".active").attr("y2", e.pageY - 10);
            }
        });

        $(this).on("mouseup", function (e) {
            $(this).removeClass("active");
        });
        return false;
    });
}

function select(class_name) {
    $("." + class_name).on('dblclick', function (e) {
        addArrow($(this).attr("x"), $(this).attr("y"),
            $(this).attr("x") + 0, $(this).attr("y") + 0);
        console.log($(this).attr("x"), $(this).attr("y"));
    });
}
