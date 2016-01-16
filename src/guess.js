/*******************************************************************************
 *******************************************************************************
 *
 * Guess My Number game source file.
 *
 *******************************************************************************
 ******************************************************************************/

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
    var guess_val = guess_input.value;
    guess_input.value = "";

    /* Display the player's guess. */
    var players_guess = document.getElementById("players_guess");
    players_guess.innerHTML = "Your guess is " + guess_val.toString();
}
