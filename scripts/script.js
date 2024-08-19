setTimeout(() => {
  let divs = document.querySelectorAll("div.produto")
  let docesObjeto = {}
  
  divs.forEach(div => {
    let botao = div.querySelector(".addToCart")
    let imagem = div.querySelector("img")
    let quantCart = document.querySelector("span#quant-cart")
    let itens = document.querySelector("div#itens")
    let docePreco = Number(div.querySelector("p.preco").innerText.replace("$", ""))
    
    botao.addEventListener("click", function selected() {
        botao.removeEventListener("click", selected)
        botao.classList.add("select")
        imagem.style.border = "3px solid hsl(14, 86%, 42%)"
        botao.innerHTML = ""
        
        quantCart.innerText = Number(quantCart.innerText) + 1
        
        let pedidos;
        if (quantCart.innerText == "1") {
          pedidos = document.createElement("ul")
          pedidos.classList.add("pedidos")
        } else {
          pedidos = itens.querySelector("ul")
        }
        let nome = div.querySelector("p.nome")
        
        let li = document.createElement("li")
        li.classList.add("item")
        li.innerHTML = `<div><p class="name">${nome.innerText}</p><p class="qp"><span
        class="quantidade">1x</span> <span
        class="docePreco">$${docePreco.toFixed(2)}</span>
        <span class="precoTot">$${docePreco.toFixed(2)}</span></p></div>`
        li.innerHTML += "<span class='material-symbols-outlined cancel'>cancel</span>"
        
        let quantidade = li.querySelector("span.quantidade")
        let precoTot = li.querySelector("span.precoTot")
        let cancel = li.querySelector("span.cancel")
        docesObjeto[nome.innerText] = {
          precoTot: precoTot.innerText,
          quant: quantidade.innerText
        }
        
        cancel.addEventListener("click", () => {
          setTimeout(() => {
            botao.addEventListener("click", selected)
            }, 100)
            imagem.style.border = "none"
            botao.classList.remove("select")
            botao.innerHTML = `<p><span class="material-symbols-outlined" id="cart">add_shopping_cart</span> Adicionar ao carrinho</p>`
            li.remove()
            quantCart.innerText = Number(quantCart.innerText) -
            Number(quantidade.innerText.replace("x", ""))
            delete docesObjeto[nome.innerText]
            verificarCarrinho()
        })
        
        pedidos.appendChild(li)
        itens.insertBefore(pedidos, itens.firstChild)
        itens.querySelector("div#vazio").style.display = "none"
        
        let p = document.createElement("p")
        
        let quant = document.createElement("span")
        quant.classList.add("quant")
        quant.innerText = "1"
        
        let rm = document.createElement("span")
        rm.classList.add("material-symbols-outlined", "rm")
        rm.innerText = "do_not_disturb_on"
        rm.addEventListener("click", () => {
          let total = itens.querySelector("p#total")
          let orderTotal = Number(total.innerText.replace("$", "")) - docePreco
          let novoPrecoTot = Number(precoTot.innerText.replace("$", "")) - docePreco
          let novaQuantidade = Number(quant.innerText) - 1
          if (novaQuantidade > 0) {
            quant.innerText = novaQuantidade
            quantCart.innerText = Number(quantCart.innerText) - 1
            quantidade.innerText = `${Number(quantidade.innerText.replace("x",
            "")) - 1}x`
            precoTot.innerText = `$${novoPrecoTot.toFixed(2)}`
            total.innerText = `$${orderTotal.toFixed(2)}`
            docesObjeto[nome.innerText]["precoTot"] = `$${novoPrecoTot.toFixed(2)}`
            docesObjeto[nome.innerText]["quant"] = `${novaQuantidade}x`
          } else {
            setTimeout(() => {
              botao.addEventListener("click", selected)
            }, 100)
            imagem.style.border = "none"
            botao.classList.remove("select")
            botao.innerHTML = `<p><span class="material-symbols-outlined" id="cart">add_shopping_cart</span> Adicionar ao carrinho</p>`
            li.remove()
            quantCart.innerText = Number(quantCart.innerText) - 1
            delete docesObjeto[nome.innerText]
            verificarCarrinho()
          }
        })
        
        let add = document.createElement("span")
        add.classList.add("material-symbols-outlined", "add")
        add.innerText = "add_circle"
        add.addEventListener("click", () => {
          let total = itens.querySelector("p#total")
          let orderTotal =
          Number(total.innerText.replace("$", "")) +
          docePreco
          let novoPrecoTot = Number(precoTot.innerText.replace("$", "")) + Number(docePreco)
          let novaQuantidade = Number(quant.innerText) + 1
          quant.innerText = novaQuantidade
          quantCart.innerText = Number(quantCart.innerText) + 1
          quantidade.innerText = `${Number(quantidade.innerText.replace("x", "")) + 1}x`
          precoTot.innerText = `$${novoPrecoTot.toFixed(2)}`
          total.innerText = `$${orderTotal.toFixed(2)}`
          docesObjeto[nome.innerText]["precoTot"] = `$${novoPrecoTot.toFixed(2)}`
          docesObjeto[nome.innerText]["quant"] = `${novaQuantidade}x`
        })
        
        p.appendChild(rm)
        p.appendChild(quant)
        p.appendChild(add)
        
        botao.appendChild(p)
        
        if (quantCart.innerText === "1") {
          let tot = document.createElement("div")
          tot.id = "tot"
            
          let valorTotal = document.createElement("p")
          valorTotal.id = "valorTotal"
          valorTotal.innerText = "Valor Total"
            
          let total = document.createElement("p")
          total.id = "total"
          total.innerText = `$${docePreco.toFixed(2)}`
          
          let confirmar = document.createElement("button")
          confirmar.classList.add("btn")
          confirmar.innerText = "Confirmar Pedido"
          confirmar.addEventListener("click", () => {
            let overlay = document.createElement("div")
            overlay.classList.add("overlay")
            document.body.appendChild(overlay)
            
            let popupContainer = document.createElement("div")
            popupContainer.classList.add("popup-container")
            
            let popup = document.createElement("section")
            popup.classList.add("popup")
            popup.innerHTML += `<img src="imagens/confirm.svg">`
            popup.innerHTML += `<h1>Pedido confirmado</h1>`
            popup.innerHTML += `<p>Esperamos que goste da sua comida!</p>`
            
            fetch("data.json")
              .then(res => res.json())
              .then(data => {
                let itens = pedidos.querySelectorAll("li")
                
                let sectionDoces = document.createElement("section")
                sectionDoces.id = "section-doces"
                let lista = document.createElement("ul")
                lista.id = "lista-doces"
                
                let orderTotal = document.createElement("div")
                orderTotal.id = "order-total"
                orderTotal.innerHTML = `<span>Valor Total</span>
                <span id="somaTotal">${document.querySelector("p#total").innerText}</span>`
                
                sectionDoces.appendChild(lista)
                sectionDoces.appendChild(orderTotal)
                popup.appendChild(sectionDoces)
                
                itens.forEach(item => {
                  let nomeItem = item.querySelector("p.name").innerText
                  let objItem = data.find(obj => obj.name ==
                  nomeItem)
            
                  let itemLi = document.createElement("li")
                  itemLi.classList.add("itemLi")
                  
                  let imgItem = document.createElement("img")
                  imgItem.src = objItem.thumbnail
                  imgItem.alt = `${nomeItem} - Thumbnail`
                  
                  let infosItem = document.createElement("div")
                  infosItem.id = "infos-item"
                  infosItem.innerHTML += `<p id="nome-item">${nomeItem}</p>
                  <p id="quant-preco"><span id="quant-item">${docesObjeto[nomeItem].quant}</span>
                  <span id="preco-item">$${Number(objItem.price).toFixed(2)}</span></p>`
                  
                  let totalItem = document.createElement("p")
                  totalItem.id = "total-item"
                  totalItem.innerHTML = `${docesObjeto[nomeItem].precoTot}`
                  
                  let div = document.createElement("div")
                  div.appendChild(imgItem)
                  div.appendChild(infosItem)
                  
                  itemLi.appendChild(div)
                  itemLi.appendChild(totalItem)
                  
                  lista.appendChild(itemLi)
                  
                })
                
                let novoPedido = document.createElement("button")
                novoPedido.innerHTML = "Começar novo pedido"
                novoPedido.classList.add("btn")
                novoPedido.addEventListener("click", () => {
                  document.body.removeChild(document.querySelector(".overlay"))
                  document.body.removeChild(document.querySelector(".popup-container"))
                  
                  document.querySelectorAll("span.cancel").forEach(cancel =>
                  cancel.click())
                })
                
                popup.appendChild(novoPedido)
              })
              
            
            
            document.body.appendChild(popupContainer)
            popupContainer.appendChild(popup)
          })
          
            
          tot.appendChild(valorTotal)
          tot.appendChild(total)
        
          itens.appendChild(tot)
          itens.appendChild(confirmar)
        } else {
          let total = itens.querySelector("p#total")
          let valorTot = Number(total.innerText.replace("$", "")) + docePreco
          total.innerText = `$${valorTot.toFixed(2)}`
        }
        
        function verificarCarrinho() {
          if (quantCart.innerText == "0") {
            itens.querySelector("div#vazio").style.display = "block"
            itens.removeChild(itens.querySelector("div#tot"))
            itens.removeChild(itens.querySelector("button.btn"))
          } else {
            let total = itens.querySelector("p#total")
            let precoTotal =
            Number(li.querySelector("span.precoTot").innerText.replace("$", ""))
            let orderTotal = Number(total.innerText.replace("$", "")) - precoTotal
            total.innerText = `$${orderTotal.toFixed(2)}`
          }
        }
    })
  })
}, 100)