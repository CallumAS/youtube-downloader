import { loadingImg, createNotification } from "../script.js"

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

customElements.define("youtube-current", CurrentVideo); //current video
