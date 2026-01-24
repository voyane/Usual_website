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

//---------------Calendário de Gestação--------------


// TEXTOS DAS SEMANAS (adicione mais conforme precisar)
const semanas = [
    { titulo: "4ª Semana", texto: "No final da 4ª semana, o embrião já se está a formar e tem o tamanho de uma semente de papoila, cerca de 0,1 cm de comprimento..." },
    { titulo: "5ª Semana", texto: "Durante a 5ª semana, o embrião tem cerca de 0.2 cm, o tamanho de uma semente de sésamo e passa por um desenvolvimento rápido..." },
    { titulo: "6ª Semana", texto: "Na sexta semana de gestação, o embrião mede cerca de 0.6 cm, sendo comparável a uma semente de romã. O seu desenvolvimento é ..."},
    { titulo: "7ª Semana", texto: "Nesta fase, o embrião continua a desenvolver-se rapidamente. Com cerca de 1 cm, o tamanho de um mirtilo, o cérebro está..." },
    { titulo: "8ª Semana", texto: "Durante a 8ª semana, o embrião começa a assumir uma aparência mais humana. A cabeça, embora ainda desproporcional ao corpo, está se ..." },
    { titulo: "9ª Semana", texto: "Nessa fase, o bebê já possui a estrutura básica do corpo formada. Sua cabeça, embora ainda grande em comparação com o resto do corpo,..." },
    { titulo: "10ª Semana", texto: "Na décima semana de gestação, o bebê já está em um estágio mais avançado de desenvolvimento e oficialmente deixa de ser um ..." },
    { titulo: "11ª Semana", texto: "O bebê nesta fase tem cerca de 4,5 cm de comprimento e pesa entre 7 e 9 gramas, aproximadamente o tamanho de uma ameixa..." },
    { titulo: "12ª Semana", texto: "Na décima segunda semana de gestação, o bebê mede cerca de seis centímetros e pesa aproximadamente quatorze gramas, sendo comparável..." },
    { titulo: "13ª Semana", texto: "O bebê mede cerca de 7 a 8 centímetros e pesa em torno de 23 gramas, sendo comparável ao tamanho de uma ameixa pequena..." },
    { titulo: "14ª Semana", texto: "Começa a mover a cabeça com mais facilidade. O cabelo e as sobrancelhas começam a surgir. Os rins estão funcionando, e o bebê já ..." },
    { titulo: "15ª Semana", texto: "O bebê mede entre 10 e 11 cm e pesa cerca de 70 gramas. A pele ainda é muito fina, mas já começa a ser coberta por uma penugem chamada..." },
    { titulo: "16ª Semana", texto: "Com cerca de 12 cm e 100 gramas, o bebê já consegue fazer movimentos faciais como franzir a testa ou abrir a boca. Os olhos e ouvidos ..." },
    { titulo: "17ª Semana", texto: "Com cerca de 12 cm e 100 gramas, o bebê já consegue fazer movimentos faciais como franzir a testa ou abrir a boca. Os olhos e ouvidos..." },
    { titulo: "18ª Semana", texto: "Agora com 14 cm e 190 gramas, o bebê está cada vez mais ativo. O aparelho digestivo começa a praticar os movimentos de deglutição ..." },
    { titulo: "19ª Semana", texto: "Agora com 14 cm e 190 gramas, o bebê está cada vez mais ativo. O aparelho digestivo começa a praticar os movimentos de deglutição" },
    { titulo: "20ª Semana", texto: "Com cerca de 16 cm e 300 gramas, o bebê está na metade da gestação. A pele está mais espessa e continua a ser protegida pelo vérnix..." },
    { titulo: "21ª Semana", texto: "O bebê mede cerca de 27 cm e pesa em torno de 360 gramas. A coordenação motora está cada vez mais refinada, permitindo que ele leve o ..." },
    { titulo: "22ª Semana", texto: "Com aproximadamente 28 cm e 430 gramas, o bebê começa a desenvolver uma rotina própria de sono e vigília. Os olhos estão quase ..." },
    { titulo: "23ª Semana", texto: "O bebê mede cerca de 29 cm e pesa 500 gramas. A audição está mais apurada, e ele já reconhece sons mais familiares, como a voz da mãe..." },
    { titulo: "24ª Semana", texto: "Agora com 30 cm e 600 gramas, o bebê já tem uma aparência muito mais semelhante à de um recém-nascido. Os movimentos são mais fortes e..." },
    { titulo: "25ª Semana", texto: "O bebê pesa aproximadamente 700 gramas e mede 33 cm. Já abre e fecha as mãos, responde ao toque e pode até dar pequenos ..." },
    { titulo: "26ª Semana", texto: "Com 34 cm e cerca de 800 gramas, o bebê começa a piscar e pode responder à luz colocada próxima à barriga. A medula óssea já assume ..." },
    { titulo: "27ª Semana", texto: "O bebê mede cerca de 36 cm e pesa 900 g a 1 kg. Ele já tem um ciclo de sono mais estruturado e pode até sonhar. Os pulmões continuam..." },
    { titulo: "28ª Semana", texto: "Com 38 cm e 1,1 kg, o bebê já responde claramente a estímulos táteis, sonoros e luminosos. A retina está desenvolvida o suficiente..." },
    { titulo: "29ª Semana", texto: "O bebê mede 39 cm e pesa cerca de 1,2 kg. Os músculos estão mais fortes, e os movimentos podem ser sentidos com mais intensidade..." },
    { titulo: "30ª Semana", texto: "Com 40 cm e 1,3 kg, o bebê começa a perder espaço no útero, mas segue se movimentando bastante. A cabeça começa a crescer mais ..." },
    { titulo: "31ª Semana", texto: "O bebê está com cerca de 41 cm e 1,5 kg. A pele está menos enrugada devido ao acúmulo de gordura. O sistema digestivo está ..." },
    { titulo: "32ª Semana", texto: "Agora com 42 cm e 1,7 kg, o bebê começa a se posicionar de cabeça para baixo, preparando-se para o nascimento. Os ossos estão quase..." },
    { titulo: "33ª Semana", texto: "O bebê mede cerca de 43 cm e pesa 1,9 kg. O cérebro controla a temperatura corporal e começa a coordenar melhor as funções vitais..." },
    { titulo: "34ª Semana", texto: "O bebê mede cerca de 43 cm e pesa 1,9 kg. O cérebro controla a temperatura corporal e começa a coordenar melhor as funções vitais..." },
    { titulo: "35ª Semana", texto: "O bebê mede 45 cm e pesa aproximadamente 2,4 kg. Os órgãos estão praticamente todos formados e funcionando. O espaço no útero é menor,..." },
    { titulo: "36ª Semana", texto: "Agora com cerca de 47 cm e 2,7 kg, o bebê já está quase pronto para nascer. A maioria dos bebês já está na posição cefálica (cabeça ..." },
    { titulo: "37ª Semana", texto: "Com 48 cm e cerca de 2,9 kg, o bebê é considerado a termo – ou seja, se nascer agora, já não será considerado prematuro. Os órgãos ..." },
    { titulo: "38ª Semana", texto: "O bebê mede cerca de 49 cm e pesa 3 kg. O corpo está coberto por uma camada de gordura que ajuda na regulação da temperatura. O ..." },
    { titulo: "39ª Semana", texto: "Com 50 cm e 3,2 kg, o bebê está pronto para o nascimento. Os pulmões já produzem surfactante em quantidade suficiente para a ..." },
    { titulo: "40ª Semana", texto: "O bebê atinge cerca de 51 cm e pesa entre 3,3 kg e 3,5 kg. Todos os sistemas estão prontos para o nascimento. O vérnix ..." },
];

/* ---------------------------
    VARIÁVEIS
---------------------------- */
let index = 1;
let cardWidth = 270;

const wrapper = document.getElementById("carouselWrapper");
const carousel = document.getElementById("carousel");
const tituloEl = document.querySelector(".left h1");
const textoEl = document.getElementById("textoSemana");
const cardsImgs = document.querySelectorAll(".card img");

/* ---------------------------
    CRIAR CLONES
---------------------------- */
const firstClone = carousel.children[0].cloneNode(true);
const lastClone = carousel.children[carousel.children.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, carousel.children[0]);

/* ---------------------------
    POSICIONAR INICIAL
---------------------------- */
function setPosition() {
    const card = carousel.querySelector(".card");
    const gap = parseInt(getComputedStyle(carousel).gap) || 0;

    cardWidth = card.getBoundingClientRect().width + gap;
    carousel.style.transform = `translateX(${-index * cardWidth}px)`;
}
window.addEventListener("resize", setPosition);

/* ---------------------------
    ATUALIZAR TEXTO + BG
---------------------------- */
function atualizarConteudo() {
    let real = index - 1;
    if (real < 0) real = semanas.length - 1;
    if (real >= semanas.length) real = 0;

    // texto
    tituloEl.textContent = semanas[real].titulo;
    textoEl.textContent = semanas[real].texto;

    // fundo = imagem do card ativo
    const imgAtiva = cardsImgs[real];
    document.body.style.backgroundImage = `url(${imgAtiva.src})`;

    // remove active
    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));

    // adiciona active ao card correto (considera clone)
    const cardAtivo = carousel.children[index];
    if (cardAtivo) cardAtivo.classList.add("active");
}


/* ---------------------------
    MOVE
---------------------------- */
function move(step) {
    index += step;
    carousel.style.transition = "transform 1s ease";
    setPosition();
    atualizarConteudo();
}

/* ---------------------------
    LOOP INFINITO REAL
---------------------------- */
carousel.addEventListener("transitionend", () => {
    const total = carousel.children.length - 2;

    if (carousel.children[index].id === "first-clone") {
        carousel.style.transition = "none";
        index = 1;
        setPosition();
    }

    if (carousel.children[index].id === "last-clone") {
        carousel.style.transition = "none";
        index = total;
        setPosition();
    }

    atualizarConteudo();
});


/* ---------------------------
    CLIQUE NAS IMAGENS
---------------------------- */
cardsImgs.forEach((img, i) => {
    img.addEventListener("click", () => {
        index = i + 1;
        carousel.style.transition = "transform 1s ease";
        setPosition();
        atualizarConteudo();
    });
});

/* ---------------------------
    LER MAIS
---------------------------- */
document.getElementById("btnLer").onclick = () => {

    // índice real ignorando clones
    let real = index - 1;
    if (real < 0) real = semanas.length - 1;
    if (real >= semanas.length) real = 0;

    // semana real (array começa na semana 4)
    const semanaReal = real + 4;

    // redireciona diretamente para a semana correta
    window.location.href = `calendario_semana_${semanaReal}.html`;
};


/* ---------------------------
    INICIALIZAÇÃO
---------------------------- */
setTimeout(() => {
    setPosition();
    atualizarConteudo();
}, 100);
