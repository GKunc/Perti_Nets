function build() {
    console.log("Build");

    $('.shape').off();

    unselectAll();
    clearList(selectedElements);
    addTokenEventHandler();

    console.log(netMatrix)
}

function start() {
    console.log("Start");

    $('.shape').off();
    unselectAll();
    clearList(selectedElements);

    moveTokenEventHandler();
}

function stop() {
    console.log("Stop");
}
