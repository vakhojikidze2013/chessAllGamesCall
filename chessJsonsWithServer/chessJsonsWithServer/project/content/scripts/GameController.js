var pastMove, pastPiceLink, pastPiceAlt, pastModelObjectMovesInfo, pastMoveImg, pastMoveAlt;
var walkQueue = White;

function chessController(idName) {

    const CurrentPositions = idName.split("_");
    //Take information from Board Map!
    const FigureColor = boardObject.boardMap[CurrentPositions[0] - 1][CurrentPositions[1] - 1].color;
    const FigurePiece = boardObject.boardMap[CurrentPositions[0] - 1][CurrentPositions[1] - 1].piece;

    //Color Switcher and board update!
    if (pastMove !== undefined) {
        var checker = checkInArray(idName, pastModelObjectMovesInfo);

        if (checker != undefined) {
            let killColor = pastModelObjectMovesInfo[checker][2];

            if (killColor == undefined) {
                boardObject.changeBoardMap(CurrentPositions[0], CurrentPositions[1], pastMove[0], pastMove[2], boardObject.boardMap);
                ViewOnBoard.piceMovingAnimation($('#' + idName), $('#' + pastMove + ' img'),
                                                idName, pastMove, pastPiceLink, pastPiceAlt, animateCheck);
                walkQueue = queueController(walkQueue);



            } else if (killColor == "other" && FigurePiece != King) {
                boardObject.changeBoardMap(CurrentPositions[0], CurrentPositions[1], pastMove[0], pastMove[2], boardObject.boardMap);
                ViewOnBoard.piceMovingAnimation($('#' + idName), $('#' + pastMove + ' img'),
                                                idName, pastMove, pastPiceLink, pastPiceAlt, animateCheck, idName, true);
                walkQueue = queueController(walkQueue);
            }
        }
        ViewOnBoard.reColoring();
        pastMove = undefined;
        return;
    }

    if (boardObject.boardMap[CurrentPositions[0] - 1][CurrentPositions[1] - 1] == 0) {
        return;
    }

    ViewOnBoard.reColoring();
    
    if (FigureColor == walkQueue) {
        var modelObject = new ClassSwitcher[FigurePiece](FigureColor, CurrentPositions[0], CurrentPositions[1], boardObject.boardMap);
        modelObject.allPossibleMoves();

        pastMove = idName;
        pastPiceAlt = FigureColor + " " + FigurePiece;
        pastPiceLink = ResourceSwitcher[pastPiceAlt];

        //Create copy MOVESINFO !
        pastModelObjectMovesInfo = JSON.parse(JSON.stringify(modelObject.movesInfo));
        console.log(modelObject.movesInfo)
        console.log(boardObject.boardMap)

        var viewObject = new ViewOnBoard(modelObject.movesInfo, FigurePiece, FigureColor, boardObject.boardMap, idName);
        viewObject.onBoardChange();
        
    }
    
}

    // if (document.getElementById(idName).className == "rooukColor") {

    //     ViewOnBoard.removePice(idName);
    //     ViewOnBoard.removePice(pastMove);

    //     if (idName == "8_1") {
    //         ViewOnBoard.pieceSet("7_1", WhiteKingResource, White + " " + King);
    //         ViewOnBoard.pieceSet("6_1", WhiteRookResource, White + " " + Rook);
    //     } else if (idName == "1_1") {
    //         ViewOnBoard.pieceSet("2_1", WhiteKingResource, White + " " + King);
    //         ViewOnBoard.pieceSet("3_1", WhiteRookResource, White + " " + Rook);
    //     }

    //     if (idName == "8_8") {
    //         ViewOnBoard.pieceSet("7_8", BlackKingResource, Black + " " + King);
    //         ViewOnBoard.pieceSet("6_8", BlackRookResource, Black + " " + Rook);
    //     } else if (idName == "1_8") {
    //         ViewOnBoard.pieceSet("2_8", BlackKingResource, Black + " " + King);
    //         ViewOnBoard.pieceSet("3_8", BlackRookResource, Black + " " + Rook);
    //     }
    //     ViewOnBoard.reColoring();
    //     return;
    // }