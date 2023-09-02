import component from "../helpers/component"

import SplitType from 'split-type'

import { each } from "lodash";
import { gsap } from "gsap";


export default function preloader() {

    const componentObject = component({
        elm: '.preloader',
        elms: {
            text: '.preloader__text',
            number: '.preloader__number',
            images: document.querySelectorAll('img')
        }
    })

    const {element, elements, eventEmitter} = componentObject

    
    let text = new SplitType( elements.text, { types: 'lines, chars' })

    let length = 0


    const createPreloader = () => {
        if (!elements.images.length) {
             elements.number.innerHTML = `100%`
             onloaded()
            return;
        }
        each(elements.images, image => {
            image.src = image.getAttribute('data-src')
            image.add
            image.onload = () => {
                 onAssetLoaded(image)
            }
        })
    }

    const onAssetLoaded = async (image) => {
         length += 1
        const percent =  length /  elements.images.length
         elements.number.innerHTML = `${Math.round(percent * 100)}%`
         console.log("🚀 ~ file: preloader.js:51 ~ onAssetLoaded ~ onAssetLoaded:")
        if (percent === 1) {
        await  onloaded()
        }
    }
    

    const onloaded = () => {
        return new Promise((resolve) => {
            
            const tl = gsap.timeline()
            tl.set('body', {height: '100vh', overflow:'hidden'})
            tl.to( text.chars, {
                duration: 0.8,
                scaleY: 0,
                opacity: 0,
                y: "-100%",
                stagger: 0.008,
                ease: 'expo.out'
            })
            tl.to( elements.number, {
                autoAlpha: 0,
                scaleY: 0,
                transformOrigin: "0% 0%",
                y: "-100%",
                ease: 'expo.out'
            }, "-=0.8")
            tl.to( element, {
                scaleY: 0,
                transformOrigin: "0% 0%",
                ease: 'expo.out'
            })
            tl.set('body', {overflow: " visible", height: "auto"})
            tl.call(() => {
                eventEmitter.emit('completed')
                resolve
            })
        })
    }

    const destroy = () => {
         element.parentNode.removeChild( element)
    }

    // auto run methods
    createPreloader()



    return {
        element, elements, eventEmitter, destroy
    }
}