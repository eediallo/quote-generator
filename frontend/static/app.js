

const generateQuoteBtn = document.querySelector('#generate-quote-btn')
const quoteEl = document.querySelector('#displayed-quote')
const quoteInput = document.querySelector('#quote')
const authorInput = document.querySelector('#author')
const addQuoteBtn = document.querySelector('#add-quote')


const baseUrl = 'https://elhadj-abdoul-diallo-quote-generator-still-darkness-1788.fly.dev/'
const localhost = 'http://localhost:3000/'

async function fetchQuote(){
    try{
        const resp = await fetch(`${localhost}api/quote`, {
            method: 'GET',
            headers: {'content-type' : 'application/json'}
        })
        if (!resp.ok) {
            throw new Error(`Failed to fetch quote: ${resp.status}`)
        }
        return await resp.json()
    }catch(err){
        console.error(err.message)
    }
}

async function addQuote() {
    const quote = {
        quote: quoteInput.value.trim(),
        author: authorInput.value.trim()
    };

    try {
        const resp = await fetch(localhost, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(quote)
        });

        if (!resp.ok) {
            throw new Error(`Failed to add quote: ${resp.status}`);
        }
        // clear input field after submission
        quoteInput.value = ''
        authorInput.value = ''
    } catch (err) {
        console.error(err.message);
    }
}

//event to get and display quote
generateQuoteBtn.addEventListener('click', async (e)=>{
    e.preventDefault()
    const quote = await fetchQuote()
    quoteEl.textContent = `${quote.quote} - ${quote.author}`
})

// event to post quote
addQuoteBtn.addEventListener('click', async(e)=>{
    e.preventDefault()
    await addQuote()
})