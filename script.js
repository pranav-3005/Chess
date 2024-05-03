$.getScript("functions.js")

//global variables -----------------------
var $chessBoard=document.getElementById("chessBoard") //html element
var chessPieces={}/* 
                    pieceid: {
                        $pieceElement: <></>,                    //cur element,fixed
                        $squareElement(position): <></>,         //parent element,dynamic
                        parentColor: color
                    }*/
var currentPlayerColor="white"      //to toggle between players to move
var highlightMovesOpacity='0.4'

//start of chess game
document.addEventListener("DOMContentLoaded",setChessBoardAndPieces) 

function setChessBoardAndPieces(eventDetails) {
    
    
    //1. setting chess board
    setChessBoard()

    //2. pieces and properties
    setPiecesAndProperties()
}

