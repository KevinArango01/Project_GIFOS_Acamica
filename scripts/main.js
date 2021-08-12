window.onload = function() {
    body_page.removeChild(gifos_box_template);
    suggest_box[0].removeChild(suggest_item_template);
    list_favorites();
    list_gifos_created();
    fetch_gifo_trending();
    delete_gifo_card_miGifos();
    add_my_gifo_cards();
}

let api_key = "api_key=y9Vum3HsDR775RvR5yVqbdDQ155aMeRX";
let gifos_box_template = document.getElementById("gifos-box-template");
let full_screen_gifo = document.getElementById("gifo-full-screen");
let full_screen_user = document.getElementById("user-full-screen");
let full_screen_title = document.getElementById("title-full-screen");
let full_screen_icon_delete = document.getElementsByClassName("fs-delete-icon")
let full_screen_icon_fav_act = document.getElementsByClassName("fs-fav-act-box");
let full_screen_icon_fav = document.getElementsByClassName("icon-fav-full-screen");
let full_screen_icon_dow = document.getElementsByClassName("icon-dow-full-screen");

let btn_my_gifo_menu = document.getElementById("btn_my_gifos");
let btn_fav_menu = document.getElementById("favourite-item-menu");
let btn_new_gifo_menu =  document.getElementsByClassName("box-new-gifo")[0];

let url_trending = "https://api.giphy.com/v1/gifs/trending?"+ api_key;
let trending_gifos_section = document.getElementsByClassName("trending-gifos-container")[0];
let slider = document.getElementsByClassName("slider");
let num_gifos_slider = 10;
let trending_gifos_array = [];
let slider_btn_left = document.getElementById("slider-btn-left");
let slider_btn_right = document.getElementById("slider-btn-right");
let dist = (357+30);
let dist_2 = 0;
let position_gifos = [];
let x = num_gifos_slider - 3;
let max_width_slider_cotainer = 1161;

let fetch_gifo_trending =() => {
    fetch(url_trending)
    .then(responese => responese.json())
    .then(gifo_response => {
        for(let i=0; i<num_gifos_slider; i++){
            let gifo = new New_gifo(gifo_response.data[i], "gifo-trending-"+(i+1), "fav-icon-gt-"+(i+1),"fav-icon-act-gt-"+(i+1),"dow-icon-gt-"+(i+1),"full-screen-icon-gt-"+(i+1),"trash-icon-gt-"+(i+1));
            trending_gifos_array.push(gifo);
            gifo_trending(i);
        }
    }).catch(message_error => console.log(message_error));
}

class New_gifo {
    constructor(url_gif, id_gif_img, id_fav_gif_icon,id_fav_gif_activate_icon, id_dow_gif_icon, id_fs_gif_icon,id_trash_icon){
        this.url_gif = url_gif;
        this.id_gif_img = id_gif_img;
        this.id_fav_gif_icon = id_fav_gif_icon;
        this.id_fav_gif_activate_icon = id_fav_gif_activate_icon;
        this.id_dow_gif_icon = id_dow_gif_icon;
        this.id_fs_gif_icon = id_fs_gif_icon;
        this.id_trash_icon = id_trash_icon;
    }
}

let add_gifo_card =(parent_node,specific_class,gifos_list,i)=>{
    let gifos_box_clone = gifos_box_template.cloneNode(true);
    gifos_box_clone.style.display = "inline-block";
    gifos_box_clone.classList.toggle(specific_class);
    parent_node.appendChild(gifos_box_clone);
    let gifo_img = document.querySelectorAll("div.gifos-box."+ specific_class+" >label> img.gifo-img");
    gifo_img[i].src = gifos_list[i].url_gif.images.original.url;
    let title_gifo = document.querySelectorAll("div.gifos-box."+ specific_class+">div.gifos-box-hover>p.title-gifos");
    title_gifo[i].innerHTML = gifos_list[i].url_gif.title;
    let user_gifo = document.querySelectorAll("div.gifos-box."+ specific_class+">div.gifos-box-hover>p.user-gifos");
    user_gifo[i].innerHTML = gifos_list[i].url_gif.username == ""? "GIFOS User": gifos_list[i].url_gif.username;
    gifo_img[i].id = gifos_list[i].id_gif_img;
    let gifo_trash_icon = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.delete-icon");
    gifo_trash_icon[i].id = gifos_list[i].id_trash_icon;
    let gifo_fav_icon = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.icon-fav");
    gifo_fav_icon[i].id = gifos_list[i].id_fav_gif_icon;
    let gifo_fav_icon_act = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.fav-icon-activate");
    gifo_fav_icon_act[i].id = gifos_list[i].id_fav_gif_activate_icon;
    let gifo_dow_icon = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.icon-download");
    gifo_dow_icon[i].id = gifos_list[i].id_dow_gif_icon;
    gifo_fs_icon = document.querySelectorAll("div.gifos-box."+ specific_class+"> div.gifos-box-hover> div.icons-gifos-box> div.full-screen-icon");
    gifo_fs_icon[i].id = gifos_list[i].id_fs_gif_icon;
    display_fav_act_icon(gifos_list[i],i);
}

let gifoFullScreenMobile =(gifo)=>{
    if(gifo.id.slice(0,13) == "gifo-trending"){
        let index = trending_gifos_array.findIndex(x => x.id_gif_img == gifo.id);
        gifo_full_screen(index,trending_gifos_array);
    }else if(gifo.id.slice(0,11) == "gifo-search"){
        let index = gifos_searched_array.findIndex(x => x.id_gif_img == gifo.id);
        gifo_full_screen(index,gifos_searched_array);
    }else if(gifo.id.slice(0,13) == "gifo-favorite"){
        let index = favorite_array.findIndex(x => x.id_gif_img == gifo.id);
        gifo_full_screen(index,favorite_array);
    }else if(gifo.id.slice(0,12) == "gifo-created"){
        let index = created_gifos_array.findIndex(x => x.id_gif_img == gifo.id);
        gifo_full_screen(index,created_gifos_array);
    }
}

let gifoFullScreenDesktop =(gifo)=>{
    if(gifo.id.slice(0,19) == "full-screen-icon-gt"){
        let index = trending_gifos_array.findIndex(x => x.id_fs_gif_icon == gifo.id);
        gifo_full_screen(index,trending_gifos_array);
    }else if(gifo.id.slice(0,19) == "full-screen-icon-gs"){
        let index = gifos_searched_array.findIndex(x => x.id_fs_gif_icon == gifo.id);
        gifo_full_screen(index,gifos_searched_array);
    }else if(gifo.id.slice(0,19) == "full-screen-icon-gf"){
        let index = favorite_array.findIndex(x => x.id_fs_gif_icon == gifo.id);
        gifo_full_screen(index,favorite_array);
    }else if(gifo.id.slice(0,19) == "full-screen-icon-gc"){
        let index = created_gifos_array.findIndex(x => x.id_fs_gif_icon == gifo.id);
        gifo_full_screen(index,created_gifos_array);
    }
}
let gifo_full_screen = (index, gifos_list)=>{
    full_screen_gifo.setAttribute("src", gifos_list[index].url_gif.images.original.url)
    full_screen_user.textContent = gifos_list[index].url_gif.username == ""? "GIFOS User": gifos_list[index].url_gif.username;
    full_screen_title.textContent = gifos_list[index].url_gif.title;
    full_screen_icon_fav[0].id = gifos_list[index].id_fav_gif_icon;
    full_screen_icon_fav_act[0].id  = gifos_list[index].id_fav_gif_activate_icon;
    full_screen_icon_dow[0].id = gifos_list[index].id_dow_gif_icon;
    full_screen_icon_delete[0].id = gifos_list[index].id_trash_icon;
    let ind = favorite_array.findIndex(x => x.url_gif.id == gifos_list[index].url_gif.id);
    if(ind != -1){
        full_screen_icon_fav[0].style.display ="none";
        full_screen_icon_fav_act[0].style.display ="inline-block";
    }else{
        full_screen_icon_fav[0].style.display ="inline-block";
        full_screen_icon_fav_act[0].style.display ="none";
    }
    let index_Trash =  created_gifos_array.findIndex(x => x.url_gif.id == gifos_list[index].url_gif.id);
    if(index_Trash != -1 ){
        full_screen_icon_fav[0].style.display ="none";
        full_screen_icon_fav_act[0].style.display ="none";
        full_screen_icon_delete[0].style.display = "inline-block";
    }else{
        full_screen_icon_delete[0].style.display = "none";        
    }
}

let addFavoriteGifo = (icon_fav) =>{
    if(icon_fav.id.slice(0,12) == "fav-icon-gt-"){
        let index = trending_gifos_array.findIndex(x => x.id_fav_gif_icon == icon_fav.id);
        fav_bttn_efect("trending-gifo","gt",index)
        add_fav_gifo(trending_gifos_array[index].url_gif);
    }else if(icon_fav.id.slice(0,12) == "fav-icon-gs-"){
        let index = gifos_searched_array.findIndex(x => x.id_fav_gif_icon == icon_fav.id);
        fav_bttn_efect("gifo-searched","gs",index)
        add_fav_gifo(gifos_searched_array[index].url_gif);
    }
    if(favorite_gifos_section.style.display == "block"){
        delete_gifo_card_favorite();
        add_fav_gifo_cards();
    }
}

let fav_bttn_efect = (gifo_type,g_type,index) => {
    let btn_fav_normal = document.querySelectorAll("div." + gifo_type + "> div.gifos-box-hover > div.icons-gifos-box > div#fav-icon-"+g_type+"-"+ (index+1));
    btn_fav_normal[0].style.display = "none";
    let btn_fav_activate = document.querySelectorAll("div." + gifo_type + "> div.gifos-box-hover > div.icons-gifos-box > div#fav-icon-act-"+g_type+"-"+ (index+1));
    btn_fav_activate[0].style.display = "inline-block";
    let btn_fav_normal_fs = document.querySelectorAll("div.full-screen-container > div.icon-fav-full-screen ");
    btn_fav_normal_fs[0].style.display = "none";
    let btn_fav_active_fs = document.querySelectorAll("div.full-screen-container > div.fs-fav-act-box ");
    btn_fav_active_fs[0].style.display = "inline-block";
};

let display_fav_act_icon = (gifo,i) =>{
    let index = favorite_array.findIndex(x => x.url_gif.id == gifo.url_gif.id);
    if(index != -1){
        let id_gifo_fav = gifo.id_fav_gif_icon.slice(0,12);
        let fav_icon_normal = document.querySelectorAll("div#"+id_gifo_fav+(i+1));
        fav_icon_normal[0].style.display ="none";
        let id_gifo_fav_act = gifo.id_fav_gif_activate_icon.slice(0,16);
        let fav_icon_act = document.querySelectorAll("div#"+id_gifo_fav_act+(i+1));
        fav_icon_act[0].style.display ="block";
    }
}

let download_gifo = (gifo) => {
    if(gifo.id.slice(0,12) == "dow-icon-gt-"){
        let index = trending_gifos_array.findIndex(x => x.id_dow_gif_icon == gifo.id);
        let id_download = trending_gifos_array[index].url_gif.id;
        let title_download = "Gifo_Trending";
        download_gifo_id(title_download,id_download);
    }else if(gifo.id.slice(0,12) == "dow-icon-gs-") {
        let index = gifos_searched_array.findIndex(x => x.id_dow_gif_icon == gifo.id);
        let id_download = gifos_searched_array[index].url_gif.id;
        let title_download = "Gifo_Search";
        download_gifo_id(title_download,id_download);
    }else if(gifo.id.slice(0,12) == "dow-icon-gf-") {
        let index = favorite_array.findIndex(x => x.id_dow_gif_icon == gifo.id);
        let id_download = favorite_array[index].url_gif.id;
        let title_download = "Gifo_Favorite";
        download_gifo_id(title_download,id_download);
    }else if(gifo.id.slice(0,12) == "dow-icon-gc-") {
        let index = created_gifos_array.findIndex(x => x.id_dow_gif_icon == gifo.id);
        let id_download = created_gifos_array[index].url_gif.id;
        let title_download = "My_Gifo";
        download_gifo_id(title_download,id_download);
    }else if (gifo.id == "gifo_created_id"){
        let id_download = created_gifos_array[created_gifos_array.length -1 ].url_gif.id;
        let title_download = "My_Gifo";
        download_gifo_id(title_download,id_download);
    }
}

let download_gifo_id = (gif_title,gif_id) =>{
    let a = document.createElement("a");
    let url_download_gifo = "https://media2.giphy.com/media/"+gif_id+"/giphy.gif?&"+api_key+"&rid=giphy.gif";
    fetch(url_download_gifo)
    .then(responese => responese.blob())
    .then(data => {
        a.href = window.URL.createObjectURL(new Blob([data]));
        a.download = gif_title + ".gif";
        a.dataset.download = ['application/octet-stream', a.download, a.href].join(":");
        a.target = '_blank';
        a.click();
    });
}

let gifo_trending = (i) =>{
    add_gifo_card(slider[0],"trending-gifo",trending_gifos_array,i);
}

for(let i = 0; i < num_gifos_slider; i++){
    position_gifos.push(0); 
}
slider_btn_right.addEventListener("click", () =>{
    if( Math.abs(position_gifos[0]) < (dist*x)){
        slide_function(-dist);
    }else if(slider[0].clientWidth < max_width_slider_cotainer && dist_2 == 0){
        dist_2 = max_width_slider_cotainer - slider[0].clientWidth;
        slide_function(-(dist_2));
    }
});
slider_btn_left.addEventListener("click", () =>{
    if(position_gifos[0] < 0 && position_gifos[0]+dist <= 0 ){
        slide_function(dist);
    }else if(dist_2 != 0 ){
        slide_function(dist_2);
        dist_2 = 0;
    }
});
let slide_function = (dist) =>{
    let gifos_box = document.getElementsByClassName("gifos-box trending-gifo");
    for (let i = 0; i<gifos_box.length;i++){
        position_gifos[i] += dist;
        gifos_box[i].style.transform = "translateX("+(position_gifos[i])+"px)";
    }
}
let see_more_button_myGifos =  document.getElementById("see-more-button-myGifos");

let add_my_gifo_cards = () =>{
    if(created_gifos_array.length != 0 ){
        without_my_gifos.style.display = "none";
        mis_gifos_container.style.display = "block";
        if(created_gifos_array.length > 12){
            see_more_button_myGifos.style.display = "block";
            let lim_sup = num_gifos_myGifos+12 <= created_gifos_array.length? 
            num_gifos_myGifos+12:
            num_gifos_myGifos+(created_gifos_array.length-num_gifos_myGifos)
            ;
            for(let i=num_gifos_myGifos; i<(lim_sup);i++){
                add_gifo_card(mis_gifos_container,"gifo-myGifo",created_gifos_array,i);
                let fav_icon_mygifos = document.getElementById("fav-icon-gc-"+(i+1));
                fav_icon_mygifos.style.display = "none";
                let trash_icon_mygifos =  document.getElementById("trash-icon-gc-"+(i+1));
                trash_icon_mygifos.style.display = "inline-block";
            }
            num_gifos_myGifos = gifo_box_myGifo.length;
        }else{
            see_more_button_myGifos.style.display = "none";
            for(let i=0; i<created_gifos_array.length; i++){
                add_gifo_card(mis_gifos_container,"gifo-myGifo",created_gifos_array,i);
                let fav_icon_mygifos = document.getElementById("fav-icon-gc-"+(i+1));
                fav_icon_mygifos.style.display = "none";
                let trash_icon_mygifos =  document.getElementById("trash-icon-gc-"+(i+1));
                trash_icon_mygifos.style.display = "inline-block";
            }
        }
        if(created_gifos_array.length == num_gifos_myGifos){
            see_more_button_myGifos.style.display = "none"
        }
    }else{
        mis_gifos_container.style.display = "none";
        without_my_gifos.style.display = "block";
    }
}

let burger_menu = document.getElementById("show-menu");

burger_menu.addEventListener("click", scroll_body);
function scroll_body(){
    let body_element = document.getElementsByTagName("body");
    if(body_element[0].style.overflow == "hidden"){
        body_element[0].style.overflow = "visible";
    }else{
        body_element[0].style.overflow = "hidden";
    }
}

let logo_gifos= document.getElementById("logo-gifos");
logo_gifos.addEventListener("click", ()=>{
    favorite_gifos_section.style.display = "none";
    my_gifos_section.style.display = "none";
    create_gifos_section.style.display = "none";
    trending_gifos_section.style.display = "block";
    search_gifos_container.style.display ="block";
})

btn_fav_menu.addEventListener("click", ()=>{
    search_gifos_container.style.display ="none";
    my_gifos_section.style.display = "none";
    create_gifos_section.style.display = "none";
    trending_gifos_section.style.display = "block";
    favorite_gifos_section.style.display = "block"
    delete_gifo_card_favorite();
    add_fav_gifo_cards();
});
btn_my_gifo_menu.addEventListener("click",() =>{
    search_gifos_container.style.display ="none";
    create_gifos_section.style.display = "none";
    favorite_gifos_section.style.display = "none"
    my_gifos_section.style.display = "block";
    trending_gifos_section.style.display = "block";
    delete_gifo_card_miGifos();
    add_my_gifo_cards();

});
btn_new_gifo_menu.addEventListener("click", () =>{
    search_gifos_container.style.display ="none";
    favorite_gifos_section.style.display = "none";
    my_gifos_section.style.display = "none";
    trending_gifos_section.style.display = "none";
    create_gifos_section.style.display = "flex";
});

let list_gifos_created = () =>{
    if(JSON.parse(localStorage.getItem("new_gifo"))){
        created_gifos_array = JSON.parse(localStorage.getItem("new_gifo"));
    }else{
        created_gifos_array = [];
    }
}

see_more_button_myGifos.addEventListener("click", () =>{
    add_my_gifo_cards();
});

let deleteGifo = (myGifo) =>{
    let index =  created_gifos_array.findIndex(x => x.id_trash_icon == myGifo.id);
    created_gifos_array.splice(index,1);
    for(let i=0;i<created_gifos_array.length;i++){
        created_gifos_array[i].id_dow_gif_icon =  "dow-icon-gc-"+(i+1);
        created_gifos_array[i].id_fav_gif_activate_icon = "fav-icon-act-gc-"+(i+1);
        created_gifos_array[i].id_fav_gif_icon = "fav-icon-gc-"+(i+1);
        created_gifos_array[i].id_fs_gif_icon = "full-screen-icon-gc-"+(i+1);
        created_gifos_array[i].id_gif_img= "gifo-created-"+(i+1);
        created_gifos_array[i].id_trash_icon =  "trash-icon-gc-"+(i+1);
    }
    localStorage.setItem("new_gifo",JSON.stringify(created_gifos_array));
    delete_gifo_card_miGifos();
    add_my_gifo_cards();

    let check_fs = document.getElementById("show_full_screen");
    check_fs.checked = false;
}
