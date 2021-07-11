import React, { useEffect } from "react";
import { gsap, CSSPlugin } from "gsap/all";

import { ReactComponent as Fox } from '../assets/fox.svg';
import './FoxSquare.css'

//without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...
const plugins = [ CSSPlugin ];

export default function FoxSquare() {

    useEffect(() => {
        // const repeat = new TimelineMax({repeat: -1})
        // repeat.add(animateEyes())
        blink()
    }, [])

    const blink = () => {
        gsap.set('#left-eye', {
            transformOrigin: "50% 50%",
          })

        gsap.set('#right-eye', {
            transformOrigin: "50% 50%",
          })

        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 3,
            defaults: { duration: .1 }
          })
          .add('blink')
          .to('#left-eye', { scaleY: 0 }, 'blink')
          .to('#left-eye', { scaleY: 1 }, 'blink')
          .to('#right-eye', { scaleY: 0 }, 'blink')
          .to('#right-eye', { scaleY: 1 }, 'blink')
      }

    return (
        <div className="svg-container">
            <Fox className="svg-content"/>
        </div>
    )
}
