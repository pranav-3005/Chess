$.getScript("./pieceFunctions/pawnFunctions.js")
$.getScript("./pieceFunctions/rookFunctions.js")
$.getScript("./pieceFunctions/knightFunctions.js")
$.getScript("./pieceFunctions/bishopFunctions.js")
$.getScript("./pieceFunctions/queenFunctions.js")


// "rgb(148,96,44)","rgb(231,204,177)" black,white


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

function setKings() {

    //black
    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-king" style="font-size:70px;"></i>'

    $piece.setAttribute('id','blackKing')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    let $square=document.getElementById('d8')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)

    
 

    //2nd - white
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-king" style="font-size:70px; color:white"></i>'

    $piece.setAttribute('id','whiteKing')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    $square=document.getElementById('d1')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)

    
    
}

