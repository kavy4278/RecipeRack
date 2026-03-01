const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipedetailscontent = document.querySelector('.recipe-details-content');
const recipeclosebtn = document.querySelector('.recipe-close-btn');

const fetchrecipes = async (query) => {
        recipecontainer.innerHTML = "Getting your recipes...";
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
       
        recipecontainer.innerHTML = "";
        response.meals.forEach(meal => {
                const recipediv = document.createElement('div');
                recipediv.classList.add('recipe');
                recipediv.innerHTML = `
                    <img src="${meal.strMealThumb}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish</p>
                    <p>Type : <span>${meal.strCategory}</span></p>
            `
                const button = document.createElement('button');
                button.textContent = "View recipe";
                recipediv.appendChild(button);
                
                // add event listener for recipe details
                button.addEventListener('click', () => {
                        openrecipepopup(meal);
                })

                recipecontainer.appendChild(recipediv);
        });
        console.log(response);
}

// function for ingredients,etc
const fetchingredients = (meal) => {
        let ingredientslist = "";
        for(let i=1;i<=20;i++){
                const ingredient = meal[`strIngredient${i}`];
                if(ingredient) {
                        const measure = meal[`strMeasure${i}`];
                        ingredientslist += `<li>${measure} ${ingredient}</li>`
                }
                else {
                        break;
                }
        }
        return ingredientslist;
} 
const openrecipepopup = (meal) => {
                recipedetailscontent.innerHTML = `
                     <h2 style="text-align : center;"class="recipename">${meal.strMeal}</h2>  
                     <h3 style="text-align : center; margin-top : 10px;">Ingredients : </h3>
                     <ul style="text-align : center;"class="ingredientlist">${fetchingredients(meal)}</ul>
                     <div>
                        <h3 style="margin-top : 20px;"class="headinstructions">Instructions : </h3>
                        <p style="text-align : center;margin-top : 10px;"class="recipeinstructions">${meal.strInstructions}</p>
                     </div>
                `
                recipedetailscontent.parentElement.style.display = "block";
}

recipeclosebtn.addEventListener('click',()=> {
        recipedetailscontent.parentElement.style.display = "none";
})
searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    fetchrecipes(searchinput);
})