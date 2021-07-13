import React, { useEffect } from "react";
import { gsap, TweenLite, CSSPlugin } from "gsap/all";

import { ReactComponent as Fox } from '../assets/fox.svg';
import './FoxSquare.css'

//without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...
const plugins = [ CSSPlugin ];

export default function FoxSquare() {
    document.addEventListener("mousemove", onMouseMove);

    useEffect(() => {
        blink()
        twitchEar()
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
            defaults: { duration: .05 }
          })
          .add('close')
          .to('#left-eye', { scaleY: 0 }, 'close')
          .to('#right-eye', { scaleY: 0 }, 'close')

          .add('open')
          .to('#left-eye', { scaleY: 1 }, 'open')
          .to('#right-eye', { scaleY: 1 }, 'open')
    }

    const twitchEar = () => {
        gsap.set('#left-ear', {
            transformOrigin: "100% 15%",
          })

        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 5,
            defaults: { duration: .05 }
          })
          .to('#left-ear', 0.5, { rotation: -5, ease: "circ.out" })
    }

    function onMouseMove(event) {
        var xPos = (event.clientX/window.innerWidth)-0.5,
            yPos = (event.clientY/window.innerHeight)-0.5;

        gsap.set('#face', {
            transformOrigin: "50% 50%",
        })
        TweenLite.to('#face', 0.6, {rotation: -xPos * 10, ease: "circ.out"})
        TweenLite.to('#left-pupil', 0.1, { x: xPos * 200, y: yPos * 200, ease: "circ.out" })
        TweenLite.to('#right-pupil', 0.1, { x: xPos * 200, y: yPos * 200, ease: "circ.out" })
        ; 
    };

    return (
        <div className="svg-container">
            <Fox className="svg-content"/>
        </div>
    )
}
