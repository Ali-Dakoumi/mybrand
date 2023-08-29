import page from "../../helpers/page";

export default function about() {
    const pageObject = page({
        id: 'about',
        elm: '.about',
        elms: {
            navigation: document.querySelector('.navigation'),
            wrapper: '.about__wrapper',
            content: '.about__content'
        }
    })
    

    return {
        ...pageObject
    }
}