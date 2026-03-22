const API_KEY = "INSERT_API_KEY_HERE"; //should move to .env file in production

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");
const searchButton = document.querySelector("#submitSearch");
console.log("searchButton:", searchButton);
// EX1 Step 2
const searchInput = document.querySelector("#searchWord");
console.log("searchInput:", searchInput);
// EX1 Step 3
const gifImage = document.querySelector("#imageContainer img");
console.log("gifImage:", gifImage);

//EX1 Step 4
const feedback = document.querySelector("#feedback");
console.log("feedback:", feedback);

// excercise 2
console.log("EXERCISE 2:\n==========\n");
searchButton.addEventListener("click", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.trim();

  //perform validation
  if (!searchTerm) {
    feedback.textContent = "Please enter a search term.";
    return;
  }

  console.log("searchTerm:", searchTerm);
  const apiKey = API_KEY;
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(searchTerm)}&api_key=${apiKey}&limit=1`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);
      if (data.data.length > 0) {
        const gifUrl = data.data[0].images.original.url;
        gifImage.src = gifUrl;
        feedback.textContent = `Showing results for "${searchTerm}"`;
      } else {
        feedback.textContent = `No results found for "${searchTerm}"`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      feedback.textContent = "An error occurred while fetching data.";
    });
}
