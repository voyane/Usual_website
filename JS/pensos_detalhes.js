const menuBtn = document.querySelector(".mobile-menu");
const sideMenu = document.querySelector(".side-menu");
const backBtn = document.querySelector(".back");

//Abrir Lateral
menuBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");
});
//Fechar Lateral
backBtn.addEventListener("click", () =>{
    sideMenu.classList.remove("active");
    menuBtn.classList.remove("active");
});
//Fechar menu ao clicar fora dele
document.addEventListener("click", (e) =>{
    if(!sideMenu.contains(e.target) && !menuBtn.contains(e.target)){
        sideMenu.classList.remove("active");
        menuBtn.classList.remove("active");
    }
});
//Alternancia automatica Login/Logout
document.addEventListener("DOMContentLoaded", () =>{
    const loginItem = document.querySelector(".oe_login");
    const logoutItem = document.querySelector(".oe_logout");

    if(loginItem && logoutItem){
        const loggedIn = loginItem.offsetParent !== null;
        //visivel logado
        if(loggedIn){
            loginItem.classList.add("hidden");
        }
        else{
            logoutItem.classList.add("hidden");
        }
    }
});
//Fehar menu ao clicar em Login/Logout
document.querySelectorAll(".oe_login a, .oe_logout a").forEach(btn => {
    btn.addEventListener("click", () => {
        sideMenu.classList.remove("active");
        menuBtn.classList.remove("active");
    });
});

//----------------------------------------------------------------------
//classe que move o slide
let list = document.querySelector('.slider .list');
//Nodelist de cada slide
let item = document.querySelectorAll('.slider .list .item');
//Nodelist dos pontos
let dots = document.querySelectorAll('.slider .dots li');
//botao "anterior"
let prev = document.getElementById('prev');
//botao "próximo"
let next = document.getElementById('next');

let active = 0
let lengthItems = item.length - 1;

let refreshSlider = setInterval(() => {next.click()}, 5000);

//Função que move o carosselpara o slide 'active' e actualiza os dots
function reloadSlider(){
    let checkLeft = item[active].offsetLeft;
    list.style.left = - checkLeft + 'px';

    let activeDot = document.querySelector('.slider .dots li.active');
    activeDot.classList.remove('active');
    dots[active].classList.add('active');

    //Reinicia o autoplay para evitar transições muito rápidas se o usuário clicar rapidamente
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => {next.click()}, 5000);
}

//Permite clicar nos pontos para ir diretamente a um slide
dots.forEach((li, key) => {
    li.addEventListener('click', function(){
        active = key;
        reloadSlider();
    })
})

//Funcao do botao "anterior"
prev.onclick = () => {
    if(active -1 < 0){
        active = lengthItems;
    }
    else{
        active = active - 1;
    }
    reloadSlider();
}

next.onclick = () => {
    if(active + 1 > lengthItems){
        active = 0;
    }
    else{
        active = active + 1;
    }
    reloadSlider();
}

//--------Modal-Baixar Imagem--------
function openImage(src){
    const modal = document.getElementById("imageModal");
    const img = document.getElementById("modalImg");
    const download = document.getElementById("downloadBtn");

    img.src = src;
    download.href = src;

    modal.classList.add("active");
}

function closeImage(){
    document.getElementById("imageModal").classList.remove("active");
}
