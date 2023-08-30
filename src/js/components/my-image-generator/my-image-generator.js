/**
 * The my-image-generator web component module.
 *
 * @author Max Granberg <mg224em@student.lnu.se>
 * @version 1.0.0
 */

// Define template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    #container {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      max-width: 500px;
      max-height: 500px;
      border: 2px solid white;
      box-shadow: 1px 1px 5px black, -1px -1px 4px grey;
    }
  </style>
  <div id="container">
    <img>
  </div>
`

customElements.define('my-image-generator',
/**
 * Represents a my-image-generator element.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.imageElement = this.shadowRoot.querySelector('img')
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.fetchImg()
    }

    /**
     * Fetch image from api and apply to img element.
     *
     */
    async fetchImg () {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random')

        if (!res.ok) {
          throw new Error('Failed to fetch image... Try again later!')
        }

        const result = await res.json()

        this.imageElement.src = result.message // The image URL
      } catch (error) {
        console.log(error)
      }
    }
  }
)
