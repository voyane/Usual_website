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

//--------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    /* ===== Alternar Login / Register ===== */
    const container = document.querySelector('.container');
    document.querySelectorAll('.switch-form').forEach(link => {
        link.onclick = () => {
            container.className =
                link.textContent.trim() === 'Register'
                ? 'container active-signup'
                : 'container active-login';
        };
    });

    /* ===== Elementos ===== */
    const form = document.getElementById('signup-form');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');
    const error = document.getElementById('error-message');
    const strength = document.querySelector('.password-strength span');

    /* ===== Mostrar / Ocultar senha ===== */
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.onclick = () => {
            const input = document.getElementById(icon.dataset.target);
            input.type = input.type === 'password' ? 'text' : 'password';
        };
    });

  password.addEventListener('input', () => {
    const v = password.value;

    // Limpa classes anteriores
    strength.classList.remove('weak', 'medium', 'strong');

    if (v.length === 0) return;

    if (v.length < 8) {
        strength.classList.add('weak');
    } else if (/[A-Z]/.test(v) && /\d/.test(v)) {
        strength.classList.add('strong');
    } else {
        strength.classList.add('medium');
    }
});

    /* ===== Validação do formulário ===== */
    form.onsubmit = e => {
        e.preventDefault();

        error.textContent = '';
        password.classList.remove('error');
        confirm.classList.remove('error');

        if (password.value.length < 8) {
            error.textContent = 'A senha deve conter no mínimo 8 caracteres';
            password.classList.add('error');
            return;
        }

        if (password.value !== confirm.value) {
            error.textContent = 'As senhas não coincidem';
            password.classList.add('error');
            confirm.classList.add('error');
            return;
        }

        form.submit();
    };
});
