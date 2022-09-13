const cardArray = [{
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },

];
cardArray.sort(() => 0.5 - Math.random());
const grid = document.querySelector('#grid');
const result = document.querySelector('#result');
let modal = document.querySelector('.modal');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.append(card);
    }
}

createBoard();

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length == 2) {
        setTimeout(checkMatch, 500)
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    if (optionOneId == optionTwoId) {
        modal.classList.add('showOn');
        modal.textContent = 'You have clicked the same image!';
        setTimeout(() => {
            modal.classList.remove('showOn');
        }, 1000)
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }
    if (cardsChosen[0] == cardsChosen[1] && optionOneId !== optionTwoId) {
        modal.classList.add('showOn');
        modal.textContent = 'You found a match:)';
        setTimeout(() => {
            modal.classList.remove('showOn');
        }, 1000)
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    }
    if (cardsChosen[0] !== cardsChosen[1] && optionOneId !== optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        modal.classList.add('showOn');
        modal.textContent = 'Sorry, try again:(';
        setTimeout(() => {
            modal.classList.remove('showOn');
        }, 1000)
    };
    result.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];
    if (cardsWon.length == cardArray.length / 2) {
        grid.style.outline = 'none';
        result.innerHTML = `Congratulations, you found them all! <button class="newGame">Start new game</button>`;
        document.querySelector('.newGame').addEventListener('click', () => {
            location.reload();
        })
    }
}