const loadingImg = "https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"

function createNotification(title, message) {
    const options = {
        type: 'basic',
        iconUrl: 'youtube.png',
        title: title,
        message: message,
    };

    chrome.notifications.create('', options, function (notificationId) {
        console.log('Notification created with ID:', notificationId);
    });
}

class CurrentVideo extends HTMLElement {
    constructor() {
        super();
        this.video = {
            channelName: "",
            thumbnailUrl: loadingImg,
            title: "",
            url: ""
        };

        this.innerDiv = document.createElement("div");
        this.innerDiv.className = "items-center";



        this.container = document.createElement("div");
        this.container.className = "mx-auto mt-11 w-80 transform overflow-hidden rounded-lg shadow-md";

        this.image = document.createElement("img");
        this.image.className = "h-48 w-full object-cover object-center";
        this.image.alt = "Product Image";

        this.contentDiv = document.createElement("div");
        this.contentDiv.className = "p-4";

        this.titleContent = document.createElement("h2");
        this.titleContent.classList = "mb-2 text-lg font-medium dark:text-white text-gray-900";

        this.description = document.createElement("p");
        this.description.className = "mb-2 text-base dark:text-gray-300 text-gray-700";


        /*  this.fileTypeSelect = document.createElement("select");
          this.fileTypeSelect.className = "block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full m-3";
          this.fileTypeSelect.required = true;
          this.fileTypeSelect.name = "integration[city_id]";
          this.fileTypeSelect.id = "integration_city_id";
  
  
  
  
          const fileTypeOption1 = document.createElement("option");
          fileTypeOption1.value = "";
          fileTypeOption1.textContent = "Selected File Type";
          const fileTypeOption2 = document.createElement("option");
          fileTypeOption2.value = "MP3";
          fileTypeOption2.textContent = "MP3";
          const fileTypeOption3 = document.createElement("option");
          fileTypeOption3.value = "MP4";
          fileTypeOption3.textContent = "MP4";
  
          this.fileTypeSelect.appendChild(fileTypeOption1);
          this.fileTypeSelect.appendChild(fileTypeOption2);
          this.fileTypeSelect.appendChild(fileTypeOption3);
  
  
  
  
          this.qualitySelect = document.createElement("select");
          this.qualitySelect.className = "block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full m-3";
          this.qualitySelect.required = true;
          this.qualitySelect.name = "integration[city_id]";
          this.qualitySelect.id = "integration_city_id";
  
          const qualityOption1 = document.createElement("option");
          qualityOption1.value = "";
          qualityOption1.textContent = "Selected Quality";
          const qualityOption2 = document.createElement("option");
          qualityOption2.value = "360";
          qualityOption2.textContent = "360";
          const qualityOption3 = document.createElement("option");
          qualityOption3.value = "720";
          qualityOption3.textContent = "720";
          const qualityOption4 = document.createElement("option");
          qualityOption4.value = "1080";
          qualityOption4.textContent = "1080";
          this.qualitySelect.appendChild(qualityOption1);
          this.qualitySelect.appendChild(qualityOption2);
          this.qualitySelect.appendChild(qualityOption3);
          this.qualitySelect.appendChild(qualityOption4);
  
  */

        this.downloadButton = document.createElement("button");
        this.downloadButton.className = "m-3 w-full bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500";

        this.openHistoyButton = document.createElement("button");
        this.openHistoyButton.className = "m-3 w-full bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500";
        this.openHistoyButton.textContent = "HISTORY";
        this.openHistoyButton.onclick = () => {
            window.open("http://localhost:3000/", '_blank');
        }

        /*
                this.fileTypeError = document.createElement("p");
                this.fileTypeError.className = "text-sm text-red-500 hidden mt-3";
                this.fileTypeError.id = "error";
                this.fileTypeError.textContent = "Please fill out this field.";
        
        
        
        
                this.qualityError = document.createElement("p");
                this.qualityError.className = "text-sm text-red-500 hidden mt-3";
                this.qualityError.id = "error";
                this.qualityError.textContent = "Please fill out this field.";*/

        //   this.innerDiv.appendChild(this.fileTypeSelect);
        // this.innerDiv.appendChild(this.fileTypeError);
        //this.innerDiv.appendChild(this.qualitySelect);
        //this.innerDiv.appendChild(this.qualityError);
        this.innerDiv.appendChild(this.downloadButton);
        this.innerDiv.appendChild(this.openHistoyButton);

        this.contentDiv.appendChild(this.titleContent);
        this.contentDiv.appendChild(this.description);
        this.contentDiv.appendChild(this.innerDiv);

        this.container.appendChild(this.image);
        this.container.appendChild(this.contentDiv);

    }

    setVideo(video) {
        if (video.url != this.video.url || video.channelName != this.video.channelName) {
            this.video = video;
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
    }

    render() {
        this.image.src = this.video.thumbnailUrl;
        this.titleContent.innerText = this.video.title;
        this.description.innerText = this.video.channelName;




        this.downloadButton.textContent = "DOWNLOAD";
        const videoId = this.video.url.match(/(?:v=|\/embed\/|\/\d\/|\/vi\/|youtu\.be\/|\/v\/|\/e\/|\/watch\?v=|\/watch\?.+&v=)([^#\&\?\/]{11})/);
        this.downloadButton.onclick = () => {
            fetch("http://127.0.0.1:8000/download/" + videoId[1]).then(response => response.json()).then(message => {



                createNotification(this.video.title, "Sent to downloader");
            })
        }
        if (this.childNodes.length <= 0) {
            this.appendChild(this.container);
        }

    }
}

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


class TabController extends HTMLElement {
    constructor() {
        super();

        this.recommendedVideos = document.createElement("youtube-recommended");
        this.recommendedVideos.className = "w-full";

        this.downloadedVideos = document.createElement("youtube-history");
        this.downloadedVideos.className = "w-full";

        this.currentVideo = document.createElement("youtube-current");
        this.currentVideo.className = "w-full";

        this.selected = this.selected || this.currentVideo;
        this.selectedType = "current";
    }

    connectedCallback() {
        this.render();
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.recommendedVideos) {
                //   console.log("Recommended Videos:", message.recommendedVideos);
                console.log("Current:", message.current);
                fetch("http://127.0.0.1:8000/").then(data => data.json()).then(content => this.downloadedVideos.setHistory(content))
                this.recommendedVideos.setRecommended(message.recommendedVideos)
                this.currentVideo.setVideo(message.current);
                // You can process or send the data to the popup or perform any other action here
            }
        });
    }

    disconnectedCallback() {
        // Clean up any resources or event listeners here
    }
    switchTab(item) {
        switch (item) {
            case "current":
                this.selected = this.currentVideo;
                break;
            case "recommended":
                this.selected = this.recommendedVideos;
                break;
            case "history":
                this.selected = this.downloadedVideos;
                break;
        }
        this.selectedType = item;
        this.render(); // Update the selected tab
    }

    render() {
        this.innerHTML = ''; // Clear the existing content

        const controller = document.createElement("div");
        controller.className = "relative w-96 h-96 flex flex-col m-2";

        const innerContainer = document.createElement("div");
        innerContainer.className = "flex flex-col border-b-2 border-gray-800";





        const ul = document.createElement("ul");
        ul.className = "flex items-center gap-2 text-sm font-medium mx-auto m-2";

        const li1 = document.createElement("li");
        li1.className = "flex-1";

        const a1 = document.createElement("a");
        a1.onclick = () => this.switchTab("current");
        a1.className = this.selectedType == "current" ? "relative flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-white" : "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-700 hover:text-white";
        a1.textContent = "CURRENT";

        const li2 = document.createElement("li");
        li2.className = "flex-1";

        const a2 = document.createElement("a");
        a2.onclick = () => this.switchTab("recommended");
        a2.className = this.selectedType == "recommended" ? "relative flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-white" : "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-700 hover:text-white";
        a2.textContent = "RECOMMENDED";

        const li3 = document.createElement("li");
        li3.className = "flex-1";

        const a3 = document.createElement("a");
        a3.onclick = () => this.switchTab("history");
        a3.className = this.selectedType == "history" ? "relative flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-white" : "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-700 hover:text-white";
        a3.textContent = "HISTORY";

        const divContainer = document.createElement("div");
        divContainer.className = "mb-auto flex flex-col items-center justify-center m-2";



        // Append the elements to build the desired structure
        li1.appendChild(a1);
        li2.appendChild(a2);
        li3.appendChild(a3);
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        innerContainer.appendChild(ul);
        divContainer.appendChild(this.selected);
        controller.appendChild(innerContainer);
        controller.appendChild(divContainer);
        this.appendChild(controller);
    }
}


customElements.define("youtube-current", CurrentVideo); //current video
customElements.define("youtube-recommended", YoutubeRecommended); //recommended/history section
customElements.define("youtube-history", YoutubeHistory); //recommended/history section
customElements.define("youtube-video", YoutubeVideo); //listed video
customElements.define("youtube-tabs", TabController); //current video

function fetchNotifications() {
    fetch('http://localhost:8000/notifications')
        .then(response => response.json())
        .then(data => {
            data.map(notification => {
                createNotification(notification.title, notification.description);

            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Call the fetchData function every 1 second
setInterval(fetchNotifications, 1000);