import { loadingImg, createNotification } from "../script.js"

class YoutubeVideo extends HTMLElement {
    constructor() {
        super();
        this.video = {
            channelName: "",
            thumbnailUrl: "",
            title: "",
            url: ""
        }
        this.downloaded = false;
        this.downloadedContent = {
            id: "sNbqN9TbdnE",
            title: "DOMINICA | GOTTA LET YOU GO (BICEP EDIT)",
            thumbnail: "downloads/thumbnails/sNbqN9TbdnE.jpg",
            video: "downloads/sNbqN9TbdnE.mp4",
            creator: "BICEP"
        }
        this.button = null
        this.buttonContent = null
        this.imageSpan = null
        this.imageContent = null
        this.videoInfo = null
        this.videoTitle = null
        this.videoChannelName = null
    }

    connectedCallback() {
        this.renderVideo()
    }

    disconnectedCallback() {
    }

    renderVideo() {
        let firstRun = false;
        if (this.button == null) {
            firstRun = true;
            this.button = document.createElement("button")
            this.button.className = "group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-gray-800 w-full"
            const videoId = this.video.url.match(/(?:v=|\/embed\/|\/\d\/|\/vi\/|youtu\.be\/|\/v\/|\/e\/|\/watch\?v=|\/watch\?.+&v=)([^#\&\?\/]{11})/);
            this.button.onclick = () => {
                if (!this.downloaded) {
                    fetch("http://127.0.0.1:8000/download/" + videoId[1]).then(response => response.json()).then(message => createNotification(this.video.title, "Sent to downloader"))
                } else {
                    window.open("http://localhost:3000/" + this.downloadedContent.id, '_blank');
                }
            }

            this.buttonContent = document.createElement("div");
            this.buttonContent.className = "flex h-16 w-24 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200"

            this.imageSpan = document.createElement("span");
            this.imageSpan.className = "tag min-w-96 max-w-96 w-96 bg-gray-800 rounded-lg text-center text-2xl font-medium text-gray-700 group-hover:text-green-900 block";

            this.imageContent = document.createElement("img");
            this.imageContent.className = "mx-auto object-contain min-w-96 max-w-96 h-full block";


            this.videoInfo = document.createElement("div")
            this.videoInfo.className = "flex flex-col items-start justify-between font-light text-white"

            this.videoTitle = document.createElement("p")
            this.videoTitle.className = "text-[15px] text-left"


            this.videoChannelName = document.createElement("span")
            this.videoChannelName.className = "text-xs font-light text-gray-400"
        }
        if (!this.downloaded) {


            this.imageContent.src = this.video.thumbnailUrl == "" ? loadingImg : this.video.thumbnailUrl
            this.videoTitle.innerText = this.video.title
            this.videoChannelName.innerText = this.video.channelName

        } else {

            this.imageContent.src = "http://localhost:8000/" + this.downloadedContent.thumbnail
            this.videoTitle.innerText = this.downloadedContent.title
            this.videoChannelName.innerText = this.downloadedContent.creator
        }

        if (firstRun) {
            this.imageSpan.appendChild(this.imageContent)
            this.buttonContent.appendChild(this.imageSpan)

            this.videoInfo.appendChild(this.videoTitle)
            this.videoInfo.appendChild(this.videoChannelName)
            this.button.appendChild(this.buttonContent)
            this.button.appendChild(this.videoInfo)
        }

        /*  const test = document.createElement("div");
          test.innerHTML = `<button class="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-gray-800 w-full">
          <div class="flex h-16 w-24 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
            <span class="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-green-900">
              <img class="w-full h-full" src="${this.video.thumbnailUrl}"/>
            </span>
          </div>
          <div class="flex flex-col items-start justify-between font-light text-white">
            <p class="text-[15px]">${this.video.title}</p>
            <span class="text-xs font-light text-gray-400">${this.video.channelName}</span>
          </div>
        </button>`*/
        this.appendChild(this.button)
    }
}

customElements.define("youtube-video", YoutubeVideo); //listed video