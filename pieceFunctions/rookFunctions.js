// pawn obj ->
        /* 
            pieceid: {
                #    $pieceElement: <></>,                    //cur element,fixed
                #    $parentElement: <></>,         //parent element,dynamic
                #    parentColor: color,
        */


//1.
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

    //set properties
    $piece.addEventListener("click",setRookProperties)

    
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

    //set properties
    $piece.addEventListener("click",setRookProperties)
    
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

    //set properties
    $piece.addEventListener("click",setRookProperties)

    
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

    //set properties
    $piece.addEventListener("click",setRookProperties)
        
}

//properties-------------------
//2.
function setRookProperties(eventDetails) {
    let rookId= this.id

    let position=chessPieces[`${rookId}`]['$parentElement'].id
    let col=position[0].charCodeAt(0)  //a,b,c,d,e,f,g,h
    let row= Number(position[1]) //1,2,3,4,5,6,7,8

    //to check, if currently its a white's turn or black's turn
    if(rookId.includes(currentPlayerColor))
    {
        let possibleCuts=[] // debugging purpose
        possibleCuts=rookCheckPossibleSquaresToMoveAndCut(position,rookId)
        console.log(rookId,possibleCuts) // debugging purpose
    }
}


//functions--------------------------
//3.
function rookCheckPossibleSquaresToMoveAndCut(position,rookId)
{
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let currentColor= rookId.slice(0,5)


    let oppPieces=[] //debugging purpose

    //checking in all 4 directions,a rook can move
        //top
        for(let i=row+1;i<=8;i++)
        {
            let currentPositionId = position[0]+i
            let $currentPosition = document.getElementById(currentPositionId)

            if($currentPosition.childNodes.length>0 && $currentPosition.childNodes[0].id.includes(currentColor))
                break

            if(isValidToMoveWhileCheck(currentPositionId,currentColor))
            {
                if($currentPosition.childNodes.length>0)
                {
                    if(!$currentPosition.childNodes[0].id.includes(currentColor))
                    {
                        oppPieces.push($currentPosition.childNodes[0].id)
                        
                        if($currentPosition.style.backgroundColor==="grey")
                        {
                            $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                            $currentPosition.removeEventListener("click" , rookCutPiece ) 
                        }
                        else 
                        {
                            $currentPosition.style.backgroundColor="grey"
                            
                            //2.click event to cut opp piece
                            $currentPosition.sourcePositionId=position
                            $currentPosition.rookId=rookId
                            $currentPosition.addEventListener("click" , rookCutPiece )                   // ********** 
                        }

                        
                    }
                    break
                }
                //1.highlight next moves && click event to move to the target
                rookHightLightMoves($currentPosition,position,rookId)
            }
        }

        //right
        for(let j=col+1;j<='h'.charCodeAt(0);j++)
        {
            let currentPositionId = String.fromCharCode(j)+row
            let $currentPosition = document.getElementById(currentPositionId)

            if($currentPosition.childNodes.length>0 && $currentPosition.childNodes[0].id.includes(currentColor))
                break

            if(isValidToMoveWhileCheck(currentPositionId,currentColor))
            {
                if($currentPosition.childNodes.length>0)
                {
                    if(!$currentPosition.childNodes[0].id.includes(currentColor))
                    {
                        oppPieces.push($currentPosition.childNodes[0].id)
                        
                        if($currentPosition.style.backgroundColor==="grey")
                        {
                            $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                            $currentPosition.removeEventListener("click" , rookCutPiece ) 
                        }
                        else 
                        {
                            $currentPosition.style.backgroundColor="grey"
                            
                            //2.click event to cut opp piece
                            $currentPosition.sourcePositionId=position
                            $currentPosition.rookId=rookId
                            $currentPosition.addEventListener("click" , rookCutPiece )                   // ********** 
                        }

                        
                    }
                    break
                }
                //1.highlight next moves && click event to move to the target
                rookHightLightMoves($currentPosition,position,rookId)
            }
        }

        //down
        for(let i=row-1;i>=1;i--)
        {
            let currentPositionId = position[0]+i
            let $currentPosition = document.getElementById(currentPositionId)

            if($currentPosition.childNodes.length>0 && $currentPosition.childNodes[0].id.includes(currentColor))
                break

            if(isValidToMoveWhileCheck(currentPositionId,currentColor))
            {
                if($currentPosition.childNodes.length>0)
                {
                    if(!$currentPosition.childNodes[0].id.includes(currentColor))
                    {
                        oppPieces.push($currentPosition.childNodes[0].id)
                        
                        if($currentPosition.style.backgroundColor==="grey")
                        {
                            $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                            $currentPosition.removeEventListener("click" , rookCutPiece ) 
                        }
                        else 
                        {
                            $currentPosition.style.backgroundColor="grey"
                            
                            //2.click event to cut opp piece
                            $currentPosition.sourcePositionId=position
                            $currentPosition.rookId=rookId
                            $currentPosition.addEventListener("click" , rookCutPiece )                   // ********** 
                        }

                        
                    }
                    break
                }
                //1.highlight next moves && click event to move to the target
                rookHightLightMoves($currentPosition,position,rookId)
            }
        }

        //left
        for(let j=col-1;j>='a'.charCodeAt(0);j--)
        {
            let currentPositionId = String.fromCharCode(j)+row
            let $currentPosition = document.getElementById(currentPositionId)
            
            if($currentPosition.childNodes.length>0 && $currentPosition.childNodes[0].id.includes(currentColor))
                break

            if(isValidToMoveWhileCheck(currentPositionId,currentColor))
            {
                if($currentPosition.childNodes.length>0)
                {
                    if(!$currentPosition.childNodes[0].id.includes(currentColor))
                    {
                        oppPieces.push($currentPosition.childNodes[0].id)
                        
                        if($currentPosition.style.backgroundColor==="grey")
                        {
                            $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                            $currentPosition.removeEventListener("click" , rookCutPiece ) 
                        }
                        else 
                        {
                            $currentPosition.style.backgroundColor="grey"
                            
                            //2.click event to cut opp piece
                            $currentPosition.sourcePositionId=position
                            $currentPosition.rookId=rookId
                            $currentPosition.addEventListener("click" , rookCutPiece )                   // ********** 
                        }

                        
                    }
                    break
                }
                //1.highlight next moves && click event to move to the target
                rookHightLightMoves($currentPosition,position,rookId)
            }
        }

    // console.log(oppPieces)
    return oppPieces
}
//4.1
function rookHightLightMoves($currentPosition,position,rookId)
{
    let currentOpacity= window.getComputedStyle($currentPosition).getPropertyValue('opacity')

    if( currentOpacity == '1') //highlight
    {
        $currentPosition.style.opacity= highlightMovesOpacity

        $currentPosition.position=position //set vars to access during event
        $currentPosition.rookId=rookId

        $currentPosition.addEventListener("click",rookMoveToTarget)
    }
    else   //remove move event and bg clr, while toggling
    {
        $currentPosition.style.opacity='1'
        //remove event listener for rookMoveToTarget
        $currentPosition.removeEventListener("click",rookMoveToTarget)
    }
    
}
//5
function rookRemovehighlightedAreas($sourcePosition,$targetPosition) {

    let sourcePositionId=$sourcePosition.id
    let targetPositionId=$targetPosition.id


    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //target location
    $targetPosition.removeEventListener("click",rookMoveToTarget)

    //go in all directions
    //top
    for(let i=row+1 ; i<=8 ; i++)
    {
        let $currentSquare = document.getElementById(sourcePositionId[0] + i)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[oppPieceId]["parentColor"]
                $currentSquare.removeEventListener("click" , rookCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",rookMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //right
    for(let i=col+1 ; i<='h'.charCodeAt(0) ; i++)
    {
        let $currentSquare = document.getElementById( String.fromCharCode(i) + row )

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id
                                
                $currentSquare.style.backgroundColor = chessPieces[ oppPieceId ]["parentColor"]
                $currentSquare.removeEventListener("click" , rookCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",rookMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //down
    for(let i=row-1 ; i>=1 ; i--)
    {
        let $currentSquare = document.getElementById(sourcePositionId[0] + i)

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id
                                
                $currentSquare.style.backgroundColor = chessPieces[ oppPieceId ]["parentColor"]
                $currentSquare.removeEventListener("click" , rookCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",rookMoveToTarget)
        $currentSquare.style.opacity='1'
    }

    //left
    for(let i=col-1 ; i>='a'.charCodeAt(0) ; i--)
    {
        let $currentSquare = document.getElementById( String.fromCharCode(i) + row )

        if($currentSquare.childNodes.length>0 && $currentSquare.id!==targetPositionId)
        {
            //remove event listener for cur opp piece                                   ***
            if($currentSquare.style.backgroundColor==='grey')
            {
                let oppPieceId = $currentSquare.childNodes[0].id

                $currentSquare.style.backgroundColor = chessPieces[ oppPieceId ]["parentColor"]
                $currentSquare.removeEventListener("click" , rookCutPiece ) 
            }

            break
        }

        $currentSquare.removeEventListener("click",rookMoveToTarget)
        $currentSquare.style.opacity='1'
    }
    
}

function rookCheckForKing($currentSquare,position,rookId)
{
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let currentColor= rookId.slice(0,5)

    //checking all 4 diagonals to move or cut
    let $currentPosition = ''

    //top
    for(let i=row+1;i<=8;i++)
    {
        $currentPosition = document.getElementById(String.fromCharCode(col) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            if($currentPosition.childNodes.length>0)
                break
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,rookId,"top")
        }
        else if($currentPosition.childNodes.length>0)
            break

    }

    //right
    for(let j=col+1;j<='h'.charCodeAt(0);j++)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (row))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,rookId,"right")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //bottom
    for(let i=row-1;i>=1;i--)
    {
        $currentPosition = document.getElementById(String.fromCharCode(col) + (i))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,rookId,"bottom")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }

    //left
    for(let j=col-1;j>='a'.charCodeAt(0);j--)
    {
        $currentPosition = document.getElementById(String.fromCharCode(j) + (row))
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("King"))
        {
            checkFunction($currentPosition.childNodes[0].id.slice(0,5),$currentPosition.id,rookId,"left")
        }
        else if($currentPosition.childNodes.length>0)
            break
    }
}

//eventListener functions -------------------------------
//4.1.1
function rookMoveToTarget(eventDetails)
{
    let $sourcePosition = document.getElementById(this.position)
    let $currentRook = document.getElementById(this.rookId)
    let rookId=this.rookId
    let $targetPosition = document.getElementById(this.id)
    let currentColor = rookId.slice(0,5)

    //remove highlight on source position
    chessPieces[rookId]["$parentElement"].removeEventListener("mouseover",mouseover)
    chessPieces[rookId]["$parentElement"].removeEventListener("mouseout",mouseout)

    //highlight target
    $targetPosition.addEventListener("mouseover",mouseover)
    $targetPosition.addEventListener("mouseout",mouseout)

    //move rook , src->target
    $sourcePosition.innerHTML=''
    $targetPosition.append($currentRook)

    //update in chessPieces obj
    chessPieces[rookId]["$parentElement"]=$targetPosition
    chessPieces[rookId]["parentColor"]=$targetPosition.style.backgroundColor

    //revert back bg colors
    $targetPosition.style.opacity='1'

    //remove event listeners for highlighted areas and to cut opp piece                              ***
    rookRemovehighlightedAreas($sourcePosition,$targetPosition)

    if(isPossibleCheckIfMoved(currentColor))
    {
        //update in chessPieces obj
        chessPieces[rookId]["$parentElement"]=$sourcePosition
        chessPieces[rookId]["parentColor"]=$sourcePosition.style.backgroundColor

        //move bishop , target->src
        $targetPosition.innerHTML=''
        $sourcePosition.append($currentRook)

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
        rookCheckForKing($targetPosition , $targetPosition.id , rookId)
    
        chessPieces[ currentColor+"King" ]["isUnderCheck"]=false
    
        //to switch moves (black->white,white->black)
        if(rookId.includes("black"))
            currentPlayerColor="white"
        else
            currentPlayerColor="black"
    }
}
//4.2
function rookCutPiece(eventDetails)   
{   
    let sourcePositionId = this.sourcePositionId
    let targetPositionId = this.id
    let $sourceSquare = document.getElementById(sourcePositionId)
    let $targetSquare = document.getElementById(targetPositionId)
    let rookId = $sourceSquare.childNodes[0].id
    let $currentRook = $sourceSquare.childNodes[0]
    let $targetPiece = $targetSquare.childNodes[0]
    let currentColor = rookId.slice(0,5)

    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //update at obj
    let destinationTempColor= chessPieces[ $targetSquare.childNodes[0].id ]["parentColor"]
    let sourceTempColor= chessPieces[ $sourceSquare.childNodes[0].id ]["parentColor"]

    chessPieces[$targetSquare.childNodes[0].id]["$parentElement"]=''
    chessPieces[$targetSquare.childNodes[0].id]["parentColor"]=''

    chessPieces[rookId]["$parentElement"]= $targetSquare
    chessPieces[rookId]["parentColor"] = destinationTempColor


    //update at HTML element
    $targetSquare.style.backgroundColor = destinationTempColor
    $targetSquare.innerHTML=''
    $targetSquare.append($sourceSquare.childNodes[0])

    $sourceSquare.innerHTML=''

    //remove highlights of available moves with its event listeners
    rookRemovehighlightedAreas($sourceSquare,$targetSquare)

    //remove event listener at target
    $targetSquare.removeEventListener("click" , rookCutPiece ) 
    
    if(isPossibleCheckIfMoved(currentColor))
    {
        //update at obj
        chessPieces[$targetPiece.id]["$parentElement"]= $targetSquare
        chessPieces[$targetPiece.id]["parentColor"]=destinationTempColor

        chessPieces[rookId]["$parentElement"]= $sourceSquare
        chessPieces[rookId]["parentColor"] = sourceTempColor

        //update at HTML element
        $targetSquare.innerHTML=''
        $targetSquare.append($targetPiece)

        $sourceSquare.append($currentRook)

        alert("Warning !!! , a check can be possible")
 
    }
    else
    {
        rookCheckForKing($targetSquare , targetPositionId , rookId)
    
        chessPieces[ currentColor+"King" ]["isUnderCheck"]=false
    
        //to switch moves (black->white,white->black)
        if(rookId.includes("black"))
            currentPlayerColor="white"
        else
            currentPlayerColor="black"
    }
    
}
