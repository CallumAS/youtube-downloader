function extractRecommendedVideos() {
    if (document.querySelector("#contents") != null) {

        const recommendedSection = document.querySelector("#related");
        const videoElements = recommendedSection.querySelectorAll("#dismissible");

        const recommendedVideos = Array.from(videoElements).map(videoElement => {
            const titleElement = videoElement.querySelector("#video-title");
            const title = titleElement ? titleElement.innerText : "";
            const thumbnailElement = videoElement.querySelector("#thumbnail");
            const url = thumbnailElement.href;
            let thumbnailUrl = ""
            // var url = window.location.href
            const videoId = url.match(/(?:v=|\/embed\/|\/\d\/|\/vi\/|youtu\.be\/|\/v\/|\/e\/|\/watch\?v=|\/watch\?.+&v=)([^#\&\?\/]{11})/);
            if (videoId != null && videoId.length > 0) {
                thumbnailUrl = `https://img.youtube.com/vi/${videoId[1]}/0.jpg`;
            } else {
                thumbnailUrl = thumbnailElement.querySelector("yt-image > img").src;
            }

            thumbnailUrl = (thumbnailUrl === "") ? "" : thumbnailUrl;
            const channelNameElement = videoElement.querySelector("#channel-name");
            const channelName = channelNameElement.querySelector("#text").innerText

            return { title: title, channelName: channelName, url: url, thumbnailUrl: thumbnailUrl };
        });
        return recommendedVideos;
    }
    return null
}

function extractCurrentVideo() {
    var url = window.location.href
    const videoId = url.match(/(?:v=|\/embed\/|\/\d\/|\/vi\/|youtu\.be\/|\/v\/|\/e\/|\/watch\?v=|\/watch\?.+&v=)([^#\&\?\/]{11})/);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId[1]}/0.jpg`;

    var fold = document.querySelector("#above-the-fold")

    var title = fold.querySelector("#title > h1 > yt-formatted-string").innerText
    var creator = fold.querySelector("#text > a").innerHTML
    console.log(title)
    console.log(creator)
    return { title: title, channelName: creator, thumbnailUrl: thumbnailUrl, url: url }

}

// Call the fetchData function every 1 second
// Send extracted data to the background script
setInterval(() => {
    var results = extractRecommendedVideos();
    if (results != null) {
        chrome.runtime.sendMessage({ recommendedVideos: results, current: extractCurrentVideo() });
    }
}, 1000);

