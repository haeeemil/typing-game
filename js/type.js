// 사용 변수
const SETTING_TIME = 9;
let words = [];
let time;
let isReady = false;
let isPlaying = false;
let score = 0;
let timeInterval;

const url = "https://random-word-api.herokuapp.com/word?number=100";
const wordDisplay = document.querySelector(".word-display");
const wordInput = document.querySelector(".word-input");
const timeDisplay = document.querySelector(".time");
const scoreDisplay = document.querySelector(".score");
const button = document.querySelector(".button");

// functions
runToast = (text) => {
    const option = {
        text: text,
        duration: 3000,
        newWindow: true,
        gravitiy: 'top',
        position: 'left',
        background: 'linear-gradient(#00b09b, #96c3d)'
    }
    Toastify(option).showToast();
}

const getWords = () => {
    axios.get(url).then(res => {
        words = res.data.filter(word => word.length < 8);
        button.innerText = '게임시작';
        button.classList.remove('loading');
        isReady = true;
    }).catch(err => console.log(err));
}

const init = () => {
   time = SETTING_TIME;
   getWords();
}

const countDown = () => {
    if (time > 0) {
        time--;
    } else {
        clearInterval(timeInterval);
        isPlaying = false;
    }
    timeDisplay.innerText = time;
}

const run = () => {
    clearInterval(timeInterval);
    if(isReady === false) {
        return;
    }
    timeInterval = setInterval(countDown, 1000);
    wordInput.value = ""
    score = 0;
    time = SETTING_TIME;
    scoreDisplay.innerText = score;
    isPlaying = true;
}

const checkMatch = () => {
    if(!isPlaying) {
        return;
    }

    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        score++;
        runToast(wordDisplay.innerText);
        time = SETTING_TIME;
        wordInput.value = ""
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
    scoreDisplay.innerText = score;
}

// event handler
wordInput.addEventListener("input", checkMatch);

// getting ready
init();