let inpdate = document.getElementById("inputDATE");
let outputAns = document.getElementById("output");
let msg = "Date: ";


async function fetchAPOD(date) {
    try {
        const url = `/.netlify/functions/apod?date=${date}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Couldn't Fetch The Image");
        }

        const data = await response.json();
        console.log(data.url);

        document.getElementById("apod-title").textContent = data.title;
        document.getElementById("apod-description").textContent = data.explanation;

        if (data.media_type === "image") {
            document.getElementById("apod-image").src = data.url;
        }

    } catch (error) {
        console.error(error);
    }
}

document.getElementById("search-btn").addEventListener("click", ()=> {
    const selectedDate = document.getElementById("inputDATE").value;

    if (selectedDate) {
        fetchAPOD(selectedDate);
    }
});