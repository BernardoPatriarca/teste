const supabase = window.supabase;

// Carrega produtos na tabela admin
window.carregarProdutos = async function() {
  const { data: produtos, error } = await supabase
    .from('produto')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Erro ao carregar doces:', error);
    return;
  }

  const tbody = document.querySelector('#tabela-produtos tbody');
  tbody.innerHTML = '';
  produtos.forEach(produto => {
    tbody.innerHTML += `
      <tr>
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>R$ ${produto.valor.toFixed(2)}</td>
        <td>
          <button onclick="editarProduto(${produto.id})">Editar</button>
          <button onclick="excluirProduto(${produto.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
};

// Formulário de salvar/editar
document.getElementById('form-produto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('id').value;
  const nome = document.getElementById('nome').value;
  const valor = parseFloat(document.getElementById('valor').value);

  if (id) {
    // Editar
    const { error } = await supabase
      .from('produto')
      .update({ nome, valor })
      .eq('id', id);
    if (error) alert('Erro ao editar: ' + error.message);
  } else {
    // Criar
    const { error } = await supabase
      .from('produto')
      .insert([{ nome, valor }]);
    if (error) alert('Erro ao criar: ' + error.message);
  }

  document.getElementById('form-produto').reset();
  window.carregarProdutos();
});

// Funções globais para os botões
window.editarProduto = async function(id) {
  const { data: produto, error } = await supabase
    .from('produto')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    alert('Erro ao carregar doce: ' + error.message);
    return;
  }

  document.getElementById('id').value = produto.id;
  document.getElementById('nome').value = produto.nome;
  document.getElementById('valor').value = produto.valor;
};

window.excluirProduto = async function(id) {
  if (!confirm('Tem certeza que deseja excluir este doce?')) return;
  const { error } = await supabase
    .from('produto')
    .delete()
    .eq('id', id);
  if (error) alert('Erro ao excluir: ' + error.message);
  window.carregarProdutos();
};