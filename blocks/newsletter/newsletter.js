import {getLibs} from "../../scripts/utils.js"

const {createTag} = await import(`${getLibs()}/utils/utils.js`)

function getForm(formTitle) {
  const formButton = createTag('button', {}, formTitle.textContent)
  
  const firstName = createTag('input', {type: 'text', placeholder: 'First name'})
  const lastName = createTag('input', {type: 'text', placeholder: 'Last name'})
  const email = createTag('input', {type: 'email', placeholder: 'Email name'})
  const form = createTag('form', {}, [firstName, lastName, email, formButton])
  
  addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = { firstName: firstName.value, lastName: lastName.value, email: email.value }
    const resp = fetch(`/email-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"        
      },
      body: JSON.stringify({ data })
    })
    if (!resp.ok) {
      console.error(`response is not ok`)
      return
    }
    const json = await resp.json()
    console.log(json)

  })
  return form
}

export default async function init(el) {
  const titles = [...el.querySelectorAll('h1, h2, h3, h4, h5, h6, p')]
  el.innerHTML = "HELLO"
  console.log(titles)

  const memberList = createTag('ul', {})
  const resp = await fetch('/email-list.json');
  if (!resp.ok) return;
  const json = await resp.json();
  console.log(json.data)
  json.data.forEach(details => {
    const person = createTag('li', {}, `${details.firstName} ${details.lastName}`)
    memberList.append(person)
  })
  const listTitle = titles.shift()
  const submitTitle = titles.shift()

  const form = getForm(titles.shift());
  el.append(listTitle, memberList, submitTitle, form)
}
