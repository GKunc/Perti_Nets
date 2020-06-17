function build() {
    console.log("Build");

    $('.shape').off();

    unselectAll();
    clearList(selectedElements);
    addTokenEventHandler();

    console.log(netMatrix)
}

function start(netMatrix) {
    console.log("Start");

    $('.shape').off();
    unselectAll();
    clearList(selectedElements);

    moveTokenEventHandler(netMatrix);
}

function minimizeNet() {
    console.log("Minimize");

    let {start, end} = findStartAndEnd();
    // minimize main net
    mainMinimizedMatrix = minimizeMainMatrix(start, end);

    // minimize subnets
    let places = findPlacesStart(start);
    for(let i=0; i<places.length;i++) {
        subnetsMatrixes.push(createSubnet(findTransitionStart(places[i]), places[i], end));
    }

    let w = window.open('minimizedNet.jsp', '_blank', 'toolbar=0,location=0,menubar=0');
    w.mainMinimizedMatrix = mainMinimizedMatrix;
    w.subnetsMatrixes = subnetsMatrixes;

    console.log("Main minimized matrix:");
    console.log(mainMinimizedMatrix);
    console.log("Subnets Matrix:");
    console.log(subnetsMatrixes);
    //get subnets

    // todo
    /*
        Jeżeli do tranzycji idzie jedno miejsce i z tranzycji wychodzi jedne misjce to zredukowac do jedengo miejsca
        Jeżeli jest petla to zastepujemy ja jednym miejscem

        Zrobic najpierw odpowiednie miejsca i tranzycje
        Potem odpowiednio polaczyc
     */
}

function minimizeMainMatrix(start, end) {
    let minimizedNetFirst = [];
    let minimizedNetFinal = [];
    for(let i=0; i<=start; i++) {
        minimizedNetFirst.push(netMatrix[i]);
    }

    for(let i=end; i<netMatrix.length; i++) {
        minimizedNetFirst.push(netMatrix[i]);
    }


    let rowOfOnes = findRowOfDoubles(minimizedNetFirst, 1);
    let rowOfNegativeOnes = findRowOfDoubles(minimizedNetFirst, -1);

    let indexesOfOnes = findIndexesOfDoubles(minimizedNetFirst, 1);
    let indexesOfZeros = findIndexesOfDoubles(minimizedNetFirst, 0);
    for(let i=0; i<minimizedNetFirst[rowOfNegativeOnes].length; i++) {
        if(minimizedNetFirst[rowOfNegativeOnes][i] === 1 && indexesOfZeros.includes(i)) {
            indexesOfZeros.splice(indexesOfZeros.indexOf(i), 1);
        }
    }

    for(let i=0;i<minimizedNetFirst.length;i++) {
        let row = [];
        for (let j=0; j<minimizedNetFirst[0].length; j++) {
            if(indexesOfOnes.includes(j)) {
                if(i === rowOfOnes) {
                    row.push(1);
                } else if(i === rowOfNegativeOnes) {
                    row.push(-1);
                } else {
                    row.push(0);
                }
            }
            else if(indexesOfZeros.includes(j)) {
                continue;
            }
            else {
                row.push(minimizedNetFirst[i][j]);
            }
        }
        minimizedNetFinal.push(row);
    }
    return minimizedNetFinal;
}

function createSubnet(startPlace, startTransition, end) {
    let subnetFinal = [];
    let rowsInSubnet = findNextValue(startTransition, [], end); // ok
    let subnet = subnetMatrix(rowsInSubnet);
    console.log("rowsInSubnet");
    console.log(rowsInSubnet);
    let columns = columnsToDelete(startPlace, rowsInSubnet);
    console.log("columns");
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

    return subnetFinal;
}

function subnetMatrix(rows) {
    let result = [];
    for (let i = 0; i < netMatrix.length; i++) {
        if(rows.includes(i)) {
            result.push(netMatrix[i]);
        }
    }
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

function findNextValue(currentColumn, rows, end) {
    if(currentColumn === netMatrix[0].length) {
        return rows;
    }

    for(let i = 0; i<end; i++) {
        if (netMatrix[i][currentColumn] === -1) {
            for (let j = 1; j < netMatrix[0].length - 1; j++) {
                if (netMatrix[i][j] === 1) {
                    rows.push(i);
                    findNextValue(j, rows, end);
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

function findRowOfDoubles(minimizedNetFirst, number) {
    let row = -1;
    for(let i=0;i<minimizedNetFirst.length;i++) {
        let countOnes = 0;
        for (let j=0; j<minimizedNetFirst[0].length; j++) {
            if(minimizedNetFirst[i][j] === number) {
                countOnes += 1;
            }
            if(countOnes >= 2) {
                row = i;
            }
        }
    }
    return row;
}

function findIndexesOfDoubles(minimizedNetFirst, number) {
    let indexes = [];
    let row = findRowOfDoubles(minimizedNetFirst, number);
    if(number === 0) {
        row = findRowOfDoubles(minimizedNetFirst, 1);
    }
    // without first and last element
    for(let i=1;i<minimizedNetFirst[row].length-1;i++) {
        if(minimizedNetFirst[row][i] === number) {
            indexes.push(i);
        }
    }
    return indexes;
}
