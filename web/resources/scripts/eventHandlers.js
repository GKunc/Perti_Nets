function moveEventHandler(offset = 100) {
    let shape = $('.shape');
    shape.off('mousedown');
    shape.on('mousedown', function() {
        console.log("MOVE");
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
                [offsetX, offsetY] = movePlace(event, offset);
            } else if($(movedElement).hasClass("square")) {
                [offsetX, offsetY] = moveTransition(event, offset + 40);
            }
            moveArrow(event, arrowsIds, id, offsetX + 30, offsetY);
        });

        $(this).on("mouseup", function() {
            $(this).parents().off('mousemove');
            $(this).removeClass("active");
        });
        return false;
    });
}

function movePlace(event, offset) {
    let active = $(".active");
    let offsetX = place_radius / 2;
    let offsetY = place_radius / 2;
    active.attr("cx", event.pageX - offset);
    active.attr("cy", event.pageY);

    return [offsetX, offsetY];
}

function moveTransition(event, offset) {
    let active = $(".active");
    let offsetX = transition_width / 2;
    let offsetY = transition_height / 2;
    active.attr("x", event.pageX - offset);
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

function runTransitionEventHandler(mainMatrix, subnetsMatrixes) {
    let transition =  $('.square');
    transition.off();

    transition.on('dblclick', function() {
        const square =  $('.square');
        let subnetPlaces = findIndexesOfDoubles(mainMatrix, 1);

        let transitionId = $(this).attr('id').toString().substr(1,1);
        if(validateTransition(mainMatrix, transitionId)) {
            for (let i = 0; i < mainMatrix[transitionId].length; i++) {
                let placeValue = mainMatrix[transitionId][i];
                let placeId = "p" + i;
                let tokenId = i + 'token';

                if(subnetPlaces.includes(i)) {
                    let subnetId = subnetPlaces.indexOf(i);
                    console.log("SUBNETID: " + subnetId)
                    placeId = "subnetMain" + subnetId + "p" + i;
                    let subnetTokenId = "subnet" + i + 'token';
                    let subnetFirstElementId = "subnet" + subnetId + "p0";
                    console.log("PlaceId " + placeId);
                    let x = document.getElementById(placeId).getAttribute('cx');
                    let y = document.getElementById(placeId).getAttribute('cy');
                    addTokenToPlace(tokenId, x, y);

                    console.log("SUBNET " + subnetFirstElementId);
                    x = document.getElementById(subnetFirstElementId).getAttribute('cx');
                    y = document.getElementById(subnetFirstElementId).getAttribute('cy');
                    addTokenToPlace(subnetTokenId, x, y);

                    tokens.push(tokenId);
                }


                if (placeValue === 1) {
                    if (tokens.indexOf(tokenId) === -1) {
                        let x = document.getElementById(placeId).getAttribute('cx');
                        let y = document.getElementById(placeId).getAttribute('cy');
                        addTokenToPlace(tokenId, x, y);
                        tokens.push(tokenId);
                    }
                } else if (placeValue === -1) {
                    removeTokenFromPlace(tokenId);
                }
            }
        } else {
            alert('Nie wszystkie miejsca posiadają tokeny!');
        }
    });
}

function selectEventHandler() {
    let shape =  $('.shape');
    shape.off('dblclick');
    shape.off('keypress');
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
    if((event.which === 8 || event.which === 100) && $(document.getElementById(id)).hasClass("selected")) {
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
    const circle =  $('.circle');
    circle.off('dblclick');
    circle.on('dblclick', function() {
        let x = $(this).attr('cx');
        let y = $(this).attr('cy');
        let id = $(this).attr('id');
        let tokenId = id.toString().substr(1,1) + 'token';

        if(tokens.indexOf(tokenId) === -1) {
            addTokenToPlace(tokenId, x, y);
            tokens.push(tokenId);
        } else {
            removeTokenFromPlace(tokenId);
        }
    });
}

function moveTokenEventHandler(netMatrix) {
    const square =  $('.square');
    square.off('dblclick');
    square.on('dblclick', function () {
        let transitionId = $(this).attr('id').toString().substr(1,1);
        console.log("Transition: " + transitionId);
        if(validateTransition(transitionId)) {

            for (let i = 0; i < netMatrix[transitionId].length; i++) {
                let place = netMatrix[transitionId][i];
                let placeId = document.getElementById('p' + i).getAttribute('id');
                let tokenId = i + 'token';

                console.log("Pass Token: " + place);

                if (place === 1) {
                    if (tokens.indexOf(tokenId) === -1) {
                        let x = document.getElementById(placeId).getAttribute('cx');
                        let y = document.getElementById(placeId).getAttribute('cy');
                        addTokenToPlace(tokenId, x, y);
                        tokens.push(tokenId);
                    }
                } else if (place === -1) {
                    removeTokenFromPlace(tokenId);
                }
            }
        } else {
            alert('Nie wszystkie miejsca posiadają tokeny!');
        }
    });
}