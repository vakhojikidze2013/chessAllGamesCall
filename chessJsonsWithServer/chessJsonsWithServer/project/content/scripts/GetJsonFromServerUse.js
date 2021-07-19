// class InfoFromJsonClass {

//     constructor(connection, data){
//         this._connection = connection;
//         this._data = data
//     }

//     jsonFileFromServer = {};

//     getInfoFromServerJson() {

//         $.get({
//             url: this._connection,
//             success: function (info, textStatus, xhr) {
//                 if (textStatus == "success") {
//                     const JsonInfo = JSON.parse(JSON.stringify(info));
//                     console.log(JsonInfo)

//                 }
//                 if (textStatus == "error") {
//                     alert("Error: " + xhr.status + ": " + xhr.statusText);
//                 }
//             },
//             dataType: this._data
//         })
//     }
// }

function infoFromServerJsonPageOne(connection, data, indent, indentificator) {

    $.get({
        url: connection,
        success: function (info, textStatus, xhr) {
            if (textStatus == "success") {
                var jsonFileFromServer = info;
                jsonFileFromServer = jsonFileFromServer.Chess.PlayerInfo;
                viewInformationSetFromJsonOnePage(indent, jsonFileFromServer[indentificator].PhotoLink,
                                                  jsonFileFromServer[indentificator].Name,
                                                  jsonFileFromServer[indentificator].Country,
                                                  jsonFileFromServer[indentificator].Born,
                                                  jsonFileFromServer[indentificator].Age);

            }
            if (textStatus == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        },
        dataType: data
    });
}

function infoFromServerJsonPageTwo(connection, data, indent) {

    $.get({
        url: connection,
        success: function (info, textStatus, xhr) {
            if (textStatus == "success") {
                var jsonFileFromServer = info;
                jsonFileFromServer = jsonFileFromServer.ChessGames;
                viewInformationFromJsonSecondPage(jsonFileFromServer[indent].FirstGame.Photos[0],
                                                  jsonFileFromServer[indent].FirstGame.Photos[1],
                                                  jsonFileFromServer[indent].FirstGame.Players,
                                                  jsonFileFromServer[indent].FirstGame.GameID,
                                                  jsonFileFromServer[indent].FirstGame.GameStartTime,
                                                  jsonFileFromServer[indent].FirstGame.Link, 
                                                  jsonFileFromServer[indent].SecondGame.Photos[0],
                                                  jsonFileFromServer[indent].SecondGame.Photos[1],
                                                  jsonFileFromServer[indent].SecondGame.Players,
                                                  jsonFileFromServer[indent].SecondGame.GameID,
                                                  jsonFileFromServer[indent].SecondGame.GameStartTime,
                                                  jsonFileFromServer[indent].SecondGame.Link,)
            }
            if (textStatus == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        },
        dataType: data
    });
}

var infoJson;
function infoFromServerJsonPageThird(connection, data, indent, indentificator) {

    $.get({
        url: connection,
        success: function (info, textStatus, xhr) {
            if (textStatus == "success") {
                infoJson = info.ChessMatches[indent][indentificator];
                viewInformationFromJsonThirdPage(info.ChessMatches[indent][indentificator]);

            }
            if (textStatus == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        }, 
        dataType: data
    });
}

