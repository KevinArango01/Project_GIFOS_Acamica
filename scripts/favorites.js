let favorite_gifos_section = document.getElementsByClassName("favorite-gifos-section")[0];
let favorite_gifos_container = document.getElementById("favorite-gifos-container");
let without_favorite_cotainer = document.getElementsByClassName("without-favorites-container")[0];
let gifo_box_favorite = document.getElementsByClassName("gifo-favorite");
let see_more_button_favorite = document.getElementById("see-more-button-favorite");
let num_gifos_favorites = 0;
let favorite_array;

let list_favorites = () =>{
    if(JSON.parse(localStorage.getItem("fav_gifos"))){
        favorite_array = JSON.parse(localStorage.getItem("fav_gifos"));
    }else{
        favorite_array = [];
    }
}
let add_fav_gifo  = (url_gifo_fav)=>{
    let long = favorite_array.length;
    let gifo = new New_gifo(url_gifo_fav, "gifo-favorite-"+(long+1), "fav-icon-gf-"+(long+1),"fav-icon-act-gf-"+(long+1),"dow-icon-gf-"+(long+1),"full-screen-icon-gf-"+(long+1),"trash-icon-gf-"+(long+1));
    favorite_array.push(gifo);
    localStorage.setItem("fav_gifos",JSON.stringify(favorite_array));
}
let add_fav_gifo_cards = ()=>{
    if(favorite_array.length != 0){
        without_favorite_cotainer.style.display = "none";
        favorite_gifos_container.style.display = "block";
        if(favorite_array.length > 12){
            see_more_button_favorite.style.display ="block";
            let lim_sup = num_gifos_favorites+12 <= favorite_array.length? 
                num_gifos_favorites+12:
                num_gifos_favorites+(favorite_array.length-num_gifos_favorites)
            ;
            for(let i=num_gifos_favorites; i<(lim_sup);i++){
                add_gifo_card(favorite_gifos_container,"gifo-favorite",favorite_array,i);
            }
            num_gifos_favorites = gifo_box_favorite.length;
        }else{
            see_more_button_favorite.style.display ="none"
            for(let i=0; i<favorite_array.length; i++){
                add_gifo_card(favorite_gifos_container,"gifo-favorite",favorite_array,i);
            } 
        }
        if(favorite_array.length == num_gifos_favorites){
            see_more_button_favorite.style.display = "none"
        }

    }else{
        favorite_gifos_container.style.display = "none";
        without_favorite_cotainer.style.display = "block";
    }
}
let delete_gifo_card_favorite = () =>{
    for(let i=gifo_box_favorite.length-1;i>=0;i--){
        favorite_gifos_container.removeChild(gifo_box_favorite[i]);
    }
    num_gifos_favorites=0;
}
see_more_button_favorite.addEventListener("click", () =>{
    add_fav_gifo_cards();
});