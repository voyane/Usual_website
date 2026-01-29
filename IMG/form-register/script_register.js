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
