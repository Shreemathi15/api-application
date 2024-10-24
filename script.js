document.getElementById('recipe-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const recipeQuery = document.getElementById('recipe-query').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    try {
        const apiKey = 'AwcXbwLc3FsS19Xf3d4MFw==u16YzY5MqZ7kMVdX'; // Your API Ninjas key
        const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(recipeQuery)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Log the data to see its structure
        console.log(data);

        if (!data || data.length === 0) {
            resultDiv.innerHTML = `<p>No recipes found for "${recipeQuery}".</p>`;
            return;
        }

        // Display the results
        resultDiv.innerHTML = '<h2>Results:</h2>';
        data.forEach(recipe => {
            // Check if ingredients is an array
            const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : 'No ingredients available';
            resultDiv.innerHTML += `
                <div>
                    <h3>${recipe.title}</h3>
                    <p><strong>Ingredients:</strong> ${ingredients}</p>
                    <p><strong>Instructions:</strong> ${recipe.instructions || 'No instructions available.'}</p>
                </div>
            `;
        });
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

