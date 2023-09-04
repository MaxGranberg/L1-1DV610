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
        <button id="resetButton" class="notVisible">No I certainly did not!</button>
    </form>
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

      this.form = this.shadowRoot.querySelector('form')
      this.textfield = this.shadowRoot.querySelector('#textfield')
      this.submitButton = this.shadowRoot.querySelector('#submitButton')
      this.resetButton = this.shadowRoot.querySelector('#resetButton')
      this.container = this.shadowRoot.querySelector('#container')
      this.header = this.shadowRoot.querySelector('h1')
    }

    /**
     * Called when the element is connected to the DOM. Adding eventlisteners.
     */
    connectedCallback () {
      this.form.addEventListener('submit', this.handleSubmit.bind(this))
      this.resetButton.addEventListener('click', this.handleReset.bind(this))
    }

    /**
     * Handles submit when a user has entered their name.
     *
     * @param {Event} event - The form submit event.
     */
    handleSubmit (event) {
      event.preventDefault()

      // If an image already exists, remove it before adding a new one.
      if (this.shadowRoot.querySelector('my-image-generator')) {
        this.shadowRoot.querySelector('my-image-generator').remove()
      }

      const myImage = document.createElement('my-image-generator')
      this.container.append(myImage)

      this.header.textContent = `Hey ${this.textfield.value}! Did you let the dog out!?`
      this.submitButton.value = 'Yes and I\'ll do it again!'
      this.textfield.className = 'notVisible'
      this.resetButton.classList.remove('notVisible')
    }

    /**
     * Handles the resetbutton action.
     *
     * @param {Event} event - The resetbutton click event.
     */
    handleReset (event) {
      event.preventDefault()

      this.shadowRoot.querySelector('my-image-generator').remove()
      this.resetButton.classList.add('notVisible')
      this.textfield.classList.remove('notVisible')

      this.header.textContent = 'Sorry, what\'s your name then?'
      this.textfield.value = ''
      this.submitButton.value = 'Submit'
    }
  }
)
