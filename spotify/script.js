console.log("hello from JavaScript");
let currentsong = new Audio();
let songs;
let currfolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60); 

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currfolder = folder;
    const baseURL = 'https://shubham-py404.github.io/WEB-HOSTING/spotify/';
    let response = await fetch(`${baseURL}audio/${folder}/`);
    let text = await response.text();
    let div = document.createElement("div");
    div.innerHTML = text;
    let anchors = div.getElementsByTagName("a");

    songs = [];
    for (let i = 0; i < anchors.length; i++) {
        const element = anchors[i];
        if (element.href.endsWith(".mp3")) {
            let songName = element.href.split(".mp3")[0].split(`${baseURL}audio/${folder}/`)[1];
            songs.push(songName);
        }
    }

    let songUl = document.querySelector(".songlist ul");
    songUl.innerHTML = "";
    for (const song of songs) {
        songUl.innerHTML += `
        <li>
            <img src="logos/music.svg" alt="">
            <div class="info">
                <div>${decodeURIComponent(song.replaceAll("%20", " "))}</div>
            </div>
            <div class="playnow">
                <span>Now Playing</span>
                <img class="invert play2" src="logos/play.svg" alt="">
            </div>
        </li>`;
    }

    // Add event listeners for song selection
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            let songName = e.querySelector(".info").firstElementChild.innerHTML.trim();
            playMusic(songName);
        });
    });
    return songs;
}

const playMusic = (track,pause= false) => {    
    currentsong.src = `https://shubham-py404.github.io/WEB-HOSTING/spotify/${currfolder}/` + track + ".mp3"
    if(!pause){
        currentsong.play();
        play.src = "logos/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURIComponent(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    console.log("displaying albums");
    const baseURL = 'https://shubham-py404.github.io/WEB-HOSTING/spotify/';
    let response = await fetch(`${baseURL}audio/`);
    let text = await response.text();
    let div = document.createElement("div");
    div.innerHTML = text;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".CardContainer");

    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/audio/") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[1]
            // Get the metadata of the folder
            let a = await fetch(`https://shubham-py404.github.io/WEB-HOSTING/spotify/audio/${folder}/info.json`)
            let response = await a.json(); 
            cardContainer.innerHTML = cardContainer.innerHTML + ` 
            <div data-folder="${folder}"class="card">
                <div class="playy" >
                    <span class="Buttoninner">
                        <span aria-hidden="true" class="IconWrapper">
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE">
                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                            </svg>
                        </span>
                    </span>
                </div>
                <img src="spotify/audio/${folder}/cover.jpeg" alt="song">
                <div class="infocont">
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>
                </div>
            </div>`;
        }
    }
    document.querySelector(".CardContainer").addEventListener("click",e=>{
        document.querySelector(".left").style.left=0;
    })
    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click", async (item)=>{
            // console.log(item.currentTarget.dataset);
            songs = await getSongs(`spotify/audio/${item.currentTarget.dataset.folder}`)
        })
    })

    // Handle play button inside the card
    Array.from(document.getElementsByClassName("playy")).forEach(e => {
        e.addEventListener("click", async item => {
            item.stopPropagation();
            let folder = e.closest('.card').dataset.folder;
            songs = await getSongs(folder);
            playMusic(songs[0]);
        });
    });
}

displayAlbums();

async function main() {
    await getSongs("audio");

    currentsong.src = songs[0];
    playMusic(songs[0], true);

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "logos/pause.svg";
        } else {
            currentsong.pause();
            play.src = "logos/play.svg";
        }
    });

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let TP = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = TP + "%";
        currentsong.currentTime = (currentsong.duration * TP) / 100;
    });

    document.querySelector(".ham").addEventListener("click", e => {
        document.querySelector(".left").style.left = 0;
    });

    document.querySelector(".close").addEventListener("click", e => {
        document.querySelector(".left").style.left = -120 + "%";
    });

    prev.addEventListener("click", () => {
        let index1 = songs.indexOf(currentsong.src.split("/").slice(-1)[0].replace(".mp3", ""));
        if (index1 > 0) {
            playMusic(songs[index1 - 1]);
        } else {
            playMusic(songs[songs.length - 1]);
        }
    });

    next.addEventListener("click", () => {
        let index1 = songs.indexOf(currentsong.src.split("/").slice(-1)[0].replace(".mp3", ""));
        if (index1 < songs.length - 1) {
            playMusic(songs[index1 + 1]);
        } else {
            playMusic(songs[0]);
        }
    });

    document.querySelector(".range input").addEventListener("change", e => {
        currentsong.volume = parseInt(e.target.value) / 100;
        if (currentsong.volume > 0) {
            document.querySelector(".volume img").src = "logos/volume.svg";
        } else {
            document.querySelector(".volume img").src = "logos/mute.svg";
        }
    });

    document.querySelector(".volume img").addEventListener("click", e => {
        if (e.target.src.includes("logos/volume.svg")) {
            e.target.src = "logos/mute.svg";
            currentsong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = "logos/volume.svg";
            currentsong.volume = 0.1;
            document.querySelector(".range input").value = 50;
        }
    });
}

main();
