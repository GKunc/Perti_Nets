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

function minimizeNet() {
    console.log("Minimize");

    // let w = window.open('minimizedNet.jsp', '_blank', 'toolbar=0,location=0,menubar=0');

    let {start, end} = findStartAndEnd();
    // minimize main net
    let mainMinimizedMatrix = minimizeMainMatrix(start, end);

    // minimize subnets
    let subnets = [];
    let places = findPlacesStart(start);
    for(let i=0; i<places.length;i++) {
        subnets.push(createSubnet(findTransitionStart(places[i]), places[i]));
    }

    console.log("Main minimized matrix:");
    console.log(mainMinimizedMatrix);
    console.log("Subnets Matrix:");
    console.log(subnets);
    //get subnets

    // todo
    /*
        Jeżeli do tranzycji idzie jedno miejsce i z tranzycji wychodzi jedne misjce to zredukowac do jedengo miejsca
        Jeżeli jest petla to zastepujemy ja jednym miejscem

        Zrobic najpier odpowiednie miejsca i tranzycje
        Potem odpowiednio polaczyc
     */
}

function minimizeMainMatrix(start, end) {
    var minimizedNetFirst = [];
    var minimizedNetFinal = [];
    minimizedNetFirst.push(netMatrix[start]);
    minimizedNetFirst.push(netMatrix[end]);

    for(let i=0;i<minimizedNetFirst.length;i++) {
        var row = [];
        for (let j=0; j<minimizedNetFirst[0].length; j++) {
            if(minimizedNetFirst[i][j] !== 0) {
                row.push(minimizedNetFirst[i][j]);
            }
            else if ( minimizedNetFirst[i][j] === 0 &&
                (j === 0 || j === minimizedNetFirst[0].length-1) ) {
                row.push(0);
            }
        }
        minimizedNetFinal.push(row);
    }
    return minimizedNetFinal;
}

function createSubnet(startPlace, startTransition) {
    let subnetFinal = [];
    let rowsInSubnet = findNextValue(startTransition, []);
    let subnet = subnetMatrix(rowsInSubnet);

    let columns = columnsToDelete(startPlace, rowsInSubnet);

    console.log("Rows to be saved: ");
    console.log(rowsInSubnet);

    console.log("Columns to delete: ");
    console.log(columns);

    for (let i = 0; i < subnet.length; i++) {
        let rowFinal = [];
        for (let j = 0; j < subnet[0].length; j++) {
            if(!columns.includes(j)) {
                rowFinal.push(subnet[i][j]);
            }
        }
        subnetFinal.push(rowFinal);
    }
    console.log("Final subnet: ");
    console.log(subnetFinal);
    return subnetFinal;
}

function subnetMatrix(rows) {
    let result = [];
    for (let i = 0; i < netMatrix.length; i++) {
        if(rows.includes(i)) {
            result.push(netMatrix[i]);
        }
    }
    console.log("Subnet Matrix: ");
    console.log(result);
    return result;
}

function findPlacesStart(row) {
    let placesStarts = [];
    for(let i=0; i<netMatrix[0].length;i++) {
        if(netMatrix[row][i] === 1) {
            placesStarts.push(i);
        }
    }
    return placesStarts;
}

function findTransitionStart(column) {
    for(let i = 0; i<netMatrix.length; i++) {
        if (netMatrix[i][column] === -1) {
            return i;
        }
    }
}

function findNextValue(currentColumn, rows) {
    if(currentColumn === netMatrix[0].length) {
        return rows;
    }

    for(let i = 1; i<netMatrix.length-1; i++) {
        if (netMatrix[i][currentColumn] === -1) {
            for (let j = 1; j < netMatrix[0].length - 1; j++) {
                if (netMatrix[i][j] === 1) {
                    rows.push(i);
                    findNextValue(j, rows);
                }
            }
        }
    }
    return rows;
}

function columnsToDelete(start, rows) {
    let columnsToDelete = [];

    for(let i=0;i<netMatrix[0].length;i++) {
        // init zeros
        if(netMatrix[start][i] === 0) {
            columnsToDelete.push(i);
        }
    }

    rows.forEach(row => {
        for(let i = 1; i<netMatrix[0].length; i++) {
            if(netMatrix[row][i] !== 0 && columnsToDelete.includes(i)) {
                // delete when some column has value other than 0
                columnsToDelete.splice(columnsToDelete.indexOf(i), 1);
            }
        }
    });

    return columnsToDelete;
}

function findStartAndEnd() {
    var start = -1;
    var end = -1;
    for(let i=0; i<netMatrix.length; i++) {
        var countOnes = 0;
        var countNegativeOnes = 0;
        for (let j=0; j<netMatrix[0].length; j++) {
            if(netMatrix[i][j] === 1) {
                countOnes += 1;
            }
            if(netMatrix[i][j] === -1) {
                countNegativeOnes += 1
            }
            if(countOnes >= 2) {
                start = i;
            }
            if(countNegativeOnes >= 2) {
                end = i;
            }
        }
    }
    return {start, end};
}

