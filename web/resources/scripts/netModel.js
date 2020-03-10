var net = [];

function addElementToList(object) {
    console.log(net)
}

function connect() {
    let selectedItems = document.getElementsByClassName("selected");
    if(selectedItems.length != 2) {
        alert('Please select two items to connect!');
    } else {
        let x1,y1, x2, y2;
        let firstItem = selectedItems.item(0);
        let secondItem = selectedItems.item(1);
        [x1, y1] = getCoordinates(firstItem, 0);
        [x2, y2] = getCoordinates(secondItem, 1);
        addArrow(x1, y1, x2, y2);

        firstItem.classList.remove("selected");
        firstItem.setAttribute("stroke", "black");
        secondItem.classList.remove("selected");
        secondItem.setAttribute("stroke", "black");
    }
}
