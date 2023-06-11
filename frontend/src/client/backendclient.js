const baseUrl = "http://127.0.0.1:8000";

export async function fetchHistory() {
    try {
        const response = await fetch(`${baseUrl}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        return [];
    }
}

export function fetchVideo(videoId) {
    fetch(`${baseUrl}/video/${videoId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const videoUrl = URL.createObjectURL(blob);
            // Use the videoUrl to display the video or perform any further processing
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

export function downloadVideo(videoId) {
    fetch(`${baseUrl}/download/${videoId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Process the download message here
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Usage examples:
fetchHistory();
fetchVideo("video123");
downloadVideo("video456");