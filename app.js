let currentTeam = "men";
let menScore = 0;
let womenScore = 0;
let maxScore = 30; // по умолчанию
const questions = {
    men: [
        "Что такое хайлайтер в косметике?",
        "Что такое кутикула?",
        "Что значит оверсайз в одежде?"
    ],
    women: [
        "Что такое крутящий момент двигателя?",
        "Что значит FPS в играх?",
        "Что делает видеокарта?"
    ]
};

// Элементы
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const game = document.getElementById("game");
const card = document.getElementById("card");
const cardBtn = document.getElementById("cardBtn");
const teamTurn = document.getElementById("teamTurn");
const answerBtns = document.getElementById("answerBtns");
const correctBtn = document.getElementById("correctBtn");
const wrongBtn = document.getElementById("wrongBtn");
const menScoreEl = document.getElementById("menScore");
const womenScoreEl = document.getElementById("womenScore");
const result = document.getElementById("result");
const winner = document.getElementById("winner");
const finalMenScore = document.getElementById("finalMenScore");
const finalWomenScore = document.getElementById("finalWomenScore");
const restartBtn = document.getElementById("restartBtn");
const scoreSlider = document.getElementById("scoreSlider");
const scoreValue = document.getElementById("scoreValue");

// Ползунок очков
scoreSlider.oninput = () => {
    maxScore = parseInt(scoreSlider.value);
    scoreValue.innerText = maxScore;
};

// Переключение экранов
function showScreen(screen) {
    [menu, game, result].forEach(s => {
        s.classList.remove("visible");
        s.classList.add("hidden");
    });
    screen.classList.remove("hidden");
    screen.classList.add("visible");
}

// Старт игры
startBtn.onclick = () => {
    menScore = 0;
    womenScore = 0;
    menScoreEl.innerText = menScore;
    womenScoreEl.innerText = womenScore;
    currentTeam = "men";
    teamTurn.innerText = "Ход: Мужчины";
    card.innerText = "Нажмите кнопку, чтобы взять новую карточку";
    cardBtn.classList.remove("disabled");
    showScreen(game);
};

// Взять карточку с 3D flip
cardBtn.onclick = () => {
    cardBtn.classList.add("disabled"); // блокируем визуально
    card.classList.add("flip");
    setTimeout(() => {
        let list = questions[currentTeam];
        let q = list[Math.floor(Math.random() * list.length)];
        card.innerText = q;
        card.classList.remove("flip");
    }, 300);
    answerBtns.classList.remove("hidden");
};

// Правильно
correctBtn.onclick = () => {
    if (currentTeam === "men") menScore++;
    else womenScore++;
    menScoreEl.innerText = menScore;
    womenScoreEl.innerText = womenScore;
    checkEnd();
    nextTurn();
};

// Нет
wrongBtn.onclick = () => {
    checkEnd();
    nextTurn();
};

// Проверка конца игры
function checkEnd() {
    if (menScore >= maxScore || womenScore >= maxScore) {
        finalMenScore.innerText = menScore;
        finalWomenScore.innerText = womenScore;
        if (menScore > womenScore) winner.innerText = "Победили мужчины!";
        else if (womenScore > menScore) winner.innerText = "Победили женщины!";
        else winner.innerText = "Ничья!";
        showScreen(result);
    }
}

// Смена команды
function nextTurn() {
    answerBtns.classList.add("hidden");
    cardBtn.classList.remove("disabled"); // снова активна
    card.innerText = "Нажмите кнопку, чтобы взять новую карточку";

    currentTeam = currentTeam === "men" ? "women" : "men";
    teamTurn.innerText = currentTeam === "men" ? "Ход: Мужчины" : "Ход: Женщины";
}

// Перезапуск игры
restartBtn.onclick = () => {
    showScreen(menu);
};
