import { gsap } from "gsap";
import component from "../helpers/component";
import { ScrollTrigger } from "gsap/all";

export default function paragraph(elm, elms) {

    gsap.registerPlugin(ScrollTrigger)

    const {element, elements} = component({elm,elms})

    const animateIn = () => {
        console.log('animate in from component')

        gsap.from(element, {
            duration: 2,
            scrollTrigger: element, // start the animation when ".box" enters the viewport (once)
            y: 100,
            autoAlpha: 0,
        });

        // ScrollTrigger.create({
        //     trigger: elm,
        //     start: "top top",
        //     endTrigger: "#otherID",
        //     end: "bottom 50%+=100px",
        //     onToggle: self => console.log("toggled, isActive:", self.isActive),
        //     onUpdate: self => {
        //       console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
        //     },
        //     y: 100,
        //     autoAlpha: 0,
        //   });
    }

    const animateOut = () => {
        // gsap.set(elm, {autoAlpha: 1, y: 0})
    }


    animateIn()

}