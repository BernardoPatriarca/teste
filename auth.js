// Configuração Supabase (substitua pelas suas credenciais)
const supabaseUrl = 'https://sdtxtabpzkdtffvsjzqq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkdHh0YWJwemtkdGZmdnNqenFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDA3OTgsImV4cCI6MjA1OTYxNjc5OH0.tJf4J6WkE-8He8wWLnppfbSbETkMgO4gKXE0uNGaHi8';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Função de Login
window.login = async function() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    alert('Erro no login: ' + error.message);
  } else {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    window.carregarProdutos();
  }
};

// Verifica se usuário já está logado ao carregar a página
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    window.carregarProdutos();
  }
});