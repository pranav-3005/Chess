$.getScript("./pieceFunctions/pawnFunctions.js")


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
            //black
            setBlackKingAndQueen()

            //white
            setWhiteKingAndQueen()

}



//highlight (hover) -----------

function highlightSquare($square) {
    
    $square.addEventListener("mouseover",()=>{
    $square.style.opacity='0.6'
    $square.style.cursor='pointer'
    })

    $square.addEventListener("mouseout",()=>{
        $square.style.cursor=`auto`
        $square.style.opacity='1'
        $square.style.paddingTop='5px'
    })
}

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

function setBlackRook() {

    //1st
    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-rook" style="font-size:70px;"></i>'

    $piece.setAttribute('id','blackRookA')
    $piece.setAttribute('class','chessPiece')
    
    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`
    
    let $square=document.getElementById('a8')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)
    
    //2nd
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-rook" style="font-size:70px;"></i>'

    $piece.setAttribute('id','blackRookF')
    $piece.setAttribute('class','chessPiece')
    
    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`
    
    $square=document.getElementById('h8')
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

function setWhiteRook() {

    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-rook" style="font-size:70px; color:white"></i>'

    $piece.setAttribute('id','whiteRookA')
    $piece.setAttribute('class','chessPiece')
    
    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`
    
    let $square=document.getElementById('a1')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)

    
    //2nd
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-rook" style="font-size:70px; color:white;"></i>'

    $piece.setAttribute('id','whiteRookH')
    $piece.setAttribute('class','chessPiece')
    
    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`
    
    $square=document.getElementById('h1')
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

function setBlackKnight() {
    
    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-knight" style="font-size:70px;"></i>'

    $piece.setAttribute('id','blackKnightB')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    let $square=document.getElementById('b8')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)


    //2nd
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-knight" style="font-size:70px;"></i>'

    $piece.setAttribute('id','blackKnightG')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    $square=document.getElementById('g8')
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

function setWhiteKnight() {
    
    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-knight" style="font-size:70px; color:white;"></i>'

    $piece.setAttribute('id','whiteKnightB')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    let $square=document.getElementById('b1')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)


    //2nd        
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-knight" style="font-size:70px; color:white;"></i>'

    $piece.setAttribute('id','whiteKnightG')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    $square=document.getElementById('g1')
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

function setBlackBishop() {
    
    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-bishop" style="font-size:70px;"></i>'
    $piece.setAttribute('id','blackBishopC')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    let $square=document.getElementById('c8')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)


    //2nd
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-bishop" style="font-size:70px;"></i>'
    $piece.setAttribute('id','blackBishopF')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    $square=document.getElementById('f8')
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

function setWhiteBishop() {

    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-bishop" style="font-size:70px; color:white"></i>'
    $piece.setAttribute('id','whiteBishopC')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    let $square=document.getElementById('c1')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)


    //2nd
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-bishop" style="font-size:70px;color: white"></i>'
    $piece.setAttribute('id','whiteBishopF')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    $square=document.getElementById('f1')
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

function setBlackKingAndQueen() {

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
 

    //2nd
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-queen" style="font-size:70px;"></i>'

    $piece.setAttribute('id','blackQueen')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    $square=document.getElementById('e8')
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

function setWhiteKingAndQueen() {

    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-king" style="font-size:70px; color:white"></i>'

    $piece.setAttribute('id','whiteKing')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    let $square=document.getElementById('d1')
    $square.append($piece)

    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
        parentColor : $square.style.backgroundColor
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)

    
    //2nd
    $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-queen" style="font-size:70px; color:white"></i>'

    $piece.setAttribute('id','whiteQueen')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    $square=document.getElementById('e1')
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


//misc



//cut next diagonal piece,if
            //right
            // console.log( typeof `${chessSquares[position]}`)
            
            // if(col-1 >= 'a'.charCodeAt(0) && row-1>=1 && chessSquares[ String.fromCharCode(col-1)+(row-1) ].childNodes.length>0 )
            // {
            //     let rightDiagonalElement=chessSquares[ String.fromCharCode(col-1)+(row-1) ]

            //     // rightDiagonalElement.removeChild(rightDiagonalElement.firstChild)
            //     // rightDiagonalElement.append(chessSquares[position])
            //     rightDiagonalElement.innerHTML= JSON.stringify(chessSquares[position])
            //     chessSquares[position].innerHTML=''
            // }
            // //left
            // // let rightDiagonalElement=chessPieces[ String.fromCharCode(col+1)+(row-1) ]
            // if(col+1 <= 'h'.charCodeAt(0) && row-1>=1 &&  chessSquares[ String.fromCharCode(col+1)+(row-1) ].childNodes.length>0)
            // {
            //     let leftDiagonalElement=chessSquares[ String.fromCharCode(col+1)+(row-1) ]

            //     // leftDiagonalElement.removeChild(leftDiagonalElement.firstChild)
            //     // leftDiagonalElement.append(chessSquares[position])
            //     leftDiagonalElement.innerHTML= JSON.stringify(chessSquares[position])
            //     chessSquares[position].innerHTML=''
            // }
