const path = "http://localhost:8001";
let songMap = new Map();
let playlistMap = new Map();

class Player {
  constructor(audio, source) {
    this.audio = audio;
    this.source = source;
    this.songName = null;
  }

  setSong(songName) {
    this.songName = songName;
    this.source.src = `${path}/songs/${songName}.mp3`;
    this.audio.load();
    this.audio.play();
  }

  getSongName() {
    return this.songName;
  }

  loopCurrentSong() {
    this.audio.loop = true;
  }

  unLoopCurrentSong() {
    this.audio.loop = false;
  }

}

const song = document.getElementById("player");
const source = song.children[0];
const player = new Player(song, source);

/* button logic */

function playSong() {
  if (player.songName != null && player.songName != undefined) player.audio.play();
}

function nextSong() {

}

/* on document load */

function registerSongs() {
  fetch('./songs/')
   .then(response => response.json())
    .then(songs => {
      for (const song of songs) {
        songMap.set(song.name.toLowerCase(), song);
      }
    })
     .catch(err => console.error(err));
}

function createPlaylistElements() {
  const list = document.getElementById("songList");
  for (const playlist of playlistMap) {
    let html = `
    <li class="pointless">
      <div class="box mt-3">
        <div class="row">
          <div class="col-sm-3">
            <img src="${path}/images/${playlist[1].image}" class="rounded border border-vrr shadow" alt="${playlist[1].name}" width="75%">
          </div>
          <div class="col-sm-6" style="margin-top: 7%;">
            <h3>${playlist[1].name}</h3>
          </div>
        </div>
      </div>
      <hr>
    </li>
    `;
    list.innerHTML += html;
  }

}

function registerPlaylists() {
  fetch('./playlists/')
  .then(response => response.json())
   .then(playlists => {
     for (const playlist of playlists) {
       playlistMap.set(playlist.name.toLowerCase(), playlist);
     }

     createPlaylistElements();

   })
    .catch(err => console.error(err));
}

window.addEventListener('load', (event) => {

  registerSongs();
  registerPlaylists();

});
