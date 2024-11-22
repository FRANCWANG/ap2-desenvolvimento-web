// document.addEventListener('DOMContentLoaded', () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       window.location.href = 'index.html';
//       return;
//     }
  
//     const endpointMap = {
//       all: 'https://botafogo-atletas.mange.li/2024-1/all',
//       masculino: 'https://botafogo-atletas.mange.li/2024-1/masculino',
//       feminino: 'https://botafogo-atletas.mange.li/2024-1/feminino',
//     };
  
//     const select = document.getElementById('filter-select');
//     select.addEventListener('change', () => loadAthletes(endpointMap[select.value]));
  
//     loadAthletes(endpointMap['all']);
//   });
  
//   function loadAthletes(endpoint) {
//     fetch(endpoint)
//       .then(response => response.json())
//       .then(data => renderAthletes(data))
//       .catch(() => alert('Erro ao carregar atletas!'));
//   }
  
//   function renderAthletes(athletes) {
//     const container = document.getElementById('athlete-list');
//     container.innerHTML = athletes.map(athlete => `
//       <div class="card">
//         <h3>${athlete.name}</h3>
//         <p>${athlete.position}</p>
//         <a href="details.html?id=${athlete.id}">Detalhes</a>
//       </div>
//     `).join('');
//   }
  
let final;

const divPrincipal = document.getElementById('container')

const filter = document.getElementById('filter-select')



function limparTela () {
  divPrincipal.innerHTML = ''  
}

const pega_json = async (api, endpoint) => { 
  const resposta = await fetch(api + endpoint); 
  const dadosFuncionais = await resposta.json(); 
  return dadosFuncionais;
  
}

const montarCard = (atleta) => {
  
  const cartao = document.createElement("article");
  const nome = document.createElement("h1");
  const imagem = document.createElement("img");
  const link = document.createElement("a")
  
  
  const span_id = document.createElement('span');
  link.innerHTML ="sobre eu";

  link.href =`details.html?id=${atleta.id}`
  cartao.appendChild(link);

  nome.innerHTML = atleta.nome;
  cartao.appendChild(nome);

  imagem.src = atleta.imagem;
  cartao.appendChild(imagem);
  

  

  // link.innerHTML = "Saiba mais...";
  // link.href = `detalhes.html?id=${atleta.id}`
  // cartao.appendChild(link);

  cartao.dataset.id = atleta.id;
  cartao.dataset.nome = atleta.nome

  span_id.innerHTML = atleta.id
  cartao.appendChild(span_id)




  divPrincipal.appendChild(cartao)
  cartao.onclick = manipulaClick;
}


function limparTela() {

  divPrincipal.innerHTML = '' 
}



filter.addEventListener('change', function() {
  const valorSelecionado = filter.value;

  if (valorSelecionado) {
      if (valorSelecionado === 'masculino') {
          final = 'masculino';
          carregarJogs(final)
      } else if (valorSelecionado === 'feminino') {
          final = 'feminino';
          carregarJogs(final)
      } else if (valorSelecionado === 'elencoCompleto') {
          final = 'all';
          carregarJogs(final)
      }
  }
});


function carregarJogs(final) {
  limparTela()
  pega_json('https://botafogo-atletas.mange.li/2024-1/', final).then(
    ( retorno ) => {
      retorno.forEach((atleta) =>  montarCard(atleta));
    }
        
  )
  
}

const manipulaClick = (e) => {
  const id = e.currentTarget.dataset.id;
  const url =  `details.html?id=${id} `;

  //cookie
  document.cookie = `id=${id}`;
  document.cookie = ` altura=${e.currentTarget.dataset.altura} `;

  //localStorage
  sessionStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset))

  window.location = url;
}
