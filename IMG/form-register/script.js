//Declarando  as variáveis

// Seleciona o container principal
const container = document.querySelector('.container');
// Seleciona todos os elementos que alternam os formulários
const switchForm = document.querySelectorAll('.switch-form');
//Valicação do formulário de registo
const signupForm = document.querySelector('#signup-form');
//Senha
const password = document.querySelector('#password').value;
//Confirmar senha
const confirm = document.querySelector('#confirm').value;

//Mensagem de erro
const errorMessage = document.getElementById('error-message');

// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // Para cada link de troca (Login / Register)
    switchForm.forEach(link => {
        link.addEventListener('click', () => {

            // Se o texto for "Register", mostra o formulário de registo
            if (link.textContent.trim() === 'Register') {
                container.classList.remove('active-login');
                container.classList.add('active-signup');
            } 
            // Caso contrário, mostra o formulário de login
            else {
                container.classList.remove('active-signup');
                container.classList.add('active-login');
            }
        });
    });
});

//Mostrar/ocultar senha
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
        const input = document.getElementById(icon.dataset.target);
        if(input.type === "password"){
            input.type = text;
        }else{
            input.type = "password";
        }
    });
});

//Força da senha
const strength = document.querySelector('.password-strength span');

password.addEventListener('input', () =>{
    const value = password.value;

    if(value.length < 8){
        strength.classList.add('weak');
    }else if(value.match(/[A-Z]/) && value.match(/[0-9]/)){
        strength.classList.add('strong');
    }else{
        strength.classList.add('medium');
    }
});

//Validação do formulário
signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // impede envio automático

    //Reset
    errorMessage.textContent = '';
    password.classList.remove('error');
    confirm.classList.remove('error');

    // Verifica se as senhas coincidem
    if (password.value !== confirm.value) {
       errorMessage.textContent = "As senhas não coincidem";
       password.classList.add('error');
       confirm.classList.add('error');
       return;
    }
    //Senha Fraca
    if(password.value.length < 8){
        errorMessage.textContent = "A senha deve conter no mínimo 8 carecteres!";
        password.classList.add('error');
        return;
    }

    //Tudo certo!
    signupForm.submit(); // envia o formulário
});