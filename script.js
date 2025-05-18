document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const cancelBtn = document.querySelector('.btn-cancel');
    const sendBtn = document.querySelector('.btn-submit');
    const inputs = form.querySelectorAll('input');

    function cleanInputs() {
        inputs.forEach(input => {
            input.value = '';
        })
    }

    // Evento para el botón Cancelar
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('¿Estás seguro de que deseas cancelar? Se perderán todos los datos ingresados.')) {
            cleanInputs()
        }
    });

    // Evento para el botón Enviar
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Datos enviados correctamente');
        cleanInputs();
    })
})