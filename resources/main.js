'use strict';

(function(){

  var data = {};
  var displayElements = {};

  var initGame = function(){

    console.log("loading game");

    data = originalData;

    // start off at 0 games played for each player
    data.players = data.players.map(function(elem){elem.nbGamesPlayed = 0; return elem});

    // start off at 0 games played for each theme
    data.themes = data.themes.map(function(elem){elem.nbGamesPlayed = 0; return elem});

    //prepare weighted themes
    data.weightedThemes = [];
    data.themes.forEach(function(elem){
      for(var i = 0; i < elem.weight; i++){
        data.weightedThemes.push(elem);
      }
    });

    //prepare weighted gameModes
    data.weightedGameModes = [];
    data.gameModes.forEach(function(elem){
      for(var i = 0; i < elem.weight; i++){
        data.weightedGameModes.push(elem);
      }
    });

    //prepare weighted modifers
    data.weightedModifiers = [];
    data.modifiers.forEach(function(elem){
      for(var i = 0; i < elem.weight; i++){
        data.weightedModifiers.push(elem);
      }
    });

    //find elements where we want to display stuff
    displayElements.theme = document.querySelector("#themeTitle");
    displayElements.themeDesc = document.querySelector("#themeDescription");
    displayElements.gameMode = document.querySelector("#gameMode");
    displayElements.players = document.querySelector("#players");
    displayElements.handicap = document.querySelector("#handicapTitle");
    displayElements.handicapDesc = document.querySelector("#handicapDescription");

    //click handlers
    console.log(document.querySelector("#newGame"));
    document.querySelector("#newGame").addEventListener("click",newSong);

  }

  var drawNewSongParams = function(){

    var res = {};

    //start by drawing gameMode
    shuffle(data.weightedGameModes);
    res.gameMode = data.weightedGameModes[0];

    //pick a theme
    shuffle(data.weightedThemes);
    res.theme = data.weightedThemes[0];

    //pick a modifier
    shuffle(data.weightedModifiers);
    res.modifier = data.weightedModifiers[0];

    //shuffle players array the resort it by nbGamePlayed
    shuffle(data.players);
    data.players.sort(function(a,b){return a.nbGamesPlayed > b.nbGamesPlayed;});

    //pick as many players as requiered
    res.players = [];
    for(var i = 0; i < res.gameMode.nbPlayers; i++){
      res.players.push(data.players[i]);
      data.players[i].nbGamesPlayed++;
    }

    return res;
  }

  var shuffle = function(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
  }

  var newSong = function(){
    var params = drawNewSongParams();

    console.log("song params", params);

    displayElements.theme.innerHTML = params.theme.title;
    displayElements.themeDesc.innerHTML = params.theme.description;
    displayElements.gameMode.innerHTML = params.gameMode.title;
    displayElements.handicap.innerHTML = params.modifier.title;
    displayElements.handicapDesc.innerHTML = params.modifier.description;

    displayElements.players.innerHTML= "";
    params.players.forEach(function(player){
      var pElem = document.createElement("li");
      pElem.appendChild(document.createTextNode(player.name));
      displayElements.players.appendChild(pElem);
    });

    document.getElementById('jingle').play();

  }


  window.addEventListener("load",initGame);

})();
