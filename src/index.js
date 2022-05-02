const dataUrl = "http://localhost:3000/dogs"

function renderDogs() {
    fetch(`${dataUrl}`).then(res=> res.json()).then(data=>{
        console.log(data)
        data.forEach(dog => {
            const tBody = document.querySelector("#table-body")
            const tr = document.createElement('tr')
            const tdName = document.createElement('td')
            tdName.textContent = dog.name
            const tdBreed = document.createElement('td')
            tdBreed.textContent = dog.breed
            const tdSex = document.createElement('td')
            tdSex.textContent = dog.sex
            const tdEdit = document.createElement('td')
            const editBtn = document.createElement('button')
            editBtn.className = "edit-btn"
            editBtn.id = dog.id
            editBtn.textContent='Edit'
            tdEdit.append(editBtn)
            tr.append(tdName, tdBreed, tdSex, tdEdit)
            editBtn.addEventListener('click', (e) => {
                console.log(e)
                const form = document.querySelector('#dog-form')
                const editForm = document.querySelectorAll("form input")
                console.log(editForm[3])
                editForm[0].value = dog.name
                editForm[1].value = dog.breed
                editForm[2].value = dog.sex
                form.addEventListener('submit', ( (e)=> {
                    e.preventDefault()
                    console.log(e)
                    const dogObj = {
                        name: e.target[0].value,
                        breed: e.target[1].value,
                        sex: e.target[2].value
                    }
                    console.log(dogObj)
                    console.log(`${dataUrl}/${dog.id}`)
                    fetch(`${dataUrl}/${dog.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-type":"application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(dogObj)}).
                        then(res => res.json()).then(data => {
                            console.log(data)
                            tdName.textContent = e.target[0].value
                            tdBreed.textContent = e.target[1].value
                            tdSex.textContent = e.target[2].value
                        })
                }))
            })
            tBody.append(tr)
        })
     })
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded')
    renderDogs()
})