const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


//init word
let randomWord;
//init score
let score = 0;
//init time
let time = 10;

//set difficulty in local storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//focus on text on start
text.focus();

//fetching words and generate random word
const getRandomWord = async () => {
  const res = await fetch('https://random-word-api.herokuapp.com/all');
  const data = await res.json();
  randomWord = data[Math.floor(Math.random() * data.length)]
  addWordToDOM()
}

//add word to DOM
const addWordToDOM = () => {
  word.innerHTML = randomWord
}

//update Score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
}

//update Time
const updateTime = () => {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
};

//start counting down
const timeInterval = setInterval(updateTime, 1000);

//game over show on screen
const gameOver = () => {
  endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p> Your final score is ${score}</p>
    <button onclick = "location.reload()">Replay</button>
  `;
  endGameEl.style.display = 'flex'
}

//event listener

//typing
text.addEventListener('input',  (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    getRandomWord();
    updateScore();
    //clear the input
    e.target.value = '';
    
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    };
    
    updateTime();
  }
}) 
//setting buttons click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem ('difficulty',difficulty);
})

getRandomWord();