import { criarProduto } from '/ProjetoDesafioIntegrador/BackEnd/CRUD.js';

const inputImagem = document.getElementById("imagem");
const previewImg = document.getElementById("preview-img");

inputImagem.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    previewImg.src = "";
    previewImg.style.display = "none";
  }
});

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const file = inputImagem.files[0];
  if (!file) {
    alert("Por favor, selecione uma imagem para o produto.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const imagemBase64 = event.target.result;

    const produto = {
      nome: document.getElementById("nome").value.trim(),
      descricao: document.getElementById("descricao").value.trim(),
      preco: parseFloat(document.getElementById("preco").value),
      categoria: document.getElementById("categoria").value,
      estoque: parseInt(document.getElementById("estoque").value),
      status: document.getElementById("status").value,
      imagem: imagemBase64
    };

    criarProduto(produto);

    // Navegar para dashboard APÓS salvar produto
    window.location.href = "index.html";
  };

  reader.readAsDataURL(file);
});

  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('show');
  });

  // Opcional: fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll('#navbar a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navbar.classList.remove('show');
    });
  });
