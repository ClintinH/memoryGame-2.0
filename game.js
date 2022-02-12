let rows = [];
let numberOfRows = 6
let numberOfColumns = 6
let imgSize = 75
let cardClick = null;
let tempCards = [];
let numberOfMatchingPairs = 0;
let cardIdArray = [];
let matchedPairs = 0;

function startGame(){
    window.alert("starting");
    populateCards(); 
    matchedPairs = 0;
    resetHide();   
}

function setupGame(){
    let body = document.getElementById("body");
    let mainDiv = myCreateElement("div", "main", "centre");
    body.appendChild(mainDiv);  
    
    startGame();
    setupRows(mainDiv); 
    setColumnProperties();
    setGameArea();
}

function setupRows(mainDiv){
    for (let i = 0; i < numberOfRows; i++){
        let row = myCreateElement("div", "rowID" + i, "row");
        mainDiv.appendChild(row);

        setupColumns(i, row);   
    } 
}

function setupColumns(rowIndex, row){
    for (let i = 0; i < numberOfColumns; i++){
        let column = myCreateElement("div", "columnID" + i, "column");
        row.appendChild(column);  
        createImages(`${rowIndex}-${i}`, column);
    } 
}

function createImages(imageId, column){
    let cardId = cardIdArray.pop();
    let cardFront = myCreateElement("img", `${imageId}-Front`);
    cardFront.staticId = cardId;
    cardFront.src = "/resources/image/card" + cardId + ".png";
    let cardBack = myCreateElement("img", `${imageId}-Back`);
    cardBack.src = "/resources/image/cardback.png"
    column.appendChild(cardBack);
    column.appendChild(cardFront);    
    column.addEventListener("click", cardClicked.bind(this,{cardBack, cardFront}));
}

function myCreateElement(elementTag, id, classname){    
    let element = document.createElement(elementTag);
    if(id) element.id = id;
    if(classname) element.classList.add(classname);
    return element;
}

function setColumnProperties(){
    let columnList = document.querySelectorAll(".column")
    for(let i = 0; i < columnList.length; i++){
        columnList[i].style.width = imgSize + "px";
        columnList[i].style.height = imgSize + "px";
    }
}

function setGameArea(){
    let mainArea = document.querySelector("#main")
    mainArea.style.width = numberOfColumns * (imgSize + 10) + "px";
    mainArea.style.height = numberOfRows * (imgSize + 10) + "px";
}

function cardClicked(card){
    if(cardClick != null && cardClick.cardFront.id == card.cardFront.id) return;
    
    card.cardBack.classList.add("hide")

    if(cardClick == null) cardClick = card;
    else if(cardClick.cardFront.staticId == card.cardFront.staticId){
        
        setTimeout(()=>{            
            matchedPairs++;
            cardClick.cardFront.classList.add("hide");
            card.cardFront.classList.add("hide");
            cardClick = null;            
            gameOver();            
        },250);
    }
    else{
        setTimeout(()=>{
            cardClick.cardBack.classList.remove("hide");
            card.cardBack.classList.remove("hide");
            cardClick = null;
        },500);  
    }           
}

function populateCards(){
    
    let numberOfCards = numberOfRows * numberOfColumns;
    numberOfMatchingPairs = numberOfCards / 2

    for(let i = 0; i < numberOfMatchingPairs; i++){
        let cardId = popTempArray();
        cardIdArray.push(cardId);
        cardIdArray.push(cardId);        
    }
    shuffleArray(cardIdArray);
}

function getCardIdArray(){
    return [8,7,6,5,4,3,2,1];
}

function popTempArray(){
    if(tempCards.length === 0){
        tempCards = getCardIdArray();
        shuffleArray(tempCards);
    }
    return tempCards.pop();
}

function shuffleArray(arr){
    arr.sort(()=> Math.random() - 0.5);
}

function gameOver(){
    if(numberOfMatchingPairs === matchedPairs){
        startGame();        
    } 
}

function resetHide(){
    let elements = document.querySelectorAll(".hide")

    elements.forEach((element)=>{
        element.classList.remove("hide")
    })
}