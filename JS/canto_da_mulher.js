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

//-------------Calculadora Menstrual----
function adicionarDias(data, dias) {
            const novaData = new Date(data);
            novaData.setDate(novaData.getDate() + dias);
            return novaData;
        }

        function calcularCiclo() {
            const inicio = document.getElementById("lastPeriod").value;
            const ciclo = parseInt(document.getElementById("cycleDays").value);
            const duracao = parseInt(document.getElementById("duration").value);

            // Validação
            if (!inicio || !ciclo || !duracao) {
                alert("Preencha todos os campos!");
                return;
            }

            const dataInicio = new Date(inicio);

            // Cálculos
            const proximaMenstruacao = adicionarDias(dataInicio, ciclo);
            const inicioFertil = adicionarDias(dataInicio, ciclo - 18);
            const ovulacao = adicionarDias(dataInicio, ciclo - 14);
            const fimFertil = adicionarDias(dataInicio, ciclo - 10);
            const fimMenstruacao = adicionarDias(dataInicio, duracao);

            function formatDate(date) {
                return date.toLocaleDateString("pt-PT");
            }

            // Exibir no HTML
            document.getElementById("inicioMenstrual").innerText = formatDate(dataInicio);
            document.getElementById("fimMenstrual").innerText = formatDate(fimMenstruacao);
            document.getElementById("ovulacao").innerText = formatDate(ovulacao);
            document.getElementById("periodoFertil").innerText =
                `${formatDate(inicioFertil)} até ${formatDate(fimFertil)}`;
            document.getElementById("proximaMenstruacao").innerText = formatDate(proximaMenstruacao);

            document.getElementById("result").style.display = "flex";
        }

        // Botão LIMPAR
        document.getElementById("reset").addEventListener("click", () => {
            document.getElementById("lastPeriod").value = "";
            document.getElementById("cycleDays").value = "";
            document.getElementById("duration").value = "";
            document.getElementById("result").style.display = "none";
        });
