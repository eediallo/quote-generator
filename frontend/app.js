

const generateQuoteBtn = document.querySelector('#generate-quote-btn')
const quoteEl = document.querySelector('#quote')
const quoteInput = document.querySelector('#quote-input')
const authorInput = document.querySelector('#author-input')

const endPoint = 'https://elhadj-abdoul-diallo-quote-generator-still-darkness-1788.fly.dev/'

async function fetchQuote(){
    try{
        const resp = await fetch(endPoint, {
            method: 'GET',
            headers: {'content-type' : 'application/json'}
        })
        if (!resp.ok) {
            throw new Error(`Failed to fetch quote: ${resp.status}`)
        }
        const data = await resp.json()
        return data
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
        const resp = await fetch('http://127.0.0.1:3000', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(quote)
        });

        if (!resp.ok) {
            throw new Error(`Failed to add quote: ${resp.status}`);
        }

        const data = await resp.json();
        console.log('Quote added successfully:', data);
    } catch (err) {
        console.error(err.message);
    }
}

generateQuoteBtn.addEventListener('click', async ()=>{
    const quote = await fetchQuote()
    quoteEl.textContent = `${quote.quote} - ${quote.author}`
})

