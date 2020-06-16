function initMinimizedNet() {
    console.log(window.mainMinimizedMatrix);
    console.log(window.subnetsMatrixes);

    mainMatrix();
    subnetMatrix(0);
    subnetMatrix(1);
}

function mainMatrix() {
    let main = window.mainMinimizedMatrix;

    for(let i=0; i < main.length; i++) {
        addTransition(150, 150 + 50*i);
    }

    for(let i=0; i < main[0].length; i++) {
        addPlace(50 + 100*i, 50);
    }
}

function subnetMatrix(index) {
    let main = window.subnetsMatrixes[index];

    for(let i=0; i < main.length; i++) {
        addTransition(500*(index+1), 150 + 50*i);
    }

    for(let i=0; i < main[0].length; i++) {
        addPlace(500*(index+1) + 100*i, 50);
    }
}