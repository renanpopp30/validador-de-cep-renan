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
