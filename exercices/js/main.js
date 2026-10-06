import { initLatex, initHighlight } from "../../js/utils.js"
import { capsules } from "./capsules.js"

const hash = window.location.hash.substring("#/".length)

if (hash.length === 0) {
    window.location.href = "../"
}

const hash_parts = hash.split("/")

const class_number = hash_parts[0]
const file = hash_parts[1] ?? "labs"
const labs_html = await fetch(`../classes/${class_number}/${file}.html`).then(r => r.text())

document.querySelector(".container").innerHTML = `<a href="../" class="back-home">← Accueil</a>` + labs_html

document.title = `Exercices | ${class_number} | Programmation en sciences | CSTJ | Eric Gagné`

addCapsuleButtons()
initLatex()
initHighlight()


function addCapsuleButtons() {
    const links = capsules[class_number] || []
    const exercises = document.querySelectorAll(".container > ol > li")

    const allVideos = []

    exercises.forEach((exercise, index) => {
        const url = links[index]
        if (!url) return

        const video = document.createElement("div")
        video.className = "capsule-video"
        video.innerHTML = `<iframe src="" allowfullscreen></iframe>`
        allVideos.push(video)

        const button = document.createElement("button")
        button.className = "capsule"
        button.textContent = "▶ Capsule"
        button.title = `Voir la capsule de l'exercice ${index + 1}`
        button.addEventListener('click', () => {
            const isOpen = video.classList.toggle('open')
            if (isOpen) {
                allVideos.forEach(v => {
                    if (v !== video && v.classList.contains('open')) {
                        v.classList.remove('open')
                        v.querySelector('iframe').src = ''
                    }
                })
            }
            video.querySelector('iframe').src = isOpen ? toYouTubeEmbed(url) : ''
        })

        const wrapper = document.createElement("div")
        wrapper.className = "capsule-wrapper"
        wrapper.appendChild(button)
        wrapper.appendChild(video)
        exercise.appendChild(wrapper)
    })
}

function toYouTubeEmbed(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/)
    if (!match) return url
    const videoId = match[1]
    const timeMatch = url.match(/[?&]t=(\d+)/)
    const time = timeMatch ? `&start=${timeMatch[1]}` : ''
    return `https://www.youtube.com/embed/${videoId}?autoplay=1${time}`
}