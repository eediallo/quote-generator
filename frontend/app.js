

const generateQuoteBtn = document.querySelector('#generate-quote-btn')
const quoteEl = document.querySelector('#quote')

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

generateQuoteBtn.addEventListener('click', async ()=>{
    const quote = await fetchQuote()
    quoteEl.textContent = `${quote.quote} - ${quote.author}`
})

