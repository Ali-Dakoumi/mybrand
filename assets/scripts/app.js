import { each } from "lodash"
import LocomotiveScroll from "locomotive-scroll"
// import EventEmitter from 'events'

import home from "./pages/home"
import about from "./pages/about"
import products from "./pages/products"
import product from "./pages/product"

import preloader from "./components/preloader";
import '../css/styles.scss';

const app = () => {

    // const eventEmitter = new EventEmitter();


    let content,
        template,
        initPage,
        scroll,
        page,
        pages,
        initPreloader


    const createContent = () => {
        content = document.querySelector('.content')
        template = content.getAttribute('data-template')
    }

    const initialiseScroll = () => {
        scroll = new LocomotiveScroll();
        window.scrollTo(0, 0)            
    }

    const createPage = () => {
        pages = {
            home: home,
            about: about,
            product: product,
            products: products,
        }

        page = pages[template]
        initPage = page()
        initPage.create()
    }

    const onChange = async (link) => {
        scroll.stop()
        
        await initPage.hide()

        const newPage = await window.fetch(link)
        if (newPage.status === 200) {
            const html = await newPage.text()
            const div = document.createElement('div')
            div.innerHTML = html
            const divContent = div.querySelector('.content')
            template = divContent.getAttribute('data-template')
            // navigation.onChange(template)
            content.setAttribute('data-template', template)
            content.innerHTML = divContent.innerHTML

            page = pages[template]
            initPage = page()
            initPage.create()
            initPage.createPreloaders()
            scroll = new LocomotiveScroll()
            window.scrollTo(0, 0)            
            initPage.show()
            initPage.createAnimations()
            addLinkListeners()
            window.history.pushState(null, null, link);

        } else {
            console.log('error')
            throw new Error('couldnt fetch page ', link)
        }

    }

    const addLinkListeners = async () => {
        const links = document.querySelectorAll('a')
        each(links, link => {
            link.onclick = (e) => {
                e.preventDefault()
                const { href } = link
                onChange(href)
            }
        })
    }

    const createPrealoder = () => {
        initPreloader = preloader();
        console.log('loading images before preloader')

        // Attach the 'preloaded' event listener
        initPreloader.eventEmitter.once('completed', onPreloaded);
    }

    const onPreloaded = () => {
        initPreloader.destroy()
        initialiseScroll()
        initPage.show()
        initPage.createAnimations()
    }


    createContent()
    createPrealoder()
    createPage()
    addLinkListeners()

}

app()