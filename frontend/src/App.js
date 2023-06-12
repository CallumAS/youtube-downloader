import { fetchHistory, downloadVideo, baseUrl } from './client/backendclient';
import { useState, useEffect } from 'react';

const Card = ({ video, onClick }) => (
  <a onClick={onClick}>
    <div className="mx-5 mb-5 relative justify-center items-center">
      <img className="rounded-t-lg bg-cover" src={baseUrl + "/" + video.thumbnail} alt="" />
      <div className="bottom-0 left-0 w-full p-4 accent rounded-b-lg">
        <p className="text-sm text-white font-bold">{video.title}</p>
        <p className="text-sm text-gray-400">{video.creator}</p>
      </div>
    </div>
  </a>
)

const Player = ({ selected }) => (
  <div className="col-span-12 rounded-lg sm:col-span-9">
    <div className="relative accent rounded-xl shadow-xl ">
      <video src={baseUrl + "/video/" + selected.id} controls className="w-full rounded-xl rounded-bl-none rounded-br-none"></video>
      <div className="p-6">
        <h2 className="text-white text-2xl font-semibold mb-2">{selected.title}</h2>
        <p className="text-gray-400 text-sm">{selected.creator}</p>
      </div>
    </div>
  </div>
)

const Resolver = ({ }) => {
  const [url, setUrl] = useState("");
  return (
    <div className="">
      <div className="relative w-96">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" onChange={(e) => setUrl(e.target.value)} value={url} id="default-search" className="block p-4 pl-10 w-full text-sm text-white accent rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Youtube URL..." required />
        <button type="submit" onClick={async () => {
          await downloadVideo(url)
        }} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>
      </div>
    </div>
  )
}

function App() {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);




  useEffect(() => {
    let linkVideoId = window.location.pathname.substring(1)


    const fetchData = async () => {
      const data = await fetchHistory();
      setHistory(data.reverse());
      if (selected == null) {
        if (linkVideoId == "") {
          setSelected(data[0])
        } else {
          data.forEach(video => {
            if (video.id === linkVideoId) {
              setSelected(video);
              return;
            }
          });
          if (selected == null) {
            setSelected(data[0])
          }
        }
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <nav className="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between accent shadow sm:items-baseline m-12 rounded-xl">
        <div className="m-2 sm:mb-0 inner">

          <a href="/home" className="text-2xl no-underline text-white hover:text-blue-300 font-sans font-bold">Youtube Downloader</a><br />
          <span className="text-xs text-gray-400">Downloading since 2023</span>

        </div>

        <div className="sm:mb-0 self-center">
          <Resolver />

        </div>
      </nav>
      <div className="mx-auto grid grid-cols-12 gap-4 h-screen p-12">
        {
          selected == null ? (<div className="absolute inset-0 flex items-center justify-center">
            <p className="text-center text-white">No downloaded content</p>
          </div>) : (
            <Player selected={selected} />
          )
        }
        <div className="col-span-12 rounded-lg sm:col-span-3 overflow-y-auto">
          {
            history.map(video => video.id == selected.id ? "" : (
              <Card key={video.id} video={video} onClick={() => setSelected(video)} />

            ))
          }
        </div>

      </div>
    </div >
  );
}

export default App;
