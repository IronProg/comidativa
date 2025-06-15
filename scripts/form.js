const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]+$/);
const form = document.querySelector('form');

form.addEventListener('submit', contatoSubmitHandler);

function contatoSubmitHandler(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('input,textarea');

  erros = montaErros(inputs);

  mostraErros(erros);

  if (erros.length > 0) {
    return false;
  } else {
    alert('Formulário enviado!')
  }
}

function montaErros(inputs) {
  const erros = [];

  inputs.forEach(input => {
    const name = input.name;
    const value = input.value;

    switch (name) {
      case 'nome':
        if (!value || value == '')
          erros.push({ element: input, mensagem: 'Não pode ficar em branco' })
        else if (value.trim().split(' ').length == 1)
          erros.push({ element: input, mensagem: 'Deve conter nome e sobrenome' })
        break;
      case 'email':
        if (!value || value == '')
          erros.push({ element: input, mensagem: 'Não pode ficar em branco' })
        else if (emailRegex.test(value.trim()) === false)
          erros.push({ element: input, mensagem: 'Formato de email incorreto' })
        break;
      case 'telefone':
        if (value && value != '') {
          if (new RegExp(/^\d{8,9}$/).test(value.trim()) === false)
            erros.push({ element: input, mensagem: 'Deve conter 8 ou 9 números sem símbolos' })
        }
        break;
      case 'descricao':
        if (!value || value == '')
          erros.push({ element: input, mensagem: 'Não pode ficar em branco' })
        else if (value.trim().length < 30 || value.trim().length > 500)
          erros.push({ element: input, mensagem: 'Deve conter entre 30 e 500 caracteres' })
        break;
      default:
        break;
    }
  });

  return erros;
}

function mostraErros(erros) {
  document.querySelectorAll('.error-container').forEach(errorContainer => {
    errorContainer.innerHTML = '';
  })

  erros.forEach(err => {
    const errorElement = `
      <span style="color: rgb(204, 0, 0); font-size: 0.8rem;">${err.mensagem}</span>
    `;

    const errorContainer = document.querySelector(`#${err.element.id}-error-container`);

    errorContainer.innerHTML += errorElement
  })
}