import { datas } from './datas.js';

//Display Datas
const displayDatas = () => {
    const gallery = document.querySelector('.gallery_container');
    const galleryDatas = datas.map(data => {
        return `
            <article>
                <h3>${data.title}</h3>
                <img src="${data.source}" alt="${data.title}">
                <p>${data.likes} ❤️</p> 
            </article>
        `;
    }).join("");
    gallery.innerHTML = galleryDatas;
};
displayDatas();

//Show Hide menu
const btnDrop = document.querySelector('.btn_drop');
const showHideMenu = () => {
    const menu = document.querySelector('.dropdown_content');
    menu.classList.toggle('active');
    document.querySelector('.arrow').classList.toggle('rotate');
};
btnDrop.addEventListener('click', showHideMenu);

//Filter Datas
const allFilter = Array.from(document.querySelectorAll('.dropdown_content li button'));
const currentSort = document.querySelector('#currentSort');

//Hide option already selected
let optionAlreadySelected = allFilter.find(filter => filter.textContent == currentSort.textContent);
optionAlreadySelected.style.display = "none";

const sortDatas = sortType => {
    switch (sortType) {
        case "Popularity":
            datas.sort((a, b) => b.likes - a.likes);
            break;
        case "Title":
            datas.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "Date":
            datas.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
};

allFilter.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.textContent;
        currentSort.textContent = filterValue;

        if (optionAlreadySelected) optionAlreadySelected.style.display = "block";

        filter.style.display = "none";
        optionAlreadySelected = filter;

        
        sortDatas(filterValue);
        displayDatas();

        const medias = document.querySelectorAll('.gallery_container article');
        medias.forEach((media, index) => {
            setTimeout(() => {
                media.classList.add('animate');
            }, 100 * index);
        });
    });
});