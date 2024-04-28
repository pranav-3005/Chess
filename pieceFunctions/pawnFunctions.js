// pawn obj ->
        /* 
            pieceid: {
                #    $pieceElement: <></>,                    //cur element,fixed
                #    $squareElement(position): <></>,         //parent element,dynamic
                #    parentColor: color,
                .    isFirstMoveDone : boolean
        */

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
            $pieceElement : $piece,
            $parentElement : $square,
            parentColor : $square.style.backgroundColor,
            isFirstMoveDone : false
        }

        //highlight the square
        $square.addEventListener("mouseover",mouseover)
        $square.addEventListener("mouseout",mouseout)

        //set pawn properties
        $piece.addEventListener("click",(eventDetails)=>{setPawnProperties(eventDetails,$piece.id)},{capture:true}) 
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
        parentColor : $square.style.backgroundColor,
        isFirstMoveDone : false
    }

    //highlight the square
    $square.addEventListener("mouseover",mouseover)
    $square.addEventListener("mouseout",mouseout)

    //set piece properties
    $piece.addEventListener("click",(eventDetails)=>{setPawnProperties(eventDetails,$piece.id)}) 
}

var currentMovementColour="white"

//properties ------------------------------

function setPawnProperties(eventDetails,pawnId) {

    let position=chessPieces[`${pawnId}`]['$parentElement'].id
    let col=position[0].charCodeAt(0)  //a,b,c,d,e,f,g,h
    let row= Number(position[1]) //1,2,3,4,5,6,7,8

    //to check if it is targeted by opp piece (highlight clr:grey)
    if(chessPieces[pawnId]["$parentElement"].style.backgroundColor === chessPieces[pawnId]["parentColor"] )
    {
        //check and move forward
        checkNextSquareToMove(position,pawnId)

        //cut possible opp pieces
        checkPossiblePieceToCut(position,pawnId)
    }


}

//pawn mics -----------------------


function checkNextSquareToMove(position,pawnId) {

    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    
    let nextSquare=''
    let nextNextSquare=''
    let nextSquareOpacity=''
    let direction=''


    //set variables
    if(pawnId.includes("black") )  //black
    {
        nextSquare= document.getElementById(position[0]+(row-1))
        nextNextSquare= document.getElementById(position[0]+(row-2))
        nextSquareOpacity = window.getComputedStyle(nextSquare).getPropertyValue('opacity')
        direction= "down"
    }
    else                            //white
    {
        nextSquare= document.getElementById(position[0]+(row+1))
        nextNextSquare= document.getElementById(position[0]+(row+2))
        nextSquareOpacity = window.getComputedStyle(nextSquare).getPropertyValue('opacity')
        direction= "up"
    }
    
    if(nextSquare==null)
        return

    nextSquare.pawnId=pawnId
    nextSquare.position=position
    nextSquare.nextNextSquare=nextNextSquare
    
    if(chessPieces[pawnId]["isFirstMoveDone"]==false)
    {
        nextNextSquare.pawnId=pawnId
        nextNextSquare.position=position
        nextNextSquare.nextSquare=nextSquare
    }


    //highlight movable areas and move
    if( checkValidToMove(`${nextSquare.id}`,direction) )
    {
        if(nextSquareOpacity ===  '1')
        {   
            //highlight
            nextSquare.style.opacity='0.5'

            //move to next square
            if(nextSquare.style.opacity === '0.5')
            {
                nextSquare.addEventListener('click', nextFunction )
            }
        }
        else
        {
            nextSquare.style.opacity='1'
        }

        if(!chessPieces[pawnId]["isFirstMoveDone"])
            checkNextNextSquareToMove(position,nextSquare,nextNextSquare,pawnId,direction)
    }

}

function checkNextNextSquareToMove(position,nextSquare,nextNextSquare,pawnId,direction) {
    
    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    let nextNextSquareOpacity = window.getComputedStyle(nextNextSquare).getPropertyValue('opacity')

    //highlight and move to nextNextSquare
    if( checkValidToMove( `${nextNextSquare.id}`,direction ) )
    {
        if(nextNextSquareOpacity === '1')
        {
            nextNextSquare.style.opacity='0.5'

            //move to nextNext square
            if(nextNextSquare.style.opacity === '0.5')
            {
                nextNextSquare.addEventListener('click', nextNextFunction )
            }
        }
        else
        {
            nextNextSquare.style.opacity='1'
        }
    }
}

function movePawnNextSquare(eventDetails,nextSquare,nextNextSquare,pawnId) {


    //if it contains elem or not
    if(nextSquare.childNodes.length>0)
        return

    //1.clear backgrounds
    nextSquare.style.opacity='1'
    nextNextSquare.style.opacity='1'

    //remove highlight on crnt square
    chessPieces[pawnId]["$parentElement"].removeEventListener("mouseover",mouseover)
    chessPieces[pawnId]["$parentElement"].removeEventListener("mouseout",mouseout)

    //2. move pawn element
    nextSquare.append(chessPieces[pawnId]["$pieceElement"])
    chessPieces[pawnId]["$parentElement"].innerHTML=''

    //update obj
    chessPieces[pawnId]['$parentElement']=nextSquare
    chessPieces[pawnId]['parentColor']=nextSquare.style.backgroundColor

    //higlight nextSquare
    nextSquare.addEventListener("mouseover",mouseover)
    nextSquare.addEventListener("mouseout",mouseout)

    if(!chessPieces[pawnId]["isFirstMoveDone"])
    {
        chessPieces[pawnId]["isFirstMoveDone"]=true 
        nextNextSquare.removeEventListener('click', nextNextFunction )
    }

    //after moved,remove event listeners
    nextSquare.removeEventListener('click', nextFunction )
    nextNextSquare.removeEventListener('click', nextNextFunction )
}

function movePawnNextNextSquare(eventDetails,nextSquare,nextNextSquare,pawnId) {


    //if it contains elem or not
    if(nextNextSquare.childNodes.length>0)
        return
    
    //1.clear backgrounds
    nextSquare.style.opacity='1'
    nextNextSquare.style.opacity='1'

    //remove highlight on crnt square
    console.log(chessPieces[pawnId]["$parentElement"].id)
    chessPieces[pawnId]["$parentElement"].removeEventListener("mouseover",mouseover)
    chessPieces[pawnId]["$parentElement"].removeEventListener("mouseout",mouseout)

    //2. move pawn element
    nextNextSquare.append(chessPieces[pawnId]["$pieceElement"])
    chessPieces[pawnId]["$parentElement"].innerHTML=''

    //update in obj
    chessPieces[pawnId]['$parentElement']=nextNextSquare
    chessPieces[pawnId]['parentColor']=nextNextSquare.style.backgroundColor
    
    nextNextSquare.addEventListener("mouseover",mouseover)
    nextNextSquare.addEventListener("mouseout",mouseout)

    if(!chessPieces[pawnId]["isFirstMoveDone"])
        chessPieces[pawnId]["isFirstMoveDone"]=true 

    //after moved,remove event listeners
    nextNextSquare.removeEventListener('click', nextNextFunction )
    nextSquare.removeEventListener('click', nextFunction )
}

function checkPossiblePieceToCut(position,pawnId) {
    
    
    let col=position[0].charCodeAt(0) 
    let row= Number(position[1])
    let $square= document.getElementById(position)
    let isCut=false
    

    if(pawnId.includes("black"))
    {
        
        let bottomLeft = String.fromCharCode(col-1) + (row-1)
        let bottomRight = String.fromCharCode(col+1) + (row-1)

        if(checkValidToCut("black",bottomLeft,"bottomLeft"))
        {
            let bottomLeftOriginColor= chessPieces[document.getElementById(bottomLeft).childNodes[0].id]['parentColor']

            if(document.getElementById(bottomLeft).style.backgroundColor === bottomLeftOriginColor)
            {
                //display those squares
                document.getElementById(bottomLeft).style.backgroundColor='grey'

                // console.log(document.getElementById(bottomLeft).childNodes[0])

                document.getElementById(bottomLeft).childNodes[0].removeEventListener("click",(eventDetails)=>{setPawnProperties(eventDetails,document.getElementById(bottomLeft).childNodes[0].id)}) 

                //cut opp piece *********
                let $bottomLeftPiece = document.getElementById(bottomLeft).childNodes[0]
                $bottomLeftPiece.position=position //for passing req variables
                $bottomLeftPiece.pawnId=pawnId
                $bottomLeftPiece.bottomLeft=bottomLeft
                $bottomLeftPiece.bottomRight=bottomRight

                $bottomLeftPiece.addEventListener("click",cutPieceBottomLeft,{once:true,capture:true})
                
                
            }    
            else
            {
                //display those squares
                document.getElementById(bottomLeft).style.backgroundColor= bottomLeftOriginColor
            }
                   
        }
        if(checkValidToCut("black",bottomRight,"bottomRight"))
        {
            let bottomRightOriginColor= chessPieces[document.getElementById(bottomRight).childNodes[0].id]['parentColor']

            if(document.getElementById(bottomRight).style.backgroundColor === bottomRightOriginColor)
            {
                document.getElementById(bottomRight).style.backgroundColor='grey'

                document.getElementById(bottomRight).childNodes[0].removeEventListener("click",(eventDetails)=>{setPawnProperties(eventDetails,document.getElementById(bottomRight).childNodes[0].id)}) 

                // console.log(bottomRight,"hii out")
                //cut opp piece *********

                let $bottomRightPiece= document.getElementById(bottomRight).childNodes[0]
                $bottomRightPiece.position=position
                $bottomRightPiece.pawnId=pawnId
                $bottomRightPiece.bottomRight=bottomRight
                $bottomRightPiece.bottomLeft=bottomLeft

                $bottomRightPiece.addEventListener("click", cutPieceBottomRight , {once:true,capture:true})
            }
            else
                document.getElementById(bottomRight).style.backgroundColor=bottomRightOriginColor
        }
   
    }
    else //white
    {
        let topLeft = String.fromCharCode(col-1) + (row+1)
        let topRight = String.fromCharCode(col+1) + (row+1)

        if(checkValidToCut("white",topLeft,"topLeft"))
        {
            let topLeftOriginColor= chessPieces[document.getElementById(topLeft).childNodes[0].id]['parentColor']

            if(document.getElementById(topLeft).style.backgroundColor === topLeftOriginColor)
            {
                //display those squares
                document.getElementById(topLeft).style.backgroundColor='grey'

                document.getElementById(topLeft).childNodes[0].removeEventListener("click",(eventDetails)=>{setPawnProperties(eventDetails,document.getElementById(topLeft).childNodes[0].id)}) 

                //cut opp piece *********
                let $topLeftPiece= document.getElementById(topLeft).childNodes[0]
                $topLeftPiece.position=position
                $topLeftPiece.pawnId=pawnId
                $topLeftPiece.topLeft=topLeft
                $topLeftPiece.topRight=topRight

                $topLeftPiece.addEventListener("click", cutPieceTopLeft ,{once:true,capture:true})

            }    
            else
            {
                //display those squares
                document.getElementById(topLeft).style.backgroundColor= topLeftOriginColor
            }  
        }

        if(checkValidToCut("white",topRight,"topRight"))
        {
            let topRightOriginColor= chessPieces[document.getElementById(topRight).childNodes[0].id]['parentColor']

            if(document.getElementById(topRight).style.backgroundColor === topRightOriginColor)
            {
                document.getElementById(topRight).style.backgroundColor='grey'

                document.getElementById(topRight).childNodes[0].removeEventListener("click",(eventDetails)=>{setPawnProperties(eventDetails,document.getElementById(topRight).childNodes[0].id)}) 

                //cut opp piece *********
                let $topRightPiece= document.getElementById(topRight).childNodes[0]
                $topRightPiece.position=position
                $topRightPiece.pawnId=pawnId
                $topRightPiece.topLeft=topLeft
                $topRightPiece.topRight=topRight

                $topRightPiece.addEventListener("click", cutPieceTopRight , {once:true,capture:true})

            }
            else
                document.getElementById(topRight).style.backgroundColor=topRightOriginColor
        }

    }

}



//checking the position,if valid ---------------------------
function checkValidToMove(position,direction) {

    let col=position[0].charCodeAt(0)
    let row= Number(position[1])
    console.log(direction,"inside")


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
    else if( direction==="right" )//ryt
    {
        if( col<='h'.charCodeAt(0) && document.getElementById( `${position}` ).childNodes.length<=0){
            return true
        }
        else{
            return false
        }
    }

    else if( direction==="bottomLeft" )
    {
        if( col>='a'.charCodeAt(0) && (row)>=1 && document.getElementById( `${position}` ).childNodes.length<=0){
            return true
        }
        else{
            return false
        }
    }

    else if( direction==="bottomRight" )
    {
        if( col<='h'.charCodeAt(0) && (row)>=1 && document.getElementById( `${position}` ).childNodes.length<=0){
            return true
        }
        else{
            return false
        }
    }

    else if( direction==="topLeft" )
    {
        if( col>='a'.charCodeAt(0) && (row)<=8 && document.getElementById( `${position}` ).childNodes.length<=0){
            return true
        }
        else{
            return false
        }
    }
    
    else if(direction==="topRight")
    {
        if( col<='h'.charCodeAt(0) && (row)<=8 && document.getElementById( `${position}` ).childNodes.length<=0){
            return true
        }
        else{
            return false
        }
    }
    else
        return false
}

function checkValidToCut(currentElementColor,position,direction) {

    let col=position[0].charCodeAt(0)
    let row= Number(position[1])

    

    if( direction==="down" )
    {
        if( (row)>=1 &&  document.getElementById( `${position}` ).childNodes.length>0 && !( document.getElementById(`${position}`).childNodes[0].id.includes( currentElementColor ) ) )
            return true
        else
            return false
    }
    else if( direction==="up" )
    {
        if ((row)<=8 &&  document.getElementById( `${position}` ).childNodes.length>0 && !document.getElementById(`${position}`).childNodes[0].id.includes(( currentElementColor ) ) ) {
            return true
        } else {
            return false
        }
    }
    else if( direction==="left" )
    {
        if( col>='a'.charCodeAt(0) && document.getElementById( `${position}` ).childNodes.length>0 && !document.getElementById(`${position}`).childNodes[0].id.includes(( currentElementColor ) ) ) {
            return true
        }
        else{
            return false
        }
    }
    else if( direction==="right" )//ryt
    {
        if( col<='h'.charCodeAt(0) && document.getElementById( `${position}` ).childNodes.length>0 && !document.getElementById(`${position}`).childNodes[0].id.includes(( currentElementColor ) ) ) {
            return true
        }
        else{
            return false
        }
    }

    else if( direction==="bottomLeft" )
    {
        if( col>='a'.charCodeAt(0) && (row)>=1 && document.getElementById( `${position}` ).childNodes.length>0 && !document.getElementById(`${position}`).childNodes[0].id.includes(( currentElementColor ) ) ) {
            return true
        }
        else{
            return false
        }
    }

    else if( direction==="bottomRight" )
    {
        if( col<='h'.charCodeAt(0) && (row)>=1 && document.getElementById( `${position}` ).childNodes.length>0 && !document.getElementById(`${position}`).childNodes[0].id.includes(( currentElementColor ) ) ) {            return true
        }
        else{
            return false
        }
    }

    else if( direction==="topLeft" )
    {
        if( col>='a'.charCodeAt(0) && (row)<=8 && document.getElementById( `${position}` ).childNodes.length>0 && !document.getElementById(`${position}`).childNodes[0].id.includes(( currentElementColor ) ) ) {
            return true
        }
        else{
            return false
        }
    }
    
    else if(direction==="topRight")
    {
        if( col<='h'.charCodeAt(0) && (row)<=8 && document.getElementById( `${position}` ).childNodes.length>0 && !document.getElementById(`${position}`).childNodes[0].id.includes(( currentElementColor ) ) ) {
            return true
        }
        else{
            return false
        }
    }
    else
        return false
}


//event listener functions -------------------------------------

let nextFunction=function(eventDetails){
    let nextSquare=this
    let nextNextSquare=this.nextNextSquare
    let pawnId=this.pawnId

    movePawnNextSquare(eventDetails,nextSquare,nextNextSquare,pawnId)
}

let nextNextFunction = function(eventDetails){
    let nextNextSquare=this
    let nextSquare=this.nextSquare
    let pawnId=this.pawnId

    movePawnNextNextSquare(eventDetails,nextSquare,nextNextSquare,pawnId)
}

function  cutPieceBottomLeft(eventDetails) {

    let position=this.position
    let pawnId=this.pawnId
    let bottomLeft=this.bottomLeft
    let bottomRight=this.bottomRight

    let col=position[0].charCodeAt(0) 
    let row= Number(position[1])

    eventDetails.stopPropagation()

    let destinationTempColor=chessPieces[document.getElementById(bottomLeft).childNodes[0].id]['parentColor']

    //update destination end
    chessPieces[document.getElementById(bottomLeft).childNodes[0].id]["$parentElement"]=''
    chessPieces[document.getElementById(bottomLeft).childNodes[0].id]['parentColor']=''

    document.getElementById(bottomLeft).innerHTML=''
    document.getElementById(bottomLeft).append(chessPieces[pawnId]["$pieceElement"])


    //update source end
    chessPieces[pawnId]["$parentElement"]= document.getElementById(bottomLeft)
    chessPieces[pawnId]['parentColor']=destinationTempColor

    document.getElementById(position).innerHTML=''

    //update background colors
    document.getElementById(bottomLeft).style.backgroundColor= destinationTempColor

    if(col+1<='h'.charCodeAt(0) && (row-1)>=1)
        if(document.getElementById(bottomRight).childNodes.length>0)
            document.getElementById(bottomRight).style.backgroundColor= chessPieces[document.getElementById(bottomRight).childNodes[0].id]['parentColor']

    if(!chessPieces[pawnId]["isFirstMoveDone"])
        chessPieces[pawnId]["isFirstMoveDone"]=true 

    bRevertHighlight(position)

    if(col<='h'.charCodeAt(0) && (row)>=1 && document.getElementById( `${bottomRight}` ).childNodes.length>0)   //removeEventListener of ryt bottom
        document.getElementById(bottomRight).childNodes[0].removeEventListener("click", cutPieceBottomRight , {once:true,capture:true})
}

function  cutPieceBottomRight(eventDetails) {

    let position=this.position
    let pawnId=this.pawnId
    let bottomRight=this.bottomRight
    let bottomLeft=this.bottomLeft

    let col=position[0].charCodeAt(0) 
    let row= Number(position[1])

    eventDetails.stopPropagation()

    //update destination end    
    console.log(eventDetails,bottomRight,position,pawnId,"hii")
    
    chessPieces[document.getElementById(bottomRight).childNodes[0].id]["$parentElement"]=''

    let destinationTempColor=chessPieces[document.getElementById(bottomRight).childNodes[0].id]['parentColor']

    chessPieces[document.getElementById(bottomRight).childNodes[0].id]['parentColor']=''

    document.getElementById(bottomRight).innerHTML=''
    document.getElementById(bottomRight).append(chessPieces[pawnId]["$pieceElement"])


    //update source end
    chessPieces[pawnId]["$parentElement"]= document.getElementById(bottomRight)
    chessPieces[pawnId]['parentColor']=destinationTempColor

    document.getElementById(position).innerHTML=''

    //update background colors                    
    document.getElementById(bottomRight).style.backgroundColor= destinationTempColor

    //check & revert other possible cut-piece
    if(col-1>='a'.charCodeAt(0) && (row-1)>=1)
        if(document.getElementById(bottomLeft).childNodes.length>0)
            document.getElementById(bottomLeft).style.backgroundColor= chessPieces[document.getElementById(bottomLeft).childNodes[0].id]['parentColor']


    bRevertHighlight(position)

    if(!chessPieces[pawnId]["isFirstMoveDone"])
        chessPieces[pawnId]["isFirstMoveDone"]=true 

    if(col>='a'.charCodeAt(0) && (row)>=1 && document.getElementById( `${bottomLeft}` ).childNodes.length>0)   //removeEventListener of bottom left
        document.getElementById(bottomLeft).childNodes[0].removeEventListener("click", cutPieceBottomLeft , {once:true,capture:true})    
}

function  cutPieceTopLeft(eventDetails) {

    let position=this.position
    let pawnId=this.pawnId
    let topLeft=this.topLeft
    let topRight=this.topRight

    let col=position[0].charCodeAt(0) 
    let row= Number(position[1])

    eventDetails.stopPropagation()

    //update destination end    
    console.log(eventDetails,topLeft,position,pawnId,"hii")
    
    chessPieces[document.getElementById(topLeft).childNodes[0].id]["$parentElement"]=''

    let destinationTempColor=chessPieces[document.getElementById(topLeft).childNodes[0].id]['parentColor']

    chessPieces[document.getElementById(topLeft).childNodes[0].id]['parentColor']=''

    document.getElementById(topLeft).innerHTML=''
    document.getElementById(topLeft).append(chessPieces[pawnId]["$pieceElement"])


    //update source end
    chessPieces[pawnId]["$parentElement"]= document.getElementById(topLeft)
    chessPieces[pawnId]['parentColor']=destinationTempColor

    document.getElementById(position).innerHTML=''

    //update background colors
    document.getElementById(topLeft).style.backgroundColor= destinationTempColor

    if(col+1<='h'.charCodeAt(0) && (row+1)<=8)
        if(document.getElementById(topRight).childNodes.length>0)
            document.getElementById(topRight).style.backgroundColor= chessPieces[document.getElementById(topRight).childNodes[0].id]['parentColor']

    wRevertHighlight(position)

    if(!chessPieces[pawnId]["isFirstMoveDone"])
        chessPieces[pawnId]["isFirstMoveDone"]=true 

    if(col<='h'.charCodeAt(0) && (row)<=8 && document.getElementById( `${topRight}` ).childNodes.length>0)   //removeEventListener of top ryt 
        document.getElementById(topRight).childNodes[0].removeEventListener("click", cutPieceTopRight , {once:true,capture:true})
}

function  cutPieceTopRight(eventDetails) {

    let position=this.position
    let pawnId=this.pawnId
    let topLeft=this.topLeft
    let topRight=this.topRight

    let col=position[0].charCodeAt(0) 
    let row= Number(position[1])

    eventDetails.stopPropagation()

    //update destination end    
    console.log(eventDetails,topRight,position,pawnId,"hii")
    
    chessPieces[document.getElementById(topRight).childNodes[0].id]["$parentElement"]=''

    let destinationTempColor=chessPieces[document.getElementById(topRight).childNodes[0].id]['parentColor']

    chessPieces[document.getElementById(topRight).childNodes[0].id]['parentColor']=''

    document.getElementById(topRight).innerHTML=''
    document.getElementById(topRight).append(chessPieces[pawnId]["$pieceElement"])


    //update source end
    chessPieces[pawnId]["$parentElement"]= document.getElementById(topRight)
    chessPieces[pawnId]['parentColor']=destinationTempColor

    document.getElementById(position).innerHTML=''

    //update background colors
    document.getElementById(topRight).style.backgroundColor= destinationTempColor

    if(col-1>='a'.charCodeAt(0) && (row+1)<=8 )
        if(document.getElementById(topLeft).childNodes.length>0)
            document.getElementById(topLeft).style.backgroundColor= chessPieces[document.getElementById(topLeft).childNodes[0].id]['parentColor']

    wRevertHighlight(position)

    if(!chessPieces[pawnId]["isFirstMoveDone"])
        chessPieces[pawnId]["isFirstMoveDone"]=true 

    if(col>='a'.charCodeAt(0) && (row)<=8 && document.getElementById( `${topLeft}` ).childNodes.length>0)   //removeEventListener of top left 
        document.getElementById(topLeft).childNodes[0].removeEventListener("click", cutPieceTopLeft , {once:true,capture:true})
}


function bRevertHighlight(position)
{
    let row= position[1]
    let $nextSquare= document.getElementById(`${position[0]+(row-1)}`) 
    let $nextNextSquare= document.getElementById(`${position[0]+(row-2)}`)

    if(checkValidToMove(`${position[0]+(row-1)}`,"down"))
    {
        $nextSquare.removeEventListener('click', nextFunction )
        $nextSquare.style.opacity='1'
    }

    if(checkValidToMove(`${position[0]+(row-2)}`,"down"))
    {
        $nextNextSquare.removeEventListener('click', nextNextFunction )
        $nextNextSquare.style.opacity='1'

    }
}

function wRevertHighlight(position)
{
    let row= Number(position[1])
    // console.log(`${position[0]+(row+1)}`, ":",`${position[0]+(row+2)}`)
    let $nextSquare= document.getElementById(`${position[0]+(row+1)}`) 
    let $nextNextSquare= document.getElementById(`${position[0]+(row+2)}`)

    if(checkValidToMove(`${position[0]+(row+1)}`,"up"))
    {
        $nextSquare.removeEventListener('click', nextFunction )
        $nextSquare.style.opacity='1'
    }

    if(checkValidToMove(`${position[0]+(row+2)}`,"up"))
    {
        $nextNextSquare.removeEventListener('click', nextNextFunction )
        $nextNextSquare.style.opacity='1'
    }
}