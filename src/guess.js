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
 *   player_name            Name of the player.
 */

var min_number = 1;
var max_number = 10;
var number;
var guess_count;
var player_name;


/*******************************************************************************
 *
 * Guess My Number game functions.
 */

/*
 * Initialize the game.
 */

function gameInit()
{
    /* Install guess handler. */
    var guess_form = document.getElementById("guess_form");
    guess_form.addEventListener("submit", handleGuess);

    /* Install new game button handler. */
    var new_game_section = document.getElementById("new_game_section");
    new_game_section.addEventListener("submit", handleNewGame);

    /* Install login button handler. */
    var login_form = document.getElementById("login_form");
    login_form.addEventListener("submit", handleLogin);

    /* If the user name cookie is set, set the user name. */
    cookie_table = getCookies();
    if (cookie_table["user_name"])
    {
        setUserName(cookie_table["user_name"]);
    }

    /* Start a new game. */
    startNewGame();
}


/*
 * Start a new game.
 */

function startNewGame()
{
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


/*******************************************************************************
 *
 * Event handlers.
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

    /* Initialize a new game. */
    startNewGame();
}


/*
 * Handle the login form submission event specified by event.
 *
 *   event                  Login form submission event.
 */

function handleLogin(event)
{
    /* Prevent the form from being submitted. */
    event.preventDefault();

    /* Display user name form. */
    var username_div = document.getElementById("username_div");
    username_div.removeAttribute("hidden");

    /* Get the user name value from the form and clear it. */
    var username_input = document.getElementById("username_input");
    var username = username_input.value;
    username_input.value = "";

    /* If the user name was provided, update it.  When the user name form is */
    /* first presented, it comes through here, and user name will be blank.  */
    if (username) {
        /* Save the user name in a cookie. */
        setCookie("user_name", username);

        /* Hide the user name form. */
        username_div.setAttribute("hidden", true);

        /* Set the user name. */
        setUserName(username);
    }
}


/*******************************************************************************
 *
 * Internal Guess My Number game functions.
 */

/*
 * Set the user name to the value specified by user_name.
 *
 *   user_name              User name.
 */

function setUserName(user_name)
{
    /* The player name is the same as the user name. */
    player_name = user_name;

    /* Greet the player. */
    var greeting = document.getElementById("greeting");
    greeting.innerHTML = "Hello " + player_name + ",";
}


/*
 *   Set a cookie with the name specified by name with the value specified by
 * value.  If duration is specified, set the cookie to expire after the duration
 * specified in seconds.
 *
 *   name                   Name of cookie.
 *   value                  Value for cookie.
 *   duration               If specified, duration of cookie in seconds.
 */

function setCookie(name, value, duration)
{
    /* Set the cookie name/value. */
    var cookie = name + "=" + value;

    /* If a duration is specified, set the expiration time. */
    if (duration)
    {
        /* Create a date object for the expiration time. */
        var date = new Date();
        date.setTime(date.getTime() + duration*1000);

        /* Set the expiration time in the cookie. */
        cookie = cookie + "; " + "expires=" + date.toUTCString();
    }

    /* Set the cookie. */
    document.cookie = cookie;
}


/*
 * Return a table of cookie/value pairs.
 */

function getCookies()
{
    /* Get the list of cookie name/value pairs. */
    cookie_list = document.cookie.split("; ");

    /* Produce the table of cookie name/value pairs. */
    cookie_table = {};
    for (var i = 0; i < cookie_list.length; i++)
    {
        /* Split the cookie into the name and value. */
        name_value = cookie_list[i].split("=");

        /* Add the name/value pair to the cookie table. */
        cookie_table[name_value[0]] = name_value[1];
    }

    return cookie_table;
}


/* Initialize game when the DOM content is loaded. */
document.addEventListener("DOMContentLoaded", gameInit);

