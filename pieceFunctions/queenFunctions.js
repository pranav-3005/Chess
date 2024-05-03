// bishop obj ->
        /* 
            pieceid: {
                #    $pieceElement: <></>,                    //cur element,fixed
                #    $parentElement: <></>,         //parent element,dynamic
                #    parentColor: color,
        */

function setQueens() {

    //black
    let $piece =document.createElement('div')
    $piece.innerHTML='<i class="fa-solid fa-chess-queen" style="font-size:70px;"></i>'

    $piece.setAttribute('id','blackQueen')
    $piece.setAttribute('class','chessPiece')

    $piece.style.cssText=`display:flex;
                        justify-content:center;
                        align-items:center;`

    let $square=document.getElementById('e8')
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
    $piece.addEventListener("click",setQueenProperties)

    
    //2nd - white
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

    //set properties
    $piece.addEventListener("click",setQueenProperties)
    
}

//properties ----------------------

function setQueenProperties()
{
    let queenId = this.id

    let position=chessPieces[`${queenId}`]['$parentElement'].id
    let col=position[0].charCodeAt(0)  //a,b,c,d,e,f,g,h
    let row= Number(position[1]) //1,2,3,4,5,6,7,8

    //to check player's turn
    if(queenId.includes(currentPlayerColor))
    {
        let possibleCuts = [] // debugging purpose
        possibleCuts = queenPossibleSquaresToMoveAndCut(position,queenId)
        console.log(queenId,possibleCuts) // debugging purpose
    }
}

//functions ---------------------------

function queenPossibleSquaresToMoveAndCut(position,queenId)
{
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let currentColor= queenId.slice(0,5)

    let oppPieces=[] //debugging purpose

    //checking all 8 directions to move or cut
    let currentPositionId = ''
    let $currentPosition = ''

    //top
    for(let i=row+1;i<=8;i++)
    {
        currentPositionId = String.fromCharCode(col) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0)
        {
            queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
            break       //if found an piece,lock the movements,till now
        }
        //highlight next moves && click event to move to the target
        queenHightlightMovesToMove($currentPosition,position,queenId)               //move
    }

    //top right
    for(let i=row+1,j=col+1 ; i<=8 && j<='h'.charCodeAt(0) ; i++,j++)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0)
        {
            queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
            break       //if found an piece,lock the movements,till now
        }
        //highlight next moves && click event to move to the target
        queenHightlightMovesToMove($currentPosition,position,queenId)               //move
    }

    //right
    for(let j=col+1; j<='h'.charCodeAt(0) ; j++)
    {
        currentPositionId = String.fromCharCode(j) + row
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0)
        {
            queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
            break       //if found an piece,lock the movements,till now
        }
        //highlight next moves && click event to move to the target
        queenHightlightMovesToMove($currentPosition,position,queenId)               //move
    }

    //bottom right
    for(let i=row-1,j=col+1; i>=1 && j<='h'.charCodeAt(0) ; i--,j++)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0)
        {
            queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
            break       //if found an piece,lock the movements,till now
        }
        //highlight next moves && click event to move to the target
        queenHightlightMovesToMove($currentPosition,position,queenId)               //move
    }

    //bottom
    for(let i=row-1 ; i>=1 ;i--)
    {
        currentPositionId = String.fromCharCode(col) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0)
        {
            queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
            break       //if found an piece,lock the movements,till now
        }
        //highlight next moves && click event to move to the target
        queenHightlightMovesToMove($currentPosition,position,queenId)               //move
    }

    //bottom left
    for(let i=row-1,j=col-1 ;i>=1 && j>='a'.charCodeAt(0) ; i--,j--)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0)
        {
            queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
            break       //if found an piece,lock the movements,till now
        }
        //highlight next moves && click event to move to the target
        queenHightlightMovesToMove($currentPosition,position,queenId)               //move
    }

    //left
    for(let j=col-1 ; j>='a'.charCodeAt(0) ; j--)
    {
        currentPositionId = String.fromCharCode(j) + row
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0)
        {
            queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
            break       //if found an piece,lock the movements,till now
        }
        //highlight next moves && click event to move to the target
        queenHightlightMovesToMove($currentPosition,position,queenId)               //move
    }

    //top left
    for(let i=row+1,j=col-1 ; i<=8 && j>='a'.charCodeAt(0) ; i++,j--)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0)
        {
            queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
            break       //if found an piece,lock the movements,till now
        }
        //highlight next moves && click event to move to the target
        queenHightlightMovesToMove($currentPosition,position,queenId)               //move
    }
}

function queenHighlightMovesToCut($currentPosition,currentColor,oppPieces,position,queenId)
{
    if(!$currentPosition.childNodes[0].id.includes(currentColor))       //cut
    {
        oppPieces.push($currentPosition.childNodes[0].id)
        
        if($currentPosition.style.backgroundColor==="grey")
        {
            $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
            $currentPosition.removeEventListener("click" , queenCutPiece ) 
        }
        else 
        {
            $currentPosition.style.backgroundColor="grey"
            
            //2.click event to cut opp piece
            $currentPosition.sourcePositionId=position
            $currentPosition.queenId=queenId
            $currentPosition.addEventListener("click" , queenCutPiece )                   // ********** 
        }  
    }
}

function queenHightlightMovesToMove($currentPosition,position,queenId) 
{
    let currentOpacity= window.getComputedStyle($currentPosition).getPropertyValue('opacity')

    if( currentOpacity == '1') //highlight
    {
        $currentPosition.style.opacity= highlightMovesOpacity 

        $currentPosition.position=position //set vars to access during event
        $currentPosition.queenId=queenId
        $currentPosition.addEventListener("click",queenMoveToTarget)
    }
    else   //remove move event and bg clr, while toggling
    {
        $currentPosition.style.opacity='1'

        //remove event listener for bishopMoveToTarget
        $currentPosition.removeEventListener("click",queenMoveToTarget)
    }
}

function queenRemovehighlightedAreas($sourcePosition,$targetPosition)
{
    let sourcePositionId=$sourcePosition.id
    let targetPositionId=$targetPosition.id


    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //check on all 8 directions
    let currentSquareId=''
    let $currentSquare=''

    //top
    for(let i=row+1;i<=8;i++)
    {
        currentSquareId = String.fromCharCode(col) + i
        $currentSquare = document.getElementById(currentSquareId)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , queenCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",queenMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //top right
    for(let i=row+1,j=col+1 ; i<=8 && j<='h'.charCodeAt(0) ; i++,j++)
    {
        currentSquareId = String.fromCharCode(j) + i
        $currentSquare = document.getElementById(currentSquareId)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , queenCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",queenMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //right
    for(let j=col+1; j<='h'.charCodeAt(0) ; j++)
    {
        currentSquareId = String.fromCharCode(j) + row
        $currentSquare = document.getElementById(currentSquareId)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , queenCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",queenMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //bottom right
    for(let i=row-1,j=col+1; i>=1 && j<='h'.charCodeAt(0) ; i--,j++)
    {
        currentSquareId = String.fromCharCode(j) + i
        $currentSquare = document.getElementById(currentSquareId)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , queenCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",queenMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //bottom
    for(let i=row-1 ; i>=1 ;i--)
    {
        currentSquareId = String.fromCharCode(col) + i
        $currentSquare = document.getElementById(currentSquareId)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , queenCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",queenMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //bottom left
    for(let i=row-1,j=col-1 ;i>=1 && j>='a'.charCodeAt(0) ; i--,j--)
    {
        currentSquareId = String.fromCharCode(j) + i
        $currentSquare = document.getElementById(currentSquareId)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , queenCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",queenMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //left
    for(let j=col-1 ; j>='a'.charCodeAt(0) ; j--)
    {
        currentSquareId = String.fromCharCode(j) + row
        $currentSquare = document.getElementById(currentSquareId)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , queenCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",queenMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //top left
    for(let i=row+1,j=col-1 ; i<=8 && j>='a'.charCodeAt(0) ; i++,j--)
    {
        currentSquareId = String.fromCharCode(j) + i
        $currentSquare = document.getElementById(currentSquareId)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , queenCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",queenMoveToTarget)
        $currentSquare.style.opacity='1'
    }
}

function queenCheckForKing($currentSquare,position,queenId)
{
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let currentColor= queenId.slice(0,5)

    //checking all 8 directions to move or cut
    let $currentPosition = ''

    //top
    for(let i=row+1;i<=8;i++)
    {
        $currentPosition = document.getElementById(String.fromCharCode(col) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,queenId,"topLeft")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //top right
    for(let i=row+1,j=col+1 ; i<=8 && j<='h'.charCodeAt(0) ; i++,j++)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,queenId,"topRight")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //right
    for(let j=col+1; j<='h'.charCodeAt(0) ; j++)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (row))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,queenId,"right")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //bottom right
    for(let i=row-1,j=col+1; i>=1 && j<='h'.charCodeAt(0) ; i--,j++)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,queenId,"bottomRight")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //bottom
    for(let i=row-1 ; i>=1 ;i--)
    {
        $currentPosition = document.getElementById(String.fromCharCode(col) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,queenId,"bottom")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //bottom left
    for(let i=row-1,j=col-1 ;i>=1 && j>='a'.charCodeAt(0) ; i--,j--)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,queenId,"bottomLeft")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //left
    for(let j=col-1 ; j>='a'.charCodeAt(0) ; j--)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (row))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,queenId,"left")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //top left
    for(let i=row+1,j=col-1 ; i<=8 && j>='a'.charCodeAt(0) ; i++,j--)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,queenId,"topLeft")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }
}

//event listener functions -----------------------
function queenCutPiece()
{
    let sourcePositionId = this.sourcePositionId
    let targetPositionId = this.id
    let $sourceSquare = document.getElementById(sourcePositionId)
    let $targetSquare = document.getElementById(targetPositionId)
    let queenId = $sourceSquare.childNodes[0].id

    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //update at obj
    let destinationTempColor= chessPieces[ $targetSquare.childNodes[0].id ]["parentColor"]
    chessPieces[$targetSquare.childNodes[0].id]["$parentElement"]=''
    chessPieces[$targetSquare.childNodes[0].id]["parentColor"]=''

    chessPieces[queenId]["$parentElement"]= $targetSquare
    chessPieces[queenId]["parentColor"] = destinationTempColor

    //update at HTML element
    $targetSquare.style.backgroundColor = destinationTempColor
    $targetSquare.innerHTML=''
    $targetSquare.append($sourceSquare.childNodes[0])

    $sourceSquare.innerHTML=''

    //remove highlights of available moves with its event listeners
    queenRemovehighlightedAreas($sourceSquare,$targetSquare)

    //remove event listener at target
    $targetSquare.removeEventListener("click" , queenCutPiece )  

    queenCheckForKing($targetSquare , targetPositionId , queenId)

    let currentColor = (queenId.slice(0,5)==="white") ? "black" : "white" 
    chessPieces[ currentColor+"King" ]["isUnderCheck"]=false

    //to switch moves (black->white,white->black)
    if(queenId.includes("black"))
        currentPlayerColor="white"
    else
        currentPlayerColor="black"
}

function queenMoveToTarget()
{
    let $sourcePosition = document.getElementById(this.position)
    let $currentQueen = document.getElementById(this.queenId)
    let queenId=this.queenId
    let $targetPosition = document.getElementById(this.id)

    //remove highlight on source position
    chessPieces[queenId]["$parentElement"].removeEventListener("mouseover",mouseover)
    chessPieces[queenId]["$parentElement"].removeEventListener("mouseout",mouseout)

    //highlight target
    $targetPosition.addEventListener("mouseover",mouseover)
    $targetPosition.addEventListener("mouseout",mouseout)

    //move bishop , src->target
    $sourcePosition.innerHTML=''
    $targetPosition.append($currentQueen)

    //update in chessPieces obj
    chessPieces[queenId]["$parentElement"]=$targetPosition
    chessPieces[queenId]["parentColor"]=$targetPosition.style.backgroundColor

    //revert back bg colors
    $targetPosition.style.opacity='1'

    //remove event listeners for highlighted areas and to cut opp piece                              ***
    queenRemovehighlightedAreas($sourcePosition,$targetPosition)

    queenCheckForKing($targetPosition , targetPositionId , queenId)

    let currentColor = (queenId.slice(0,5)==="white") ? "black" : "white" 
    chessPieces[ currentColor+"King" ]["isUnderCheck"]=false

    //to switch moves (black->white,white->black)
    if(queenId.includes("black"))
        currentPlayerColor="white"
    else
        currentPlayerColor="black"
}