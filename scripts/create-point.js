function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Instrumentos
//pegar todos os li's

const instrumentToSelect = document.querySelectorAll(".items-grid li")
let selectedItems = []

const collectedItems = document.querySelector("input[name=items]")

for(const instrument of instrumentToSelect) {
    instrument.addEventListener("click", function handleSelectedItem(event){
        const itemLi = event.target
        
        // adicionar ou remover uma classe com js
        itemLi.classList.toggle("selected")
        
        const itemId = itemLi.dataset.id
        
        // verificar se existem items selecionados, se sim
        // pegar os items selecionados
        const alreadySelected = selectedItems.findIndex(item => {
            const itemFound = item == itemId //será true ou false
            return itemFound
        })

        /*VERSAO ENXUTA DO CODIGO DE CIMA
        const alreadySelected = selectedItems.findIndex(item => 
            return item == itemId
        )
        */

        // se já estiver selecionado, tirar da seleção
        if(alreadySelected >= 0) {
            //tirar da seleção
            const filteredItems = selectedItems.filter(item => {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })

            selectedItems = filteredItems
        } else {
            // se nao estiver selecionado
            // adicionar a selecao
            selectedItems.push(itemId)
        }

        // atualizar o campo escondido com os dados selecionados
        collectedItems.value = selectedItems
    })
}