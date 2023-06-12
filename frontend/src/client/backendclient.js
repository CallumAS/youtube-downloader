export const baseUrl = "http://127.0.0.1:8000";

export async function fetchHistory() {
    try {
        const response = await fetch(`${baseUrl}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        return [];
    }
}

export async function downloadVideo(video) {
    const videoId = video.match(/(?:v=|\/embed\/|\/\d\/|\/vi\/|youtu\.be\/|\/v\/|\/e\/|\/watch\?v=|\/watch\?.+&v=)([^#\&\?\/]{11})/);

    const response = await fetch(`${baseUrl}/download/${videoId[1]}`);
    const data = await response.json();
    return data;
}