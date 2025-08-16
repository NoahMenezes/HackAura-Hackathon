export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { file } = req.body;

    if (!file || !file.data || !file.mimeType) {
        return res.status(400).json({ message: 'Missing file data in request.' });
    }

    // Access your secret API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ message: 'API key is not configured.' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are "Secretary.AI", an expert meeting assistant... (Your full prompt goes here) ... Please provide the output in a single, clean JSON object with the following structure:
    {"transcript": "...", "summary": "...", "actionItems": [{ "owner": "...", "task": "...", "deadline": "..." }], "email": "..."}
    Do not include any text or formatting outside of this JSON object.`;

    const payload = {
        contents: [{
            role: "user",
            parts: [
                { text: prompt },
                { inlineData: { mimeType: file.mimeType, data: file.data } }
            ]
        }],
        generationConfig: {
            responseMimeType: "application/json"
        }
    };

    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.json();
            console.error("API Error:", errorBody);
            throw new Error(`API request failed with status ${apiResponse.status}`);
        }

        const result = await apiResponse.json();
        const parsedContent = JSON.parse(result.candidates[0].content.parts[0].text);

        // Send the successful, parsed result back to the React app
        res.status(200).json(parsedContent);

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ message: 'An error occurred during analysis.' });
    }
}