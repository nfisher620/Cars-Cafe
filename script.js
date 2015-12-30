var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var can_i_click_a_card = true;
var difficulty="easy";
var card=null;
var seconds=0;
var timer;

//the page has loaded
$(document).ready(function () {
    display_stats();
    $(".accuracy").find(".value").text(0 + "%");
    $(".attempts").find(".value").text(0);
    $("games_played").find(".value").text(0);
    random_pictures();
    console.log("ready");
    addGlow();
});
//button for easy game mode
function easy() {
    difficulty = "easy";
    addNewGameBoard();
    blazes.play();
}
//button for medium game mode
function medium(){
    difficulty="medium";
    addNewGameBoard();
    mater.play();
}
//button for difficult game mode
function difficult (){
    difficulty="difficult";
    reset_stats();
    $(".container").addClass("container2");
    countdown();
    sheriff.play();

}
function card_clicked(element) {
    //check if you can click on a card
    if (can_i_click_a_card == true) {
        //takes the img src from the card that is clicked and set it to variable the_card
        var the_card = $(element).prev('.front').find('img').attr('src');
        console.log(the_card);
    }
    else {
        return;
    }

    if (first_card_clicked == null) {
        //we clicked the first card
        first_card_clicked = the_card;
        //the front image of the first card is visible
        $(element).addClass("selected_card");
        console.log("The first card is ", the_card);
    }
    else {
        //we clicked the second card
        second_card_clicked = the_card;
        attempts=attempts + 1;
        //the front image of the second card is visible
        $(element).addClass("selected_card");
        console.log("The second card is ", the_card);

        if (first_card_clicked == second_card_clicked) {
            //there is a match
            $(".selected_card").removeClass('selected_card').addClass('matched_card');
            //resets cards to null
            first_card_clicked = null;
            second_card_clicked = null;
            //increases matches
            matches = matches + 1;
            console.log("cards match");
            accuracy = Math.round(((matches/attempts)*100).toFixed(2));
        }
        else {
            //the cards don't match
            //prevents from clicking on a third card
            can_i_click_a_card = false;
            //resets card to null
            first_card_clicked = null;
            second_card_clicked = null;
            accuracy = Math.round(((matches/attempts)*100).toFixed(2));
            //adds one to attempts in the stats area
            $(".attempts").find(".value").text(attempts);

            setTimeout(function () {
                //cards flip back
                $(".selected_card").removeClass("selected_card");
                can_i_click_a_card = true;
            }, 1050);
            console.log("Cards don't match")
        }
        if (matches == total_possible_matches) {
            // All matches have been made
            // All matched cards disappear
            $('#game-area').find('.card').addClass('hide_matched_cards');
            //adds You Won message after game_area has been cleared
            $("#game-area").append($("<h5>").html("You won the <span>Piston Cup!</span>"));
            games_played = games_played + 1;
        }
        display_stats();
    }
    // Displays message after 25 attempts
    if(attempts === 25) {
        $("#game-area").append($("<h5>").html("You were too slow!"));
        $("body").css("background-image", "url(images/dark4.png)");
        $('#game-area').find('.card').addClass('hide_matched_cards');
        lights.play();
    }
    // Plays sound after 6 matches made
    if(matches==6){
        fillmore.play();
    }
    // Plays sound after 9 matches made
    if(matches==9){
        fun.play();
    }
}

// Displays stats area
function display_stats() {
    $(".games-played").find(".value").text(games_played);
    $(".attempts").find(".value").text(attempts);
    accuracy = Math.floor(((matches/attempts)*100).toFixed(2));
    // Replaces infintiy with 100
    if (accuracy == Infinity) {
        $(".accuracy").find(".value").text(100 + "%");
    }
    else {
        $(".accuracy").find(".value").text(accuracy + "%");
    }
}

function reset_stats() {
    // Resets variables to zero
    accuracy = 0;
    matches = 0;
    attempts = 0;
    // Removes cards from game_area for random generator
    $(".container").html("");
    //Adds new random cards to game_area
    random_pictures();
    // Updates values under stats area
    $(".games-played").find(".value").text(games_played);
    $(".accuracy").find(".value").text(0 + "%");
    $(".attempts").find(".value").text(0);
    // Flips cards back to starting position
    $(".back").show();
    $('#game-area').find('.card').removeClass('hide_matched_cards');
    $('.card').find('.back').removeClass('matched_card');
    // Removes winning/losing game message
    $("h5").remove();
    // Resets timer
    seconds=31;
    clearInterval(timer);
    $("#counter").empty();
}

// 2nd container for difficulty board
function addNewGameBoard(){
    reset_stats();
    $(".container").removeClass("container2");
}

// Random Cards Generator
function random_pictures() {
    var pics_array = ["images/fillmore.jpg",
        "images/flo.jpg",
        "images/guido.jpg",
        "images/lighteningmcqueen.jpg",
        "images/luigi.jpg",
        "images/mater.jpg",
        "images/ramone.jpg",
        "images/sally.jpg",
        "images/sarge.jpg"];

    // Switches between easy, medium, difficulty
    switch(difficulty) {
        case "easy":
            var new_pics_array = pics_array.slice(0, 4);
            // Adds the second image in the array instead of doubling the images in the pics_array
            new_pics_array = new_pics_array.concat(new_pics_array);
            card = 8;
            total_possible_matches = 4;
            $("body").css("background-image", "url(images/cars_28.jpg)");
            console.log(new_pics_array);
            break;
        case "medium":
            var new_pics_array=pics_array.slice(0,6);
            new_pics_array=new_pics_array.concat(new_pics_array);
            card=12;
            total_possible_matches=6;
            $("body").css("background-image", "url(images/dark2.png)");
            console.log(new_pics_array);
            break;
        case "difficult":
            var new_pics_array = pics_array;
            new_pics_array = new_pics_array.concat(new_pics_array);
            card = 18;
            total_possible_matches = 9;
            $("body").css("background-image", "url(images/dark4.png)");
            console.log(new_pics_array);
            break;
    }
    var i=0;
    while(i<card){
        var random_i=Math.floor(Math.random()*(new_pics_array.length));
        create_card_con(new_pics_array[random_i]);
        i++;
        new_pics_array.splice(random_i,1);
    }
    console.log(difficulty);
}

// Dynamic card creation
function create_card_con(random_picture) {
    // Jquery objects for dynamic board creation
    var card_div = $("<div>").addClass("card");
    var front_div = $("<div>").addClass("front");
    var back_div = $("<div>").addClass("back").attr("onclick", "card_clicked(this)");
    var img_front = $("<img>").addClass("front").attr("src", random_picture);
    var img_back = $("<img>").addClass("back").attr("src", "images/radiatorspringscard.jpg");
    front_div.append(img_front);
    back_div.append(img_back);
    card_div.append(front_div);
    card_div.append(back_div);
    $(".container").append(card_div);
}

// Countdown timer
function countdown() {
    var counter = document.getElementById("counter");
    var seconds = 31;
    var decrement = function(){
        seconds--;
        counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        if(seconds === 0){
            clearInterval(timer);
            $('#game-area').append($("<h5>").html("Sheriff took you to jail!"));
            $('#game-area').find('.card').addClass('hide_matched_cards');
            $("#counter").empty();
            games_played = games_played + 1;
        }
    };
    if(!timer) clearInterval(timer);
    timer = setInterval(decrement, 1000);
}

//When difficulty button is clicked, title glows
function addGlow() {
    $('#difficultyButton').find('button').on('click', function () {
        $('button').removeClass("glow");
        $(this).toggleClass("glow");
    })
}
