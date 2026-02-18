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
const rulesBtn = document.getElementById("rulesBtn");
const scoreScreen = document.getElementById("scoreScreen");
const scoreStartBtn = document.getElementById("scoreStartBtn");
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
    scoreValue.classList.add("score-update");
    setTimeout(() => {
        scoreValue.classList.remove("score-update");
    }, 400);
};

// Кнопка правил
rulesBtn.onclick = () => {
    alert(
        "Команды по очереди берут карточки с вопросами.\n" +
        "Если команда отвечает верно — получает 1 очко.\n" +
        "Побеждает команда, которая первой наберёт выбранное количество очков."
    );
};

// Переключение экранов
function showScreen(screen) {
    [menu, scoreScreen, game, result].forEach(s => {
        s.classList.remove("visible");
        s.classList.add("hidden");
    });
    screen.classList.remove("hidden");
    screen.classList.add("visible");
}

// Переход с главного меню к выбору очков
startBtn.onclick = () => {
    showScreen(scoreScreen);
};

// Старт игры после выбора очков
scoreStartBtn.onclick = () => {
    menScore = 0;
    womenScore = 0;
    menScoreEl.innerText = menScore;
    womenScoreEl.innerText = womenScore;
    menScoreEl.classList.remove("score-update");
    womenScoreEl.classList.remove("score-update");
    currentTeam = "men";
    teamTurn.innerText = "Ход: Мужчины";
    card.innerText = "Нажмите кнопку, чтобы взять новую карточку";
    cardBtn.classList.remove("disabled");
    answerBtns.classList.add("hidden");
    showScreen(game);
};

// Взять карточку с современной анимацией
cardBtn.onclick = () => {
    if (cardBtn.classList.contains("disabled")) {
        return;
    }

    cardBtn.classList.add("disabled"); // блокируем визуально и логически
    card.classList.add("flip");
    card.classList.remove("reveal");
    
    setTimeout(() => {
        const list = questions[currentTeam];
        const q = list[Math.floor(Math.random() * list.length)];
        card.innerText = q;
        card.classList.remove("flip");
        card.classList.add("reveal");
        
        setTimeout(() => {
            answerBtns.classList.remove("hidden");
        }, 300);
    }, 400);
};

// Анимация обновления счета
function updateScore(element, value) {
    element.innerText = value;
    element.classList.add("score-update");
    setTimeout(() => {
        element.classList.remove("score-update");
    }, 400);
}

// Правильно
correctBtn.onclick = () => {
    if (currentTeam === "men") {
        menScore++;
        updateScore(menScoreEl, menScore);
    } else {
        womenScore++;
        updateScore(womenScoreEl, womenScore);
    }
    if (!checkEnd()) {
        nextTurn();
    }
};

// Нет
wrongBtn.onclick = () => {
    if (!checkEnd()) {
        nextTurn();
    }
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
        return true;
    }
    return false;
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
