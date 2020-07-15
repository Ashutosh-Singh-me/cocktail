document.getElementById('form').addEventListener('submit', searchRecipe);
var div = document.getElementById('container');
var displayDataContainer = '';

function searchRecipe(e) {
    e.preventDefault();
    const API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    var search = document.getElementById('CocktailName').value;

    fetch(API + search)
    .then( function(rsp) {
        if (!rsp.ok)
        throw Error(rsp.statusText);
        return rsp.json()
    } )
    .then( function(data)  {
        console.log(data);
        if (data.drinks === null) {
            alert('Text cant be empty.');////console.log('Null error'); //// can't find drink
            return;
        }
        else
        if (data.drinks[0].strDrink !== capitalizeFirstLetter(search)){
            alert('Search a valid cocktail or try a random one.'); //// can't match drink
            return;
        }
        distributeData(data.drinks[0]);
        displayData();
    })
    .catch(function(error)  {
        console.log(error);
    })
}

function distributeData(data) {
    cocktailDetails( data.strDrink, data.strCategory, data.strInstructions );
    displayImage(data.strDrinkThumb);
    ingredients(data)
}

function cocktailDetails(name, category, instructions) {
    let header = `
        <ul type="none" class="list">
        <li><span class="list-heading">Name</span> : ${name}</li>
        <li><span class="list-heading">Category</span> : ${category}</li>
        <li><span class="list-heading">Instruction</span> : ${instructions}</li>
        </ul>
    `;
    displayDataContainer += header;

}

function displayImage(image){
    let disp = `
        <img src=${image} alt="Drink Image" class="image">
    `;
    displayDataContainer += disp;
}

function ingredients(data) { //strIngredient1
    let disp = `
    <table class="table">
    <tr>
    <th colspan="2">Recipe</th>
    </tr>
    <tr>
        <td>Ingredient</td>
        <td>ounces</td>
    </tr>
    <tr>
        <td>${data.strIngredient1}</td>
        <td>${data.strMeasure1}</td>
    </tr>
    `;

    if (data.strIngredient2 !== null && data.strMeasure2 !== null )
    disp += `
    <tr>
    <td>${data.strIngredient2}</td>
    <td>${data.strMeasure2}</td>
    </tr>
    `;

    if (data.strIngredient3 !== null && data.strMeasure3 !== null )
    disp += `
    <tr>
    <td>${data.strIngredient3}</td>
    <td>${data.strMeasure3}</td>
    </tr>
    `;

    if (data.strIngredient4 !== null && data.strMeasure4 !== null )
    disp += `
    <tr>
    <td>${data.strIngredient4}</td>
    <td>${data.strMeasure4}</td>
    </tr>
    `;

    if (data.strIngredient5 !== null && data.strMeasure5 !== null )
    disp += `
    <tr>
    <td>${data.strIngredient5}</td>
    <td>${data.strMeasure5}</td>
    </tr>
    `;

    if (data.strIngredient6 !== null && data.strMeasure6 !== null )
    disp += `
    <tr>
    <td>${data.strIngredient6}</td>
    <td>${data.strMeasure6}</td>
    </tr>
    `;

    if (data.strIngredient7 !== null && data.strMeasure7 !== null )
    disp += `
    <tr>
    <td>${data.strIngredient7}</td>
    <td>${data.strMeasure7}</td>
    </tr>
    `;

    if (data.strIngredient8 !== null && data.strMeasure8 !== null )
    disp += `
    <tr>
    <td>${data.strIngredient8}</td>
    <td>${data.strMeasure8}</td>
    </tr>
    `;
    
    disp += '</table>';


    displayDataContainer += disp;

}

function displayData() {
    
    div.innerHTML ='<div id="output">' + displayDataContainer + '</div>';
    displayDataContainer = "";
}

function capitalizeFirstLetter(text) {
    var a = text.slice(0,1);
    var b = text.slice(1,text.length);

    return a.toUpperCase() + b.toLowerCase();
}