//Object size finder
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//Board draw function
function boardDraw(_xSize, _ySize) {
    var switcher = 1;
    var table = document.getElementById("board");

    for (var index = 1; index <= _ySize; index++) {

        table.appendChild(document.createElement("tr"));
        let td = table.childNodes[index];
        td.appendChild(document.createElement("td"));
        td.lastChild.setAttribute("class", "cordSt");
        td.lastChild.innerHTML = (_ySize + 1) - index;

        for (var rawindex = 1; rawindex <= _xSize; rawindex++) {

            var indet = String(rawindex) + "_" + String(parseInt((_ySize + 1) - index));
            var yCord = indet[0];
            if (_xSize >= 10) {
                yCord = indet[0] + indet[1];
            }

            td.appendChild(document.createElement("td"));
            td.lastChild.setAttribute("id", indet);

            if (switcher % 2 == 1) {
                if (parseInt(yCord) % 2 == 1) {
                    td.lastChild.setAttribute("class", "whitePosition");
                } else {
                    td.lastChild.setAttribute("class", "bluePosition");
                }
            } else {
                if (parseInt(yCord) % 2 == 1) {
                    td.lastChild.setAttribute("class", "bluePosition");
                } else {
                    td.lastChild.setAttribute("class", "whitePosition");
                }
            }

        }
        switcher++;
    }

    table.appendChild(document.createElement("tr"));
    var xCords = table.childNodes[_ySize + 1];

    for (var rawindex = 1; rawindex <= _xSize + 1; rawindex++) {

        table.lastChild.appendChild(document.createElement("td"));
        if (rawindex > 1) {
            xCords.lastChild.setAttribute("class", "cordSt");
            xCords.lastChild.innerHTML = String.fromCharCode(64 + rawindex - 1)
        }

    }
    $(".cordSt").css({ "pointer-events": "none" });
}

//Function for json 
function resourSetJson(position, index,
    kingResource, queenResource, bishopResource,
    knightResource, rookResource, pawnResource, color) {
    switch (index) {
        case "King":
            ViewOnBoard.pieceSet(position, kingResource, color + " King");
            break;

        case "Queen":
            ViewOnBoard.pieceSet(position, queenResource, color + " Queen");
            break;

        case "Bishop":
            ViewOnBoard.pieceSet(position, bishopResource, color + " Bishop");
            break;

        case "Knight":
            ViewOnBoard.pieceSet(position, knightResource, color + " Knight");
            break;

        case "Rook":
            ViewOnBoard.pieceSet(position, rookResource, color + " Rook");
            break;

        case "Pawn":
            ViewOnBoard.pieceSet(position, pawnResource, color + " Pawn");
            break;
    }
}

function boardFiguresDrawFromJson(boardObject, whiteTeamStartPositions, blackTeamStartPositions) {
    boardDraw(boardObject._xSize, boardObject._ySize);
    ViewOnBoard.startPositionsSet(whiteTeamStartPositions, blackTeamStartPositions);
}

function checkInArray(idName, movesInfo) {
    var sizeMovesInfo = Object.size(movesInfo);

    for (var index = 0; index < sizeMovesInfo; index++) {
        var positionX = movesInfo[index][0];
        var positionY = movesInfo[index][1];
        var chessId = positionX + "_" + positionY;
        if (idName == chessId) {
            return index;

        }
    }
}

//Decide who makes a move!
function queueController(walkQueue) {
    if (walkQueue == White) {
        ViewOnBoard.setBlackQueueImg();
        return Black;
    } else {
        ViewOnBoard.setWhiteQueueImg();
        return White;
    }
}

//Move next History from Json server CONTROLLER!!!
var backNext = true;
function goNextMove(infoJson, boardObject, boardMap) {
    if (positionPointer % 2 == 0) {
        walkQueue = White;
        ViewOnBoard.setWhiteQueueImg();
    } else {
        walkQueue = Black;
        ViewOnBoard.setBlackQueueImg();
    }

    if (backNext == false) {
        positionPointer++;
        backNext = true;
    }

    if (positionPointer < 3) {
        positionPointer = 3;
    }

    if (positionPointer < infoJson.length) {
        let pice = infoJson[positionPointer].Piece;
        let from = infoJson[positionPointer].From;
        let to = infoJson[positionPointer].To;

        let fromM = from[0] + "_" + from[1];
        let toT = to[0] + "_" + to[1];

        let xLine = parseInt(to[0]);
        let yLine = parseInt(to[1]);
        let pastXLine = parseInt(from[0]);
        let pastYLine = parseInt(from[1]);

        pastMoveImg = ResourceSwitcher[pice];
        pastMoveAlt = pice;

        if (boardMap[xLine - 1][yLine - 1] == 0) {
            ViewOnBoard.piceMovingAnimation($('#' + toT), $('#' + fromM + ' img'),
                toT, fromM, pastMoveImg, pastMoveAlt, animateCheck);
            boardObject.changeBoardMap(xLine, yLine, pastXLine, pastYLine, boardMap);
            positionPointer++;
            boardObject

        } else {
            ViewOnBoard.piceMovingAnimation($('#' + toT), $('#' + fromM + ' img'),
                toT, fromM, pastMoveImg, pastMoveAlt, animateCheck, toT, true);
            boardObject.changeBoardMap(xLine, yLine, pastXLine, pastYLine, boardMap);
            positionPointer++;
        }
        console.log(boardMap);
    }
}


function goUndoMove(infoJson, boardObject, boardMap) {

    if (positionPointer % 2 == 0) {
        walkCount = White;
        ViewOnBoard.setWhiteQueueImg(walkQueue);
    } else {
        walkCount = Black;
        ViewOnBoard.setBlackQueueImg(walkQueue);
    }
    if (backNext == true) {
        positionPointer--;
        backNext = false;
    }
    if (positionPointer > 45) {
        positionPointer = 44;
    }

    if (positionPointer >= 3) {
        let pice = infoJson[positionPointer].Piece;
        let from = infoJson[positionPointer].From;
        let to = infoJson[positionPointer].To;

        let fromM = from[0] + "_" + from[1];
        let toT = to[0] + "_" + to[1];

        let xLine = parseInt(to[0]);
        let yLine = parseInt(to[1]);
        let pastXLine = parseInt(from[0]);
        let pastYLine = parseInt(from[1]);

        var backKillPermission = false;
        var enemyColor;
        if (pice.split(" ", 1) == White) {
            enemyColor = Black;
        } else { enemyColor = White }

        let piceUndo;
        let toUndo;
        var index = positionPointer;
        while (index != 3) {
            if (infoJson[index].Piece.split(" ", 1) == enemyColor
                && infoJson[index].To == to) {
                toUndo = infoJson[index].To[0] + "_" + infoJson[index].To[1];
                piceUndo = infoJson[index].Piece;
                backKillPermission = true;
                break;
            }
            index--;
        }

        // switcherFromJson(pice);

        pastMoveImg = ResourceSwitcher[pice];
        pastMoveAlt = pice;

        pastUndoMoveImg = ResourceSwitcher[piceUndo];
        pastUndoMoveAlt = piceUndo;

        $('#' + toT + ' img').animate({ left: $('#' + fromM).offset().left, top: $('#' + fromM).offset().top + 48 }, 200, function () {
            ViewOnBoard.removePice(toT);
            ViewOnBoard.pieceSet(fromM, pastMoveImg, pastMoveAlt);
            if (positionPointer - 1 >= 3 && backKillPermission == true) {
                ViewOnBoard.pieceSet(toUndo, pastUndoMoveImg, pastUndoMoveAlt);
            }
            boardObject.changeBoardMap(pastXLine, pastYLine, xLine, yLine, boardMap);
        });
        if (positionPointer > 3) {
            positionPointer--;
        }

        console.log(boardMap)
    }
}
