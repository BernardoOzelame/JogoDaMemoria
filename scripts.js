const jogadores = ['Player 1', 'Player 2']
const spans = []
let jogadorAtual = 0
let jogadas = []
let trancarJogo = false
let placar = [0, 0]
let tabuleiro = criarTabuleiro()

function criarTabuleiro(max = 20) {
    if (max % 2 == 1) {
        return
    }

    const tab = []

    let k = 0
    while (k < max) {
        let numAleat = Math.ceil(Math.random() * (max / 2))
        if (tab.filter(x => x === numAleat).length >= 2) continue

        tab.push(numAleat)
        k++
    }

    return tab
}

function carregarJogadoresEtabuleiro() {
    let divJogadores = document.getElementById('jogadores')

    jogadores.forEach(j => {
        let span = document.createElement('span')
        span.innerHTML = j + '<i>0</i>'
        divJogadores.appendChild(span)
        spans.push(span)
    })

    spans[jogadorAtual].classList.add('jogadorAtivo')

    let divTabuleiro = document.getElementById('tabuleiro')
    tabuleiro.forEach((_, index) => {
        let btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.setAttribute('id', 'btn' + index)
        btn.addEventListener('click', () => realizarJogada(btn, index))
        divTabuleiro.appendChild(btn)
    })
}

function realizarJogada(btn, index) {
    if (trancarJogo) {
        return
    }

    btn.innerHTML = tabuleiro[index]

    if (jogadas.some(j => j === btn)) {
        return
    }

    jogadas.push(btn)

    if (jogadas.length === 2) {
        trancarJogo = true

        if (jogadas[0].innerHTML === jogadas[1].innerHTML) {
            atualizarPlacar()
        } else {
            jogadorAtual = (jogadorAtual + 1) % jogadores.length

            spans.forEach(s => s.classList.remove('jogadorAtivo'))

            setTimeout(() => {
                spans[jogadorAtual].classList.add('jogadorAtivo')
            }, 650)

            setTimeout(() => {
                jogadas.forEach(b => (b.innerHTML = ""))
                jogadas = []
                trancarJogo = false
            }, 800)
        }
    }
}

function atualizarPlacar() {
    placar[jogadorAtual]++
    const divJogadores = document.getElementById('jogadores')
    const divPlacar = divJogadores.querySelectorAll('i')
    divPlacar[jogadorAtual].innerHTML = placar[jogadorAtual]
    jogadas[0].disabled = true
    jogadas[1].disabled = true
    trancarJogo = false

    const p1 = placar[0]
    const p2 = placar[1]

    if (p1 + p2 === 10) {
        if (p1 > p2) {
            setTimeout(() => {
                alert(`Jogador 1 venceu! O placar final foi: ${p1} x ${p2}`)
            }, 400)
        } else if (p1 < p2) {
            setTimeout(() => {
                alert(`Jogador 2 venceu! O placar final foi: ${p2} x ${p1}`)
            }, 400)
        } else {
            setTimeout(() => {
                alert('O jogo terminou empatado!')
            }, 400)
        }
    }

    jogadas = []
}

function reiniciarJogo() {
    trancarJogo = false
    jogadas = []
    jogadorAtual = 0

    const div = document.getElementById('tabuleiro')
    div.innerHTML = ''

    tabuleiro = criarTabuleiro()
    tabuleiro.forEach((_, index) => {
        const btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.setAttribute('id', 'btn' + index)
        btn.addEventListener('click', () => realizarJogada(btn, index))
        div.appendChild(btn)
    })

    placar = [0, 0]
    const divJogadores = document.getElementById('jogadores')
    const divPlacar = divJogadores.querySelectorAll('i')
    divPlacar.forEach(i => (i.innerHTML = '0'))

    spans.forEach(s => s.classList.remove('jogadorAtivo'))

    setTimeout(() => {
        spans[jogadorAtual].classList.add('jogadorAtivo')
    }, 0)
}

const rr = document.getElementById('rr')
rr.addEventListener('click', reiniciarJogo)

carregarJogadoresEtabuleiro()
