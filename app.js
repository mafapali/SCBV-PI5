// === COLOQUE SUAS CHAVES DO SUPABASE AQUI ===
const SUPABASE_URL = 'https://zfpstoevqfnrarmwddub.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bZ5SgALOO-LwT3WOlHrlrw_-UHGuobG';

// Inicializa o Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Referências aos elementos da tela
const formChamado = document.getElementById('form-chamado');
const listaChamados = document.getElementById('lista-chamados');

// Função para buscar e exibir os chamados
async function carregarChamados() {
    // Busca os dados na tabela 'chamados', ordenando pelos mais recentes
    const { data, error } = await supabaseClient
        .from('chamados')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar chamados:', error);
        listaChamados.innerHTML = '<p>Erro ao carregar chamados.</p>';
        return;
    }

    if (data.length === 0) {
        listaChamados.innerHTML = '<p>Nenhum chamado aberto no momento.</p>';
        return;
    }

    // Monta o HTML da lista
    listaChamados.innerHTML = data.map(chamado => {
        // Define a classe da cor do status
        const statusClass = chamado.status.toLowerCase().replace(' ', '');
        
        return `
            <div class="chamado-item">
                <span class="status ${statusClass}">${chamado.status}</span>
                <h3>${chamado.titulo}</h3>
                <p><strong>Local:</strong> ${chamado.local_endereco}</p>
                <p>${chamado.descricao}</p>
            </div>
        `;
    }).join('');
}

// Função para enviar um novo chamado
formChamado.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita recarregar a página
    
    // Pega os valores digitados
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const local_endereco = document.getElementById('local').value;
    const contato = document.getElementById('contato').value;

    const btnSubmit = formChamado.querySelector('button');
    btnSubmit.innerText = 'Enviando...';
    btnSubmit.disabled = true;

    // Salva no banco de dados
    const { error } = await supabaseClient
        .from('chamados')
        .insert([{ titulo, descricao, local_endereco, contato }]);

    if (error) {
        alert('Erro ao enviar chamado: ' + error.message);
    } else {
        alert('Chamado enviado com sucesso!');
        formChamado.reset(); // Limpa o formulário
        carregarChamados(); // Atualiza a lista
    }

    btnSubmit.innerText = 'Enviar Chamado';
    btnSubmit.disabled = false;
});

// Carrega a lista de chamados assim que a página abre
carregarChamados();
