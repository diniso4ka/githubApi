const resultCount = document.getElementById('result-count')
const inputButton = document.getElementById('search-block__input')
const searchButton = document.getElementById('search-button')


let loadingElement = document.createElement('p')
const value = inputButton.value


const createCountElement = (data) => {
   data.total_count ? resultCount.innerHTML = `Найдено ${data.total_count} результатов` : null;
}

const createLoadingElement = () => {
   const resultList = document.getElementById('result-items')
   loadingElement.innerHTML = 'Идёт загрузка'
   resultList.append(loadingElement)
}

const deleteLoadingElement = () => {
   loadingElement.innerHTML = ''
}

const loadItemList = async (searchValue) => {
   try {
      const resultList = document.getElementById('result-items')
      const resultCount = document.getElementById('result-count')
      resultCount.firstChild.remove()
      resultList.innerHTML = ''
      createLoadingElement()
      const data = await fetch(`https://api.nomoreparties.co/github-search?q=${searchValue}`).then(res => res.json())
      deleteLoadingElement()
      if (data.total_count) {
         createCountElement(data)
         data.items.forEach(item => createItem(item.full_name, item.html_url, item.description))
      } else {
         createErrorElement('Ничего не найдено.')
      }
   } catch (error) {
      createErrorElement('Произошла ошибка.')
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


   resultList.append(newItem)
}


const createErrorElement = (text) => {
   const content = document.querySelector('.result-container')
   let div = document.createElement('div')
   div.innerHTML = text
   content.prepend(div)
}

const loadData = () => {
   loadItemList(inputButton.value)
}





searchButton.addEventListener('click', loadData)


// const resultNumber = document.getElementById('result-count__number')
// const inputButton = document.getElementById('search-block__input')
// const searchButton = document.getElementById('search-button')


// let loadingElement = document.createElement('p')
// const value = inputButton.value


// const createCountElement = (data) => {
//    data.total_count ? resultNumber.innerHTML = `Найдено ${data.total_count} результатов` : null;
// }

// const createLoadingElement = () => {
//    const resultList = document.getElementById('result-items')
//    loadingElement.innerHTML = 'Идёт загрузка'
//    resultList.append(loadingElement)
// }

// const deleteLoadingElement = () => {
//    loadingElement.innerHTML = ''
// }

// const loadItemList = async (searchValue) => {
//    try {
//       createLoadingElement()
//       const data = await fetch(`https://api.nomoreparties.co/github-search?q=${searchValue}`).then(res => res.json())
//       deleteLoadingElement()
//       console.log(data)
//       const resultList = document.getElementById('result-items')
//       // resultList.innerHTML = ''

//       createCountElement(data)
//       data.items.forEach(item => createItem(item.full_name, item.html_url, item.description))
//    } catch (error) {
//       createErrorElement('Произошла ошибка.')
//    }
// }

// const loadData = () => {
//    loadItemList(inputButton.value)
// }

// const createItem = (path, link, desc) => {
//    const resultList = document.getElementById('result-items')

//    const newItem = document.createElement('div')
//    newItem.classList.add('item-card')



//    const itemImage = document.createElement('img')
//    itemImage.classList.add('item-img')
//    itemImage.setAttribute('src', 'https://c0.klipartz.com/pngpicture/1019/439/gratis-png-directorio-carpetas-de-archivos-de-iconos-del-ordenador.png')
//    newItem.append(itemImage)


//    const itemText = document.createElement('div')
//    itemText.classList.add('item-text')
//    newItem.append(itemText)

//    const itemLink = document.createElement('a')
//    itemLink.classList.add('item-link')
//    itemLink.innerHTML = path
//    itemLink.href = link
//    itemText.append(itemLink)

//    const itemDesc = document.createElement('p')
//    itemDesc.classList.add('item-desc')
//    itemDesc.innerHTML = desc
//    itemText.append(itemDesc)


//    resultList.append(newItem)
// }


// const createErrorElement = (text) => {
//    const resultList = document.getElementById('result-items')
//    let div = document.createElement('div')
//    div.innerHTML = text
//    resultList.prepend(div)
// }





// searchButton.addEventListener('click', loadData)


