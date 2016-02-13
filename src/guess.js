/*******************************************************************************
 *******************************************************************************
 *
 * Guess My Number game source file.
 *
 *******************************************************************************
 ******************************************************************************/

/*******************************************************************************
 *
 * Guess My Number game globals.
 *
 *   min_number             Minimum guess number.
 *   max_number             Maximum guess number.
 *   number                 Number to guess.
 *   guess_count            Count of the number of guesses.
 */

var min_number = 1;
var max_number = 10;
var number =   Math.floor(Math.random() * (max_number - min_number + 1))
             + min_number;
var guess_count = 0;


/*******************************************************************************
 *
 * Guess My Number game functions.
 */

/*
 * Handle the guess form submission event specified by event.
 *
 *   event                  Guess form submission event.
 */

function handleGuess(event)
{
    /* Prevent the form from being submitted. */
    event.preventDefault();

    /* Get the player's guess and clear it. */
    var guess_input = document.getElementById("guess_input");
    var guess_val = parseInt(guess_input.value);
    guess_input.value = "";

    /* Display the player's guess. */
    var players_guess = document.getElementById("players_guess");
    if ((guess_val >= min_number) && (guess_val <= max_number))
    {
        /* One more guess. */
        guess_count++;

        /* Add the player's guess to the display string. */
        disp_str = "<p>Your guess is " + guess_val.toString() + ".</p>";

        /* Check for correct answer and add the result to the display string. */
        if (guess_val == number)
        {
            /* Display that the answer is correct. */
            disp_str = disp_str + "<p>That is the correct number!!!</p>";

            /* Display the number of guesses. */
            disp_str = disp_str + "<p>You took " +
                       guess_count + " guesses.</p>";

            /* Hide player's guess section. */
            var guess_section = document.getElementById("guess_section");
            guess_section.setAttribute("hidden", "true");

            /* Show new game section. */
            var new_game = document.getElementById("new_game_section");
            new_game.removeAttribute("hidden");
        }
        else
        {
            /* Display that the answer is not correct. */
            disp_str =   disp_str
                       + "<p>Sorry.  That is the not correct number.</p>";
        }

        /* Display the guess results. */
        players_guess.innerHTML = disp_str;
    }
    else
    {
        players_guess.innerHTML = "Please guess a number between " +
                                  min_number.toString() + " and " +
                                  max_number.toString() + ".";
    }
}


/*
 * Handle the new game submission event specified by event.
 *
 *   event                  New game form submission event.
 */

function handleNewGame(event)
{
    /* Prevent the form from being submitted. */
    event.preventDefault();

    /* Hide the new game section. */
    var new_game_section = document.getElementById("new_game_section");
    new_game_section.setAttribute("hidden", "true");

    /* Show the guess section. */
    var guess_section = document.getElementById("guess_section");
    guess_section.removeAttribute("hidden");

    /* Pick a new number and reset the guess count. */
    number =   Math.floor(Math.random() * (max_number - min_number + 1))
             + min_number;
    guess_count = 0;

    /* Clean player's guess. */
    var players_guess = document.getElementById("players_guess");
    players_guess.innerHTML = "";
}

