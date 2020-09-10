//Summoning Cuby \[T]/
const cuby = $('div.cuby');

//Reseting positions
let posTop = 0;
let posLeft = 0;

//New player enters the game
let player1 = prompt('Name of player 1 using the mouse :')
let player2 = prompt('Name of player 2 using the keyboard :')

$('.player1').eq(0).html(player1)
$('.player2').eq(0).html(player2)


// Setting up an event for each keyboard--arrow input
// Idea found on stackoverflow : https://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
//Keydown triggers the event as you press a key
$('body').keydown(function patrick(e) {
    //which allows to find the keyCode of the key that triggered the event
    switch (e.which) {
        case 39:
            //right key
            //Cuby will move 50 px
            posLeft += 50;
            //Goes to the left border when hitting this value;
            if (posLeft == 900) {
                posLeft = 0;
            };
            cuby.css('left', posLeft + 'px');
            break;
        case 37:
            //left key
            // Same idea, just using sustracting instead of adding
            posLeft -= 50;
            if (posLeft == -50) {
                posLeft = 850;
            };
            cuby.css('left', posLeft + 'px');
            break;
        case 38:
            //up key
            posTop -= 50;
            if (posTop == -50) {
                posTop = 850;
            };
            cuby.css('top', posTop + 'px');
            break;
        case 40:
            // down key
            posTop += 50;
            if (posTop == 900) {
                posTop = 0;
            };
            cuby.css('top', posTop + 'px');
            break;
        default: return;
    }
})

//Initializing scores
let scorePlayer1 = 0;
let scorePlayer2 = 0;

//Cuby changes when you click on it
cuby.on('click', function keyboard() {
    //Cuby changes shape when clicked on
    $('.cuby').addClass('mouse');
    //Player 1 gets a point
    scorePlayer1++;
    $('.player1').eq(1).html(scorePlayer1);

    alert(player1 + ' won this round, press Restart to play another game !');
    //This removes any event of the body, once the click is triggered, including the timer
    clearInterval(timer);
    $('.timer').fadeOut('slow');
    //Stop cuby from moving
    cuby.unbind();
})

//Timer
let sec = 15
//Function will be executed every 1000ms
let timer = setInterval(function () {

    countdown = $('.timer');
    countdown.text(sec--);
    //when countdown is over
    if (sec == -1) {
        //Playdr 1 gets a point
        scorePlayer2++;
        $('.player2').eq(1).html(scorePlayer2)
        //Stop all events
        $('.timer').fadeOut('slow');
        clearInterval(timer);
        cuby.unbind()
        //Cuby can't move anymoore, changes shape because he survived
        cuby.addClass('keyboard');
        alert(player2 + ' won this round, press Restart to play another game !');

    }
}, 1000)

let checkScore = function () {
    console.log("step1");
    if (scorePlayer1 == 2) {
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        $('.player1').eq(1).html(scorePlayer2)
        $('.player2').eq(1).html(scorePlayer2)
        alert('Congratulations ! ' + player1 + ' won !');
        console.log("step2.1")
    }
    if (scorePlayer2 == 2) {
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        $('.player1').eq(1).html(scorePlayer2)
        $('.player2').eq(1).html(scorePlayer2)
        console.log("step2.2")
        alert('Congratulations ! ' + player2 + ' won!');
    }
}


$('button').on('click', function () {
    let sec = 15
    countdown.text(sec);
    $('.timer').fadeIn()
    cuby.removeClass().addClass('cuby')
    //Function will be executed every 1000ms
    let timer = setInterval(function () {
        countdown = $('.timer');
        countdown.text(sec--);
        //when countdown is over
        if (sec == -1) {
            //Playdr 1 gets a point
            scorePlayer2++;
            $('.player2').eq(1).html(scorePlayer2)
            //Stop all events
            $('.timer').fadeOut('slow');
            clearInterval(timer);
            $('.cuby').off('click');
            //Cuby can't move anymoore, changes shape because he survived
            cuby.addClass('keyboard');
            alert(player2 + ' won this round, press Restart to play another game !');
            checkScore();
        }
    }, 1000)

    cuby.on('click', function keyboard() {
        //Cuby changes shape when clicked on
        $('.cuby').addClass('mouse');
        //Player 1 gets a point
        scorePlayer1++;
        $('.player1').eq(1).html(scorePlayer1);

        alert(player1 + ' won this round, press Restart to play another game !');
        //This removes any event of the body, once the click is triggered, including the timer
        clearInterval(timer);
        $('.timer').fadeOut('slow');
        //Stop cuby from moving
        $('.cuby').off('click');
        checkScore();
    })

})
