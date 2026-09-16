export default async (req) => {
    try {
        const url = new URL(req.url);
        const date = url.searchParams.get("date");

        if (!date) {
            return new Response(
                JSON.stringify({ error: "Date is required" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const apiKey = process.env.NASA_API_KEY;

        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: "NASA API key not found" }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const nasaURL =
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

        const response = await fetch(nasaURL);

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        console.error(error);

        return new Response(
            JSON.stringify({
                error: error.message
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};