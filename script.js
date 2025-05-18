document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const cancelBtn = document.querySelector('.btn-cancel');
    
    // Expresiones regulares para validación
    const regex = {
        name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        lastName: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        ci: /^[0-9]{10}$/,
        phone: /^[0-9]{7,15}$/,
        mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        address: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#.,-]{5,100}$/
    };

    // Función para mostrar errores
    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message') || document.createElement('span');
        error.className = 'error-message';
        error.style.color = '#e74c3c';
        error.style.fontSize = '12px';
        error.style.marginTop = '5px';
        error.style.display = 'block';
        error.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        
        input.style.borderColor = '#e74c3c';
    }

    // Función para limpiar errores
    function clearError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.style.borderColor = '#e0e0e0';
    }

    function validateInput(input) {
        const value = input.value.trim();

        const errorMessage = {
            name: {
                noValue: 'Los nombres son requeridos',
                noRegex: 'Solo letras y espacios (2-50 caracteres)'
            },
            lastName: {
                noValue: 'Los apellidos son requeridos',
                noRegex: 'Solo letras y espacios (2-50 caracteres)'
            },
            ci: {
                noValue: 'La cédula es requerida',
                noRegex: 'Cédula debe tener 10 dígitos'
            },
            phone: {
                noValue: 'El teléfono es requerido',
                noRegex: 'Teléfono debe tener 7-15 dígitos'
            },
            mail: {
                noValue: 'El correo electrónico es requerido',
                noRegex: 'Correo electrónico no válido'
            },
            address: {
                noValue: 'La dirección es requerida',
                noRegex: 'Dirección no válida (5-100 caracteres)'
            },
        }

        if (!value) {
            showError(input, errorMessage[input.id].noValue);
            return false;
        }

        if (!regex[input.id].test(value)) {
            showError(input, errorMessage[input.id].noRegex);
            return false;
        }

        clearError(input);
        return true;
    }

    // constants
    const name = document.getElementById('name');
    const lastName = document.getElementById('lastName');
    const ci = document.getElementById('ci');
    const phone = document.getElementById('phone');
    const mail = document.getElementById('mail');
    const address = document.getElementById('address');

    // Event listeners para validación cuando se desenfoca
    name.addEventListener('blur', () => validateInput(name));
    lastName.addEventListener('blur', () => validateInput(lastName));
    ci.addEventListener('blur', () => validateInput(ci));
    phone.addEventListener('blur', () => validateInput(phone));
    mail.addEventListener('blur', () => validateInput(mail));
    address.addEventListener('blur', () => validateInput(address));

    // Validación al enviar el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateInput(name);
        const isLastNameValid = validateInput(lastName);
        const isCIValid = validateInput(ci);
        const isPhoneValid = validateInput(phone);
        const isMailValid = validateInput(mail);
        const isAddressValid = validateInput(address);

        console.log('here')
        
        if (isNameValid && isLastNameValid && isCIValid && 
            isPhoneValid && isMailValid && isAddressValid) {
            // Enviamos los datos del form
            alert('Formulario enviado correctamente');
            form.reset();
        } else {
            alert('Por favor, corrija los errores en el formulario');
        }
    });

    // Limpiar formulario al cancelar
    cancelBtn.addEventListener('click', function() {
        const confirmCancel = confirm('¿Está seguro que desea cancelar? Se perderán los datos ingresados.');
        if (confirmCancel) {
            form.reset();
            
            // Limpiar todos los errores
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => clearError(input));
        }
    });
});