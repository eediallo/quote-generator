const generateQuoteBtn = document.querySelector("#generate-quote-btn");
const quoteEl = document.querySelector("#displayed-quote");
const quoteInput = document.querySelector("#quote");
const authorInput = document.querySelector("#author");
const addQuoteBtn = document.querySelector("#add-quote");
const errorMsgEl = document.querySelector('#errMsg')

const baseUrl =
  "https://elhadj-abdoul-diallo-quote-generator-still-darkness-1788.fly.dev/";
const localhost = "http://localhost:3000/";

// get quote
async function fetchQuote() {
  try {
    const resp = await axios.get(`${localhost}api/quote`);
    return resp.data;
  } catch (err) {
    console.error(err.message);
  }
}

// post quote
async function addQuote() {
    try {
        const resp = await axios.post(
            localhost,
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
        console.log(resp);
    } catch (err) {
        errorMsgEl.textContent = err.response.data.msg;
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
