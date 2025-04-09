document.addEventListener('DOMContentLoaded', () => {
    const logradouro = document.querySelector('#logradouro');
    const numero = document.querySelector('#numero');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const message = document.querySelector('#message');
    const buscarCep = document.querySelector('#buscarCep'); // Botão "Encontrar"

    buscarCep.addEventListener('click', async () => {
        try {
            const onlyNumbers = /^[0-9]+$/;
            const cepValid = /^[0-9]{8}$/;

            if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)) {
                throw { cep_error: 'CEP Inválido' };
            }

            const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

            if (!response.ok) {
                throw new Error('Erro ao buscar o CEP.');
            }

            const responseCep = await response.json();

            if (responseCep.erro) {
                throw { cep_error: 'CEP não encontrado.' };
            }

            // Preenchendo os campos com os dados retornados
            logradouro.value = responseCep.logradouro || '';
            bairro.value = responseCep.bairro || '';
            cidade.value = responseCep.localidade || '';
        } catch (error) {
            if (error?.cep_error) {
                message.textContent = error.cep_error;
                setTimeout(() => {
                    message.textContent = '';
                }, 3000);
            }
            console.error(error);
        }
    });
});

// console.log('Como consumir API usando fetch() ')
// cep = 13186546
// url = `https://viacep.com.br/ws/${cep}/json/`

// //Puxando os dados
// dados = fetch(url).then( (response) => {
//     return response.json()
// }).then(
//     (dados) => {
//         console.log(dados)
//         console.log(logradouro = dados.logradouro)})