'use strict'

const board = document.getElementById('board')

let blcokSize = 25
let rows = 25
let columns = 25
let context

let velocityX = 0, velocityY = 0

let foodX = 0, foodY = 0

// Snake

let snakeX = blcokSize * 5
let snakeY = blcokSize * 5

const snakeBody = []

// Snake End

let gameOver = false
let foodAgain


window.addEventListener('load', function(){
    board.width = blcokSize * columns
    board.height = blcokSize * rows

    context = board.getContext('2d')

    placeFood()

    document.addEventListener('keydown', changeDirection)

    setInterval(update, 1000/10)
})


function update(){
    if(gameOver){
        return
    }


    context.fillStyle = 'black'
    context.fillRect(0,0, board.width, board.height)

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blcokSize, blcokSize)

    if(foodX === snakeX && foodY === snakeY){
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }
    
    context.fillStyle = 'lime'
    snakeX += velocityX * blcokSize;
    snakeY += velocityY * blcokSize;
    context.fillRect(snakeX, snakeY, blcokSize, blcokSize)

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blcokSize, blcokSize)
    }

    console.log(snakeX, snakeY)


    //game over conditions
    if (snakeX < 0 || snakeX > rows*blcokSize - blcokSize || snakeY < 0 || snakeY > columns*blcokSize - blcokSize) {
        gameOver = true
        alert('game over')
    }
    
    
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeBody[i][0] === snakeX && snakeY === snakeBody[i][1]){
            gameOver = true
            alert('game over')
        }
    }
}


function changeDirection(e){
    setTimeout(function(){

    
    if(e.code === 'ArrowRight' && velocityX === 0){
        velocityX = 1
        velocityY = 0
    }
    else if(e.code === 'ArrowLeft' && velocityX === 0){
        velocityX = -1
        velocityY = 0
    }
    else if(e.code === 'ArrowUp' && velocityY === 0){
        velocityX = 0
        velocityY = -1
    }
    else if(e.code === 'ArrowDown' && velocityY === 0){
        velocityX = 0
        velocityY = 1
    }
    }, 10)
}

function placeFood(){
    foodAgain = true
    while(foodAgain){
        foodAgain = false

        foodX = Math.floor(Math.random() * columns) * blcokSize
        foodY = Math.floor(Math.random() * rows) * blcokSize

        for(let i = 0; i < snakeBody.length; i++){
            if(snakeBody[i][0] === foodX && snakeBody[i][1] === foodX){
                foodAgain = true;
            }
        }
    }
}