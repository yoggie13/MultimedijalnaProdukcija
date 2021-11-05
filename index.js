var icons = document.getElementsByClassName("fas fa-chevron-down");
var displayControl = document.getElementsByClassName("display-control");
var src = "src/";

function move(number) {
    window.scrollTo({
        left: 0,
        top: number * window.innerHeight,
        behavior: "smooth"
    });

    for (let i = 0; i < displayControl.length; i++) {
        displayControl[i].style.animation = "none";
    }

    if (number != 0)
        displayControl[number - 1].style.animation = "fadeInText 1.1s";


}
//scroll-uje na sledeću sekciju pritiskom da strlicu na erknau
for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", function() {
        move((Math.round(pageYOffset / window.innerHeight) + 1));
    });
}

//scroll-uje na sledeću/prethodnu sekciju na pritisak donje/gornje strelice na tastaturi
window.addEventListener("keydown", function(event) {
    var i = (Math.round(pageYOffset / window.innerHeight));
    if (event.key == "ArrowDown") {
        event.preventDefault();
        move((Math.round(pageYOffset / window.innerHeight) + 1));
    } else if (event.key == "ArrowUp") {
        event.preventDefault();
        move((Math.round(pageYOffset / window.innerHeight) - 1));
    }
});

//poziva otvaranje popup-a kada klip dođe do kraja
var video = document.getElementsByTagName("video")[0];
video.ontimeupdate = (event) => {

    if (video.currentTime > (video.duration - 3)) {
        if (video.src.includes("src/4.0.mp4")) {
            video.src = src + "7.1.mp4";
            klip = 7;
            video.currentTime = 0;
            video.play();

        } else if (video.src.includes("src/6.0.mp4")) {
            video.src = src + "7.0.mp4";
            klip++;
            video.currentTime = 0;
            video.play();
        } else if (video.src.includes("8.0.mp4")) {
            video.src = src + "9.0.mp4";
            video.currentTime = 0;
            video.play();
        } else if (video.src.includes("8.1.mp4")) {
            klip = 8;
            openModal();
        } else openModal();
    }
};

var options = document.getElementsByClassName("option");
var klip = 0;

var pitanja = [
    "Uff, da l' da pogledam malo telefon...",
    "Hmm, mogao bih nešto da pojedem",
    "Šta je jedno pivo, malo da se iskuliram",
    "Gde je jedno, tu su dva... hehe",
    "Valja uzeti još jedno",
    "Valja uzeti još jedno",
    "Valja uzeti još jedno",
    "A jeste rano, da li da nastavim da spavam?",
    "The End"
];
var opcijeJedan = [
    "Ustani iz kreveta",
    "Ustani do frižidera",
    "Ma uzmi",
    "Ma uči bre",
    "Idemo još jedno",
    "Idemo još jedno",
    "Idemo još jedno",
    "Ma idemo na ispit!",
    "Ponovo!"
];
var opcijeDva = [
    "Listaj Instagram",
    "Ma uči",
    "Ma uči bre",
    "Ma uzmi",
    "Sad nema nazad",
    "Sad nema nazad",
    "Sad nema nazad",
    "Ma daj da dremnem ja još malo",
    "Završi"
];


for (let j = 0; j < options.length; j++) {
    options[j].addEventListener("click", function() {

        klip++;

        if ((klip == 2 || klip == 3) && j == 1) {
            video.src = src + "7.1.mp4";
            klip = 7;
        } else if (video.src.includes("7.1.mp4")) {
            src += "nijepio/";
            klip = 8;
            video.src = src + `8.${j}.mp4`;

        } else if (video.src.includes("7.0.mp4")) {
            src += "pio/";
            klip = 8;
            video.src = src + `8.${j}.mp4`;

        } else if (video.src.includes("9.0.mp4") || video.src.includes("8.1.mp4")) {
            if (j == 0) {
                src = "src/";
                video.src = src + "0.mp4";
                klip = 0;
            } else
                move(3);
        } else {
            if (klip == 5 || klip == 6)
                j = 0;
            video.src = src + `${klip}` + "." + `${j}.mp4`;
        }

        closeModal();
        video.currentTime = 0;
        video.play();

    });
}

var modal = document.getElementById("modal");

//otvara popup i namešta pitanje i opcije
function openModal() {
    modal.style.display = "grid";
    document.getElementById('modalHeading').innerHTML = pitanja[klip];
    document.getElementById('option1').innerHTML = opcijeJedan[klip];
    document.getElementById('option2').innerHTML = opcijeDva[klip];
}

//zatvara popup
function closeModal() {
    modal.style.display = "none";
}

//namešta popup da bude iste veličine kao player
window.onload = () => {
    var videoTop = document.getElementById("video-tag").offsetTop;
    var modalTop = videoTop + "px";
    document.getElementById("modal").style.top = modalTop;
};

//namešta popup da bude iste veličine kao player pri promeni veličine ekrana
window.addEventListener("resize", function() {
    var videoTop = document.getElementById("video-tag").offsetTop;
    var modalTop = videoTop + "px";
    document.getElementById("modal").style.top = modalTop;
});

//pušta klip kada se ceo player prikaže korisniku
//pauzira klip kada player krene da izlazi iz vidokruga
//ukoliko je klip gotov ne radi ništa
window.addEventListener("scroll", function() {
    var video = document.getElementById("video-tag");
    var position = video.getBoundingClientRect();

    if (video.currentTime !== video.duration) {
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
            video.play();
        } else {
            video.pause();
        }
    }

});

document.getElementById("instruction").addEventListener("click", function() {
    move(1);
});
document.getElementById("videonav").addEventListener("click", function() {
    move(2);
});
document.getElementById("team").addEventListener("click", function() {
    move(3);
});