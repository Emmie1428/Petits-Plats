export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
}
