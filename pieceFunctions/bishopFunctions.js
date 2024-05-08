// bishop obj ->
        /* 
            pieceid: {
                #    $pieceElement: <></>,                    //cur element,fixed
                #    $parentElement: <></>,         //parent element,dynamic
                #    parentColor: color,
        */

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

    //set properties
    $piece.addEventListener("click",setBishopProperties)


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

    //set properties
    $piece.addEventListener("click",setBishopProperties)

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

    //set properties
    $piece.addEventListener("click",setBishopProperties)


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

    //set properties
    $piece.addEventListener("click",setBishopProperties)
    
}

//properties ----------------------

function setBishopProperties(eventDetails) {
    let bishopId = this.id

    let position=chessPieces[`${bishopId}`]['$parentElement'].id
    let col=position[0].charCodeAt(0)  //a,b,c,d,e,f,g,h
    let row= Number(position[1]) //1,2,3,4,5,6,7,8

    //to check player's turn
    if(bishopId.includes(currentPlayerColor))
    {
        let possibleCuts = [] // debugging purpose
        possibleCuts = bishopPossibleSquaresToMoveAndCut(position,bishopId)
        console.log(bishopId,possibleCuts) // debugging purpose
    }
}

//functions ---------------------------

function bishopPossibleSquaresToMoveAndCut(position,bishopId)
{
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let currentColor= bishopId.slice(0,5)

    let oppPieces=[] //debugging purpose

    //checking all 4 diagonals to move or cut
    let currentPositionId = ''
    let $currentPosition = ''

    //topLeft
    for(let i=row+1,j=col-1 ; i<=8 && j>='a'.charCodeAt(0) ; i++,j--)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && $currentPosition.childNodes[0].id.includes(currentColor))
            break

        if(isValidToMoveWhileCheck(currentPositionId,currentColor))
        {
            if($currentPosition.childNodes.length>0)
            {
                if(!$currentPosition.childNodes[0].id.includes(currentColor) && !$currentPosition.childNodes[0].id.includes("King"))       //cut
                {
                    oppPieces.push($currentPosition.childNodes[0].id)
                    
                    if($currentPosition.style.backgroundColor==="grey")
                    {
                        $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                        $currentPosition.removeEventListener("click" , bishopCutPiece ) 
                    }
                    else 
                    {
                        $currentPosition.style.backgroundColor="grey"
                        
                        //2.click event to cut opp piece
                        $currentPosition.sourcePositionId=position
                        $currentPosition.bishopId=bishopId
                        $currentPosition.addEventListener("click" , bishopCutPiece )                   // ********** 
                    }  
                }
                break       //if found an piece,lock the movements,till now
            }
        //highlight next moves && click event to move to the target
        bishopHightLightMoves($currentPosition,position,bishopId)               //move
        }
     
    }

    //topRight
    for(let i=row+1,j=col+1 ; i<=8 && j<='h'.charCodeAt(0) ; i++,j++)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && $currentPosition.childNodes[0].id.includes(currentColor))
            break

        if(isValidToMoveWhileCheck(currentPositionId,currentColor))
        {
            if($currentPosition.childNodes.length>0)
            {
                if(!$currentPosition.childNodes[0].id.includes(currentColor) && !$currentPosition.childNodes[0].id.includes("King"))       //cut
                {
                    oppPieces.push($currentPosition.childNodes[0].id)
                    
                    if($currentPosition.style.backgroundColor==="grey")
                    {
                        $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                        $currentPosition.removeEventListener("click" , bishopCutPiece ) 
                    }
                    else 
                    {
                        $currentPosition.style.backgroundColor="grey"
                        
                        //2.click event to cut opp piece
                        $currentPosition.sourcePositionId=position
                        $currentPosition.bishopId=bishopId
                        $currentPosition.addEventListener("click" , bishopCutPiece )                   // ********** 
                    }  
                }
                break       //if found an piece,lock the movements,till now
            }
        //highlight next moves && click event to move to the target
        bishopHightLightMoves($currentPosition,position,bishopId)               //move
        }
    }

    //bottomLeft
    for(let i=row-1,j=col-1 ; i>=1 && j>='a'.charCodeAt(0) ; i--,j--)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && $currentPosition.childNodes[0].id.includes(currentColor))
            break

        if(isValidToMoveWhileCheck(currentPositionId,currentColor))
        {
            if($currentPosition.childNodes.length>0)
            {
                if(!$currentPosition.childNodes[0].id.includes(currentColor) && !$currentPosition.childNodes[0].id.includes("King"))       //cut
                {
                    oppPieces.push($currentPosition.childNodes[0].id)
                    
                    if($currentPosition.style.backgroundColor==="grey")
                    {
                        $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                        $currentPosition.removeEventListener("click" , bishopCutPiece ) 
                    }
                    else 
                    {
                        $currentPosition.style.backgroundColor="grey"
                        
                        //2.click event to cut opp piece
                        $currentPosition.sourcePositionId=position
                        $currentPosition.bishopId=bishopId
                        $currentPosition.addEventListener("click" , bishopCutPiece )                   // ********** 
                    }  
                }
                break       //if found an piece,lock the movements,till now
            }
        //highlight next moves && click event to move to the target
        bishopHightLightMoves($currentPosition,position,bishopId)               //move
        }
    }

    //bottomRight
    for(let i=row-1,j=col+1 ; i>=1 && j<='h'.charCodeAt(0) ; i--,j++)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && $currentPosition.childNodes[0].id.includes(currentColor))
            break

        if(isValidToMoveWhileCheck(currentPositionId,currentColor))
        {
            if($currentPosition.childNodes.length>0)
            {
                if(!$currentPosition.childNodes[0].id.includes(currentColor) && !$currentPosition.childNodes[0].id.includes("King"))       //cut
                {
                    oppPieces.push($currentPosition.childNodes[0].id)
                    
                    if($currentPosition.style.backgroundColor==="grey")
                    {
                        $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                        $currentPosition.removeEventListener("click" , bishopCutPiece ) 
                    }
                    else 
                    {
                        $currentPosition.style.backgroundColor="grey"
                        
                        //2.click event to cut opp piece
                        $currentPosition.sourcePositionId=position
                        $currentPosition.bishopId=bishopId
                        $currentPosition.addEventListener("click" , bishopCutPiece )                   // ********** 
                    }  
                }
                break       //if found an piece,lock the movements,till now
            }
        //highlight next moves && click event to move to the target
        bishopHightLightMoves($currentPosition,position,bishopId)               //move
        }
    }

    return oppPieces
}

function bishopHightLightMoves($currentPosition,position,bishopId)
{
    let currentOpacity= window.getComputedStyle($currentPosition).getPropertyValue('opacity')

    if( currentOpacity == '1') //highlight
    {
        $currentPosition.style.opacity= highlightMovesOpacity

        $currentPosition.position=position //set vars to access during event
        $currentPosition.bishopId=bishopId
        $currentPosition.addEventListener("click",bishopMoveToTarget)
    }
    else   //remove move event and bg clr, while toggling
    {
        $currentPosition.style.opacity='1'

        //remove event listener for bishopMoveToTarget
        $currentPosition.removeEventListener("click",bishopMoveToTarget)
    }
}

function bishopRemovehighlightedAreas($sourcePosition,$targetPosition)
{
    let sourcePositionId=$sourcePosition.id
    let targetPositionId=$targetPosition.id


    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //check on all 4 diagonals
    let currentSquareId=''
    let $currentSquare=''

    //topLeft
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
                $currentSquare.removeEventListener("click" , bishopCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",bishopMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //topRight
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
                $currentSquare.removeEventListener("click" , bishopCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",bishopMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //bottomLeft
    for(let i=row-1,j=col-1 ; i>=1 && j>='a'.charCodeAt(0) ; i--,j--)
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
                $currentSquare.removeEventListener("click" , bishopCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",bishopMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //bottomRight
    for(let i=row-1,j=col+1 ; i>=1 && j<='h'.charCodeAt(0) ; i--,j++)
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
                $currentSquare.removeEventListener("click" , bishopCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",bishopMoveToTarget)
        $currentSquare.style.opacity='1'
    }



}

function bishopCheckForKing($currentSquare,position,bishopId)
{
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let currentColor= bishopId.slice(0,5)

    //checking all 4 diagonals to move or cut
    let $currentPosition = ''
    //topLeft
    for(let i=row+1,j=col-1 ; i<=8 && j>='a'.charCodeAt(0) ; i++,j--)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,bishopId,"topLeft")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //topRight
    for(let i=row+1,j=col+1 ; i<=8 && j<='h'.charCodeAt(0) ; i++,j++)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,bishopId,"topRight")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //bottomLeft
    for(let i=row-1,j=col-1 ; i>=1 && j>='a'.charCodeAt(0) ; i--,j--)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,bishopId,"bottomLeft")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //bottomRight
    // let possibleKing = false
    for(let i=row-1,j=col+1 ; i>=1 && j<='h'.charCodeAt(0) ; i--,j++)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,bishopId,"bottomRight")
        }
        else if($currentPosition.childNodes.length>0)
        {

            break
        }
    }
}
//eventListener functions ---------------------

function bishopCutPiece(eventDetails)
{
    let sourcePositionId = this.sourcePositionId
    let targetPositionId = this.id

    let $sourceSquare = document.getElementById(sourcePositionId)
    let $targetSquare = document.getElementById(targetPositionId)
    let bishopId = $sourceSquare.childNodes[0].id

    let $sourcePiece = document.getElementById(bishopId)
    let $targetPiece = $targetSquare.childNodes[0]
    let currentColor = bishopId.slice(0,5)

    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])


    //update at obj
    let destinationTempColor= chessPieces[ $targetSquare.childNodes[0].id ]["parentColor"]
    let sourceTempColor= chessPieces[ $sourceSquare.childNodes[0].id ]["parentColor"]

    chessPieces[$targetSquare.childNodes[0].id]["$parentElement"]=''
    chessPieces[$targetSquare.childNodes[0].id]["parentColor"]=''

    chessPieces[bishopId]["$parentElement"]= $targetSquare
    chessPieces[bishopId]["parentColor"] = destinationTempColor


    //update at HTML element
    $targetSquare.style.backgroundColor = destinationTempColor
    $targetSquare.innerHTML=''
    $targetSquare.append($sourceSquare.childNodes[0])

    $sourceSquare.innerHTML=''

    //remove highlights of available moves with its event listeners
    bishopRemovehighlightedAreas($sourceSquare,$targetSquare)

    //remove event listener at target
    $targetSquare.removeEventListener("click" , bishopCutPiece ) 
    
    if(isPossibleCheckIfMoved(currentColor))
    {
        //update at obj
        chessPieces[$targetPiece.id]["$parentElement"]= $targetSquare
        chessPieces[$targetPiece.id]["parentColor"]=destinationTempColor

        chessPieces[bishopId]["$parentElement"]= $sourceSquare
        chessPieces[bishopId]["parentColor"] = sourceTempColor

        //update at HTML element
        $targetSquare.innerHTML=''
        $targetSquare.append($targetPiece)

        $sourceSquare.append($sourcePiece)

        alert("Warning !!! , a check can be possible")
    }
    else
    {
        bishopCheckForKing($targetSquare,targetPositionId,bishopId)

        chessPieces[ currentColor+"King" ]["isUnderCheck"]=false

        //to switch moves (black->white,white->black)
        if(bishopId.includes("black"))
            currentPlayerColor="white"
        else
            currentPlayerColor="black"
    }
    
}

function bishopMoveToTarget(eventDetails)
{
    let $sourcePosition = document.getElementById(this.position)
    let $currentBishop = document.getElementById(this.bishopId)
    let bishopId=this.bishopId
    let $targetPosition = document.getElementById(this.id)
    let currentColor = bishopId.slice(0,5)


    //remove highlight on source position
    chessPieces[bishopId]["$parentElement"].removeEventListener("mouseover",mouseover)
    chessPieces[bishopId]["$parentElement"].removeEventListener("mouseout",mouseout)

    //highlight target
    $targetPosition.addEventListener("mouseover",mouseover)
    $targetPosition.addEventListener("mouseout",mouseout)

    //move bishop , src->target
    $sourcePosition.innerHTML=''
    $targetPosition.append($currentBishop)

    //update in chessPieces obj
    chessPieces[bishopId]["$parentElement"]=$targetPosition
    chessPieces[bishopId]["parentColor"]=$targetPosition.style.backgroundColor

    //revert back bg colors
    $targetPosition.style.opacity='1'

    //remove event listeners for highlighted areas and to cut opp piece                              ***
    bishopRemovehighlightedAreas($sourcePosition,$targetPosition)


    if(isPossibleCheckIfMoved(currentColor))        //this is to check, if there is any check for its own king
    {
        //update in chessPieces obj
        chessPieces[bishopId]["$parentElement"]=$sourcePosition
        chessPieces[bishopId]["parentColor"]=$sourcePosition.style.backgroundColor

        //move bishop , target->src
        $targetPosition.innerHTML=''
        $sourcePosition.append($currentBishop)

        //highlight source
        $sourcePosition.addEventListener("mouseover",mouseover)
        $sourcePosition.addEventListener("mouseout",mouseout)

        //remove highlight on target position
        $targetPosition.removeEventListener("mouseover",mouseover)
        $targetPosition.removeEventListener("mouseout",mouseout)

        alert("Warning !!! , a check can be possible")
    }
    else
    {
        bishopCheckForKing($targetPosition,$targetPosition.id,bishopId)  //this is to check for opp king

        chessPieces[ currentColor+"King" ]["isUnderCheck"]=false 

        //to switch moves (black->white,white->black)
        if(bishopId.includes("black"))
            currentPlayerColor="white"
        else
            currentPlayerColor="black"
    }
}