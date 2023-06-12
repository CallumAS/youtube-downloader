# YouTube Downloader

Download your favorite YouTube videos for easy offline access.

## Example
- Video: [https://www.veed.io/embed/beb946c4-9d9a-4966-9d77-49610d383cb1](https://www.veed.io/embed/beb946c4-9d9a-4966-9d77-49610d383cb1)
- Images: [https://imgur.com/a/85LJNyJ](https://imgur.com/a/85LJNyJ)

## Installation

1. Make sure FFMPEG is installed on your machine. Follow the installation instructions for your operating system:
   - [Windows](https://www.wikihow.com/Install-FFmpeg-on-Windows)
   - [macOS](https://www.hostinger.com/tutorials/how-to-install-ffmpeg)

2. Clone the repository or download the source code or release.

### Running the Backend

1. Open a terminal or command prompt.

2. Navigate to the directory where you want to create the virtual environment.

3. Create a new virtual environment by running the following command:
   ```bash
   python3 -m venv myenv
   ```

4. Activate the virtual environment. The activation command depends on your operating system:
   - For Windows:
     ```bash
     myenv\Scripts\activate
     ```
   - For macOS and Linux:
     ```bash
     source myenv/bin/activate
     ```

5. With the virtual environment activated, install the dependencies using pip. If you have a `requirements.txt` file containing the dependencies, run the following command:
   ```bash
   pip install -r requirements.txt
   ```


6. Run the application using the following command:
   ```bash
   uvicorn main:app --reload
   ```

### Downloading Extension Instructions

1. Click the puzzle icon in the top right corner of Chrome.

   ![puzzle icon](https://github.com/CallumAS/youtube-downloader/assets/53473235/124efa9c-51b4-48d9-a701-3e84f716b7c9)

2. Install the extension by navigating to the "Manage Extensions" section.

   ![manage extensions](https://github.com/CallumAS/youtube-downloader/assets/53473235/62d0167b-9def-4dfd-bc09-54640674f705)

3. Enable developer mode.

4. Load the unpacked extension and select the plugin folder.

## How to Use

- Watch the video guide on how to use the plugin [here](https://www.veed.io/embed/beb946c4-9d9a-4966-9d77-49610d383cb1).


### Contribution

- [Sara](https://github.com/saranatour1): Testing on Windows and improving documentation.
