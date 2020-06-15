function initMinimizedNet() {
    console.log(netModel);
    for(let i=0; i < netModel.length; i++) {
        addTransition(150 + 50*i, 150);
    }

    for(let i=0; i < netModel[0].length; i++) {
        addPlace(50 + 100*i, 50);
    }
}