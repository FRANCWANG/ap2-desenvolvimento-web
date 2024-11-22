document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = 'index.html';
      return;
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id');
    if (!athleteId) {
      alert('ID do atleta não encontrado.');
      return;
    }
  
    fetch(`https://botafogo-atletas.mange.li/2024-1/${athleteId}`)
      .then(response => response.json())
      .then(data => renderDetails(data))
      .catch(() => alert('Erro ao carregar detalhes do atleta!'));
  });
  
  function renderDetails(athlete) {
    const container = document.getElementById('details-container');
    container.innerHTML = `
      <h1>${athlete.nome}</h1>
      <img src=${athlete.imagem}
      width = "200px";
      >
    <p>Numero de jogos: ${athlete.n_jogos}</p>
      <p>Posição: ${athlete.posicao}</p>
      <p>descrição: ${athlete.detalhes}</p>
    `;
  }
  