function initMinimizedNet() {
    // console.log(window.mainMinimizedMatrix);
    // console.log(window.subnetsMatrixes);

    let main = mainMatrix();
    start(main);
    //
    // subnetMatrix(0);
    // subnetMatrix(1);
}

function mainMatrix() {
    let main = window.mainMinimizedMatrix;

    for(let i=0; i < main.length; i++) {
        addTransition(150 + 100*i, 150, true);
    }

    for(let i=0; i < main[0].length; i++) {
        addPlace(i, 100 + 100*i, 50, true);
    }
    // dont let user move elements
    $('.shape').off('mousedown');

    // connect places and tokens like in matrix
    for(let i=0; i<main.length; i++) {
        let transitionId = "t" + i;
        let transitionX = document.getElementById(transitionId).getAttribute('x');
        let transitionY = document.getElementById(transitionId).getAttribute('y');

        for (let j = 0; j < main[0].length; j++) {
            let placeId = "p" + j;
            let placeX = document.getElementById(placeId).getAttribute('cx');
            let placeY = document.getElementById(placeId).getAttribute('cy');

            if(main[i][j] === 1) {
                // strzalka od tranzycji do miejsca
                addArrow(transitionId, (parseInt(transitionX) + 35), transitionY, placeId, placeX, placeY);
            } else if(main[i][j] === -1) {
                // strzalka od miejsca do tranzycji
                addArrow(placeId, placeX, placeY, transitionId, (parseInt(transitionX) + 35), transitionY);
            }
        }
    }

    // set starting token
    let placeId = 'p0';
    let x = document.getElementById(placeId).getAttribute('cx');
    let y = document.getElementById(placeId).getAttribute('cy');
    addTokenToPlace(0 + "token", x, y);

    return main;
}

function subnetMatrix(index) {
    let subnet = window.subnetsMatrixes[index];

    for(let i=0; i < subnet.length; i++) {
        addTransition(150 + 100*i, 150+(200*(index+1)), true);
    }

    for(let i=0; i < subnet[0].length; i++) {
        addPlace(i, 100 + 100*i, 50+100*(2*index+2), true);
    }

    for(let i=0; i<subnet.length; i++) {
        let transitionId = "t" + i;
        let transitionX = document.getElementById(transitionId).getAttribute('x');
        let transitionY = document.getElementById(transitionId).getAttribute('y');

        for (let j = 0; j < subnet[0].length; j++) {
            let placeId = "p" + j;
            let placeX = document.getElementById(placeId).getAttribute('cx');
            let placeY = document.getElementById(placeId).getAttribute('cy');

            if(subnet[i][j] === 1) {
                // strzalka od tranzycji do miejsca
                addArrow(transitionId, transitionX, transitionY, placeId, placeX, placeY);
            } else if(subnet[i][j] === -1) {
                // strzalka od miejsca do tranzycji
                addArrow(placeId, placeX, placeY, transitionId, transitionX, transitionY);
            }
        }
    }

}