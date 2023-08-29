import { each } from "lodash"
import { gsap } from "gsap"

import EventEmitter from 'events'


export default function component({ elm, elms}) {
    
    const eventEmitter = new EventEmitter();
    
    

    let selector = elm
    let selectorChildren = {
        ...elms,
        preloaders: '[data-src]'
    }

    let element
    let elements = {}

    const create = () => {
        if (selector instanceof window.HTMLElement) {
            element = selector
        } else {
            element = document.querySelector(selector)
        }

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

    } 

    
    
    const addEventListeners = () => {
        
    } 
    
    const removeEventListeners = () => {
        
    } 


    
    create()
    
    
    return {
        element,
        elements,
        eventEmitter
    }
}