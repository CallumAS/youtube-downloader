class YoutubeHistory extends HTMLElement {
    constructor() {
        super();
        this.content = new Map()
    }
    setHistory(data) {
        data.reverse().map(video => {
            if (this.content.get(video.id) == null) {

                const youtubeVideo = document.createElement("youtube-video");
                youtubeVideo.downloaded = true
                youtubeVideo.downloadedContent = video
                youtubeVideo.renderVideo();
                this.appendChild(youtubeVideo)
                this.content.set(video.id, youtubeVideo)
            } else if (this.content.get(video.id).downloadedContent.thumbnail === "" && video.thumbnail != "") {
                this.content.get(video.id).downloadedContent = video;
                this.content.get(video.id).renderVideo()
            }
        })
    }
    connectedCallback() {

    }

    disconnectedCallback() {
    }


}
customElements.define("youtube-history", YoutubeHistory); //recommended/history section
