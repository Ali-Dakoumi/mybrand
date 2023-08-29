import { each, map } from "lodash"
import { gsap } from "gsap"

import asyncLoaded from "./asyncLoaded"
import  paragraph from "../animations/paragraph"


export default function page({id, elm, elms}) {
    


    let selector = elm
    let selectorChildren = {
        ...elms,
        preloaders: '[data-src]',
        animationParagraphs: '[data-animation="paragraph"]'
    }

    let element
    let elements = {}

    const create = () => {
        element = document.querySelector(selector)

        each(selectorChildren, (entry, key) => {
            if (entry instanceof HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
                elements[key] = entry
            } else {
                elements[key] = document.querySelectorAll(entry)
                if (elements[key].length === 0 ) {
                    elements[key] = null
                } else if (elements[key].length === 1 ) {
                    elements[key] = document.querySelector(entry)
                }
            }
          }
        )
        
        createPreloaders()
    } 


    const createAnimations = () => {
        console.log('create animation from page')
        const paragraphs = map(elements.animationParagraphs, elm => {
            return paragraph(elm)
        })
    }

    const show = () => {
        return new Promise(resolve => {
         const animationIn = gsap.timeline()
         animationIn.fromTo(element,{autoAlpha: 0}, {
             autoAlpha: 1,
         })
         animationIn.call(_ => {
            //  this.addEventListeners()
             resolve()
         })
     })
     }

     const removeEventListeners = () => {
        
     }

    const createPreloaders = () => {
        if (elements.preloaders) {
            each(elements.preloaders, element => {
               asyncLoaded(element)
            })
        }
    }
 
    const hide = () => {
         return new Promise(resolve => {
             removeEventListeners()
             const animationOut = gsap.timeline()
             animationOut.to(element, {
              autoAlpha: 0,
             })
             animationOut.call(_ => {
                 resolve()
             })        
         })
      }

    const update = () => {
    } 

    return {
       create,
       update,
       show,
       hide,
       createPreloaders,
       createAnimations
    }
}