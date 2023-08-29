import component from "./component";

export default function animation({
    elm,
    elms = {},
    animateIn,
    animateOut
    }) {

    const {element, elements} = component({elm,elms})
    console.log("🚀 ~ file: animation.js:11 ~ element:", element)

    const createObserver = () => {
        observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('its in ')
                    animateIn()
                } else {
                    console.log('its out ')
                    animateOut()
                }
            });
        })
        
        observer.observe(element)
    }

    //auto run methods
    createObserver()


}