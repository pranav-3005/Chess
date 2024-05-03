// king obj ->
        /* 
            pieceid: {
                #    $pieceElement: <></>,                    //cur element,fixed
                #    $parentElement: <></>,         //parent element,dynamic
                #    parentColor: color,
                #    isUnderCheck: false
        */

function setKings() 
{
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
        parentColor : $square.style.backgroundColor,
        isUnderCheck: false
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)

    //set properties
    $piece.addEventListener("click",setKingProperties)
 

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
        parentColor : $square.style.backgroundColor,
        isUnderCheck: false
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)

    //set properties
    $piece.addEventListener("click",setKingProperties)
    
}

//properties --------------------
function setKingProperties()
{
    let kingId = this.id

    let position=chessPieces[`${kingId}`]['$parentElement'].id
    let col=position[0].charCodeAt(0)  //a,b,c,d,e,f,g,h
    let row= Number(position[1]) //1,2,3,4,5,6,7,8

    //to check player's turn
    if(kingId.includes(currentPlayerColor))
    {
        let possibleCuts = [] // debugging purpose
        possibleCuts = kingPossibleSquaresToMoveAndCut(position,kingId)
        console.log(kingId,possibleCuts) // debugging purpose
    }
}


//functions ------------------------

function kingPossibleSquaresToMoveAndCut(position,kingId)
{
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let currentColor= kingId.slice(0,5)

    let oppPieces=[] //debugging purpose

    //checking all 8 position to move or cut
    let currentPositionId = ''
    let $currentPosition = ''

    //top
    if(row+1<=8 && !(checkPositionIftargeted( currentColor, String.fromCharCode(col)+(row+1))) )
    {
        currentPositionId =  String.fromCharCode(col) + (row+1)
        $currentPosition = document.getElementById(currentPositionId)

        kingMoves($currentPosition,currentColor,oppPieces,position,kingId)

    }

    //top right
    if(row+1<=8 && col+1<='h'.charCodeAt(0) && !(checkPositionIftargeted( currentColor, String.fromCharCode(col+1)+(row+1))))
    {
        currentPositionId =  String.fromCharCode(col+1) + (row+1)
        $currentPosition = document.getElementById(currentPositionId)

        kingMoves($currentPosition,currentColor,oppPieces,position,kingId)

    }

    //right
    if(col+1<='h'.charCodeAt(0) && !(checkPositionIftargeted( currentColor, String.fromCharCode(col+1)+(row))))
    {
        currentPositionId =  String.fromCharCode(col+1) + (row)
        $currentPosition = document.getElementById(currentPositionId)

        kingMoves($currentPosition,currentColor,oppPieces,position,kingId)

    }

    //bottom ryt
    if(row-1>=1 && col+1<='h'.charCodeAt(0) && !(checkPositionIftargeted( currentColor, String.fromCharCode(col+1)+(row-1))))
    {
        currentPositionId =  String.fromCharCode(col+1) + (row-1)
        $currentPosition = document.getElementById(currentPositionId)

        kingMoves($currentPosition,currentColor,oppPieces,position,kingId)

    }

    //bottom
    if(row-1>=1 && !(checkPositionIftargeted( currentColor, String.fromCharCode(col)+(row-1))))
    {
        currentPositionId =  String.fromCharCode(col) + (row-1)
        $currentPosition = document.getElementById(currentPositionId)

        kingMoves($currentPosition,currentColor,oppPieces,position,kingId)

    }

    //bottom left
    if(row-1>=1 && col-1>='a'.charCodeAt(0) && !(checkPositionIftargeted( currentColor, String.fromCharCode(col-1)+(row-1))))
    {
        currentPositionId =  String.fromCharCode(col-1) + (row-1)
        $currentPosition = document.getElementById(currentPositionId)

        kingMoves($currentPosition,currentColor,oppPieces,position,kingId)

    }

    //left
    if(col-1>='a'.charCodeAt(0) && !(checkPositionIftargeted( currentColor, String.fromCharCode(col-1)+(row))))
    {
        currentPositionId =  String.fromCharCode(col-1) + (row)
        $currentPosition = document.getElementById(currentPositionId)

        kingMoves($currentPosition,currentColor,oppPieces,position,kingId)

    }

    //top left
    if(row+1<=8 && col-1>='a'.charCodeAt(0) && !(checkPositionIftargeted( currentColor, String.fromCharCode(col-1)+(row+1))))
    {
        currentPositionId =  String.fromCharCode(col-1) + (row+1)
        $currentPosition = document.getElementById(currentPositionId)

        kingMoves($currentPosition,currentColor,oppPieces,position,kingId)

    }
}

function kingMoves($currentPosition,currentColor,oppPieces,position,kingId)
{
    if($currentPosition.childNodes.length>0 ) //cut
    {
        if(!$currentPosition.childNodes[0].id.includes(currentColor))//opp piece
        {
            oppPieces.push($currentPosition.childNodes[0].id)
            
            if($currentPosition.style.backgroundColor==="grey")
            {
                $currentPosition.style.backgroundColor=  chessPieces[$currentPosition.childNodes[0].id]["parentColor"]
                $currentPosition.removeEventListener("click" , kingCutPiece ) 
            }
            else 
            {
                $currentPosition.style.backgroundColor="grey"
                
                //2.click event to cut opp piece
                $currentPosition.sourcePositionId=position
                $currentPosition.kingId=kingId
                $currentPosition.addEventListener("click" , kingCutPiece )                   // ********** 
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
            $currentPosition.kingId=kingId

            $currentPosition.addEventListener("click",kingMoveToTarget)
        }
        else   //remove move event and bg clr, while toggling
        {
            $currentPosition.style.opacity='1'

            //remove event listener for rookMoveToTarget
            $currentPosition.removeEventListener("click",kingMoveToTarget)
        }
    }
}

function kingRemovehighlightedAreas($sourcePosition,$targetPosition)
{
    let sourcePositionId=$sourcePosition.id
    let targetPositionId=$targetPosition.id


    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //check all the 8 positions
    let $currentSquare= ''

    //top
    if(row+1<=8)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col) + (row+1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",kingCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",kingMoveToTarget)
            $currentSquare.style.opacity='1'
        }

    }

    //top right
    if(row+1<=8 && col+1<='h'.charCodeAt(0))
    {
        $currentSquare = document.getElementById( String.fromCharCode(col+1) + (row+1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",kingCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",kingMoveToTarget)
            $currentSquare.style.opacity='1'
        }

    }

    //right
    if(col+1<='h'.charCodeAt(0))
    {
        $currentSquare = document.getElementById( String.fromCharCode(col+1) + (row) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",kingCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",kingMoveToTarget)
            $currentSquare.style.opacity='1'
        }

    }

    //bottom ryt
    if(row-1>=1 && col+1<='h'.charCodeAt(0))
    {
        $currentSquare = document.getElementById( String.fromCharCode(col+1) + (row-1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",kingCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",kingMoveToTarget)
            $currentSquare.style.opacity='1'
        }

    }

    //bottom
    if(row-1>=1)
    {
        $currentSquare = document.getElementById( String.fromCharCode(col) + (row-1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",kingCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",kingMoveToTarget)
            $currentSquare.style.opacity='1'
        }

    }

    //bottom left
    if(row-1>=1 && col-1>='a'.charCodeAt(0))
    {
        $currentSquare = document.getElementById( String.fromCharCode(col-1) + (row-1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",kingCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",kingMoveToTarget)
            $currentSquare.style.opacity='1'
        }

    }

    //left
    if(col-1>='a'.charCodeAt(0))
    {
        $currentSquare = document.getElementById( String.fromCharCode(col-1) + (row) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",kingCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",kingMoveToTarget)
            $currentSquare.style.opacity='1'
        }

    }

    //top left
    if(row+1<=8 && col-1>='a'.charCodeAt(0))
    {
        $currentSquare = document.getElementById( String.fromCharCode(col-1) + (row+1) )
        
        if($currentSquare.style.backgroundColor==='grey')
        {
            $currentSquare.style.backgroundColor = chessPieces[ $currentSquare.childNodes[0].id ]["parentColor"]
            $currentSquare.removeEventListener("click",kingCutPiece)
        }
        else
        {
            $currentSquare.removeEventListener("click",kingMoveToTarget)
            $currentSquare.style.opacity='1'
        }

    }

}

function checkPositionIftargeted( currentColor, targetPosition )
{
    let col=targetPosition[0].charCodeAt(0)
    let row= Number(targetPosition[1])

    let currentPositionId=''
    let $currentPosition =''

    //check if knights present
    if( checkForKnights(currentPositionId,$currentPosition,row,col,currentColor) )
        return true

    //check for pawn,king,bishop,rook,queen with queen's movements
    if( checkForPawnOrKingOrBishopOrRookOrQueen(currentPositionId,$currentPosition,row,col,currentColor) )
        return true

}

function checkForKnights(currentPositionId,$currentPosition,row,col,currentColor)
{
    //topLeft12  [row+1][col-2]
    if(col-2>='a'.charCodeAt(0) && row+1<=8)
    {
        currentPositionId =  String.fromCharCode(col-2) + (row+1)
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("Knight")) //k in caps
        {
            return true
        }
    }

    //topLeft21 [row+2][col-1]
    if(col-1>='a'.charCodeAt(0) && row+2<=8)
    {
        currentPositionId =  String.fromCharCode(col-1) + (row+2)
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("Knight")) //k in caps
        {
            return true
        }
    }

    //topRight12 [row+1][col+2]
    if(col+2<='h'.charCodeAt(0) && row+1<=8)
    {
        currentPositionId =  String.fromCharCode(col+2) + (row+1)
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("Knight")) //k in caps
        {
            return true
        }
    }

    //topRight21 [row+2][col+1]
    if(col+1<='h'.charCodeAt(0) && row+2<=8)
    {
        currentPositionId =  String.fromCharCode(col+1) + (row+2)
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("Knight")) //k in caps
        {
            return true
        }
    }

    //bottomLeft12 [row-1][col-2]
    if(col-2>='a'.charCodeAt(0) && row-1>=1)
    {
        currentPositionId =  String.fromCharCode(col-2) + (row-1)
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("Knight")) //k in caps
        {
            return true
        }
    }

    //bottomLeft21 [row-2][col-1]
    if(col-1>='a'.charCodeAt(0) && row-2>=1)
    {
        currentPositionId =  String.fromCharCode(col-1) + (row-2)
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("Knight")) //k in caps
        {
            return true
        }
    }

    //bottomRight12 [row-1][col+2]
    if(col+2<='h'.charCodeAt(0) && row-1>=1)
    {
        currentPositionId =  String.fromCharCode(col+2) + (row-1)
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("Knight")) //k in caps
        {
            return true
        }
    }

    //bottomRight21 [row-2][col+1]
    if(col+1<='h'.charCodeAt(0) && row-2>=1)
    {
        currentPositionId =  String.fromCharCode(col+1) + (row-2)
        $currentPosition = document.getElementById(currentPositionId)

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && $currentPosition.childNodes[0].id.includes("Knight")) //k in caps
        {
            return true
        }
    }

    return false
}

function checkForPawnOrKingOrBishopOrRookOrQueen(currentPositionId,$currentPosition,row,col,currentColor)
{
    //top
    for(let i=row+1;i<=8;i++)
    {
        currentPositionId = String.fromCharCode(col) + i
        $currentPosition = document.getElementById(currentPositionId)

        //if king
        if(i===row+1)
        {
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) &&  $currentPosition.childNodes[0].id.includes("King") )
            {
                return true
            }
        }

        if($currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Rook") || $currentPosition.childNodes[0].id.includes("Queen")) )
        {
            return true
        }
        //if an un-harmful piece block harmful piece or just the un-harmful piece present
        else if($currentPosition.childNodes.length>0)
            break
    }

    //top right
    for(let i=row+1,j=col+1 ; i<=8 && j<='h'.charCodeAt(0) ; i++,j++)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if(i===row+1 && j===col+1 && currentColor==="white")
        {
            //for white,if black pawn or king present
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Pawn") || $currentPosition.childNodes[0].id.includes("King")) )
            {
                return true
            }
        }

        if(i===row+1 && j===col+1 && currentColor==="black")
        {
            //for black,if white king present
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) &&  $currentPosition.childNodes[0].id.includes("King") )
            {
                return true
            }
        }

        //if bishop or queen
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Bishop") || $currentPosition.childNodes[0].id.includes("Queen")) )
        {
            return true
        }
        //if an un-harmful piece block harmful piece or just the un-harmful piece present
        else if($currentPosition.childNodes.length>0)
            break
        
    }

    //right
    for(let j=col+1; j<='h'.charCodeAt(0) ; j++)
    {
        currentPositionId = String.fromCharCode(j) + row
        $currentPosition = document.getElementById(currentPositionId)

        //if king
        if(j===col+1)
        {
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) &&  $currentPosition.childNodes[0].id.includes("King") )
            {
                return true
            }
        }

        //if rook or queen
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Rook") || $currentPosition.childNodes[0].id.includes("Queen")) )
        {
            return true
        }
        //if an un-harmful piece block harmful piece or just the un-harmful piece present
        else if($currentPosition.childNodes.length>0)
            break
    }

    //bottom right
    for(let i=row-1,j=col+1; i>=1 && j<='h'.charCodeAt(0) ; i--,j++)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if(i==row-1 && j==col+1 && currentColor==="black")
        {
            //for black,if white pawn or king present
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Pawn") || $currentPosition.childNodes[0].id.includes("King")) )
            {
                return true
            }
        }

        if(i==row-1 && j==col+1 && currentColor==="white")
        {
            //for white,if black king present
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) &&  $currentPosition.childNodes[0].id.includes("King") )
            {
                return true
            }
        }

        //if bishop or queen
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Bishop") || $currentPosition.childNodes[0].id.includes("Queen")) )
        {
            return true
        }
        //if an un-harmful piece block harmful piece or just the un-harmful piece present
        else if($currentPosition.childNodes.length>0)
            break

    }

    //bottom
    for(let i=row-1 ; i>=1 ;i--)
    {
        currentPositionId = String.fromCharCode(col) + i
        $currentPosition = document.getElementById(currentPositionId)

        //if king
        if(i===row-1)
        {
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) &&  $currentPosition.childNodes[0].id.includes("King") )
            {
                return true
            }
        }

        //if rook or queen
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Rook") || $currentPosition.childNodes[0].id.includes("Queen")) )
        {
            return true
        }
        //if an un-harmful piece block harmful piece or just the un-harmful piece present
        else if($currentPosition.childNodes.length>0)
            break
        
    }

    //bottom left
    for(let i=row-1,j=col-1 ;i>=1 && j>='a'.charCodeAt(0) ; i--,j--)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if(i==row-1 && j==col-1 && currentColor==="black")
        {
            //for black,if white pawn or king present
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Pawn") || $currentPosition.childNodes[0].id.includes("King")) )
            {
                return true
            }
        }

        if(i==row-1 && j==col-1 && currentColor==="white")
        {
            //for white,if black king present
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) &&  $currentPosition.childNodes[0].id.includes("King") )
            {
                return true
            }
        }

        //if bishop or queen
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Bishop") || $currentPosition.childNodes[0].id.includes("Queen")) )
        {
            return true
        }
        //if an un-harmful piece block harmful piece or just the un-harmful piece present
        else if($currentPosition.childNodes.length>0)
            break
        
    }

    //left
    for(let j=col-1 ; j>='a'.charCodeAt(0) ; j--)
    {
        currentPositionId = String.fromCharCode(j) + row
        $currentPosition = document.getElementById(currentPositionId)

        //if king
        if(j===col-1)
        {
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) &&  $currentPosition.childNodes[0].id.includes("King") )
            {
                return true
            }
        }

        //if rook or queen
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Rook") || $currentPosition.childNodes[0].id.includes("Queen")) )
        {
            return true
        }
        //if an un-harmful piece block harmful piece or just the un-harmful piece present
        else if($currentPosition.childNodes.length>0)
            break
    }

    //top left
    for(let i=row+1,j=col-1 ; i<=8 && j>='a'.charCodeAt(0) ; i++,j--)
    {
        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        currentPositionId = String.fromCharCode(j) + i
        $currentPosition = document.getElementById(currentPositionId)

        if(i===row+1 && j===col-1 && currentColor==="white")
        {
            //for white,if black pawn or king present
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Pawn") || $currentPosition.childNodes[0].id.includes("King")) )
            {
                return true
            }
        }

        if(i===row+1 && j===col-1 && currentColor==="black")
        {
            //for black,if white king present
            if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) &&  $currentPosition.childNodes[0].id.includes("King") )
            {
                return true
            }
        }

        //if bishop or queen
        if( $currentPosition.childNodes.length>0 && !($currentPosition.childNodes[0].id.includes(currentColor)) && ($currentPosition.childNodes[0].id.includes("Bishop") || $currentPosition.childNodes[0].id.includes("Queen")) )
        {
            return true
        }
        //if an un-harmful piece block harmful piece or just the un-harmful piece present
        else if($currentPosition.childNodes.length>0)
            break
    }
}

//event listener functions

function kingCutPiece()
{
    let sourcePositionId = this.sourcePositionId
    let targetPositionId = this.id  //this -> target element
    let $sourceSquare = document.getElementById(sourcePositionId)
    let $targetSquare = document.getElementById(targetPositionId)
    let kingId = $sourceSquare.childNodes[0].id

    let col=sourcePositionId[0].charCodeAt(0)
    let row= Number(sourcePositionId[1])

    //update at obj
    let destinationTempColor= chessPieces[ $targetSquare.childNodes[0].id ]["parentColor"]
    chessPieces[$targetSquare.childNodes[0].id]["$parentElement"]=''
    chessPieces[$targetSquare.childNodes[0].id]["parentColor"]=''

    chessPieces[kingId]["$parentElement"]= $targetSquare
    chessPieces[kingId]["parentColor"] = destinationTempColor

    //update at HTML element
    $targetSquare.style.backgroundColor = destinationTempColor
    $targetSquare.innerHTML=''
    $targetSquare.append($sourceSquare.childNodes[0])

    $sourceSquare.innerHTML=''

    //remove highlights of available moves with its event listeners 
    kingRemovehighlightedAreas($sourceSquare,$targetSquare)

    //remove event listener at target
    $targetSquare.removeEventListener("click" , kingCutPiece )
   
    //to switch moves (black->white,white->black)
    if(kingId.includes("black"))
        currentPlayerColor="white"
    else
        currentPlayerColor="black"
}

function kingMoveToTarget()
{
    let $sourcePosition = document.getElementById(this.position)
    let $currentKing = document.getElementById(this.kingId)
    let kingId=this.kingId
    let $targetPosition = document.getElementById(this.id)

    //remove highlight on source position
    chessPieces[kingId]["$parentElement"].removeEventListener("mouseover",mouseover)
    chessPieces[kingId]["$parentElement"].removeEventListener("mouseout",mouseout)

    //highlight target
    $targetPosition.addEventListener("mouseover",mouseover)
    $targetPosition.addEventListener("mouseout",mouseout)

    //move king , src->target
    $sourcePosition.innerHTML=''
    $targetPosition.append($currentKing)

    //update in chessPieces obj
    chessPieces[kingId]["$parentElement"]=$targetPosition
    chessPieces[kingId]["parentColor"]=$targetPosition.style.backgroundColor

    //revert back bg colors
    $targetPosition.style.opacity='1'

    //remove event listeners for highlighted areas and to cut opp piece                              ***
    kingRemovehighlightedAreas($sourcePosition,$targetPosition)

    //to switch moves (black->white,white->black)
    if(kingId.includes("black"))
        currentPlayerColor="white"
    else
        currentPlayerColor="black"
}