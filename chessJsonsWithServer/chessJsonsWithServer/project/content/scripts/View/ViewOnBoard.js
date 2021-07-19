class ViewOnBoard {

    constructor(changeArray, piece, color, boardMap, currentId) {

        this._changeArray = changeArray;
        this._piece = piece;
        this._color = color;
        this._boardMap = boardMap;
        this._currentId = currentId;
    }

    static pieceSet(position, link = null, altName = null) {

        let idElement = document?.getElementById(position);
        let createElementt = document.createElement("img");
        if (idElement != null) {
            createElementt.src = link;
            createElementt.alt = altName;
            idElement.appendChild(createElementt);
        }
    }

    static reColoring() {

        var switchingElement = 0;

        for (var index = 1; index <= 8; index++) {

            if (index % 2 == 1) {
                this.setWhite(String(index) + "_" + String(8));
            } else {
                this.setBlue(String(index) + "_" + String(8));
            }
            for (var secindex = 1; secindex <= 8; secindex++) {

                let position = String(index) + "_" + String(secindex);

                if (index % 2 == 1 && secindex == 8) {
                    switchingElement = 1;
                } else if (index % 2 == 0 && secindex == 8) {
                    switchingElement = 0;
                } else if (switchingElement == 0) {
                    this.setBlue(position);
                    switchingElement = 1;

                } else if (switchingElement == 1) {
                    this.setWhite(position);
                    switchingElement = 0;
                }
            }
        }
    }

    static setWhite(idName) {
        document.getElementById(idName).setAttribute("class", "whitePosition");
    }

    static setBlue(idName) {
        document.getElementById(idName).setAttribute("class", "bluePosition");
    }

    static setRed(idName) {
        document.getElementById(idName).setAttribute("class", "redPosition");
    }

    static coloringYellow(position) {
        document.getElementById(position).setAttribute("class", "yellowPosition");
    }

    static rookColor(idName) {
        document.getElementById(idName).setAttribute("class", "rooukColor");
    }

    static checkPositionFree(idName) {
        return document?.getElementById(idName)?.childNodes?.length; //0-isFree, 1-notFree
    }

    static checkPlayerColor(idName) {
        return document?.getElementById(idName)?.childNodes[0]?.alt?.split(" ", 1);
    }

    static setWhiteQueueImg() {
        document.getElementById("walkqueue").src = "https://white.digital/wp-content/uploads/2020/03/WHITE.jpg";
    }

    static setBlackQueueImg() {
        document.getElementById("walkqueue").src = "https://static01.nyt.com/images/2020/07/05/pageoneplus/02insider-black/02insider-black-videoSixteenByNineJumbo1600.jpg";
    }

    static piceMovingAnimation(firstPosition, secondPosition, GetElementById, pastMove, pastPiceLink,
        pastPiceAlt, animateCheck = false, idName = null, kill = false) {

        if (animateCheck == false) {
            if (kill == false) {
                secondPosition.animate({ left: firstPosition.offset().left, top: firstPosition.offset().top + 48 }, 200, function () {
                    ViewOnBoard.removePice(pastMove);
                    ViewOnBoard.pieceSet(GetElementById, pastPiceLink, pastPiceAlt);
                });
            } else if (kill == true) {
                secondPosition.animate({ left: firstPosition.offset().left, top: firstPosition.offset().top + 48 }, 200, function () {
                    ViewOnBoard.removePice(pastMove);
                    ViewOnBoard.removePice(idName);
                    ViewOnBoard.pieceSet(GetElementById, pastPiceLink, pastPiceAlt);
                });
            }

        } else {
            if (kill == false) {
                ViewOnBoard.removePice(pastMove);
                ViewOnBoard.pieceSet(GetElementById, pastPiceLink, pastPiceAlt);
            } else if (kill == true) {
                ViewOnBoard.removePice(pastMove);
                ViewOnBoard.removePice(idName);
                ViewOnBoard.pieceSet(GetElementById, pastPiceLink, pastPiceAlt);
            }
        }
    }

    static removePice(idName) {
        const myNode = document.getElementById(idName);
        while (myNode?.lastElementChild) {
            myNode.removeChild(myNode.lastElementChild);
        }
    }

    static startPositionsSet(whiteTeamStartPositions, blackTeamStartPositions) {
        //Set white pices positions from json file
        for (var index in whiteTeamStartPositions) {
            for (var secondIndex in whiteTeamStartPositions[index]) {

                let pos = whiteTeamStartPositions[index][secondIndex];
                resourSetJson(pos, index, WhiteKingResource, WhiteQueenResource,
                              WhiteBishopResource, WhiteKnightResource, WhiteRookResource, WhitePawnResource, White);
            }
        }
        //Set black pices positions from json file
        for (var index in blackTeamStartPositions) {
            for (var secondIndex in blackTeamStartPositions[index]) {

                let pos = blackTeamStartPositions[index][secondIndex];
                resourSetJson(pos, index, BlackKingResource, BlackQueenResource,
                              BlackBishopResource, BlackKnightResource, BlackRookResource, BlackPawnResource, Black);
            }
        }
    }

    //Game restart function
    static gameRestart(whiteTeamStartPositions, blackTeamStartPositions) {

        ViewOnBoard.reColoring();
        for (var index = 1; index <= 8; index++) {
            for (var secindex = 1; secindex <= 8; secindex++) {
                ViewOnBoard.removePice(String(index) + "_" + String(secindex));
            }
        }
    
        ViewOnBoard.startPositionsSet(whiteTeamStartPositions, blackTeamStartPositions);
      
    }

    static tableElementsStyleNull() {
        document.getElementsByTagName("td").style = "";
    }

    onBoardChange() {
        var sizeMovesInfo = Object.size(this._changeArray);
        var otherTeamColor;

        if (this._color == White) {
            otherTeamColor = Black;
        } else {
            otherTeamColor = White;
        }

        for (var index = 0; index < sizeMovesInfo; index++) {

            var positionX = this._changeArray[index][0];
            var positionY = this._changeArray[index][1];
            var killColorStatus = this._changeArray[index][2];

            var chessId = positionX + "_" + positionY;

            if (killColorStatus == undefined) {
                ViewOnBoard.coloringYellow(chessId);
            } else if (killColorStatus == "other") {
                ViewOnBoard.setRed(chessId);
            }

        }
    }
}

// function rookRuleForKing (idName, colorKing){
//     var formatId = idName.slice("_")
//     var thisX = formatId[0];
//     var thisY = formatId[2];
//     var xInt = parseInt(thisX)

//     if (colorKing == White){
//         if (idName == "5_1" && checkPositionFree(xInt + 1 + "_" + thisY) == 0 && checkPositionFree(xInt + 2 + "_" + thisY) == 0
//            && document?.getElementById(xInt + 3 + "_" + thisY)?.childNodes[0]?.alt == White + " " + Rook){
//             console.log(xInt + 2 + "_" + thisY);
//                 rookColor(idName);
//                 rookColor(xInt + 3 + "_" + thisY);
//         }
//         if (idName == "4_1" && checkPositionFree(xInt - 1 + "_" + thisY) == 0 && checkPositionFree(xInt - 2 + "_" + thisY) == 0
//             && document?.getElementById(xInt - 3 + "_" + thisY)?.childNodes[0]?.alt == White + " " + Rook){
//                 rookColor(idName);
//                 rookColor(xInt - 3 + "_" + thisY);
//         }
//     }

//     if (colorKing == Black){
//         if (idName == "5_8" && checkPositionFree(xInt + 1 + "_" + thisY) == 0 && checkPositionFree(xInt + 2 + "_" + thisY) == 0
//             && document?.getElementById(xInt + 3 + "_" + thisY)?.childNodes[0]?.alt == Black + " " + Rook){
//                 rookColor(idName);
//                 rookColor(xInt + 3 + "_" + thisY);
//         }
//         if (idName == "4_8" && checkPositionFree(xInt - 1 + "_" + thisY) == 0 && checkPositionFree(xInt - 2 + "_" + thisY) == 0
//             && document?.getElementById(xInt - 3 + "_" + thisY)?.childNodes[0]?.alt == Black + " " + Rook){
//                 rookColor(idName);
//                 rookColor(xInt - 3 + "_" + thisY);
//         }
//     }
// }