let selectedElements = [];
let tokens = [];

function move(id, class_name) {
    $(document.getElementById(id)).on('mousedown', function(e) {
        let arrows = Array.from(document.getElementsByClassName("arrow"));
        let arrowsIds = [];
        let startOfArrow = [];
        let endOfArrow = [];
        let foundId;
        let offsetX, offsetY;

        arrows.forEach(element => {
            arrowsIds.push(element.getAttribute("id"));
            startOfArrow.push(element.getAttribute("id").split(";")[0]);
            endOfArrow.push(element.getAttribute("id").split(";")[1]);
        });

        $(this).addClass('active');

        $(this).parents().on('mousemove', function(e) {
            if(class_name === "circle") {
                offsetX = 15;
                offsetY = 15;
                $(".active").attr("cx", e.pageX - 150);
                $(".active").attr("cy", e.pageY);
            } else if(class_name === "square") {
                offsetX = 35;
                offsetY = 10;
                $(".active").attr("x", e.pageX - 150);
                $(".active").attr("y", e.pageY - 10);
            }

            let startIndex = startOfArrow.indexOf(id.toString());
            let endIndex = endOfArrow.indexOf(id.toString());

            if (startIndex !== -1) {
                arrowsIds.forEach(arrowId => {
                    if(arrowId.split(";")[0] == id) {
                        foundId = arrowId;
                        $(document.getElementById(arrowId)).attr("x1", e.pageX - 160 + offsetX);
                        $(document.getElementById(arrowId)).attr("y1", e.pageY - 10 + offsetY);
                    }
                });
            }
            if (endIndex !== -1) {
                arrowsIds.forEach(arrowId => {
                    if(arrowId.split(";")[1] == id) {
                        foundId = arrowId;
                        $(document.getElementById(arrowId)).attr("x2", e.pageX - 160 + offsetX);
                        $(document.getElementById(arrowId)).attr("y2", e.pageY - 10 + offsetY);
                    }
                });
            }
        });

        $(this).on("mouseup", function (e) {
            $(this).parents().off('mousemove');
            $(this).removeClass("active");
        });
        return false;
    });
}

function select(id) {
    let clickedElement = document.querySelector('.board');
    $(document.getElementById(id)).off('dblclick');
    $(document.getElementById(id)).on('dblclick', function() {
        $(this).parents().on("keypress", function(event) {
            if(event.which == 8 && $(document.getElementById(id)).hasClass("selected")) {
                clickedElement.removeChild($(document.getElementById(id))[0]);
                clearList(selectedElements);
            }
        });

        if($(this).hasClass("selected")) {
            removeElementById(selectedElements, id);
            $(this).removeClass("selected");
            $(this).attr('stroke', "black")
        } else {
            selectedElements.push(id);
            $(this).addClass("selected");
            $(this).attr('stroke', "red")
        }
    });
}

function addToken() {
    $('.circle').off('dblclick');
    $('.circle').on('dblclick', function() {
        let x = $(this).attr('cx');
        let y = $(this).attr('cy');
        let id = $(this).attr('id');
        if(tokens.indexOf(id) === -1) {
            addTokenToCircle(id,x, y);
            tokens.push(id);
        }
        console.log(tokens)
    });
}