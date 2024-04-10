let musicList = [
    { songName:"Aasan Nahin Yahan", filePath:"AllSong/Aasan Nahin Yahan.mp3", songLogo:"AllLogo/Aashiqui_2.jpeg" },
    { songName:"Bhula Dena", filePath:"AllSong/Bhula Dena.mp3", songLogo:"AllLogo/Aashiqui_2.jpeg" },
    { songName:"Chahun Main Ya Naa", filePath:"AllSong/Chahun Main Ya Naa.mp3", songLogo:"AllLogo/Aashiqui_2.jpeg" },
    { songName:"Dil Di Kitaab", filePath:"AllSong/Dil Di Kitaab.mp3", songLogo:"AllLogo/Dil-Khitab.jpg" },
    { songName:"Dj hans", filePath:"AllSong/dj hans.mpeg", songLogo:"AllLogo/img1.jpg" },
    { songName:"Hum Mar Jayenge", filePath:"AllSong/Hum Mar Jayenge.mp3", songLogo:"AllLogo/Aashiqui_2.jpeg" },
    { songName:"Khairiyat (Sad)", filePath:"AllSong/Khairiyat (Sad) - Chhichhore 320 Kbps.mp3", songLogo:"AllLogo/Khairiyat-1.jpg" },
    { songName:"Milne Hai Mujhse Aayi", filePath:"AllSong/Milne Hai Mujhse Aayi.mp3", songLogo:"AllLogo/Aashiqui_2.jpeg" },
    { songName:"Sunn Raha Hai (Male)", filePath:"AllSong/Sunn Raha Hai (Male).mp3", songLogo:"AllLogo/Aashiqui_2.jpeg" },
    { songName:"Tum Hi ho", filePath:"AllSong/Tum Hi ho.mp3", songLogo:"AllLogo/Aashiqui_2.jpeg" }
]; 

//Initial Song Handle
let song = new Audio("AllSong/Aasan Nahin Yahan.mp3");
let showImg = document.querySelector('.showImg img');
let musicShow = document.querySelector('.musicShow');
musicShow.firstElementChild.setAttribute("src",musicList[0].songLogo);
musicShow.firstElementChild.nextElementSibling.innerHTML = musicList[0].songName;

//Time Show Handle
let minute = document.getElementById('minute');
let second = document.getElementById('second');
let lastMinute = document.getElementById('lastMinute');
let lastSecond = document.getElementById('lastSecond');

//Responsive Code
let respLogo = document.querySelector(".resMusicShow");
let respImage = document.querySelector(".respImage img");
let respoPlay = document.querySelector(".respoPlay");
let respoSongName = document.querySelector(".respoSongName");

//Initializing Logo And Song Name In The HTML
let allMusic = Array.from(document.querySelectorAll(".music"));
allMusic.forEach((elem,ind)=>{
    elem.firstElementChild.setAttribute('src',musicList[ind].songLogo);
    elem.firstElementChild.nextElementSibling.innerHTML = musicList[ind].songName;
});

//Handle Progress Bar Both Responsive As Well As Non-Responsive
let progressBar = document.querySelector('#prgBar');
let respoProgressBar = document.querySelector('.prgBar');
progressBar.addEventListener("click",()=>{
    song.currentTime = parseInt((progressBar.value * song.duration) / 100);
    progressBar.value = (song.currentTime / song.duration) * 100;
})
respoProgressBar.addEventListener("click",()=>{
    song.currentTime = parseInt((respoProgressBar.value * song.duration) / 100);
    respoProgressBar.value = (song.currentTime / song.duration) * 100;
})

//Left Button handle Of Al Song
let leftPlayBtn = Array.from(document.querySelectorAll(".leftPlay"));

//Pause All Song Before Play A song
let pauseAll = ()=>{
    leftPlayBtn.forEach((elm)=>{
        play(elm);
        play(rightPlayBtn)
        song.pause();
    })
};

//Song Play Function
let songPlay = (ind)=>{
    song = new Audio(musicList[ind].filePath);
    song.play();
    musicShow.firstElementChild.setAttribute("src",musicList[ind].songLogo);
    musicShow.firstElementChild.nextElementSibling.innerHTML = musicList[ind].songName;

    //Responsive Div Song Name And Logo Change
    respLogo.firstElementChild.setAttribute('src',musicList[ind].songLogo);
    respoSongName.innerHTML = musicList[ind].songName;
};

//Time Change Function
let sec2 = 0;
const changeTime = ()=>{
    let sec = parseInt(song.currentTime);
    let min = parseInt(sec / 60);
    let lastMin = parseInt((song.duration / 60));
    let lastsec = parseInt(song.duration % 60);
    sec2 = sec % 60;
    minute.innerHTML = min + " :";
    second.innerHTML = sec2;
    lastMinute.innerHTML = `${lastMin} : `;
    lastSecond.innerHTML = lastsec;
}

//Left Song Play And Pause Handle
let elem1;
let index;
let index2;
leftPlayBtn.forEach((elem,ind)=>{
    elem.addEventListener("click",()=>{
        if(elem.classList.contains("fa-play")){
            pauseAll();
            elem1 = elem;
            songPlay(ind);
            index = ind;
            index2 = ind;
            song.addEventListener('timeupdate',()=>{
                changeTime();
                progressBar.value = (song.currentTime / song.duration) * 100;
                respoProgressBar.value = (song.currentTime / song.duration) * 100;
                if(progressBar.value == "100" || respoProgressBar.value == "100"){
                    play(elem);
                    play(rightPlayBtn);
                    play(respoPlay);
                }
            });
            pause(elem);
            pause(rightPlayBtn);
            pause(respoPlay);
        }
        else{
            song.pause();
            play(elem);
            play(rightPlayBtn);
            play(respoPlay);
        }
    });
});

//Respoonsive Button Handle
respoPlay.addEventListener("click",()=>{
    if(respoPlay.classList.contains("fa-play")){
        song.play();
        pause(respoPlay);
        pause(leftPlayBtn[index]);
    }
    else{
        song.pause();
        play(respoPlay);
        play(leftPlayBtn[index]);
    }
});

//Right Button Play Pause Handle
let first = 1;
let rightPlayBtn = document.querySelector(".rightPlay");
let leftCallFunc = (event)=>{
    if(event.target.classList.contains("fa-play")){
        song.play();
        pause(rightPlayBtn);
        pause(leftPlayBtn[index]);
    }
    else{
        song.pause();
        play(rightPlayBtn);
        play(leftPlayBtn[index]);
    }
};

rightPlayBtn.addEventListener("click",leftCallFunc);

//Change Icon Of Play And Pause And Image Of Song While Playing
const pause = (riPau)=>{
    showImg.setAttribute("src","img6.gif");
    respImage.setAttribute("src","img6.gif");
    showImg.style.opacity = 0.8;
    riPau.classList.remove('fa-play');
    riPau.classList.add('fa-pause');
};
const play = (lePla)=>{
    showImg.setAttribute("src","img7.jpg")
    respImage.setAttribute("src","img7.jpg");
    showImg.style.opacity = 0.6;
    lePla.classList.add('fa-play');
    lePla.classList.remove('fa-pause');
    progressBar.value = "0";
};

//Handle Forward and Backward Button
let back = document.querySelector(".back");
back.addEventListener("click",()=>{
    if(index == 0){
        back.setAttribute("disabled",null)
    }
    else{
        if(index2 <= musicList.length){
            checkDisabled2();
        }
        if(leftPlayBtn[index].classList.contains("fa-play")){
            pauseAll();
            index--;
            index2 = index;
            elem1 = index;
            songPlay(index);
            song.addEventListener('timeupdate',()=>{
                progressBar.value = (song.currentTime / song.duration) * 100;
                changeTime();
                if(progressBar.value == "100"){
                    play(leftPlayBtn[index]);
                    play(rightPlayBtn)
                }
            });
            pause(leftPlayBtn[index]);
            pause(rightPlayBtn);
        }
        else{
            song.pause();
            play(leftPlayBtn[index]);
            play(rightPlayBtn);
        }
    }
});

let forw = document.querySelector(".forw");
forw.addEventListener("click",()=>{
    if(index2 === musicList.length-1){
        forw.setAttribute("disabled",null)
    }
    else{
        if(index >= 0){
            checkDisabled();
        }
        if(leftPlayBtn[index2].classList.contains("fa-play")){
            pauseAll();
            index2++;
            index = index2;
            elem1 = index2;
            songPlay(index2);
            song.addEventListener('timeupdate',()=>{
                progressBar.value = (song.currentTime / song.duration) * 100;
                changeTime();
                if(progressBar.value == "100"){
                    play(leftPlayBtn[index2]);
                    play(rightPlayBtn)
                }
            });
            pause(leftPlayBtn[index2]);
            pause(rightPlayBtn);
        }
        else{
            song.pause();
            play(leftPlayBtn[index2]);
            play(rightPlayBtn);
        }
    }
});
 //Hnadle Forward And Backward When Song Has finished
const checkDisabled = ()=>{
    if(back.hasAttribute("disabled")){
        back.removeAttribute("disabled");
    }
};
const checkDisabled2 = ()=>{
    if(forw.hasAttribute("disabled")){
        forw.removeAttribute("disabled");
    }
};



