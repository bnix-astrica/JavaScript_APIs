const API_KEY = "W2Jo2oNbNzQZou5FhQNNGyxXWeP8DmQ2"; //"INSERT_API_KEY_HERE"; //should move to .env file in production

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
  const apiUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${encodeURIComponent(searchTerm)}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);
      if (data.data && data.data.images) {
        const gifUrl = data.data.images.original.url;
        gifImage.src = gifUrl;
        searchInput.value = "";
        feedback.textContent = "";
      } else {
        feedback.textContent = `No translate result found for "${searchTerm}"`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      feedback.textContent = error;
    });
}
