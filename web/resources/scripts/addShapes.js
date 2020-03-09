function addSquare() {
    let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
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
    line.setAttribute("class", "arrow");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", "black");

    $(".board").prepend(line);
}

function getCoordinates(item) {
    let x, y;
    let class_name = item.getAttribute("class");

    if(class_name.includes("circle")) {
        x = item.getAttribute("cx");
        y = item.getAttribute("cy");
    } else {
        x = parseFloat(item.getAttribute("x")) +
            parseFloat(item.getAttribute("width")) / 2;
        y = parseFloat(item.getAttribute("y")) +
            parseFloat(item.getAttribute("height")) / 2;
    }
    return [x, y]
}

function connect() {
    let selectedItems = document.getElementsByClassName("selected");
    if(selectedItems.length != 2) {
        alert('Please select two items to connect!');
    } else {
        let x1,y1, x2, y2;
        let firstItem = selectedItems.item(0);
        let secondItem = selectedItems.item(1);
        [x1, y1] = getCoordinates(firstItem);
        [x2, y2] = getCoordinates(secondItem);
        addArrow(x1, y1, x2, y2);

        firstItem.classList.remove("selected");
        firstItem.setAttribute("stroke", "black");
        secondItem.classList.remove("selected");
        secondItem.setAttribute("stroke", "black");
    }
}

function move(class_name) {
    $("." + class_name).on('mousedown', function(e) {
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
    let clickedElement = document.querySelector('.board');
    $("." + class_name).off('dblclick');
    $("." + class_name).on('dblclick', function() {
        $(this).parents().on("keypress", function(event) {
            if(event.which == 8 && $('.' + class_name).hasClass("selected")) {
                clickedElement.removeChild(document.getElementsByClassName("selected")[0]);
            }
        });
        if($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            $(this).attr('stroke', "black")
        } else {
            $(this).addClass("selected");
            $(this).attr('stroke', "red")
        }
    });
}
