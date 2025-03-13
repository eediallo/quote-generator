

const endPoint = 'http://localhost:3000'
console.log('hello world')

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

async function getQuote(){
const quote = await fetchQuote()
console.log(quote)
}

getQuote()
