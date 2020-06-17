function initMinimizedNet() {
    // console.log(window.mainMinimizedMatrix);
    // console.log(window.subnetsMatrixes);

    let subnetColors = ["yellow", "blue", "red", "pink", "grey"];
    let main = window.mainMinimizedMatrix;
    let subnet = window.subnetsMatrixes;

    mainMatrix(main, subnetColors);
    for(let i=0; i<subnet.length; i++) {
        subnetMatrix(subnet, i, subnetColors);
        subnetCompleted.push(0);
    }

    simulateMinimized(main, subnet);
}

function simulateMinimized(main, subnet) {
    runTransitionEventHandler(main, subnet);
}

function mainMatrix(main, subnetColors) {

    for(let i=0; i < main.length; i++) {
        addTransition(150 + 100*i, 150, true);
    }

    let subnetPlaces = findIndexesOfDoubles(main, 1);
    let subnetId = 0;

    for(let i=0; i < main[0].length; i++) {
        if(subnetPlaces.includes(i)) {
            addSubnet(subnetId, i,100 + 100*i, 50, true, place_radius, subnetColors[subnetId]);
            subnetId++;
        } else {
            addPlace(i, 100 + 100*i, 50, true);
        }
    }

    // dont let user move elements

    // connect places and tokens like in matrix
    let subnetFind = 0;
    for(let i=0; i<main.length; i++) {
        let transitionId = "t" + i;
        let transitionX = document.getElementById(transitionId).getAttribute('x');
        let transitionY = document.getElementById(transitionId).getAttribute('y');

        for (let j = 0; j < main[0].length; j++) {
            let placeId = "p" + j;
            if(subnetPlaces.includes(j)) {
                let subnetId = subnetPlaces.indexOf(j);
                placeId = "subnetMain" + subnetId + placeId;
                subnetFind += 1;
            }
            let placeX = document.getElementById(placeId).getAttribute('cx');
            let placeY = document.getElementById(placeId).getAttribute('cy');

            if(main[i][j] === 1) {
                // strzalka od tranzycji do miejsca
                addArrow(transitionId, (parseInt(transitionX) + 35), (parseInt(transitionY) - 5), placeId, placeX, placeY);
            } else if(main[i][j] === -1) {
                // strzalka od miejsca do tranzycji
                addArrow(placeId, placeX, placeY, transitionId, (parseInt(transitionX) + 35), (parseInt(transitionY) - 5));
            }
        }
    }

    // set starting token
    let placeId = 'p0';
    let x = document.getElementById(placeId).getAttribute('cx');
    let y = document.getElementById(placeId).getAttribute('cy');
    addTokenToPlace(0 + "token", x, y);

    $('.shape').off();
    runTransitionEventHandler();
    return main;
}

function subnetMatrix(subnet, index, subnetColors) {
    subnet = subnet[index];
    for(let i=0; i < subnet.length; i++) {
        addTransitionToSubnet(index, i, 150 + 100*i, 150+(200*(index+1)), true);
    }

    for(let i=0; i < subnet[0].length; i++) {
        addPlaceToSubnet(index, i, 100 + 100*i, 50+100*(2*index+2), true, place_radius, subnetColors[index]);
    }
    let subnetId = "subnet" + index;

    for(let i=0; i<subnet.length; i++) {
        let transitionId = subnetId + "t" + i;
        let transitionX = document.getElementById(transitionId).getAttribute('x');
        let transitionY = document.getElementById(transitionId).getAttribute('y');

        for (let j = 0; j < subnet[0].length; j++) {
            let placeId = subnetId + "p" + j;
            let placeX = document.getElementById(placeId).getAttribute('cx');
            let placeY = document.getElementById(placeId).getAttribute('cy');

            if(subnet[i][j] === 1) {
                // strzalka od tranzycji do miejsca
                addArrow(transitionId, (parseInt(transitionX) + 35), (parseInt(transitionY) - 5), placeId, placeX, placeY);
            } else if(subnet[i][j] === -1) {
                // strzalka od miejsca do tranzycji
                addArrow(placeId, placeX, placeY, transitionId, (parseInt(transitionX) + 35), (parseInt(transitionY) - 5));
            }
        }
    }
    $('.shape').off();
    runTransitionEventHandler();
}

function addTransitionToSubnet(subnetId, id, x = 50, y = 50, minimized = false) {
    let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("id", "subnet" + subnetId + "t" + id);
    square.setAttribute("class", "shape square");
    square.setAttribute("x", x.toString());
    square.setAttribute("y", y.toString());
    square.setAttribute("width", transition_width);
    square.setAttribute("height", transition_height);

    $(".board").append(square);
    if(minimized) {
        moveEventHandler(0);
    } else {
        moveEventHandler();
    }
    selectEventHandler();

    let newTransition = [];
    if(placesCounter !== 0) {
        for(let i=0; i<placesCounter; i++) {
            newTransition.push(0);
        }
    }
    netMatrix.push(newTransition);
}

function addPlaceToSubnet(subnetId, id = -1, x = 50, y = 50, minimized = false, r = place_radius, color = "blue") {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    circle.setAttribute("id", "subnet" + subnetId + "p" + id);
    circle.setAttribute("class", "shape circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", r.toString());
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", color);

    $(".board").append(circle);
    selectEventHandler();
    if(minimized) {
        moveEventHandler(0);
    } else {
        moveEventHandler();
    }
}

function addSubnet(subnetId, id= -1, x = 50, y = 50, minimized = false, r = place_radius, color = "yellow") {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    circle.setAttribute("id", "subnetMain" + subnetId + "p" + id);
    circle.setAttribute("class", "shape circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", r.toString());
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", color);

    $(".board").append(circle);
}
