const SearchId = window.location.search;
const UrlParams = new URLSearchParams(SearchId);
const JsonIndent = UrlParams.get("value");

//Setting information from json server with Url and view methods!
infoFromServerJsonPageTwo(ConnectLinkChessGamesInfo, Json, JsonIndent);


