let search_gifos_container = document.getElementsByClassName("search-gifos-container")[0];
let page_title =  document.getElementById("page-title");
let img_welcome_gifos = document.getElementById("img-welcome-gifos");
let search_container = document.getElementsByClassName("search-container");
let search_box = document.getElementsByClassName("search-box");
let search_icon_active = document.getElementsByClassName("search-icon-active");
let close_suggest_icon = document.getElementById("close-suggest-icon");
let search_input = document.getElementsByClassName("search-input");
let suggest_box = document.getElementsByClassName("suggest-box");
let suggest_item_template = document.getElementById("suggest-item-template");
let suggest_item = document.getElementsByClassName("suggest-item");
let suggest_content = document.getElementsByClassName("suggest");
let num_gifos_results = 0;
let results_container = document.getElementById("results-container");
let results_title = document.getElementsByClassName("results-title")
let results_gifos_section = document.getElementById("results-gifos-section");
let gifos_box_searched = document.getElementsByClassName("gifo-searched");
let see_more_button_search = document.getElementById("see-more-button-search");
let search_without_result_container = document.getElementsByClassName("search-without-result-container")[0];
let search_without_result_title = document.getElementsByClassName("search-without-result-title")[0];
let gifos_searched_array = [];
let key_code_enter = 13;
let popular_tags = document.getElementsByClassName("trending-content")[0];
let url_tags = "https://api.giphy.com/v1/trending/searches?"+api_key;
let line_search =  document.getElementsByClassName("line-decoration-search")[0];
let search_mobile = screen.width<1024 ? true:false;

search_input[0].addEventListener("focus", () =>{
    search_icon_active[0].style.display = "block";
    search_box[0].style.borderBottom =  "1px solid #9CAFC3";
    search_icon[0].style.display = "none";
    close_suggest_icon.style.display = "block";
    suggest_box[0].style.display = "block";
});
close_suggest_icon.addEventListener("click", () =>{
    search_input[0].value ="";
    search_icon_active[0].style.display = "none";
    search_box[0].style.borderBottom = "none";
    close_suggest_icon.style.display = "none";
    search_icon[0].style.display = "block";
    suggest_box[0].style.display = "none";

    results_container.style.display = "none";
    line_search.style.display = "none";
    search_without_result_container.style.display ="none";
    if(search_mobile){
        page_title.style.display = "block";
        img_welcome_gifos.style.display = "block";
        search_container[0].style.marginTop = "0px";
    }

});
search_input[0].addEventListener("keyup",(evento)=>{
    if(evento.keyCode == key_code_enter){
        searchGifo();
    }else{
        suggest_box[0].style.display = "block";
        let q = "q="+search_input[0].value;
        let url_autocomplete = "https://api.giphy.com/v1/gifs/search/tags?"+q+"?&"+api_key;
        fetch(url_autocomplete)
        .then(response => response.json())
        .then(response_suggest =>{
            add_suggest(response_suggest.data);
        })
        let add_suggest = (suggest_list) =>{
            const num_suggest = suggest_item.length;
            for(let i=num_suggest-1;i>=0;i--){
                suggest_box[0].removeChild(suggest_item[i]);
            }
            for(let i=0; i<suggest_list.length;i++){
                suggest_box_clone = suggest_item_template.cloneNode(true);
                suggest_box_clone.id = "suggest_box" + (i+1);
                suggest_box[0].appendChild(suggest_box_clone);
                suggest_content[i].innerHTML = suggest_list[i].name;
            }
        }
    }
});

let selectSuggest = (suggest) =>{
    search_input[0].value = suggest.innerHTML;
    searchGifo();
}
let searchGifo = () =>{
    search_box[0].style.borderBottom = "none";
    suggest_box[0].style.display = "none";
    line_search.style.display = "block";
    if(search_mobile){
        page_title.style.display = "none";
        img_welcome_gifos.style.display = "none";
        search_container[0].style.marginTop = "17px";
    }
    let q = "q="+search_input[0].value;
    let url_search_gifos = "https://api.giphy.com/v1/gifs/search?"+q+"?&"+api_key;  
    gifos_searched_array.splice(0);
    num_gifos_results = 0;
    results_title[0].innerHTML = search_input[0].value;
    fetch(url_search_gifos)
    .then(response => response.json())
    .then(response_search => {
        for(let i=0; i<response_search.data.length;i++){
            let gifo = new New_gifo(response_search.data[i], "gifo-search-"+(i+1), "fav-icon-gs-"+(i+1),"fav-icon-act-gs-"+(i+1),"dow-icon-gs-"+(i+1),"full-screen-icon-gs-"+(i+1),"trash-icon-gs-"+(i+1));
            gifos_searched_array.push(gifo);
        }
        delete_gifo_cards_finded();
        add_gifo_cards_finded();
    })
}

let delete_gifo_cards_finded = () =>{
    for(let i=gifos_box_searched.length-1;i>=0;i--){
        results_gifos_section.removeChild(gifos_box_searched[i]);
    }
}
let add_gifo_cards_finded = () => {
    if(gifos_searched_array.length != 0){
        search_without_result_container.style.display ="none";
        results_container.style.display = "block";
        see_more_button_search.style.display = "block";
        if(num_gifos_results <= gifos_searched_array.length){
            let lim_sup = num_gifos_results+12 <= gifos_searched_array.length? 
                num_gifos_results+12: 
                num_gifos_results+(gifos_searched_array.length-num_gifos_results)
            ;
            for(let i=num_gifos_results; i<(lim_sup);i++){
                add_gifo_card(results_gifos_section,"gifo-searched",gifos_searched_array,i);
            }
            num_gifos_results = gifos_box_searched.length;
        }
        if(gifos_searched_array.length == num_gifos_results){
            see_more_button_search.style.display = "none";
        }
    }
    else{
        results_container.style.display = "none";
        search_without_result_title.innerHTML = search_input[0].value;
        search_without_result_container.style.display ="block";
    }
}

see_more_button_search.addEventListener("click", () =>{
    add_gifo_cards_finded();
});


fetch(url_tags)
.then(response => response.json())
.then(data => {
    let tegs_items = data.data[0] + ", " + data.data[1] + ", " + data.data[2] + ", " + data.data[3] + ", " + data.data[4];
    popular_tags.textContent = tegs_items;
}).catch(mesagge_error => console.log(mesagge_error));
