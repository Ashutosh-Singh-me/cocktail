document.getElementById('form').addEventListener('submit', searchRecipe);
document.getElementById('random').addEventListener('click', searchRandom);
var div = document.getElementById('container');
var displayDataContainer = '';

function searchRecipe(e) {
    e.preventDefault();
    const API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    var search = document.getElementById('CocktailName').value;

    if (!search){
        alert('can\'t be empty');
        return 0;
    }

    fetch(API + search)
    .then( function(rsp) {
        if (!rsp.ok)
        throw Error(rsp.statusText);
        return rsp.json()
    } )
    .then( function(data)  {
        if (data.drinks == null){
            alert('not a actual cocktail');
            return 0;
        }
        if (data.drinks[0].strDrink !== capitalizeFirstLetter(search)){
            alert('Search a valid cocktail or try a new one.'); //// can't match drink
            return;
        }
        distributeData(data.drinks[0]);
        displayData();
    })
    .catch(function(error)  {
        console.log(error);
    })
}

function searchRandom() {
    const API = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    fetch(API)
    .then( function(rsp){
        return rsp.json();
    })
    .then( function(data){
        distributeData(data.drinks[0]);
        displayData();
    })
}


function distributeData(data) {
    cocktailDetails( data.strDrink, data.strCategory, data.strInstructions );
    displayImage(data.strDrinkThumb);
    ingredients(data)
}

function cocktailDetails(name, category, instructions) {
    let header = `<div class="row" id="output">
    <div class="col-lg-6">
        <ul type="none" class="list">
        <li><span class="list-heading">Name</span> : ${name}</li>
        <li><span class="list-heading">Category</span> : ${category}</li>
        <li><span class="list-heading">Instruction</span> : ${instructions}</li>
        </ul>
        </div>
    `;
    displayDataContainer += header;

}

function displayImage(image){
    let disp = `<div class="col-lg-6 alignment" >
        <img src=${image} alt="Drink Image">
        </div>
        </div>
    `;
    displayDataContainer += disp;
}

function ingredients(data) { 
    let disp = `<div class="container-fluid">
    <table class="table">
    
    <tr>
        <th>Ingredient</th>
        <th>ounces</th>
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
    
    disp += `</table>
            </div>`;
    displayDataContainer += disp;
}

function displayData() {
    
    div.innerHTML = displayDataContainer; //'<div class="row" id="output">'
    displayDataContainer = "";
}

function capitalizeFirstLetter(str) {
    if (!str)
    return 0;
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
