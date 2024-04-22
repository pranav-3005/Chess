$.getScript("script.js")



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

            // $chessBoard.append(square)
                
            $chessBoard.append($square)

            // chessSquares[`${(k+i)}`] = square
            // squareColor[`${(k+i)}`]=square.style.backgroundColor

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



//highlight -----------

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

//pieces --------------


function setBlackPawn(c) {

    let $piece = document.createElement('div')

        $piece.innerHTML='<i class="fa-solid fa-chess-pawn" style="font-size:70px; color:black "></i>'

        $piece.setAttribute('id',`blackPawn${c.toUpperCase()}`)
        $piece.setAttribute('class','chessPiece')
        
        $piece.style.cssText=`display:flex;
                            justify-content:center;
                            align-items:center;`
        
        let $square= document.getElementById(`${c+7}`)

        $square.append($piece)

        //setting obj
        chessPieces[`${$piece.id}`] = {
            $PieceElement : $piece,
            $parentElement : $square,
            squareColor : $square.style.backgroundColor
        }

        //highlight the square
        highlightSquare($square)

        //set pawn properties
        $piece.addEventListener("click",()=>{setPawnProperties($piece.id)}) 
}

function setWhitePawn(c) {
   
    let $piece = document.createElement('div')

    $piece.innerHTML='<i class="fa-solid fa-chess-pawn" style="font-size:70px; color:white "></i>'

    $piece.setAttribute('id',`whitePawn${c.toUpperCase()}`)
    $piece.setAttribute('class','chessPiece')
    
    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`
    
    let $square= document.getElementById(`${c+2}`)

    $square.append($piece)

    //setting obj
    chessPieces[`${$piece.id}`] = {
        $pieceElement : $piece,
        $parentElement : $square,
    }

    //highlight the square
    highlightSquare($square)

    //set piece properties
    $piece.addEventListener("click",()=>{setPawnProperties($piece.id)}) 
}

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
        $PieceElement : $piece,
        $parentElement : $square,
    }

    //highlight the square
    highlightSquare($square)

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
        $PieceElement : $piece,
        $parentElement : $square,
    }

    //highlight the square
    highlightSquare($square)
    
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
        $PieceElement : $piece,
        $parentElement : $square,
    }

    //highlight the square
    highlightSquare($square)

    
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
        $PieceElement : $piece,
        $parentElement : $square,
    }

    //highlight the square
    highlightSquare($square)
    
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

    //highlight the square
    highlightSquare($square)


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

    //highlight the square
    highlightSquare($square)

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

    //highlight the square
    highlightSquare($square)


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

    //highlight the square
    highlightSquare($square)

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

    //highlight the square
    highlightSquare($square)


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

    //highlight the square
    highlightSquare($square)

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

    //highlight the square
    highlightSquare($square)


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

    //highlight the square
    highlightSquare($square)
    
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

    //highlight the square
    highlightSquare($square)
 

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

    //highlight the square
    highlightSquare($square)
    
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

    //highlight the square
    highlightSquare($square)

    
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

    //highlight the square
    highlightSquare($square)
    
}


//properties ------------------------------

function setPawnProperties(pawnId) {

    let position=chessPieces[`${pawnId}`]['$parentElement'].id


    let col=position[0].charCodeAt(0)
    let row= Number(position[1])

    if(pawnId.includes("black"))
    {
        //check for blocks in straight line & highlight movement areas  `${position[0]+(row-1)}`
        if( checkValidToMove(`${position[0]+(row-1)}`),"down" )
        {
            let nextSquare= document.getElementById(position[0]+(row-1))
            let nextNextSquare= document.getElementById(position[0]+(row-2))

            let nextSquareOpacity = window.getComputedStyle(nextSquare).getPropertyValue('opacity')

            if(nextSquareOpacity ===  '1')
            {   
                let nextSquare= document.getElementById(position[0]+(row-1))
                nextSquare.style.opacity='0.5'

                //to move to the movement area
                nextSquare.addEventListener('click',movePawnNextSquare)
                function movePawnNextSquare(eventDetails) {

                    // eventDetails.stopPropogation()

                    //1.clear backgrounds
                    nextSquare.style.opacity='1'
                    nextNextSquare.style.opacity='1'

                    //2. move pawn element
                    nextSquare.append(chessPieces[position][$PieceElement])
                    chessPieces[position][$parentElement].innerHTML=''

                    nextSquare.removeEventListener('click',movePawnNextSquare)
                }
            }
            else
            {
                nextSquare.style.opacity='1'
            }

                //nextNext position
            if( checkValidToMove( `${position[0]+(row-2)}`,"down" ) )
            {
                let nextNextSquareOpacity = window.getComputedStyle(nextNextSquare).getPropertyValue('opacity')

                if(nextNextSquareOpacity === '1')
                {
                    nextNextSquare.style.opacity='0.5'
                }
                else
                {
                    nextNextSquare.style.opacity='1'
                }
            }
        }
        
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
    }
    //white
    else
    {
        //any blocks in straight line
        if( checkValidToMove(`${position[0]+(row+1)}`,"up") )
        {

            let nextSquare= document.getElementById(`${position[0]+(row+1)}`)
            let nextSquareOpacity = window.getComputedStyle(nextSquare).getPropertyValue('opacity')

            if(nextSquareOpacity === '1')
             {
                nextSquare.style.opacity='0.5'
             }
            else
            {
                nextSquare.style.opacity='1'
            }

            if( checkValidToMove(`${position[0]+(row+2)}`,"up") )
            {

                let nextNextSquare = document.getElementById(`${position[0]+(row+2)}`)
                let nextNextSquareOpacity = window.getComputedStyle(nextNextSquare).getPropertyValue('opacity')

                if(nextNextSquareOpacity === '1')
                {
                    nextNextSquare.style.opacity='0.5'
                }
                else
                {
                    nextNextSquare.style.opacity='1'
                }
            }
        }
    }


    
}



//mics -----------------------
function checkValidToMove(position,direction) {

    let col=position[0].charCodeAt(0)
    let row= Number(position[1])


    if( direction==="down" )
    {
        if( (row)>=1 &&  document.getElementById( `${position}` ).childNodes.length<=0 )
            return true
        else
            return false
    }
    else if( direction==="up" )
    {
        if ((row)<=8 &&  document.getElementById( `${position}` ).childNodes.length<=0) {
            return true
        } else {
            return false
        }
    }
    else if( direction==="left" )
    {
        if( col>='a'.charCodeAt(0) && document.getElementById( `${position}` ).childNodes.length<=0){
            return true
        }
        else{
            return false
        }
    }
    else //ryt
    {
        if( col<='h'.charCodeAt(0) && document.getElementById( `${position}` ).childNodes.length<=0){
            return true
        }
        else{
            return false
        }
    }
    
}