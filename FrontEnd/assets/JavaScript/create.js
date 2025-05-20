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

    // Submit do form com captura da imagem em base64 e salvar produto
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
          nome: document.getElementById("nome").value,
          descricao: document.getElementById("descricao").value,
          preco: parseFloat(document.getElementById("preco").value),
          categoria: document.getElementById("categoria").value,
          estoque: parseInt(document.getElementById("estoque").value),
          status: document.getElementById("status").value,
          imagem: imagemBase64
        };

        criarProduto(produto);

        alert("Produto cadastrado com sucesso!");
        document.getElementById("productForm").reset();
        previewImg.src = "";
        previewImg.style.display = "none";

        
         window.location.href = "index.html";
      };

      reader.readAsDataURL(file);
    });