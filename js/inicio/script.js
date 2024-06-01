//change Img
function changeimg(anything) {
   // document.querySelector(".img-user-perfil").src = anything
    document.querySelector(".img-user").src = anything
}

const nameuser = document.querySelector(".name-user");
function changetext(text){
    nameuser.innerHTML= text;
}