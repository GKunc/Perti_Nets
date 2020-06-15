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

function columnsToDelete(start) {
    let columnsToDelete = [];

    for(let i=1;i<netMatrix[0].length-1;i++) {
        if(netMatrix[start][i] === 0) { // init zeros
            columnsToDelete.push(i);
        }
    }

    for(let i=start; i<netMatrix.length-2; i++) {
        for (let j=1; j<netMatrix[0].length-1; j++) {
            if(netMatrix[i][j] !== 0 && columnsToDelete.includes(j)) {
                columnsToDelete.splice(columnsToDelete.indexOf(j), 1); // delete when some column has value other than 0
            }
        }
    }

    console.log(columnsToDelete);
    return columnsToDelete;
}

function minimizeNet() {
    console.log("Minimize");

    let w = window.open('minimizedNet.jsp', '_blank', 'toolbar=0,location=0,menubar=0');

    let {start, end} = findStartAndEnd();
    // minimize net
    w.netModel = minimizeMatrix(start, end);

    //get subnets
    subnet1 = netMatrix
    // todo
    /*
        Jeżeli do tranzycji idzie jedno miejsce i z tranzycji wychodzi jedne misjce to zredukowac do jedengo miejsca
        Jeżeli jest petla to zastepujemy ja jednym miejscem

        Zrobic najpier odpowiednie miejsca i tranzycje
        Potem odpowiednio polaczyc
     */
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

function findNextValue(currentColumn, rows) {
    if(currentColumn === netMatrix[0].length - 1)
        return rows;

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

function createSubnet(start) {
    let subnetFinal = [];
    let rowsInSubnet = findNextValue(start, []);
    let subnet = subnetMatrix(rowsInSubnet);

    let columns = columnsToDelete(start);
    columns.push(0);
    columns.push(netMatrix.length);
    console.log(columns)
    for (let i = 0; i < subnet.length; i++) {
        let rowFinal = [];
        for (let j = 0; j < subnet[0].length; j++) {
            if(!columns.includes(j)) {
                rowFinal.push(subnet[i][j]);
                console.log(j)
            }
        }
        subnetFinal.push(rowFinal);
    }
    console.log(subnetFinal);
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

function minimizeMatrix(start, end) {
    var minimizedNetFirst = [];
    var minimizedNetFinal = [];
    minimizedNetFirst.push(netMatrix[start]);
    minimizedNetFirst.push(netMatrix[end]);

    for(let i=0;i<minimizedNetFirst.length;i++) {
        var row = []
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
