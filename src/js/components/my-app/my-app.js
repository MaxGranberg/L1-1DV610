/**
 * The my-app web component module.
 *
 * @author Max Granberg <mg224em@student.lnu.se>
 * @version 1.0.0
 */

import '../my-image-generator'

// Define template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .notVisible {
        display: none;
    }
    #container {
        height: 100%;
    }
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        color: beige;
        font-style: italic;
        text-shadow: 1px 1px 6px black, -1px -1px 1px grey;
    }
    form {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button, #submitButton {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
        font-style: italic;
        background-color: black;
        color: beige;
        border-radius: 8px;
        margin-left: 5px;
        padding: 5px;
        opacity: 0.85;
    }
    #submitButton:hover, button:hover {
        box-shadow: 1px 1px 5px black;
        opacity: 1.0;
    }
    #textfield {
        border-radius: 6px;
        box-shadow: 0px 2px 5px grey;
        padding: 5px;
    }
  </style>
  <div id="container">
    <h1>I need your name please...</h1>
    <form>
        <input id="textfield" type="text" placeholder="Insert name here..." required>
        <input id="submitButton" type="submit" value="Submit">
    </form>
    <button id="resetButton" class="notVisible">No I certainly did not!</button>
  </div>
`

customElements.define('my-app',
/**
 * Represents a my-app element.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadpw root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      const form = this.shadowRoot.querySelector('form')
      const textfield = this.shadowRoot.querySelector('#textfield')
      const submitButton = this.shadowRoot.querySelector('#submitButton')
      const resetButton = this.shadowRoot.querySelector('#resetButton')
      const container = this.shadowRoot.querySelector('#container')
      const header = this.shadowRoot.querySelector('h1')

      // Add eventlisteners
      form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (this.shadowRoot.querySelector('my-image-generator')) {
          this.shadowRoot.querySelector('my-image-generator').remove()
        }

        const myImage = document.createElement('my-image-generator')
        container.append(myImage)

        header.textContent = `Hey ${textfield.value}! Did you let the dog out!?`
        submitButton.value = 'Yes and I\'ll do it again!'
        textfield.className = 'notVisible'
        resetButton.classList.remove('notVisible')
        form.appendChild(resetButton)
      })

      resetButton.addEventListener('click', (e) => {
        e.preventDefault()

        this.shadowRoot.querySelector('my-image-generator').remove()
        resetButton.remove()
        textfield.classList.remove('notVisible')

        header.textContent = 'Sorry, what\'s your name then?'
        textfield.value = ''
        submitButton.value = 'Submit'
      })
    }
  }
)
