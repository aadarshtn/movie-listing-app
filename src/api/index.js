

// Base URL
const BASE_API_URL = "https://test.create.diagnal.com";

const fetchFromNetwork = async (endPoint, method, body = null, headers = {}) => {

    // Generating the required url using a combination of common base path and required endpoint
    const url = `${BASE_API_URL}/${endPoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    try {
        const response = await fetch(url, options);

        // Handling responses outside 2xx
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Convert the response to JSON if the response type contains json keyword, Else use it as it is for Images
        if (response.headers.get('Content-Type')?.includes('application/json')) {
            return await response.json();
        }

        return response;
    } catch (error) {
        console.error(`API call failed: ${error}`);
        // This second throw is made to handle errors on funcional component level
        throw error;
    }

}

export default fetchFromNetwork;