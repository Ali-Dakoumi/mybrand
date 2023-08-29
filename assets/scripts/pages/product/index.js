import page from "../../helpers/page";

export default function product(params) {
    const pageObject = page({
        id: 'product',
        elm: '.product',
        elms: {
            navigation: document.querySelector('.navigation'),
            wrapper: '.product__wrapper',
            content: '.product__content'
        }
    })
    

    return {
        ...pageObject
    }
}