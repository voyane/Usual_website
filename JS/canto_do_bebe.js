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


//Calculadora Gestacional
 const method = document.getElementById('method');
    const dumWrap = document.getElementById('dumWrap');
    const conceptWrap = document.getElementById('conceptWrap');

    const lmp = document.getElementById('lmp');
    const concept = document.getElementById('concept');

    const calcBtn = document.getElementById('calc');
    const resetBtn = document.getElementById('reset');
    const resultCard = document.getElementById('result');

    const gestAgeEl = document.getElementById('gest-age');
    const daysTotalEl = document.getElementById('daysTotal');
    const dueDateEl = document.getElementById('dueDate');
    const countdownEl = document.getElementById('countdown');
    const trimesterEl = document.getElementById('trimester');
    const progressPctEl = document.getElementById('progressPct');
    const progressBar = document.getElementById('progressBar');

    method.addEventListener('change', ()=>{
      if(method.value === 'dum'){
        dumWrap.style.display = 'block';
        conceptWrap.style.display = 'none';
      } else {
        dumWrap.style.display = 'none';
        conceptWrap.style.display = 'block';
      }
    });

    function parseDateInput(value){
      if(!value) return null;
      const p = value.split('-');
      return new Date(p[0], p[1]-1, p[2]);
    }

    function formatDate(d){
      return d.toLocaleDateString('pt-PT',{day:'2-digit',month:'2-digit',year:'numeric'});
    }

    function clamp(v,a,b){return Math.min(b,Math.max(a,v));}

    calcBtn.addEventListener('click', ()=>{
      const today = new Date();
      const msDay = 86400000;

      let lmpDate = null;

      if(method.value === 'dum'){
        lmpDate = parseDateInput(lmp.value);
        if(!lmpDate){alert('Insira a DUM.');return;}
      }

      if(method.value === 'conception'){
        const conceptDate = parseDateInput(concept.value);
        if(!conceptDate){alert('Insira a data de concepção.');return;}
        // LMP ocorre 14 dias antes
        lmpDate = new Date(conceptDate.getTime() - (14 * msDay));
      }

      // Data prevista de parto = DUM + 280 dias
      const dueDate = new Date(lmpDate.getTime() + 280 * msDay);

      const daysSince = Math.floor((today - lmpDate) / msDay);
      const weeks = Math.floor(daysSince / 7);
      const daysRem = daysSince % 7;

      const daysLeft = Math.ceil((dueDate - today) / msDay);
      const progress = clamp(Math.round(daysSince / 280 * 100),0,100);

      let trimester = '--';
      if(weeks < 14) trimester = '1º trimestre';
      else if(weeks < 28) trimester = '2º trimestre';
      else trimester = '3º trimestre';

      gestAgeEl.textContent = `${weeks} semanas e ${daysRem} dias`;
      daysTotalEl.textContent = `${daysSince} dias desde o início da gestação`;
      dueDateEl.textContent = formatDate(dueDate);
      countdownEl.textContent = daysLeft + ' dias restantes';
      trimesterEl.textContent = trimester;
      progressPctEl.textContent = progress + '%';
      progressBar.value = progress;

      resultCard.style.display = 'grid';
    });

    resetBtn.addEventListener('click', ()=>{
      lmp.value = '';
      concept.value = '';
      resultCard.style.display = 'none';
    });