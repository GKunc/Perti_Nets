function move() {
    $('.shape').off('mousedown');
    $('.shape').on('mousedown', function() {
        console.log("Mousedown")
        let arrows = Array.from(document.getElementsByClassName("arrow"));
        let arrowsIds = [];
        let startOfArrow = [];
        let endOfArrow = [];
        let foundId;
        let offsetX, offsetY;

        let id = $(this).attr("id");

        arrows.forEach(element => {
            arrowsIds.push(element.getAttribute("id"));
            startOfArrow.push(element.getAttribute("id").split(";")[0]);
            endOfArrow.push(element.getAttribute("id").split(";")[1]);
        });

        console.log(arrowsIds)
        console.log(startOfArrow)
        console.log(endOfArrow)

        $(this).addClass('active');
        let movedElement = $(this);

        $(this).parents().on('mousemove', function(e) {
            if($(movedElement).hasClass("circle")) {
                offsetX = 15;
                offsetY = 15;
                $(".active").attr("cx", e.pageX - 150);
                $(".active").attr("cy", e.pageY);
            } else if($(movedElement).hasClass("square")) {
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

function select() {
    let clickedElement = document.querySelector('.board');
    $('.shape').off('dblclick');
    $('.shape').on('dblclick', function() {
        let id = $(this).attr('id');
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
    $('.circle').on('dblclick', function() {

        let x = $(this).attr('cx');
        let y = $(this).attr('cy');
        let id = $(this).attr('id');
        let tokenId = id + 'token';

        if(tokens.indexOf(tokenId) === -1) {
            addTokenToPlace(id + 'token', x, y);
            tokens.push(tokenId);
        } else {
            let clickedElement = document.querySelector('.board');
            let elementToRemove = document.getElementById(tokenId);
            clickedElement.removeChild(elementToRemove);
            removeElementById(tokens, tokenId)
        }
    });
}