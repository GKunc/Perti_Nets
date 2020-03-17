function getCoordinates(item, index) {
    let x, y;
    let class_name = item.getAttribute("class");

    if(class_name.includes("circle")) {
        x = parseFloat(item.getAttribute("cx"));
        if(index == 0) {
            y = parseFloat(item.getAttribute("cy"));
        } else {
            y = parseFloat(item.getAttribute("cy"));
        }
    } else {
        x = parseFloat(item.getAttribute("x")) + 35;
        if(index == 0) {
            y = parseFloat(item.getAttribute("y")) +
                parseFloat(item.getAttribute("height"));
        } else {
            y = parseFloat(item.getAttribute("y"));
        }

    }
    return [x, y]
}

function setTransitionId() {
    return currentTransitionId++;
}

function setPlaceId() {
    return currentPlaceId++;
}

function removeElementById(list, id) {
    let index = list.indexOf(id);
    if (index !== -1) {
        list.splice(index, 1);
    }
}

function clearList(list) {
    list.splice(0, list.length);
}

function splitArrowToStartAndEnd(arrows, arrowsIds, startOfArrow, endOfArrow) {
    arrows.forEach(element => {
        arrowsIds.push(element.getAttribute("id"));
        startOfArrow.push(element.getAttribute("id").split(";")[0]);
        endOfArrow.push(element.getAttribute("id").split(";")[1]);
    });
}

function splitArrowId(placeAndTransitionId) {
    let elementId, groupId;
    placeAndTransitionId.forEach(id => {
        if(id.includes("p")) {
            elementId = parseInt(id.substr(1));
        } else if(id.includes("t")) {
            groupId = parseInt(id.substr(1));
        }
    });
    return [groupId, elementId];
}