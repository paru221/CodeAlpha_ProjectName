async function translateText() {

    const text = document.getElementById("inputText").value;
    const source = document.getElementById("sourceLang").value;
    const target = document.getElementById("targetLang").value;

    if (text.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    try {

        const response = await fetch(
            "https://libretranslate.de/translate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    q: text,
                    source: source,
                    target: target,
                    format: "text"
                })
            }
        );

        const data = await response.json();

        document.getElementById("outputText").value =
            data.translatedText;

    } catch (error) {
        alert("Translation failed.");
        console.log(error);
    }
}

function copyText() {

    const output =
        document.getElementById("outputText");

    output.select();

    document.execCommand("copy");

    alert("Copied Successfully!");
}

function speakText() {

    const text =
        document.getElementById("outputText").value;

    const speech =
        new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(speech);
}
