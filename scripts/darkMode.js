let body_page = document.getElementsByTagName("body")[0];
let line_decoration = document.getElementsByClassName("line-decoration");
let logo = document.getElementsByClassName("logo");
let burger_icon = document.getElementsByClassName("burguer-menu");
let close_icon = document.getElementsByClassName("close-menu");
let close_icon_fs = document.getElementById("close-full-screen");
let night_mode = document.getElementById("btn_night_mode");
let page_container = document.getElementsByClassName("page-container");
let btn_new_gifos = document.getElementsByClassName("btn-new-gifos-normal");
let btn_new_gifos_hover = document.getElementsByClassName("btn-new-gifos-hover");
let btn_slider = document.getElementsByClassName("slider-icon");
let btn_slider_hover = document.getElementsByClassName("slider-icon-hover");
let search_icon = document.getElementsByClassName("search-icon");

let small_camara_tape_img = document.getElementsByClassName("small-camara-tape-img")[0];
let big_camara_tape_img = document.getElementsByClassName("big-camara-tape-img")[0];
let camara_body_img = document.getElementsByClassName("camara-body-img")[0];
let camara_tape_img = document.getElementsByClassName("camara-tape-img")[0];

let twitter_icon_normal = document.getElementsByClassName("twitter-icon-normal")[0];
let twitter_icon_hover = document.getElementsByClassName("twitter-icon-hover")[0];

night_mode.addEventListener("click", ()=>{
    page_container[0].classList.toggle("dark-mode");
    night_mode.innerHTML= night_mode.innerHTML == "Modo Nocturno" ? "Modo Diurno" : "Modo Nocturno";
    if (night_mode.innerHTML == "Modo Diurno"){
        body_page.style.background = "#37383C"; 
        line_decoration[0].style.background = "#000000";
        line_decoration[1].style.background = "#000000";
        logo[0].src = "./assets/Logo-modo-noc.svg";
        burger_icon[0].src = "./assets/burger-modo-noct.svg";
        close_icon[0].src = "./assets/close-modo-noct.svg";
        close_icon_fs.src = "./assets/close-modo-noct.svg"
        btn_new_gifos[0].src = "./assets/CTA-crear-gifo-modo-noc.svg";
        btn_new_gifos_hover[0].src = "./assets/CTA-crear-gifo-hover-modo-noc.svg";
        btn_slider[0].src = "./assets/button-slider-left-md-noct.svg";
        btn_slider_hover[0].src = "./assets/flecha-izq-noc-hover.png";
        btn_slider[1].src = "./assets/button-slider-right-md-noct.svg";
        btn_slider_hover[1].src = "./assets/flecha-der-noc-hover.png";
        search_icon[0].src = "./assets/icon-search-mod-noc.svg";
        close_suggest_icon.src = "./assets/close-modo-noct.svg";
        camara_body_img.src = "./assets/camara-modo-noc.svg";
        camara_tape_img.src = "./assets/pelicula-modo-noc.svg";

        twitter_icon_normal.style.display = "block";
        twitter_icon_hover.style.display = "none";
    }else{
        body_page.style.background = "white"; 
        line_decoration[0].style.background = "#572EE5";
        line_decoration[1].style.background = "#572EE5";
        logo[0].src = "./assets/logo-desktop.svg";
        burger_icon[0].src = "./assets/burger.svg";
        close_icon[0].src = "./assets/close.svg";
        close_icon_fs.src = "./assets/close.svg";
        btn_new_gifos[0].src = "./assets/button-crear-gifo.svg";
        btn_new_gifos_hover[0].src = "./assets/CTA-crear-gifo-hover.svg";
        btn_slider[0].src = "./assets/button-slider-left.svg";
        btn_slider_hover[0].src = "./assets/button-slider-left-hover.svg";
        btn_slider[1].src = "./assets/Button-Slider-right.svg";
        btn_slider_hover[1].src = "./assets/Button-Slider-right-hover.svg";
        search_icon[0].src = "./assets/icon-search.svg";

        close_suggest_icon.src = "./assets/close.svg";
        camara_body_img.src = "./assets/camara.svg";
        camara_tape_img.src = "./assets/pelicula.svg";

        twitter_icon_normal.style.display = "none";
        twitter_icon_hover.style.display = "block";
    }
});
