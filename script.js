var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches=2;
var match_counter = 0;

function card_clicked(element) {
    var the_card = $(element).prev('.front').find('img').attr('src');
    console.log(the_card);

    if (first_card_clicked == null) {
        //we clicked the first card
        first_card_clicked = the_card;
        $(element).addClass("selected_card");
        console.log("card is first");
    }
    else {
        //we clicked the second card
        second_card_clicked = the_card;
        $(element).addClass("selected_card");
        console.log("card is second");

        if (first_card_clicked == second_card_clicked) {
            //there is a match
            match_counter = match_counter + 1;
            $(".selected_card").removeClass('selected_card').addClass('matched_card');
            console.log("cards match");
            first_card_clicked = null;
            second_card_clicked = null;
        }
        else {
            console.log("cards don't match");
            //$(".selected_card").removeClass("selected_card");
            first_card_clicked = null;
            second_card_clicked = null;
            setTimeout(function(){
                $(".selected_card").removeClass("selected_card");
            }, 1250);
        }
        if (match_counter == total_possible_matches) {
            //all matches have been made
            console.log("Congratulations you won the Piston Cup!");
            }
        }
}