const text = document.querySelector(".quote"),
    quoteBtn = document.querySelector("button"),
    author = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

const getQuote=async() =>{
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    const res=await fetch('https://type.fit/api/quotes');
    const quotes=await res.json();
    const num=Math.floor(Math.random()*quotes.length);
    const item=quotes[num];
    const quote=item.text;
    const authorName=item.author;
    text.innerText=quote;
    author.innerText=authorName;
    item.author===null?(author.innerText="UnKnown"):(author.innerText=`${item.author}`);
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "New Quote";
}

quoteBtn.addEventListener('click',getQuote)
getQuote()

speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${text.innerText} by ${author.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(text.innerText);
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${text.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);