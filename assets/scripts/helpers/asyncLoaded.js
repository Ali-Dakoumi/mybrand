import { create, entries } from "lodash";
import component from "./component";

export default function asyncLoaded (elm) {

    let {element} = component({elm})

    
    const createObserver = () => {
        oboserver = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (element.src && !element.classList.contains('loaded')) {
                        element.classList.add('loaded')
                    }
                    else if (!element.src) {
                        element.src = element.getAttribute('data-src')
                        element.onload = () =>  {
                            element.classList.add('loaded')
                        }                        
                    }
                }
            });
        })
        
        oboserver.observe(element)
    }

    // auto run methods
    createObserver()
}