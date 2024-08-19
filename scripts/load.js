let doces = document.querySelector("section#doces")

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(produto => {
      let div = document.createElement("div")
      div.classList.add("produto")
      
      let picture = document.createElement("picture")
      
      let img = document.createElement("img")
      img.src = produto.image
      img.alt = produto.name
      
      let imgDesktop = document.createElement("source")
      imgDesktop.media = "(min-width: 1200px)"
      imgDesktop.srcset = produto.desktop
      imgDesktop.type = "image/jpeg"
      
      let span = document.createElement("span")
      span.classList.add("addToCart")
      span.innerHTML = `<p><span class="material-symbols-outlined" id="cart">add_shopping_cart</span> Adicionar ao carrinho</p>`
      
      let infos = document.createElement("div")
      infos.classList.add("infos")
      infos.innerHTML += `<p class="categoria">${produto.category}</p>`
      infos.innerHTML += `<p class="nome">${produto.name}</p>`
      infos.innerHTML += `<p class="preco">$${produto.price.toFixed(2)}</p>`
      
      picture.appendChild(imgDesktop)
      picture.appendChild(img)
      div.appendChild(picture)
      div.appendChild(span)
      div.appendChild(infos)
      
      doces.appendChild(div)
    })
  })