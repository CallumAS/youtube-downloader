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

customElements.define("youtube-tabs", TabController); //current video
