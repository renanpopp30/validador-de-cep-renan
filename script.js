const cep = document.getElementById('cep');
const status = document.getElementById('status');

cep.addEventListener('blur',  async () => {
  const cepLimpo = cep.value.replace(/\D/g, '');
  status.className = ''
  status.textContent = ''
  if (cepLimpo.length == 8) {
    const loader = document.getElementById('loader')
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const dadosRetorno = await response.json();
    loader.classList.remove('spinning')
    if (dadosRetorno.erro) {
      status.className = 'error';
      status.textContent = 'CEP não encontrado - digite um CEP válido';
      return;
    }
    console.log(dadosRetorno)
    document.getElementById('rua').value = dadosRetorno.logradouro;
    document.getElementById('bairro').value = dadosRetorno.bairro;
    document.getElementById('cidade').value = dadosRetorno.localidade;
    document.getElementById('estado').value = dadosRetorno.uf;

    document.getElementById('rua').disabled = false;
    document.getElementById('numero').disabled = false;
    document.getElementById('bairro').disabled = false;
    document.getElementById('cidade').disabled = false;
    document.getElementById('estado').disabled = false;

    status.className = 'success';
    status.textContent = `Endereço encontrado: ${dadosRetorno.bairro}, ${dadosRetorno.localidade}`;

  }else {
    status.className = 'error';
    status.textContent = 'CEP inválido - digite 8 números';
    return;
  }
  
});

// =============================================
  // 👇 SEU TRABALHO COMEÇA AQUI
  // =============================================

  // 1. Selecionar o input #cep
  // 2. Adicionar evento 'blur' (quando o usuário clicar fora)
  // 3. Dentro do evento:
  //    a. Pegar o valor e limpar tudo que não for número (replace)
  //    b. Validar se tem exatamente 8 dígitos
  //    c. Fazer fetch GET para: https://viacep.com.br/ws/${cep}/json/
  //    d. Verificar se data.erro === true (CEP não encontrado)
  //    e. Preencher os campos com os dados retornados
  //    f. Habilitar os campos (remover disabled)
  //    g. Mostrar status de sucesso ou erro

  // DICA — remover não-números de uma string:
  // cep.replace(/\D/g, '')

  // DICA — habilitar um campo:
  // document.getElementById('rua').disabled = false

  // DICA — adicionar classe ao spinner:
  // document.getElementById('loader').classList.add('spinning')
  // document.getElementById('loader').classList.remove('spinning')

  console.log('Implemente a busca de CEP aqui!')