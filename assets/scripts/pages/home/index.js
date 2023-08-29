import page from "../../helpers/page";

export default function home() {


    const pageObject = page({
        id: 'home',
        elm: '.home',
        elms: {
            navigation: document.querySelector('.navigation'),
            wrapper: '.home__wrapper',
            content: '.home__content'
        }
    })
    

    return {
        ...pageObject
    }
}