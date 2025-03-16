const generateQuoteBtn = document.querySelector("#generate-quote-btn");
const quoteEl = document.querySelector("#displayed-quote");
const quoteInput = document.querySelector("#quote");
const authorInput = document.querySelector("#author");
const addQuoteBtn = document.querySelector("#add-quote");
const errorMsgEl = document.querySelector("#errMsg");

const baseUrl =
  "https://elhadj-abdoul-diallo-quote-generator-still-darkness-1788.fly.dev/";

// get quote
async function fetchQuote() {
  try {
    const resp = await axios.get(`${baseUrl}api/quote`);
    return resp.data;
  } catch (err) {
    console.error(err.message);
  }
}

// post quote
async function addQuote() {
  try {
    await axios.post(
      baseUrl,
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
  } catch (err) {
    showValidationError(err);
  }
}

//event to get and display quote
generateQuoteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const quote = await fetchQuote();
  quoteEl.textContent = `${quote.quote} - ${quote.author}`;
});

// event to post quote
addQuoteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await addQuote();
});

function showValidationError(err) {
  errorMsgEl.style.color = "red";
  if (!quoteInput.value.trim() && !authorInput.value.trim()) {
    errorMsgEl.textContent = err.response.data.msg;
    quoteInput.style.backgroundColor = "lightblue";
    authorInput.style.backgroundColor = "lightblue";
    quoteInput.focus();
  } else if (!quoteInput.value.trim()) {
    errorMsgEl.textContent = err.response.data.msg;
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
