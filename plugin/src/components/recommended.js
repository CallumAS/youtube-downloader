class YoutubeRecommended extends HTMLElement {
    constructor() {
        super();
        this.content = new Map()
    }
    setRecommended(data) {
        data.map(video => {
            if (this.content.get(video.url) == null) {

                const youtubeVideo = document.createElement("youtube-video");
                youtubeVideo.video = video
                youtubeVideo.renderVideo();
                this.appendChild(youtubeVideo)
                this.content.set(video.url, youtubeVideo)
            } else if (this.content.get(video.url).video.thumbnailUrl === "" && video.thumbnailUrl != "") {
                this.content.get(video.url).video = video;
                this.content.get(video.url).renderVideo()
            }
        })
    }
    connectedCallback() {

    }

    disconnectedCallback() {
    }


}


customElements.define("youtube-recommended", YoutubeRecommended); //recommended/history section