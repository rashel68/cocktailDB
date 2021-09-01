const searchCocktail = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadCocktail(searchText);

}


const loadCocktail = (cocktail) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCocktail(data.drinks))
}

const displayCocktail = (juices) => {

    const cocktailContainer = document.getElementById('cocktail-container');
    cocktailContainer.textContent = '';
    juices.forEach(juice => {
        // console.log(juice);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                    <img height = "250px" src="${juice.strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${juice.strDrink}</h5>
                        <h6>Category: ${juice.strCategory}</h6>
                        <p class="card-text">${juice.strInstructions.slice(0, 120)}</p>
                        <button onclick = "loadJuiceId(${juice.idDrink})" class="btn btn-danger ">Details</button>
                    </div>
                </div>        
        `;
        cocktailContainer.appendChild(div);
    });
}

const loadJuiceId = (juiceID) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${juiceID}`

    fetch(url)
        .then(res => res.json())
        .then(data => juiceDetails(data.drinks[0]))
}

const juiceDetails = (juices) => {
    const details = document.getElementById('juice-details');
    details.textContent = '';

    details.innerHTML = `
    <div class="mx-auto my-4 w-75">
            <div class="row g-0 bg-white rounded">
                <div class="col-md-4">
                    <img src="${juices.strDrinkThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${juices.strDrink}</h5>
                        <p class="card-text">${juices.strInstructions}</p>
                        <p class="card-text"><small class="text-muted">Category: ${juices.strCategory}</small></p>
                    </div>
                </div>
            </div>
        </div>
    
    `;
}