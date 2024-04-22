$.getScript("functions.js")

var $chessBoard=document.getElementById("chessBoard") //html element
var chessPieces={}/* 
                    pieceid: {
                        htmlElement: <></>,
                        squareElement(position): <></>,
                        squareColor: black,
                        pieceProperties: setPieceProperties //functions
                    }*/


document.addEventListener("DOMContentLoaded",setChessBoardAndPieces)

function setChessBoardAndPieces(eventDetails) {
    
    
    //1. setting chess board
    setChessBoard()
    console.log($chessBoard) 

    //2. pieces and properties
    setPiecesAndProperties()
}

