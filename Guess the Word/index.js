const inputs = document.querySelector(".inputs") // Input Field
const resetBtn = document.querySelector(".reset-btn") //lets get random word on button click
const wrongLetter = document.querySelector(".wrong-letters"),
hint = document.querySelector(".hint span") //lets show hint of the random word

const guessLeft = document.querySelector(".guess span");
const typingInput = document.querySelector(".typing-input");




let word, 
maxGuesses, 
corrects = [], 
incorrects = []; 




function randomWord(){
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)]; 
    word = randomObj.word; 
    console.log(word);
    maxGuesses = 8;
    corrects = []; 
    incorrects = [];

   
    hint.innerText = randomObj.hint; 
    // console.log(randomObj.hint)
    guessLeft.innerText = maxGuesses; 
    // console.log(maxGuesses) 
    wrongLetter.innerText = incorrects;



    let html = "";
    for (let i=0; i< word.length; i++){
        html += `<input type="text" disabled>`;
    }
    // console.log(html)
    inputs.innerHTML = html; 
}
randomWord(); 

//Getting user pressed key
//ye User ke input answer , correct answr , wrong ansswr ke liye hai
function initGame(e) {
    let key = e.target.value; 
    // console.log(key)
 


    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)){
        console.log(key);
        if(word.includes(key)){//if user letter found in the word

            for(let i = 0; i < word.length; i++){
                if(word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;  
                }
            }
        }else{ 
            maxGuesses--; //decrement of maxGuesses by 1
            incorrects.push(` ${key}`);
        }
    guessLeft.innerText = maxGuesses; 
    wrongLetter.innerText = incorrects; 
    }
    typingInput.value = "";


    setTimeout(() => {
        if(corrects.length === word.length){
            alert(`Congrats! You found the word. ${word.toUpperCase()}`);
            randomWord(); //calling random word function, so the game reset 
            
        }
        else if(maxGuesses < 1){//if user id not find all the letters
            alert("Game over! you don't have remaining guesses");
            for(let i = 0; i < word.length; i++){
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
}


resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame); 

inputs.addEventListener("click", () => typingInput.focus()); 

document.addEventListener("keydown", () => typingInput.focus());