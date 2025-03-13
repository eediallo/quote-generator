

const generateQuoteBtn = document.querySelector('#generate-quote-btn')
const quoteEl = document.querySelector('#quote')

const endPoint = 'http://localhost:3000'

async function fetchQuote(){
    try{
        const resp = await fetch(endPoint)
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
    quoteEl.innerHTML = `${quote.quote} - ${quote.author}`
})

