$.getScript("./pieceFunctions/pawnFunctions.js")
$.getScript("./pieceFunctions/rookFunctions.js")
$.getScript("./pieceFunctions/knightFunctions.js")
$.getScript("./pieceFunctions/bishopFunctions.js")
$.getScript("./pieceFunctions/queenFunctions.js")
$.getScript("./pieceFunctions/kingFunctions.js")


// "rgb(148,96,44)","rgb(231,204,177)" black,white
var path=[]

function setChessBoard() {

    let clr=["rgb(148,96,44)","rgb(231,204,177)"]
    let j=0

    for(let i=8;i>=1;i--)
    {
        for(let k='a';k!=='i'; k=String.fromCharCode(k.charCodeAt(0)+1 ))
        {
            let $square= document.createElement('div')
            $square.setAttribute('id',`${(k+i)}`)

            if(k==='h')
                {
                    $square.style.cssText=`grid-area: ${(k+i)};
                    background-color:${clr[ (j)%2 ]};
                    box-sizing: border-box;
                    padding-top:5px`
                }
            else
                {

                    $square.style.cssText=`grid-area: ${(k+i)};
                    background-color:${clr[ (j++)%2 ]};
                    box-sizing: border-box;
                    padding-top:5px`
                }                
            $chessBoard.append($square)


        }
    }
}


function setPiecesAndProperties() {
    
    for(let c='a';c!=='i'; c=String.fromCharCode( c.charCodeAt(0)+1 ) )
    {
        //1.black pawns
        setBlackPawn(c)

        //2.white pawns
        setWhitePawn(c)
    }

    // 3.set other pieces
    let backPieces=[
        '<i class="fa-solid fa-chess-king"></i>',
        '<i class="fa-solid fa-chess-queen"></i>',
        '<i class="fa-solid fa-chess-bishop"></i>',
        '<i class="fa-solid fa-chess-knight"></i>',
        '<i class="fa-solid fa-chess-rook"></i>'
        ]

        //rook
            //black
            setBlackRook()

            //white
            setWhiteRook()

        //knight
            //black
            setBlackKnight()

            //white
            setWhiteKnight()

        //bishop
            //black
            setBlackBishop()

            //white
            setWhiteBishop()

        //king & queen
            //kings
            setKings()

            //queens
            setQueens()

}



//highlight (hover) -----------
function mouseover(eventDetails) {
    this.style.opacity='0.6'
    this.style.cursor='pointer'
}

function mouseout(eventDetails) {
    this.style.opacity='1'
    this.style.cursor='auto'
    this.style.paddingTop='5px'
}

//pieces --------------


function checkFunction(KingColor , kingPositionId, opponentPieceId ,direction)
{
    alert(`Check for ${KingColor}`)
    
    let $kingSquare = document.getElementById(kingPositionId)
    let $opponentPieceSquare = document.getElementById( chessPieces[opponentPieceId]["$parentElement"].id )

    let $king = $kingSquare.childNodes[0]
    let $opponentPiece = $opponentPieceSquare.childNodes[0]

    chessPieces[$king.id]["isUnderCheck"] = true            //***

    

    let oppRow = Number($opponentPieceSquare.id[1])
    let oppCol = $opponentPieceSquare.id[0].charCodeAt(0)

    let kingRow = Number($kingSquare.id[1])
    let kingCol = $kingSquare.id[0].charCodeAt(0)

    path.length=0
    path = getPath(oppRow,oppCol,kingRow,kingCol,direction)

    console.log("path : ",path)
    

    // checkForBlocks(path,KingColor)


    
}

function isValidToMoveWhileCheck(squareId,currentColor)
{
    if(chessPieces[ currentColor+"King" ]["isUnderCheck"]===false || (path.length>1 && path.includes(squareId))  )
    {
        // chessPieces[ currentColor+"King" ]["isUnderCheck"]=false 
        return true
    }    

    return false
}
//need ot do changes for knight
// function checkForBlocks(path,KingColor)
// {
//     for( let pathId of path)
//     {
//         checkForPawn(pathId,KingColor)
//     }
// }

function getPath(oppRow,oppCol,kingRow,kingCol,direction)
{
    let path=[]

    //top
    if(direction=="top")
    {
        for(let i=oppRow;i<kingRow;i++)
        {
            path.push(String.fromCharCode(oppCol)+(i))
        }
    }

    //top right
    if(direction=="topRight")
    {
        for(let i=oppRow,j=oppCol ; i<kingRow && j<kingCol ; i++,j++)
        {
            path.push(String.fromCharCode(j)+(i))
        }
    }

    //right
    if(direction=="right")
    {
        for(let j=oppCol; j<kingCol ; j++)
        {
            path.push(String.fromCharCode(j)+(oppRow))
        }
    }

    //bottom right
    if(direction=="bottomRight")
    {
        for(let i=oppRow,j=oppCol; i>kingRow && j<kingCol ; i--,j++)
        {
            path.push(String.fromCharCode(j)+(i))
        }
    }

    //bottom
    if(direction=="bottom")
    {
        for(let i=oppRow ; i>kingRow ;i--)
        {
            path.push(String.fromCharCode(oppCol)+(i))
        }
    }

    //bottom left
    if(direction=="bottomLeft")
    {
        for(let i=oppRow,j=oppCol ;i>kingRow && j>kingCol ; i--,j--)
        {
            path.push(String.fromCharCode(j)+(i))
        }
    }

    //left
    if(direction=="left")
    {
        for(let j=oppCol ; j>kingCol ; j--)
        {
            path.push(String.fromCharCode(j)+(oppRow))
        }
    }

    //top left
    if(direction=="topLeft")
    {
        for(let i=oppRow,j=oppCol ; i<kingRow && j>kingCol ; i++,j--)
        {
            path.push(String.fromCharCode(j)+(i))
        }
    }   
    return path

}


//blocks
// function checkForPawn(pathId,currentColor)
// {
//     let row = Number(pathId[1])
//     let col = pathId[0].charCodeAt(0)
//     if(currentColor==="black")
//     {
//         let $bottomLeftSquare = document.getElementById(String.fromCharCode(col-1)+(row-1))
//         let $bottomRightSquare = document.getElementById(String.fromCharCode(col+1)+(row-1))
//         let $bottomSquare = document.getElementById(String.fromCharCode(col)+(row-1))

//         if(document.getElementById(pathId).childNodes.length>0)
//         {
//             if(col-1>='a'.charCodeAt(0) && row-1>=1 && $bottomLeftSquare.childNodes.length>0 && $bottomLeftSquare.childNodes[0].id.includes(currentColor) && $bottomLeftSquare.childNodes[0].id.includes("Pawn"))
//             {
//                 $bottomLeftSquare.childNodes[0].addEventListener("click",setPawnProperties,{capture:true}) 
//             }

//         }
//     }
//     else
//     {

//     }
// }






//--------------- mics
//lock other pieces,which cannot block opp pieces
    // for(let pieceId in chessPieces)
    // {
    //     if(pieceId.includes(KingColor) && !(pieceId.includes("King")))
    //     {
    //         if(pieceId.includes("Pawn"))
    //             document.getElementById(pieceId).removeEventListener("click",setPawnProperties,{capture:true}) 
    //     }
    // }