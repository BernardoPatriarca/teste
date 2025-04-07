// Configuração Supabase
const supabaseUrl = 'https://sdtxtabpzkdtffvsjzqq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkdHh0YWJwemtkdGZmdnNqenFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDA3OTgsImV4cCI6MjA1OTYxNjc5OH0.tJf4J6WkE-8He8wWLnppfbSbETkMgO4gKXE0uNGaHi8'; // Use a chave anônima
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Carrega produtos na página inicial
document.addEventListener('DOMContentLoaded', async () => {
  const { data: produtos, error } = await supabase
    .from('produto')
    .select('*')
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao carregar doces:', error);
    return;
  }

  const container = document.getElementById('produtos');
  produtos.forEach(produto => {
    container.innerHTML += `
      <div class="produto">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.valor.toFixed(2)}</p>
      </div>
    `;
  });
});