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
 */

var min_number = 1;
var max_number = 10;


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
        players_guess.innerHTML = "Your guess is " + guess_val.toString() + ".";
    }
    else
    {
        players_guess.innerHTML = "Please guess a number between " +
                                  min_number.toString() + " and " +
                                  max_number.toString() + ".";
    }
}
