// knight obj ->
        /* 
            pieceid: {
                #    $pieceElement: <></>,                    //cur element,fixed
                #    $parentElement: <></>,         //parent element,dynamic
                #    parentColor: color,
        */

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

    //set properties
    $piece.addEventListener("click",setKnightProperties)


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

    //set properties
    $piece.addEventListener("click",setKnightProperties)

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

    //set properties
    $piece.addEventListener("click",setKnightProperties)


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

    //set properties
    $piece.addEventListener("click",setKnightProperties)
}

//properties ----------------------

function setKnightProperties(eventDetails) {
    let knightId = this.id

    let position=chessPieces[`${knightId}`]['$parentElement'].id
    let col=position[0].charCodeAt(0)  //a,b,c,d,e,f,g,h
    let row= Number(position[1]) //1,2,3,4,5,6,7,8

    //to check player's turn
    if(knightId.includes(currentPlayerColor))
    {
        let possibleCuts = [] // debugging purpose
        possibleCuts = knightPossibleSquaresToMoveAndCut(position,knightId)
        console.log(knightId,possibleCuts) // debugging purpose
    }
}

//functions ---------------------------

function knightPossibleSquaresToMoveAndCut(position,knightId) 
{
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let currentColor= knightId.slice(0,5)

    let oppPieces=[] //debugging purpose

    //checking all 8 moves, to move or cut
    let currentPositionId=''
    let $currentPosition =''

        //topLeft12  [row+1][col-2]
        if(col-2>='a'.charCodeAt(0) && row+1<=8)
        {
            currentPositionId =  String.fromCharCode(col-2) + (row+1)
            $currentPosition = document.getElementById(currentPositionId)

            knightMoves($currentPosition,currentColor,oppPieces,position,knightId)
        }

        //topLeft21 [row+2][col-1]
        if(col-1>='a'.charCodeAt(0) && row+2<=8)
        {
            currentPositionId =  String.fromCharCode(col-1) + (row+2)
            $currentPosition = document.getElementById(currentPositionId)

            knightMoves($currentPosition,currentColor,oppPieces,position,knightId)
        }

        //topRight12 [row+1][col+2]
        if(col+2<='h'.charCodeAt(0) && row+1<=8)
        {
            currentPositionId =  String.fromCharCode(col+2) + (row+1)
            $currentPosition = document.getElementById(currentPositionId)

            knightMoves($currentPosition,currentColor,oppPieces,position,knightId)
        }

        //topRight21 [row+2][col+1]
        if(col+1<='h'.charCodeAt(0) && row+2<=8)
        {
            currentPositionId =  String.fromCharCode(col+1) + (row+2)
            $currentPosition = document.getElementById(currentPositionId)

            knightMoves($currentPosition,currentColor,oppPieces,position,knightId)
        }

        //bottomLeft12 [row-1][col-2]
        if(col-2>='a'.charCodeAt(0) && row-1>=1)
        {
            currentPositionId =  String.fromCharCode(col-2) + (row-1)
            $currentPosition = document.getElementById(currentPositionId)

            knightMoves($currentPosition,currentColor,oppPieces,position,knightId)
        }

        //bottomLeft21 [row-2][col-1]
        if(col-1>='a'.charCodeAt(0) && row-2>=1)
        {
            currentPositionId =  String.fromCharCode(col-1) + (row-2)
            $currentPosition = document.getElementById(currentPositionId)

            knightMoves($currentPosition,currentColor,oppPieces,position,knightId)
        }

        //bottomRight12 [row-1][col+2]
        if(col+2<='h'.charCodeAt(0) && row-1>=1)
        {
            currentPositionId =  String.fromCharCode(col+2) + (row-1)
            $currentPosition = document.getElementById(currentPositionId)

            knightMoves($currentPosition,currentColor,oppPieces,position,knightId)
        }

        //bottomRight21 [row-2][col+1]
        if(col+1<='h'.charCodeAt(0) && row-2>=1)
        {
            currentPositionId =  String.fromCharCode(col+1) + (row-2)
            $currentPosition = document.getElementById(currentPositionId)

            knightMoves($currentPosition,currentColor,oppPieces,position,knightId)
        }
}

function knightMoves($currentPosition,currentColor,oppPieces,position,knightId) 
{
    if($currentPosition.childNodes.length>0 ) //cut
    {
        if(!$currentPosition.childNodes[0].id.includes(currentColor))//opp piece
        {
            oppPieces.push($currentPosition.childNodes[0].id)
            
            if($currentPosition.style.backgroundColor==="grey")
            {
                $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                $currentPosition.removeEventListener("click" , knightCutPiece ) 
            }
            else 
            {
                $currentPosition.style.backgroundColor="grey"
                
                //2.click event to cut opp piece
                $currentPosition.sourcePositionId=position
                $currentPosition.knightId=knightId
                $currentPosition.addEventListener("click" , knightCutPiece )                   // ********** 
            }
        }
    }
    else //move
    {
        let currentOpacity= window.getComputedStyle($currentPosition).getPropertyValue('opacity')

        if( currentOpacity == '1') //highlight
        {
            $currentPosition.style.opacity= highlightMovesOpacity

            $currentPosition.position=position //set vars to access during event
            $currentPosition.knightId=knightId

            $currentPosition.addEventListener("click",knightMoveToTarget)
        }
        else   //remove move event and bg clr, while toggling
        {
            $currentPosition.style.opacity='1'

            //remove event listener for rookMoveToTarget
            $currentPosition.removeEventListener("click",knightMoveToTarget)
        }
    }
}

function knightRemovehighlightedAreas($sourcePosition,$targetPosition)
{
    let sourcePositionId=$sourcePosition.id
    let targetPositionId=$targetPosition.id


    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //check all the 8 positions
    let $currentSquare= ''

    //topLeft12  [row+1][col-2]
    if(col-2>='a'.charCodeAt(0) && row+1<=8)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col-2) + (row+1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",knightCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",knightMoveToTarget)
            $currentSquare.style.opacity='1'
        }
    }

    //topLeft21 [row+2][col-1]
    if(col-1>='a'.charCodeAt(0) && row+2<=8)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col-1) + (row+2) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",knightCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",knightMoveToTarget)
            $currentSquare.style.opacity='1'
        }
    }

    //topRight12 [row+1][col+2]
    if(col+2<='h'.charCodeAt(0) && row+1<=8)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col+2) + (row+1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",knightCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",knightMoveToTarget)
            $currentSquare.style.opacity='1'
        }
    }

    //topRight21 [row+2][col+1]
    if(col+1<='h'.charCodeAt(0) && row+2<=8)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col+1) + (row+2) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",knightCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",knightMoveToTarget)
            $currentSquare.style.opacity='1'
        }
    }

    //bottomLeft12 [row-1][col-2]
    if(col-2>='a'.charCodeAt(0) && row-1>=1)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col-2) + (row-1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",knightCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",knightMoveToTarget)
            $currentSquare.style.opacity='1'
        }
    }

    //bottomLeft21 [row-2][col-1]
    if(col-1>='a'.charCodeAt(0) && row-2>=1)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col-1) + (row-2) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",knightCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",knightMoveToTarget)
            $currentSquare.style.opacity='1'
        }
    }

    //bottomRight12 [row-1][col+2]
    if(col+2<='h'.charCodeAt(0) && row-1>=1)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col+2) + (row-1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",knightCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",knightMoveToTarget)
            $currentSquare.style.opacity='1'
        }
    }

    //bottomRight21 [row-2][col+1]
    if(col+1<='h'.charCodeAt(0) && row-2>=1)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col+1) + (row-2) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",knightCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",knightMoveToTarget)
            $currentSquare.style.opacity='1'
        }
    }
}


//eventListener functions -----------------------------

function knightCutPiece(eventDetails) 
{
    let sourcePositionId = this.sourcePositionId
    let targetPositionId = this.id  //this -> target element
    let $sourceSquare = document.getElementById(sourcePositionId)
    let $targetSquare = document.getElementById(targetPositionId)
    let knightId = $sourceSquare.childNodes[0].id

    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //update at obj
    let destinationTempColor= chessPieces[ $targetSquare.childNodes[0].id ]["parentColor"]
    chessPieces[$targetSquare.childNodes[0].id]["$parentElement"]=''
    chessPieces[$targetSquare.childNodes[0].id]["parentColor"]=''

    chessPieces[knightId]["$parentElement"]= $targetSquare
    chessPieces[knightId]["parentColor"] = destinationTempColor

    //update at HTML element
    $targetSquare.style.backgroundColor = destinationTempColor
    $targetSquare.innerHTML=''
    $targetSquare.append($sourceSquare.childNodes[0])

    $sourceSquare.innerHTML=''

    //remove highlights of available moves with its event listeners 
    knightRemovehighlightedAreas($sourceSquare,$targetSquare)

    //remove event listener at target
    $targetSquare.removeEventListener("click" , knightCutPiece )
    
    //to switch moves (black->white,white->black)
    if(knightId.includes("black"))
        currentPlayerColor="white"
    else
        currentPlayerColor="black"

}

function knightMoveToTarget(eventDetails) {
    let $sourcePosition = document.getElementById(this.position)
    let $currentKnight = document.getElementById(this.knightId)
    let knightId=this.knightId
    let $targetPosition = document.getElementById(this.id)

    //remove highlight on source position
    chessPieces[knightId]["$parentElement"].removeEventListener("mouseover",mouseover)
    chessPieces[knightId]["$parentElement"].removeEventListener("mouseout",mouseout)

    //highlight target
    $targetPosition.addEventListener("mouseover",mouseover)
    $targetPosition.addEventListener("mouseout",mouseout)

    //move knight , src->target
    $sourcePosition.innerHTML=''
    $targetPosition.append($currentKnight)

    //update in chessPieces obj
    chessPieces[knightId]["$parentElement"]=$targetPosition
    chessPieces[knightId]["parentColor"]=$targetPosition.style.backgroundColor

    //revert back bg colors
    $targetPosition.style.opacity='1'

    //remove event listeners for highlighted areas and to cut opp piece                              ***
    knightRemovehighlightedAreas($sourcePosition,$targetPosition)


    //to switch moves (black->white,white->black)
    if(knightId.includes("black"))
        currentPlayerColor="white"
    else
        currentPlayerColor="black"
}