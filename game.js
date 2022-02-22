let rows = [];
let numberOfRows = 2
let numberOfColumns = 2
let imgSize = 75
let firstCardClick = null;
let tempCards = [];
let numberOfMatchingPairs = 0;
let cardIdArray = [];
let matchedPairs = 0;

function startGame() {
    alert("starting");
    populateCards(); 
    matchedPairs = 0;
    resetHide();   
}

function setupGame() {
    let body = document.getElementById("body");
    let mainDiv = myCreateElement("div", "main", "centre");
    body.appendChild(mainDiv);  
    
    startGame();
    setupRows(mainDiv); 
    setColumnProperties();
    setGameArea();
}

function setupRows(mainDiv){
    for (let i = 0; i < numberOfRows; i++) {
        let row = myCreateElement("div", "rowID" + i, "row");
        mainDiv.appendChild(row);

        setupColumns(i, row);   
    } 
}

function setupColumns(rowIndex, row) {
    for (let i = 0; i < numberOfColumns; i++){
        let column = myCreateElement("div", "columnID" + i, "column");
        row.appendChild(column);  
        createImages(`${rowIndex}-${i}`, column);
    } 
}

function createImages(imageId, column) {
    let cardId = cardIdArray.pop();
    
    let cardFront = myCreateElement("img", `${imageId}-Front`);
    let imgSrc1 = "resources/image/card" + cardId + ".png";
    cardFront.src = imgSrc1;
    
    let cardBack = myCreateElement("img", `${imageId}-Back`);
    let imgSrc2 = "resources/image/cardback.png"
    cardBack.src = imgSrc2;

    column.appendChild(cardBack);
    column.appendChild(cardFront);

    let props = {cardId,cardFront, cardBack, imgSrc1};
    let card = new Card(props);    
    column.addEventListener("click", cardClicked.bind(this, card));
}

function myCreateElement(elementTag, id, classname) {    
    let element = document.createElement(elementTag);
    if(id) element.id = id;
    if(classname) element.classList.add(classname);
    return element;
}

function setColumnProperties() {
    let columnList = document.querySelectorAll(".column")
    for(let i = 0; i < columnList.length; i++){
        columnList[i].style.width = imgSize + "px";
        columnList[i].style.height = imgSize + "px";
    }
}

function setGameArea() {
    let mainArea = document.querySelector("#main")
    mainArea.style.width = numberOfColumns * (imgSize + 10) + "px";
    mainArea.style.height = numberOfRows * (imgSize + 10) + "px";
}

function cardClicked(card) {

    if(firstCardClick == null) {
        firstCardClick = card;
        card.click();
    }     
    else {
        card.click();
        card.checkIfMatch(firstCardClick.cardId);
        if(card.isMatch()) {
            card.matched();
            firstCardClick.matched();
            gameOver();            
        }
        else {
            card.hide();
            firstCardClick.hide();    
        }
        firstCardClick = null;
    } 
}

function populateCards() {
    
    let numberOfCards = numberOfRows * numberOfColumns;
    numberOfMatchingPairs = numberOfCards / 2

    for(let i = 0; i < numberOfMatchingPairs; i++){
        let cardId = popTempArray();
        cardIdArray.push(cardId);
        cardIdArray.push(cardId);        
    }
    shuffleArray(cardIdArray);
}

function getCardIdArray() {
    return [8,7,6,5,4,3,2,1];
}

function popTempArray() {
    if(tempCards.length === 0){
        tempCards = getCardIdArray();
        shuffleArray(tempCards);
    }
    return tempCards.pop();
}

function shuffleArray(arr) {
    arr.sort(()=> Math.random() - 0.5);
}

function gameOver() {
    matchedPairs ++;
    if(numberOfMatchingPairs === matchedPairs){
        alert("Game Over"); 
        startGame();        
    } 
}

function resetHide() {
    let elements = document.querySelectorAll(".hide")

    elements.forEach((element)=>{
        element.classList.remove("hide")
    })
}

class Card {
    constructor(props) {
        this.id = props.imageId || 0;
        this.cardId = props.cardId;
        this.flipped = false;
        this.front = props.cardFront;
        this.back = props.cardBack;
        this.isMatched = false;
    }
    isClicked() {
        return this.flipped;
    }
    click() {
        this.reveal();       
    }
    hide() {
        setTimeout(()=> {
            this.back.classList.remove("hide");
            this.flipped = false;
         },100)       
    }
    reveal() {
        this.flipped = true;
        this.back.classList.add("hide");
    }
    matched() {
        setTimeout(()=> {
            this.front.classList.add("hide");
         },100)
    }
    isMatch() {
        return this.isClicked() && this.isMatched;        
    }
    checkIfMatch(cardId) {
        this.isMatched = this.cardId === cardId;
    }
}