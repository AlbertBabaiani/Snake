'use strict'

// Board

const board = document.getElementById('board')
const game = document.querySelector('.game')
let context = board.getContext('2d')

let blockSize = 25
let columns = 25
let rows = 25

// Board End



// Velocity

let velocityX = 0, velocityY = 0

// Velocity End


// Snake

let snakeX = 0, snakeY = 0
const snakeBody = []

// Snake End


// Food

let foodX = 0, foodY = 0

// Food End

let gameOver = false
let foodAgain = true


const game_controls = [...document.querySelector('.controls-grid').querySelectorAll('button')]


// Start game button

let key = null

function btn_code(index){
    if(index === 0){
        key = 'up'
    }
    else if(index === 1){
        key = 'right'
    }
    else if(index === 2){
        key = 'down'
    }
    else if(index === 3){
        key = 'left'
    }
    changeDirection(key)
}

const start_game_btn = document.getElementById('start_game');

start_game_btn.addEventListener('click', function(){
    speedInputs.forEach(el =>{
        el.disabled = true
    })
    
    game_controls.forEach((el, index) =>{
        el.addEventListener('click', function(){
            btn_code(index)
        })
    })
    

    document.querySelector('.accordion-button').classList.add('collapsed')
    document.getElementById('collapseOne').classList.remove('show')
    this.style.display = 'none'
    velocityY = 1
    document.addEventListener('keydown', changeDirection)

    if(score > max_score){
        max_score = score
        max_score_id.textContent = max_score
        localStorage.setItem('max_score', JSON.stringify(max_score))
    }
    score = 0
    score_id.textContent = '0'

    gameOver = false
    start()
    setTimeout(function(){

        game_process = setInterval(update, speed)
    },100)
})

// Start game button End


// Speed

const speedInputs = [...document.querySelectorAll('.form-check-input')]
let speed = 100

speedInputs.forEach((el, index) =>{
    el.addEventListener('input', function(){
        if(index === 0){
            speed = 150
            console.log('gg1')
        }
        else if(index === 1){
            speed = 100
            console.log('gg2')
        }
        else if(index === 2){
            speed = 60
            console.log('gg3')
        }
        start()
    })
})

// Speed End


// Score
const score_id = document.getElementById('score')
const max_score_id = document.getElementById('max-score')
let score = 0
let max_score = 0

if(localStorage.getItem('max_score') === null){
    max_score = 0
    localStorage.setItem('max_score', '0')
    max_score_id.textContent = max_score
}
else{
    max_score = JSON.parse(localStorage.getItem('max_score'))
    max_score_id.textContent = max_score
}

// Score End

let game_process = null

window.addEventListener('load',start)

function start(){
    game_controls.forEach(el =>{
        el.removeEventListener('click', changeDirection)
    })
    resize()
    board.width = columns * blockSize
    board.height = rows * blockSize

    game.style.width = board.width + 'px'

    snakeX = Math.floor(columns / 2) * blockSize
    snakeY = Math.floor(rows / 2) * blockSize - 2 * blockSize
    
    foodX = Math.floor(columns / 2) * blockSize
    foodY = Math.floor(rows / 2) * blockSize + 2 * blockSize

    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize)

    context.fillStyle = 'lime'
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    
}


function update(){
    if(gameOver){
        snakeBody.length = 0
        velocityX = 0
        velocityY = 0

        clearInterval(game_process)

        document.removeEventListener('keydown', changeDirection)

        speedInputs.forEach(el =>{
            el.disabled = false
        })

        return
    }


    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)


    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if(foodX === snakeX && foodY === snakeY){
        score++
        score_id.textContent = score

        snakeBody.push([foodX, foodY])
        placeFood()
    }


    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }


    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize

    context.fillStyle = 'lime'
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }


    // Game over conditions

    if(snakeX < 0 || snakeX > columns * blockSize - blockSize ||
        snakeY < 0 || snakeY > rows * blockSize - blockSize){
        gameOver = true
        start_game_btn.style.display = 'block'
    }


    for(let i = 0; i < snakeBody.length; i++){
        if(snakeBody[i][0] === snakeX && snakeY === snakeBody[i][1]){
            gameOver = true
            start_game_btn.style.display = 'block'
        }
    }

    
}



function changeDirection(e){

    if((e.code === 'ArrowLeft' || key == 'left') && velocityX === 0){
        velocityX = -1
        velocityY = 0
    }
    else if((e.code === 'ArrowRight' || key == 'right') && velocityX === 0){
        velocityX = 1
        velocityY = 0
    }
    else if((e.code === 'ArrowUp' || key == 'up') && velocityY === 0){
        velocityX = 0
        velocityY = -1
    }
    else if((e.code === 'ArrowDown' || key == 'down') && velocityY === 0){
        velocityX = 0
        velocityY = 1
    }
    key = null
}


function placeFood(){
    foodAgain = true
    while(foodAgain){
        foodAgain = false

        foodX = Math.floor(Math.random() * columns) * blockSize
        foodY = Math.floor(Math.random() * rows) * blockSize

        for(let i = 0; i < snakeBody.length; i++){
            if(snakeBody[i][0] === foodX && snakeBody[i][1] === foodX){
                foodAgain = true;
            }
        }
    }
}


window.addEventListener('resize', function(){
    resize()
    start()
})

function resize(){
    if(window.innerWidth <= 800){
        columns = 18
        rows = 18
        blockSize = 20

    }
    else{
        columns = 25
        rows = 25
        blockSize = 25
    }
}