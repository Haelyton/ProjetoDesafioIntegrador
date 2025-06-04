// Referência aos elementos de imagem
const inputImagem = document.getElementById("imagem");
const previewImg = document.getElementById("preview-img");

// Mostrar o preview da imagem selecionada pelo usuário
inputImagem.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImg.src = e.target.result;        // Exibe a imagem no elemento <img>
      previewImg.style.display = "block";      // Torna a imagem visível
    };

    reader.readAsDataURL(file);                // Converte a imagem para Base64
  } else {
    // Caso nenhum arquivo seja selecionado
    previewImg.src = "";
    previewImg.style.display = "none";
  }
});

// Envio do formulário de criação de produto
document.getElementById("productForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  const file = inputImagem.files[0];

  if (!file) {
    alert("Por favor, selecione uma imagem para o produto.");
    return;
  }

  const reader = new FileReader();

  // Quando a imagem for carregada, envia os dados para o back-end
  reader.onload = async function (event) {
    const imagemBase64 = event.target.result;

    // Objeto com os dados do produto
    const produto = {
      nome: document.getElementById("nome").value.trim(),
      descricao: document.getElementById("descricao").value.trim(),
      preco: parseFloat(document.getElementById("preco").value),
      categoria: document.getElementById("categoria").value,
      estoque: parseInt(document.getElementById("estoque").value),
      status: document.getElementById("status").value,
      imagem: imagemBase64
    };

    try {
      // Envia o produto para a API via POST
      const resposta = await fetch("https://projetodesafiointegrador.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });

      if (!resposta.ok) {
        throw new Error("Erro ao criar produto");
      }

      alert("Produto criado com sucesso!");
      window.location.href = "index.html"; // Redireciona para a página principal
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar produto. Tente novamente.");
    }
  };

  reader.readAsDataURL(file); // Lê o arquivo da imagem como Base64
});

// =========================
// Menu Hamburguer Responsivo
// =========================
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

// Alterna classe para exibir/ocultar o menu ao clicar no botão
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navbar.classList.toggle('show');
});

// Fecha o menu ao clicar em qualquer link
const navLinks = document.querySelectorAll('#navbar a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navbar.classList.remove('show');
  });
});

// =========================
// Botão de Logout
// =========================
document.getElementById('btn-logout').addEventListener('click', function () {
  // Redireciona para a página de login (simulando logout)
  window.location.href = 'login.html';
});
