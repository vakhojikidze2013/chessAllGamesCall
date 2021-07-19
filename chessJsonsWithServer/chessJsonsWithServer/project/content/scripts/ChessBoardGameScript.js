//Take id from url GET
const SearchId = window.location.search;
const UrlParams = new URLSearchParams(SearchId);
const JsonIndent = UrlParams.get("value");
const JsonIndex = UrlParams.get("index");

const ClassSwitcher = {
    "King": PieceKing,
    "Queen": PieceQueen,
    "Bishop": PieceBishop,
    "Knight": PieceKnight,
    "Pawn": PiecePawn,
    "Rook": PieceRook
}

var boardObject = new ChessBoard(8, 8);
boardFiguresDrawFromJson(boardObject, WhiteTeamStartPositions, BlackTeamStartPositions);

ViewOnBoard.setWhiteQueueImg();

infoFromServerJsonPageThird(ConnectLingMatches, Json, JsonIndent, JsonIndex);

var switcher = 0;
var canClick = true;
var animateCheck = false;
var positionPointer = 3;
var clickPermision = false;

$(document).ready(function () {

    $("td").click(function () {
        if (canClick == true) {
            chessController(this.id)
        }
    });

    $("#restart").click(function () {

        positionPointer = 3;
        canClick = false;
        clickPermision = true;
        walkQueue = White;
        ViewOnBoard.gameRestart(WhiteTeamStartPositions, BlackTeamStartPositions);
        ViewOnBoard.setWhiteQueueImg();
        boardObject.restoureBoardMap();

        if (switcher >= 1) {
            $("table, td, th").css({ "transform": "rotate(0deg)" });
        }
        $(".moveButton").css({ "pointer-events": "auto" });
    });

    $("#continue").click(function () {
        canClick = true;
        clickPermision = false;
    });

    $("#next").click(function () {
        if (clickPermision == true) {
            goNextMove(infoJson, boardObject, boardObject.boardMap);

        }
    });

    $("#undo").click(function () {
        if (clickPermision == true) {
            goUndoMove(infoJson, boardObject, boardObject.boardMap);
        }
    });

    $("#boardRotate").click(function () {

        if (switcher == 0) {
            animateCheck = true;
        }
        if (switcher % 2 == 0) {
            $("table, td, th").css({ "transform": "rotate(180deg)" });
            document.getElementById("playerOne").src = infoJson[2];
            document.getElementById("playerTwo").src = infoJson[1];

        } else {
            $("table, td, th").css({ "transform": "rotate(0deg)" });
            document.getElementById("playerOne").src = infoJson[1];
            document.getElementById("playerTwo").src = infoJson[2];
        }
        switcher++;
    });

});
