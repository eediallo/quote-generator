

const generateQuoteBtn = document.querySelector('#generate-quote-btn')
const quoteEl = document.querySelector('#displayed-quote')
console.log(quoteEl)
const quoteInput = document.querySelector('#quote')
const authorInput = document.querySelector('#author')
const addQuoteBtn = document.querySelector('#add-quote')


const baseUrl = 'https://elhadj-abdoul-diallo-quote-generator-still-darkness-1788.fly.dev/'

async function fetchQuote(){
    try{
        const resp = await fetch(`${baseUrl}api/quote`, {
            method: 'GET',
            headers: {'content-type' : 'application/json'}
        })
        if (!resp.ok) {
            throw new Error(`Failed to fetch quote: ${resp.status}`)
        }
        const data = await resp.json()
        console.log(data)
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
        const resp = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(quote)
        });

        if (!resp.ok) {
            throw new Error(`Failed to add quote: ${resp.status}`);
        }

        const data = await resp.json();
        console.log(data)
        console.log('Quote added successfully:', data);
    } catch (err) {
        console.error(err.message);
    }
}

//event to get and display quote
generateQuoteBtn.addEventListener('click', async ()=>{
    const quote = await fetchQuote()
    quoteEl.textContent = `${quote.quote} - ${quote.author}`
})

// event to post quote
addQuoteBtn.addEventListener('click', async(e)=>{
    e.preventDefault()
    await addQuote()
})