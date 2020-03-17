function moveEventHandler() {
    let shape = $('.shape');
    shape.off('mousedown');
    shape.on('mousedown', function() {
        let arrows = Array.from(document.getElementsByClassName("arrow"));
        let arrowsIds = [];
        let startOfArrow = [];
        let endOfArrow = [];
        let offsetX, offsetY;

        let id = $(this).attr("id");
        let movedElement = $(this);

        splitArrowToStartAndEnd(arrows, arrowsIds, startOfArrow, endOfArrow);

        $(this).addClass('active');

        $(this).parents().on('mousemove', function(event) {
            if($(movedElement).hasClass("circle")) {
                [offsetX, offsetY] = movePlace(event);
            } else if($(movedElement).hasClass("square")) {
                [offsetX, offsetY] = moveTransition(event);
            }
            moveArrow(event, arrowsIds, id, offsetX, offsetY);
        });

        $(this).on("mouseup", function() {
            $(this).parents().off('mousemove');
            $(this).removeClass("active");
        });
        return false;
    });
}

function movePlace(event) {
    let active = $(".active");
    let offsetX = place_radius / 2;
    let offsetY = place_radius / 2;
    active.attr("cx", event.pageX - 150);
    active.attr("cy", event.pageY);

    return [offsetX, offsetY];
}

function moveTransition(event) {
    let active = $(".active");
    let offsetX = transition_width / 2;
    let offsetY = transition_height / 2;
    active.attr("x", event.pageX - 150);
    active.attr("y", event.pageY - 10);

    return [offsetX, offsetY];
}

function moveArrow(event, arrows, id, offsetX, offsetY) {
    arrows.forEach(arrowId => {
        let placeAndTransition = arrowId.split(";");
        if(placeAndTransition[0] === id) {
            $(document.getElementById(arrowId)).attr("x1", event.pageX - 160 + offsetX);
            $(document.getElementById(arrowId)).attr("y1", event.pageY - 10 + offsetY);
        } else if(placeAndTransition[1] === id) {
            $(document.getElementById(arrowId)).attr("x2", event.pageX - 160 + offsetX);
            $(document.getElementById(arrowId)).attr("y2", event.pageY - 10 + offsetY);
        }
    });
}

function selectEventHandler() {
    let shape =  $('.shape');
    shape.off('dblclick');
    shape.on('dblclick', function() {
        let id = $(this).attr('id');

        $(this).parents().on("keypress", function(event) {
            deleteElement(event, id);
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

function deleteElement(event, id) {
    let documentElement = document.querySelector('.board');
    if(event.which === 8 && $(document.getElementById(id)).hasClass("selected")) {
        if($(document.getElementById(id)).hasClass("arrow")) {
            let placeAndTransitionId = id.toString().split(";");
            let [groupId, elementId] = splitArrowId(placeAndTransitionId);
            netMatrix[groupId][elementId] = 0;
        }
        documentElement.removeChild($(document.getElementById(id))[0]);
        clearList(selectedElements);
    }
}

function addTokenEventHandler() {
    $('.circle').on('dblclick', function() {
        let x = $(this).attr('cx');
        let y = $(this).attr('cy');
        let id = $(this).attr('id');
        let tokenId = id + 'token';

        if(tokens.indexOf(tokenId) === -1) {
            addTokenToPlace(id + 'token', x, y);
            tokens.push(tokenId);
        } else {
            let documentElement = document.querySelector('.board');
            let elementToRemove = document.getElementById(tokenId);
            documentElement.removeChild(elementToRemove);
            removeElementById(tokens, tokenId)
        }
    });
}