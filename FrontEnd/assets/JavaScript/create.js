const inputImagem = document.getElementById("imagem");
const previewImg = document.getElementById("preview-img");

// Mostrar preview da imagem
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

// Ao enviar o formulário
document.getElementById("productForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const file = inputImagem.files[0];
  if (!file) {
    alert("Por favor, selecione uma imagem para o produto.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
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

    try {
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
      window.location.href = "index.html";
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar produto. Tente novamente.");
    }
  };

  reader.readAsDataURL(file);
});

// Menu hamburguer
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navbar.classList.toggle('show');
});

// Fecha menu ao clicar em um link
const navLinks = document.querySelectorAll('#navbar a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navbar.classList.remove('show');
  });
});

// Logout
document.getElementById('btn-logout').addEventListener('click', function () {
  window.location.href = 'login.html';
});
