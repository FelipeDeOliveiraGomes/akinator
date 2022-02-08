
*OnePieceNator -
***An local network akinator version, with json-server API REST and React.JS

App inspired by the famous game akinator. The algorithm can learn new characters as it is used, with the potential to store an unlimited number of questions and characters due to its binary tree structure.

Uses local Json-server Rest Api as database. If you want to test and improve the algorithm for educational purposes, just clone the repository, install the dependencies and Json-server if you don't have it yet.

note: the name 'OnePieceNator' is just a parody and despite the name, it is possible to play with all kinds of characters whether or not they are from one piece. By default only some OnePiece characters are registered in the database. If you want to add new characters, just answer the game's questions normally, in case your character is not yet registered, after the questions are exhausted, the new characters registration screen will automatically open.

***How its work?

The app asks the user questions in order to guess a random character the user was thinking about. and according to the answers, dynamically changes the questions in a binary tree structure until reaching a final answer. If the algorithm does not correctly answer the character the user was thinking of, it opens an interface where the user can add the character he was thinking of. After being added, in the next round, the new character is already available to be played. That way, the more you play, the greater the level of known characters and the greater the possibility of satisfactorily hitting the character the player was thinking about.

if you still don't know the original game that inspired this app, visit: https://en.akinator.mobi/

app made solely for educational purposes and study of technologies such as Javascript, CSS, HTML, REACT and REST API
