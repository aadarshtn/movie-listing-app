import fetchFromNetwork from "./index";

// Fetching the application data
export const fetchMovieData = async (pageNo) => {
    const dataEndPoint = `data/page${pageNo}.json`;
    try {
        const movieData = await fetchFromNetwork(dataEndPoint, "GET");
        return movieData;
    } catch (error) {
        console.log("Following error occured while fetching movie data: ", error);
    }
}