const generateQuoteBtn = document.querySelector("#generate-quote-btn");
const quoteEl = document.querySelector("#displayed-quote");
const quoteInput = document.querySelector("#quote");
const authorInput = document.querySelector("#author");
const addQuoteBtn = document.querySelector("#add-quote");
const toggleFormBtn = document.querySelector("#toggle-form-btn");
const errorMsgEl = document.querySelector("#errMsg");
const form = document.querySelector("#quote-form");

const baseUrl =
  "https://eediallo-qoute-server.hosting.codeyourfuture.io/api/v1/quotes";

// Hide form on initial load
form.style.display = "none";

// Toggle the form visibility
toggleFormBtn.addEventListener("click", () => {
  const isVisible = form.style.display === "block";
  form.style.display = isVisible ? "none" : "block";
});

// Submit the quote
addQuoteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await addQuote();
});

// Fetch and display a random quote
generateQuoteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const {
    quote: { quote, author },
  } = await fetchQuote();
  quoteEl.textContent = `${quote} - ${author}`;
});

// On page load, display one quote
window.onload = displayQuote;

// Helpers
async function fetchQuote() {
  try {
    const resp = await axios.get(`${baseUrl}/quote`);
    return resp.data;
  } catch (err) {
    console.error(err.message);
  }
}

async function addQuote() {
  try {
    await axios.post(
      `${baseUrl}/create_quote`,
      {
        quote: quoteInput.value.trim(),
        author: authorInput.value.trim(),
      },
      {
        headers: { "content-type": "application/json" },
      }
    );
    quoteInput.value = "";
    authorInput.value = "";
    errorMsgEl.textContent = "Quote added successfully!";
    errorMsgEl.style.color = "green";
    quoteInput.style.backgroundColor = "";
    authorInput.style.backgroundColor = "";
    setTimeout(() => {
      errorMsgEl.textContent = "";
      form.style.display = "none"; // Hide form after success message
    }, 3000);
  } catch (err) {
    showValidationError(err);
    setTimeout(() => {
      errorMsgEl.textContent = "";
    }, 5000);
  }
}

function showValidationError(err) {
  errorMsgEl.style.color = "red";
  if (!quoteInput.value.trim() && !authorInput.value.trim()) {
    errorMsgEl.textContent = err.response.data.msg;
    quoteInput.style.backgroundColor = "lightblue";
    authorInput.style.backgroundColor = "lightblue";
    quoteInput.focus();
  } else if (!quoteInput.value.trim()) {
    errorMsgEl.textContent = err.response.data;
    quoteInput.style.backgroundColor = "lightblue";
    authorInput.style.backgroundColor = "";
    quoteInput.focus();
  } else if (!authorInput.value.trim()) {
    errorMsgEl.textContent = err.response.data.msg;
    authorInput.style.backgroundColor = "lightblue";
    quoteInput.style.backgroundColor = "";
    authorInput.focus();
  }
}

async function displayQuote() {
  const { quote: data } = await fetchQuote();
  const { quote, author } = data;
  quoteEl.textContent = `${quote} - ${author}`;
}
