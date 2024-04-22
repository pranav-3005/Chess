// $.getScript("temp.js")

let chessBoard=document.getElementById("chessBoard")
var chessSquares={}
var chessPieces={}
var squareColor={}

document.addEventListener("DOMContentLoaded",setChessBoardAndPieces)

function setChessBoardAndPieces(eventDetails) {
    
    //1. setting chess board
    setChessBoard()

    //2. set chess pieces
    setChessPieces()

    // console.log( window.getComputedStyle(chessBoard).getPropertyValue('opacity'))

    //3. set piece's functionalities
    for(let i in chessSquares)
    {
        if(chessSquares[i].childNodes.length==1)
        {

            //highlighting piece squares
            chessSquares[i].addEventListener("mouseover",()=>{
                chessSquares[i].style.cssText=`background-color:green;
                                            opacity:0.5;
                                            cursor : pointer;`
            chessSquares[i].style.backgroundColor='green'
            chessSquares[i].style.opacity='0.5'
            chessSquares[i].style.cursor='pointer'
                                        
            })
            chessSquares[i].addEventListener("mouseout",()=>{
                // chessSquares[i].style.cssText=`background-color: ${squareColor[i]};
                //                                 cursor : auto;
                //                                 padding-top:5px`
                chessSquares[i].style.backgroundColor= `${squareColor[i]}`
                chessSquares[i].style.cursor=`auto`
                chessSquares[i].style.opacity='1'
                chessSquares[i].style.paddingTop='5px'
            })


            let pieceId=chessSquares[i].childNodes[0].id
            if(pieceId.includes("Pawn"))
            {
                
                chessPieces[pieceId].addEventListener("click",(eventDetails)=>{setPawnProperties(eventDetails,i,pieceId)})  
                // console.log(pieceId)
            }
        }
        
    }
}

function setChessBoard() {

    let clr=["rgb(148,96,44)","rgb(231,204,177)"]
    let j=0

    for(let i=8;i>=1;i--)
    {
        for(let k='a';k!=='i'; k=String.fromCharCode(k.charCodeAt(0)+1 ))
        {
            let square= document.createElement('div')
            square.setAttribute('id',`${(k+i)}`)

            if(k==='h')
                {
                    square.style.cssText=`grid-area: ${(k+i)};
                    background-color:${clr[ (j)%2 ]};
                    box-sizing: border-box;
                    padding-top:5px`
                }
            else
                {

                    square.style.cssText=`grid-area: ${(k+i)};
                    background-color:${clr[ (j++)%2 ]};
                    box-sizing: border-box;
                    padding-top:5px`
                }

            chessBoard.append(square)

            chessSquares[`${(k+i)}`] = square
            squareColor[`${(k+i)}`]=square.style.backgroundColor

        }
    }
}

function setChessPieces() {

    for(let c='a';c!=='i'; c=String.fromCharCode( c.charCodeAt(0)+1 ) )
    {
        //1.black pawns
        let piece = document.createElement('div')

        piece.innerHTML='<i class="fa-solid fa-chess-pawn" style="font-size:70px; color:black "></i>'

        piece.setAttribute('id',`blackPawn${c.toUpperCase()}`)
        piece.setAttribute('class','chessPiece')
        
        piece.style.cssText=`display:flex;
                            justify-content:center;
                            align-items:center;`
        
        chessSquares[`${c+7}`].append(piece)
        chessPieces[`${piece.id}`] = piece


        //2.white pawns
        piece = document.createElement('div')  

        piece.innerHTML='<i class="fa-solid fa-chess-pawn" style="font-size:70px; color:white "></i>'

        piece.setAttribute('id',`whitePawn${c.toUpperCase()}`)
        piece.setAttribute('class','chessPiece')
        
        piece.style.cssText=`display:flex;
                            justify-content:center;
                            align-items:center;`
        
        chessSquares[`${c+2}`].append(piece)
        chessPieces[`${piece.id}`] = piece
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
            let piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-rook" style="font-size:70px;"></i>'
            piece.setAttribute('id','blackRookA')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['a8'].append(piece)
            chessPieces[`${piece.id}`] = piece

            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-rook" style="font-size:70px;"></i>'
            piece.setAttribute('id','blackRookH')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['h8'].append(piece)
            chessPieces[`${piece.id}`] = piece

            //white
            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-rook" style="font-size:70px; color:white"></i>'
            piece.setAttribute('id','WhiteRookA')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['a1'].append(piece)
            chessPieces[`${piece.id}`] = piece

            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-rook" style="font-size:70px; color:white"></i>'
            piece.setAttribute('id','WhiteRookH')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['h1'].append(piece)
            chessPieces[`${piece.id}`] = piece

        //knight
            //black
            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-knight" style="font-size:70px;"></i>'
            piece.setAttribute('id','blackKnightB')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['b8'].append(piece)
            chessPieces[`${piece.id}`] = piece

            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-knight" style="font-size:70px;"></i>'
            piece.setAttribute('id','blackKnightG')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['g8'].append(piece)
            chessPieces[`${piece.id}`] = piece

            //white
            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-knight" style="font-size:70px; color:white"></i>'
            piece.setAttribute('id','whiteKnightB')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['b1'].append(piece)
            chessPieces[`${piece.id}`] = piece

            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-knight" style="font-size:70px; color:white"></i>'
            piece.setAttribute('id','whiteKnightG')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['g1'].append(piece)
            chessPieces[`${piece.id}`] = piece

        //bishop
            //black
            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-bishop" style="font-size:70px;"></i>'
            piece.setAttribute('id','blackBishopC')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['c8'].append(piece)
            chessPieces[`${piece.id}`] = piece

            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-bishop" style="font-size:70px;"></i>'
            piece.setAttribute('id','blackBishopF')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['f8'].append(piece)
            chessPieces[`${piece.id}`] = piece

            //white
            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-bishop" style="font-size:70px; color:white"></i>'
            piece.setAttribute('id','whiteBishopC')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['c1'].append(piece)
            chessPieces[`${piece.id}`] = piece

            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-bishop" style="font-size:70px; color:white"></i>'
            piece.setAttribute('id','whiteBishopF')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['f1'].append(piece)
            chessPieces[`${piece.id}`] = piece

        //king & queen
            //black
            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-king" style="font-size:70px;"></i>'
            piece.setAttribute('id','blackKing')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['d8'].append(piece)
            chessPieces[`${piece.id}`] = piece

            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-queen" style="font-size:70px;"></i>'
            piece.setAttribute('id','blackQueen')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['e8'].append(piece)
            chessPieces[`${piece.id}`] = piece

            //white
            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-king" style="font-size:70px; color:white"></i>'
            piece.setAttribute('id','whiteKing')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['d1'].append(piece)
            chessPieces[`${piece.id}`] = piece

            piece =document.createElement('div')
            piece.innerHTML='<i class="fa-solid fa-chess-queen" style="font-size:70px; color:white"></i>'
            piece.setAttribute('id','whiteQueen')
            piece.setAttribute('class','chessPiece')
            piece.style.cssText=`display:flex;
                                justify-content:center;
                                align-items:center;`
            chessSquares['e1'].append(piece)
            chessPieces[`${piece.id}`] = piece


}


//properties
    //pawn
    function setPawnProperties(eventDetails,position,pawnId) {

        let col=position[0].charCodeAt(0)
        let row= Number(position[1])

        if(pawnId.includes("black"))
        {
            //check for blocks in straight line & highlight movement areas
            if( (row-1)>=1 &&  chessSquares[ position[0]+(row-1) ].childNodes.length<=0)
                {
                    let nextSquareOpacity = window.getComputedStyle(chessSquares[ position[0]+(row-1) ]).getPropertyValue('opacity')

                    //checking to revert or show movement areas
                    if(nextSquareOpacity ===  '1')
                    {
                        // chessSquares[ position[0]+(row-1) ].style.cssText=`background-color:${squareColor[position[0]+(row-1)]};
                        //                                                 opacity:0.5;`
                        chessSquares[ position[0]+(row-1) ].style.backgroundColor=`${squareColor[position[0]+(row-1)]}`
                        chessSquares[ position[0]+(row-1) ].style.opacity='0.5'

                        //to move to the movement area
                        chessSquares[ position[0]+(row-1) ].addEventListener('click',movePawnNextSquare)
                        function movePawnNextSquare() {
                            //1.clear backgrounds
                            chessSquares[ position[0]+(row-1) ].style.opacity='1'
                            chessSquares[ position[0]+(row-2) ].style.opacity='1'

                            //2. move pawn element
                            chessSquares[ position[0]+(row-1) ].append(chessSquares[position])
                            chessSquares[position].innerHTML=''
                            chessSquares[ position[0]+(row-1) ].removeEventListener('click',movePawnNextSquare)
                        }
                    }
                    else
                    {
                        // chessSquares[ position[0]+(row-1) ].style.cssText=`background-color:${squareColor[position[0]+(row-1)]};
                        //                                                 opacity:1;`
                        chessSquares[ position[0]+(row-1) ].style.backgroundColor=`${squareColor[position[0]+(row-1)]}`
                        chessSquares[ position[0]+(row-1) ].style.opacity='1'
                    }

                    if( (row-2)>=1 &&  chessSquares[ position[0]+(row-2) ].childNodes.length<=0 )
                    {
                        let nextNextSquareOpacity = window.getComputedStyle(chessSquares[ position[0]+(row-2) ]).getPropertyValue('opacity')

                        if(nextNextSquareOpacity === '1')
                        {
                            chessSquares[ position[0]+(row-2) ].style.cssText=`background-color:${squareColor[position[0]+(row-2)]};
                                                                        opacity:0.5;`
                            chessSquares[ position[0]+(row-2) ].style.backgroundColor=`${squareColor[position[0]+(row-2)]}`
                            chessSquares[ position[0]+(row-2) ].style.opacity='0.5'
                        }
                        else
                        {
                            // chessSquares[ position[0]+(row-2) ].style.cssText=`background-color:${squareColor[position[0]+(row-2)]};
                            //                                             opacity:1;`
                            chessSquares[ position[0]+(row-2) ].style.backgroundColor=`${squareColor[position[0]+(row-2)]}`
                            chessSquares[ position[0]+(row-2) ].style.opacity='1'
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
            if( (row+1)<=8 &&  chessSquares[ position[0]+(row+1) ].childNodes.length<=0)
                {

                    let nextSquareOpacity = window.getComputedStyle(chessSquares[ position[0]+(row+1) ]).getPropertyValue('opacity')

                    if(nextSquareOpacity === '1')
                    {
                        // chessSquares[ position[0]+(row+1) ].style.cssText=`background-color:${squareColor[position[0]+(row+1)]};
                        //                                                 opacity:0.5;`
                        chessSquares[ position[0]+(row+1) ].style.backgroundColor=`${squareColor[position[0]+(row+1)]}`
                        chessSquares[ position[0]+(row+1) ].style.opacity='0.5'
                    }
                    else
                    {
                        // chessSquares[ position[0]+(row+1) ].style.cssText=`background-color:${squareColor[position[0]+(row+1)]};
                        //                                                 opacity:1;`
                        chessSquares[ position[0]+(row+1) ].style.backgroundColor=`${squareColor[position[0]+(row+1)]}`
                        chessSquares[ position[0]+(row+1) ].style.opacity='1'
                    }

                    if( (row+2)<=8 &&  chessSquares[ position[0]+(row+2) ].childNodes.length<=0 )
                    {

                        let nextNextSquareOpacity = window.getComputedStyle(chessSquares[ position[0]+(row+2) ]).getPropertyValue('opacity')

                        if(nextNextSquareOpacity === '1')
                        {
                            // chessSquares[ position[0]+(row+2) ].style.cssText=`background-color:${squareColor[position[0]+(row+2)]};
                            //                                             opacity:0.5;`
                            chessSquares[ position[0]+(row+2) ].style.backgroundColor=`${squareColor[position[0]+(row+2)]}`
                            chessSquares[ position[0]+(row+2) ].style.opacity='0.5'
                        }
                        else
                        {
                            chessSquares[ position[0]+(row+2) ].style.cssText=`background-color:${squareColor[position[0]+(row+2)]};
                                                                        opacity:1;`
                            chessSquares[ position[0]+(row+2) ].style.backgroundColor=`${squareColor[position[0]+(row+2)]}`
                            chessSquares[ position[0]+(row+2) ].style.opacity='1'
                        }
                    }
            }
        }


    }






//testing purpose
    setChessPieces()
    // let piece = document.createElement('div')
    // piece.innerHTML='<i class="fa-solid fa-chess-pawn" id="tempo"  style="font-size:70px; color:black "></i>'
    // piece.style.cssText=`display:flex;
    //                      justify-content:center;
    //                      align-items:center;`
    
    // chessPieces["a7"].append(piece)
    // document.getElementById("tempo").style.color='white'

    // console.log(chessPieces[`a${7}`].innerHTML)