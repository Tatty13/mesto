class Section {
  /**
   * @param {object} obj
   * @param {array} obj.items - array of data to be added to the page
   * @param {function} obj.renderer - a function that is responsible for creating and rendering data on the page
   * @param {string} containerSelector - container's selector where to add items
   */
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector)
  }

  /**
   * prepend HTMLElement to the container
   * @param {HTMLElement} element 
   */
  addItem(element) {
    this._container.prepend(element);
  }

  /**
   * add elements to the page using renderer 
   */
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }
}


export default Section;