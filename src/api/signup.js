// api/signup.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch('https://redesigned-space-adventure-7pjjgwgxg95cpjp7-3001.app.github.dev/api/signup', {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                ...req.headers, // Forward headers from the client if needed
            },
            body: JSON.stringify(req.body), // Forward body from the client
        });

        const data = await response.json();

        // Send the API's response back to the client
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
}
