const categoria = document.querySelector('#category');
const frente = document.querySelector('#front');
const verso = document.querySelector('#back');
function salvarCard() {
    const card = {
        categoria: categoria.value,
        frente: frente.value,
        verso: verso.value
    }
    const cards = localStorage.getItem('cards');
    if (cards) {
        const cardsArray = JSON.parse(cards);
        cardsArray.push(card);
        localStorage.setItem('cards', JSON.stringify(cardsArray));
    } else {
        const cardsArray = [];
        cardsArray.push(card);
        localStorage.setItem('cards', JSON.stringify(cardsArray));
    }
    alert("Salvo com sucesso!");
}

function carregarCards() {
    const cards = localStorage.getItem('cards');
    if (cards) {
        let indice = -1;
        const cardsArray = JSON.parse(cards);
        cardsArray.forEach(card => {
            const board = document.querySelector('#board');
            indice++;
            let cls = "";
            if(card.categoria == "código"){
                cls = "code";
            }
            board.innerHTML += `
                <div class="card">
                    <div class="card-inner">
                        <div class="card-header">
                            <div class="card-category">
                                ${card.categoria}
                            </div>
                            <div class="card-delete" onclick="excluirCard(${indice})">X</div>
                        </div>
                            <div class="card-front">
                                ${card.frente}
                            </div>
                            <div class="card-back ${cls}">
                                ${card.verso}
                            </div>
                    </div>
                </div>
            `;
        });
    }
}

function excluirCard(indice) {
    const e = confirm("Tem certeza de que deseja excluir esse cartão?");
    if (e) {
        const cards = localStorage.getItem('cards');
        if (cards) {
            const cardsArray = JSON.parse(cards);
            cardsArray.splice(indice, 1);
            localStorage.setItem('cards', JSON.stringify(cardsArray));
        }
        window.location.reload();
    }
}

function shuffle(i){
    const cards = localStorage.getItem('cards');
    if (cards && cards.length > 0) {
        const cardsArray = JSON.parse(cards);
        if(i < cardsArray.length){
            const board = document.querySelector('#board');
                let cls = "";
                if(cardsArray[i].categoria == "código"){
                    cls = "code";
                }
                board.innerHTML = `
                <div class="card big-card">
                    <div class="card-inner">
                        <div class="card-front">
                            ${cardsArray[i].frente}
                        </div>
                        <div class="card-back ${cls}">
                            ${cardsArray[i].verso}
                        </div>
                    </div>
                </div>
                <div id="cards-options">
                    <button class="button" onclick="virarCard()">Virar</button>
                    <button class="button">Já sei!</button>
                    <button class="button" onclick="shuffle(${i+1})">Próximo</button>
                </div>
            `;
        }else{
            shuffle(0);
        }
    }else{
        alert("Não há cartões para estudar!");
    }
}

function virarCard(){
    const card = document.querySelector('.card-inner');
    card.classList.toggle('flip');
}