import "./fancy.gen.css"


// /* CSS:
// .cursor{
//     position: relative;
//     width: 24em;
//     margin: 0 auto;
//     border-right: 2px solid rgba(255,255,255,.75);
//     font-size: 30px;
//     text-align: center;
//     white-space: nowrap;
//     overflow: hidden;
//     transform: translateY(-50%);    
// }

// .typewriter-animation {
//     animation: typewriter 5s steps(50) 1s 1 normal both, blinkingCursor 500ms steps(50) infinite normal;
// }

// @keyframes typewriter {
//     from { width: 0; }
//     to { width: 100%; }
// }
// @keyframes blinkingCursor{
//     from { border-right-color: rgba(255,255,255,.75); }
//     to { border-right-color: transparent; }
// }
// */

export function TypeWriter() {
    return <p class="cursor typewriter-animation">Hi there, I'm a Typewriter Animation made in pure CSS!</p>
}
