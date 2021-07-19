function informationFromJson(indentificator) {
    return document.querySelector(indentificator);
}

//View for first page!
function viewInformationSetFromJsonOnePage(indent, photoLink, name, country, born, age) {
    informationFromJson(indent + " a img").src = photoLink;
    informationFromJson(indent + " .name").innerHTML += name;
    informationFromJson(indent + " .country").innerHTML += country;
    informationFromJson(indent + " .born").innerHTML += born;
    informationFromJson(indent + " .age").innerHTML += age;
}

//View function for second page!
function viewInformationFromJsonSecondPage(firstGameOnePhoto, firstGameTwoPhoto, firstGamePlayers,
                                           firstGameGameId, firstGameStartTime, firstGameLink, secondGameOnePhoto, 
                                           secondGameTwoPhoto,  secondGamePlayers, secondGameGameId, secondGameStartTime,
                                           secondGameLink) {
    informationFromJson("#first .twoImages .firstImage").src = firstGameOnePhoto;
    informationFromJson("#first .twoImages .secondImage").src = firstGameTwoPhoto;

    informationFromJson("#second .twoImages .firstImage").src = secondGameOnePhoto;
    informationFromJson("#second .twoImages .secondImage").src = secondGameTwoPhoto;

    //Setting players name, info, date from json
    document.querySelectorAll("#first .vs")[0].innerHTML += firstGamePlayers;
    document.querySelectorAll("#first .vs")[1].innerHTML += firstGameGameId;
    document.querySelectorAll("#first .vs")[2].innerHTML += firstGameStartTime;

    document.querySelectorAll("#second .vs")[0].innerHTML += secondGamePlayers;
    document.querySelectorAll("#second .vs")[1].innerHTML += secondGameGameId;
    document.querySelectorAll("#second .vs")[2].innerHTML += secondGameStartTime;

    //Setting href attribute for button
    informationFromJson("#first a").href = firstGameLink;
    informationFromJson("#second a").href = secondGameLink;
}

//View for third page!
function viewInformationFromJsonThirdPage(infoJson) {
    
    document.getElementById("playerOne").src = infoJson[1];
    document.getElementById("playerTwo").src = infoJson[2];
    document.getElementById("gameTitle").innerHTML += infoJson[0];
}