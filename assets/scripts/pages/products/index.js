import page from "../../helpers/page";

export default function products(params) {
    const pageObject = page({
        id: 'products',
        elm: '.products',
        elms: {
            navigation: document.querySelector('.navigation'),
            wrapper: '.products__wrapper',
            content: '.products__content'
        }
    })
    

    return {
        ...pageObject
    }
}