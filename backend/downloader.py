import asyncio
import os
import queue
from threading import Thread, Event
import aiohttp

import yt_dlp

from database import Database


async def download_thumbnail(video_id):
    thumbnail_url = f"https://img.youtube.com/vi/{video_id}/0.jpg"
    async with aiohttp.ClientSession() as session:
        async with session.get(thumbnail_url) as response:
            if response.status == 200:
                folder_path = "downloads/thumbnails"
                os.makedirs(folder_path, exist_ok=True)
                file_path = os.path.join(folder_path, video_id + ".jpg")
                with open(file_path, "wb") as file:
                    while True:
                        chunk = await response.content.read(1024)
                        if not chunk:
                            break
                        file.write(chunk)
                return True, file_path
            else:
                return False, None


def download_video(url):
    try:
        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
            'outtmpl': os.path.join('downloads', '%(id)s.%(ext)s'),
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=True)
            video_id = info_dict.get('id', 'Unknown')
            video_title = info_dict.get('title', 'Unknown')
            video_author = info_dict.get('uploader', 'Unknown')

        file_directory = os.path.join('downloads', f'{video_id}.mp4')
        return True, file_directory, video_title, video_author
    except Exception as e:
        print(f"Error occurred while downloading the video: {str(e)}")
        return False, None, None, None


class DownloadQueue:
    def __init__(self):
        self.notifications = []
        self.queue = queue.Queue()
        self._event_loop = asyncio.new_event_loop()
        self.condition = asyncio.Condition()
        self._thread = Thread(target=self._run_thread)
        self._thread.start()
        self.db = Database('history.db')


    def history(self):
        return self.db.retrieve_entries()

    def enqueue(self, item):
        asyncio.run_coroutine_threadsafe(self._enqueue(item), self._event_loop)

    def enqueue(self, item):
        self.queue.put(item)

    async def dequeue(self):
        while True:
            item = await self._event_loop.run_in_executor(None, self.queue.get)
            yield item

    def _run_thread(self):
        self._event_loop.run_until_complete(self._run())

    def add_notification(self, title, description):
        self.notifications.append({"title": title, "description": description})

    def clear_notifications(self):
        self.notifications.clear()

    def get_notifications(self):
        return self.notifications
    
    async def _run(self):
        async for item in self.dequeue():
            print("Processing:", item)

            video_url = 'https://www.youtube.com/watch?v=' + item
            success, file_directory, title, author = download_video(video_url)

            thumb_success, thumb_file = await download_thumbnail(item)
            if success and thumb_success:
                if self.db.insert_entry(item, title, thumb_file, file_directory, author):
                    self.add_notification(title, "successfully Downloaded")
                else:
                    self.add_notification(title, "Already Downloaded")
            else:
                self.add_notification(title, "Failed to Downloaded")

