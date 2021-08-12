let my_gifos_section =  document.getElementsByClassName("my-gifs-section")[0];

let mis_gifos_container = document.getElementById("mis-gifos-container");
let without_my_gifos =  document.getElementsByClassName("without-my-gifos-container")[0];

let gifo_box_myGifo = document.getElementsByClassName("gifo-myGifo");


let num_gifos_myGifos = 0;

let created_gifos_array;

let delete_gifo_card_miGifos = () =>{
        for(let i=gifo_box_myGifo.length-1;i>=0;i--){
            mis_gifos_container.removeChild(gifo_box_myGifo[i]);
        }
        num_gifos_myGifos=0;
}
see_more_button_myGifos.addEventListener("click", () =>{
    add_my_gifo_cards();
});

