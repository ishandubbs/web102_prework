/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';
document.addEventListener("DOMContentLoaded", () => {
    // create a list of objects to store the data about the games using JSON.parse
    const GAMES_JSON = JSON.parse(GAMES_DATA)

    // remove all child elements from a parent element in the DOM
    function deleteChildElements(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    /*****************************************************************************
     * Challenge 3: Add data about each game as a card to the games-container
     * Skills used: DOM manipulation, for loops, template literals, functions
    */

    // grab the element with the id games-container
    const gamesContainer = document.getElementById("games-container");

    // create a function that adds all data from the games array to the page
    function addGamesToPage(games) {
        // loop over each item in the data
        for (const game of games) {
            // create a new div element, which will become the game card
            const gameCard = document.createElement('div');
            // add the class game-card to the list
            gameCard.classList.add('game-card');
            // set the inner HTML using a template literal to display some info 
            // about each game        
            gameCard.innerHTML = `
                <img src="${game.img}" alt="${game.name}" class="game-image" width = "300" height = "150">
                <h2>${game.name}</h2>
                <p>Description: ${game.description}</p>
                <p>Backers: ${game.backers}</p>
            `;
            // append the game to the games-container
            gamesContainer.appendChild(gameCard);
        }
    }
    // call the function we just defined using the correct variable
    // later, we'll call this function using a different list of games
    addGamesToPage(GAMES_JSON);

    /*************************************************************************************
     * Challenge 4: Create the summary statistics at the top of the page displaying the
     * total number of contributions, amount donated, and number of games on the site.
     * Skills used: arrow functions, reduce, template literals
    */

    // grab the contributions card element
    const contributionsCard = document.getElementById("num-contributions");

    // use reduce() to count the number of total contributions by summing the backers
    const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
    contributionsCard.textContent = totalContributions.toLocaleString();

    // set the inner HTML using a template literal and toLocaleString to get a number with commas

    // grab the amount raised card, then use reduce() to find the total amount raised
    const raisedCard = document.getElementById("total-raised");
    const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
    raisedCard.textContent = `$${totalRaised.toLocaleString()}`;

    // set inner HTML using template literal


    // grab number of games card and set its inner HTML
    const gamesCard = document.getElementById("num-games");
    const totalGames = GAMES_JSON.reduce((count) => count + 1, 0);
    gamesCard.textContent = `${totalGames}`;


    /*************************************************************************************
     * Challenge 5: Add functions to filter the funded and unfunded games
     * total number of contributions, amount donated, and number of games on the site.
     * Skills used: functions, filter
    */

    // show only games that do not yet have enough funding
    function filterUnfundedOnly(games) {    

        // use filter() to get a list of games that have not yet met their goal
        const UnFundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

        console.log(UnFundedGames.length);

        deleteChildElements(gamesContainer);

        addGamesToPage(UnFundedGames);
    }


    // show only games that are fully funded
    function filterFundedOnly() {

        // use filter() to get a list of games that have not yet met their goal
        const FundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

        console.log(FundedGames.length);
        
        deleteChildElements(gamesContainer);

        addGamesToPage(FundedGames);
    }
        // use the function we previously created to add the unfunded games to the DOM

    // show all games
    function showAllGames() {
        deleteChildElements(gamesContainer);

        // add all games from the JSON data to the DOM
        addGamesToPage(GAMES_JSON);
    }


    // select each button in the "Our Games" section
    const unfundedBtn = document.getElementById("unfunded-btn");
    const fundedBtn = document.getElementById("funded-btn");
    const allBtn = document.getElementById("all-btn");

    // add event listeners with the correct functions to each button

    // Event listener for "Show Unfunded Only" button
    unfundedBtn.addEventListener("click", filterUnfundedOnly);

    // Event listener for "Show Funded Only" button
    fundedBtn.addEventListener("click", filterFundedOnly);

    // Event listener for "Show All Games" button
    allBtn.addEventListener("click", showAllGames);

    showAllGames();


    /*************************************************************************************
     * Challenge 6: Add more information at the top of the page about the company.
     * Skills used: template literals, ternary operator
    */

    // grab the description container
    const descriptionContainer = document.getElementById("description-container");

    // use filter or reduce to count the number of unfunded games
    const UnfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
    console.log(UnfundedGamesCount)

    // create a string that explains the number of unfunded games using the ternary operator
    const displayMessage = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames !== 1 ? "s" : ""}. 
    There ${UnfundedGamesCount === 1 ? "is" : "are"} currently ${UnfundedGamesCount} unfunded game${UnfundedGamesCount !== 1 ? "s" : ""}. We need your help to fund these games.`;

    console.log(displayMessage);

    // create a new DOM element containing the template string and append it to the description container
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = displayMessage;
    descriptionContainer.appendChild(descriptionParagraph);
    /************************************************************************************
     * Challenge 7: Select & display the top 2 games
     * Skills used: spread operator, destructuring, template literals, sort 
     */
    console.log(GAMES_JSON);
    const sortedGames =  [...GAMES_JSON].sort( (item1, item2) => item2.pledged - item1.pledged);
    console.log("Sorted Games:", sortedGames);

    const [firstGame, secondGame] = sortedGames;
    console.log("First Game:", firstGame);
    console.log("Second Game:", secondGame);

    // use destructuring and the spread operator to grab the first and second games
    const firstGameContainer = document.getElementById("first-game");
    const secondGameContainer = document.getElementById("second-game");

    // create a new element to hold the name of the top pledge game, then append it to the correct element
    if (firstGameContainer && secondGameContainer) {
        firstGameContainer.style.display = "block";
        secondGameContainer.style.display = "block";

        const firstGameElement = document.createElement("p");
        const secondGameElement = document.createElement("p");

        firstGameElement.textContent = firstGame?.name || "No name available";
        secondGameElement.textContent = secondGame?.name || "No name available";

        firstGameContainer.appendChild(firstGameElement);

        // do the same for the runner up item
        secondGameContainer.appendChild(secondGameElement);
    } else {
        console.error("Game containers not found in the DOM.");
    }

    console.log(firstGame?.name || "No name available");
    console.log(secondGame?.name || "No name available");
});