import fetchFromNetwork from "./index";

// Fetching the required images in batch mode
export const fetchImageInBatch = async (imageUrls) => {

    const imageEndPoint = `images/`;
    
    // Creating an array of promises and resolving them using promise.all
    const fetchPromises = imageUrls.map(async (url) => {
        try {
            const response = await fetchFromNetwork(imageEndPoint + url, "GET");
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            return { [url]: imageUrl };
        } catch (error) {
            console.log(`Following error occured while fetching ${url}: `, error);
        }
    });
    
    // Execute all fetch promises in parallel
    return Promise.all(fetchPromises);
}