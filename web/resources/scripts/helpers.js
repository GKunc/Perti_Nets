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

function setId() {
    return id++;
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