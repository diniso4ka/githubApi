const inputButton = document.getElementById('search-block__input')
const searchButton = document.getElementById('search-button')


let loadingElement = document.createElement('p')
let errorElement = document.createElement('p')

const value = inputButton.value

const renderElement = (element, container) => {
   container.append(element)
}


const createCountElement = (data) => {
   const resultCount = document.querySelector('.result-count')
   data.total_count ? resultCount.innerHTML = `Найдено ${data.total_count} результатов` : null;
}

const createLoadingElement = () => {
   loadingElement.innerHTML = 'Идёт загрузка'
   loadingElement.classList.add('load')
   return loadingElement
}

const deleteLoadingElement = () => {
   loadingElement.innerHTML = ''
}

const createErrorElement = (text) => {
   errorElement.innerHTML = text
   errorElement.classList.add('load')
   return errorElement
}

const deleteErrorElement = () => {
   errorElement.innerHTML = ''
}

const loadItemList = async (searchValue) => {
   try {
      const resultList = document.getElementById('result-items')
      const resultCount = document.querySelector('#result-count')
      resultCount.firstChild.remove()
      deleteErrorElement()
      resultList.innerHTML = ''
      renderElement(createLoadingElement(), resultCount)
      const data = await fetch(`https://api.nomoreparties.co/github-search?q=${searchValue}&per_page=10`).then(res => res.json())
      deleteLoadingElement()
      if (data.total_count) {
         createCountElement(data)
         data.items.forEach(item => renderElement(createItem(item.full_name, item.html_url, item.description), resultList))
      } else {
         renderElement(createCountElement('Ничего не найдено.'), resultCount)
      }
   } catch (error) {
      renderElement(createCountElement('Произошла ошибка.'), resultCount)
      console.log(error)
   }
}



const createItem = (path, link, desc) => {
   const resultList = document.getElementById('result-items')

   const newItem = document.createElement('div')
   newItem.classList.add('item-card')



   const itemImage = document.createElement('img')
   itemImage.classList.add('item-img')
   itemImage.setAttribute('src', 'https://c0.klipartz.com/pngpicture/1019/439/gratis-png-directorio-carpetas-de-archivos-de-iconos-del-ordenador.png')
   newItem.append(itemImage)


   const itemText = document.createElement('div')
   itemText.classList.add('item-text')
   newItem.append(itemText)

   const itemLink = document.createElement('a')
   itemLink.classList.add('item-link')
   itemLink.innerHTML = path
   itemLink.href = link
   itemText.append(itemLink)

   const itemDesc = document.createElement('p')
   itemDesc.classList.add('item-desc')
   itemDesc.innerHTML = desc
   itemText.append(itemDesc)

   return newItem
}


const loadData = () => {
   loadItemList(inputButton.value)
}




searchButton.addEventListener('click', loadData)



