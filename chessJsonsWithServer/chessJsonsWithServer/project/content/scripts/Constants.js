const ConnectLinkPlayerList = "https://localhost:44313/jsons/player-list.json";
const ConnectLingMatches = "https://localhost:44313/jsons/matches.json";
const ConnectLinkChessGamesInfo = "https://localhost:44313/jsons/chess-games-info.json";
const Json = "json";

const Black = "Black";
const White = "White";

const King = "King";
const Rook = "Rook";
const Bishop = "Bishop";
const Queen = "Queen";
const Knight = "Knight";
const Pawn = "Pawn";

const BlackKingResource = "../content/images/PicesResource/BlackKing.png";
const BlackQueenResource = "../content/images/PicesResource/BlackQueen.png";
const BlackBishopResource = "../content/images/PicesResource/BlackBishop.png";
const BlackKnightResource = "../content/images/PicesResource/BlackKnight.png";
const BlackRookResource = "../content/images/PicesResource/BlackRook.png";
const BlackPawnResource = "../content/images/PicesResource/BlackPawn.png";

const WhiteKingResource = "../content/images/PicesResource/WhiteKing.png";
const WhiteQueenResource = "../content/images/PicesResource/WhiteQueen.png";
const WhiteBishopResource = "../content/images/PicesResource/WhiteBishop.png";
const WhiteKnightResource = "../content/images/PicesResource/WhiteKnight.png";
const WhiteRookResource = "../content/images/PicesResource/WhiteRook.png";
const WhitePawnResource = "../content/images/PicesResource/WhitePawn.png";

const ResourceSwitcher = {
    "Black King": BlackKingResource,
    "White King": WhiteKingResource,
    "Black Queen": BlackQueenResource,
    "White Queen": WhiteQueenResource,
    "Black Bishop": BlackBishopResource,
    "White Bishop": WhiteBishopResource,
    "Black Knight": BlackKnightResource,
    "White Knight": WhiteKnightResource,
    "Black Pawn": BlackPawnResource,
    "White Pawn": WhitePawnResource,
    "Black Rook": BlackRookResource,
    "White Rook": WhiteRookResource
}

const ChessStartPositions = `{
    "Chess": {
        "WhiteTeam": {
            "ChessPositions": {
                "King": ["5_1"],
                "Queen": ["4_1"],
                "Bishop": [
                  "3_1",
                  "6_1"
                ],
                "Knight": [
                  "2_1",
                  "7_1"
                ],
                "Rook": [
                  "1_1",
                  "8_1"
                ],
                "Pawn": [
                  "1_2",
                  "2_2",
                  "3_2",
                  "4_2",
                  "5_2",
                  "6_2",
                  "7_2",
                  "8_2"
                ]
            }
        },

        "BlackTeam": {
            "ChessPositions": {
                "King": ["5_8"],
                "Queen": ["4_8"],
                "Bishop": [
                  "3_8",
                  "6_8"
                ],
                "Knight": [
                  "2_8",
                  "7_8"
                ],
                "Rook": [
                  "1_8",
                  "8_8"
                ],
                "Pawn": [
                  "1_7",
                  "2_7",
                  "3_7",
                  "4_7",
                  "5_7",
                  "6_7",
                  "7_7",
                  "8_7"
                ]
            }
        }
    }
}`;

const StartPositions = JSON.parse(ChessStartPositions);
const WhiteTeamStartPositions = StartPositions.Chess.WhiteTeam.ChessPositions;
const BlackTeamStartPositions = StartPositions.Chess.BlackTeam.ChessPositions;