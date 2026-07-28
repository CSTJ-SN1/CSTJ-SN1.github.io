import { initLatex, initHighlight } from "../../js/utils.js"

const hash = window.location.hash.substring("#/".length)

if (hash.length === 0) {
    window.location.href = "../"
}

const hash_parts = hash.split("/")

const class_number = hash_parts[0]
const labs_html = await fetch(`../classes/${class_number}/labs.html`).then(r => r.text())
document.querySelector(".container").innerHTML = `<a href="../" class="back-home">← Accueil</a>` + labs_html

document.title = `Exercices | ${class_number} | Programmation en sciences | CSTJ | Eric Gagné`

initLatex()
initHighlight()