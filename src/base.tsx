/*CSS:-

--spacing: .9rem;

--body-bg : var : white : black;
--body-col : var : black : white;

--primary : var : #6750A4 : #d8c8fa;
--primary-container : var : #EADDFF : #4F378B;
--primary-border : oklch(from var(--primary) calc(l + 0.1) c h);

--secondary : var : #ff69b4 : #ff69b4;
--secondary-container : var : #ffe3f1 : #454245;

--surface : var : #6750A415 : #64626b87;

--error : var : #B3261E : #ff7262;
--error-container : var : #F9DEDC : #8C1D18;

--disabled : var : #bdbdbd: #bcbcbc ;
--disabled-container : var : #e7e7e7: #7d7d7d ;

--a-hover-col: var : #ffac90 : #ffac90;
--a-active-col: var : #cf90ff : #cf90ff; 

--modal-bg: var : oklch(from var(--body-bg) calc(l + .3) c h) ; 
--modal-col: var : var(--body-col) ; 

// ::-webkit-scrollbar {
//   height: 8px;
//   width: 8px;
// }
// ::-webkit-scrollbar-track {
// }
// ::-webkit-scrollbar-track:hover {
//   background: var(--surface);
// }

// ::-webkit-scrollbar-thumb {
//   background: var(--primary-container);
// }
// ::-webkit-scrollbar-thumb:hover {
//   border-radius: 20px;
//   background: var(--primary-container);
// }

* {
  scroll-behavior: smooth;
  margin: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: var(--body-bg);
  color: var(--body-col);
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  padding: 0px;
  margin: 0px;
  font-family: monospace, Inter, ui-sans-serif, system-ui;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;


  // block-size: 100%;
  // display: grid;
  // place-content: start center;

  place-content: center;
}

@media (prefers-reduced-motion: no-preference) {
    html {
        interpolate-size: allow-keywords;
    }
}

input,
button,
textarea,
select {
  font: inherit;
}

p,h1,h2,h3,h4,h5,h6 {
  overflow-wrap: break-word;
}

h1,h2,h3,h4,h5,h6 {
  text-wrap: balance;
}


#root,
#__next {
  isolation: isolate;
}

//-------

h1 {
  font-size: calc(var(--spacing) * 2);
  font-weight: 700;
  line-height: calc(var(--spacing) * 2);
  letter-spacing: -0.04rem;
  word-spacing: -0.4rem;
}

h2 {
  font-size: calc(var(--spacing) * 1.75);
  font-weight: 600;
  line-height: calc(var(--spacing) * 1.75);
  letter-spacing: -0.035rem;
  word-spacing: -0.3rem;
}

h3 {
  font-size: calc(var(--spacing) * 1.5);
  font-weight: 500;
  line-height: calc(var(--spacing) * 1.6);
  letter-spacing: -0.03rem;
  word-spacing: -0.25rem;
}

h4 {
  font-size: calc(var(--spacing) * 1.4);
  font-weight: 400;
  line-height: calc(var(--spacing) * 1.5);
  letter-spacing: -0.025rem;
  word-spacing: -0.15rem;
}

h5 {
  font-size: calc(var(--spacing) * 1.25);
  font-weight: 300;
  line-height: calc(var(--spacing) * 1.25);
  letter-spacing: -0.015rem;
  word-spacing: -0.25rem;
}

h6 {
  font-size: calc(var(--spacing) * 1.1);
  font-weight: 300;
  line-height: calc(var(--spacing) * 1.25);
  letter-spacing: -0.01rem;
  word-spacing: -0.05rem;
}

p,
li {
  text-wrap: pretty;

  font-size: var(--spacing);
  line-height: calc(var(--spacing) * 1.25);
  letter-spacing: -0.01rem;
  word-spacing: -0.05rem;
}

a {
  color: var(--primary);
  :hover {
    color: var(--a-hover-col);
  }
  :active, .active {
    color: var(--a-active-col);
  }
}

label {
  color: color-mix(in srgb, currentColor 75%, transparent);
  background: transparent;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  user-select: none;
  padding: 0.25rem;
}

label[aria-disabled="true"] {
  color: var(--disabled);
  cursor: not-allowed;
  opacity: 0.75;
}

pre {
  overflow: auto;    
  white-space: pre-wrap;
  font-family: monospace;
}

hr {
  border: 1px solid var(--secondary);
  margin: .3rem 0rem;
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {}

//-------

.flex { display: flex; }
.flex-col { flex-direction: row; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-center { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }

.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.justify-center { justify-content: center; }
.space-between { justify-content: space-between; }
.space-around { justify-content: space-around; }
.space-evenly { justify-content: space-evenly; }

.w-full { width: 100%; }
.w-screen { width: 100vw; }

.h-full { height: 100%; }
.h-screen { height: 100vh; }

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.p0 { padding: 0; }
.p1 { padding: calc(var(--spacing) * 0.25); }
.p2 { padding: calc(var(--spacing) * 0.5); } 
.p4 { padding: calc(var(--spacing) * 1); }   
.p8 { padding: calc(var(--spacing) * 2); }   
.p16 { padding: calc(var(--spacing) * 4); }  

.pt0 { padding-top: 0; }
.pt1 { padding-top: calc(var(--spacing) * 0.25); }
.pt2 { padding-top: calc(var(--spacing) * 0.5); }
.pt4 { padding-top: calc(var(--spacing) * 1); }
.pt8 { padding-top: calc(var(--spacing) * 2); }
.pt16 { padding-top: calc(var(--spacing) * 4); }

.pb0 { padding-bottom: 0; }
.pb1 { padding-bottom: calc(var(--spacing) * 0.25); }
.pb2 { padding-bottom: calc(var(--spacing) * 0.5); }
.pb4 { padding-bottom: calc(var(--spacing) * 1); }
.pb8 { padding-bottom: calc(var(--spacing) * 2); }
.pb16 { padding-bottom: calc(var(--spacing) * 4); }

.pl0 { padding-left: 0; }
.pl1 { padding-left: calc(var(--spacing) * 0.25); }
.pl2 { padding-left: calc(var(--spacing) * 0.5); }
.pl4 { padding-left: calc(var(--spacing) * 1); }
.pl8 { padding-left: calc(var(--spacing) * 2); }
.pl16 { padding-left: calc(var(--spacing) * 4); }

.pr0 { padding-right: 0; }
.pr1 { padding-right: calc(var(--spacing) * 0.25); }
.pr2 { padding-right: calc(var(--spacing) * 0.5); }
.pr4 { padding-right: calc(var(--spacing) * 1); }
.pr8 { padding-right: calc(var(--spacing) * 2); }
.pr16 { padding-right: calc(var(--spacing) * 4); }

.ptb0 { padding-top: 0; padding-bottom: 0; }
.ptb1 { padding-top: calc(var(--spacing) * 0.25); padding-bottom: calc(var(--spacing) * 0.25); }
.ptb2 { padding-top: calc(var(--spacing) * 0.5); padding-bottom: calc(var(--spacing) * 0.5); }
.ptb4 { padding-top: calc(var(--spacing) * 1); padding-bottom: calc(var(--spacing) * 1); }
.ptb8 { padding-top: calc(var(--spacing) * 2); padding-bottom: calc(var(--spacing) * 2); }
.ptb16 { padding-top: calc(var(--spacing) * 4); padding-bottom: calc(var(--spacing) * 4); }

.plr0 { padding-left: 0; padding-right: 0; }
.plr1 { padding-left: calc(var(--spacing) * 0.25); padding-right: calc(var(--spacing) * 0.25); }
.plr2 { padding-left: calc(var(--spacing) * 0.5); padding-right: calc(var(--spacing) * 0.5); }
.plr4 { padding-left: calc(var(--spacing) * 1); padding-right: calc(var(--spacing) * 1); }
.plr8 { padding-left: calc(var(--spacing) * 2); padding-right: calc(var(--spacing) * 2); }
.plr16 { padding-left: calc(var(--spacing) * 4); padding-right: calc(var(--spacing) * 4); }

.m0 { margin: 0; }
.m1 { margin: calc(var(--spacing) * 0.25); }
.m2 { margin: calc(var(--spacing) * 0.5); }
.m4 { margin: calc(var(--spacing) * 1); }
.m8 { margin: calc(var(--spacing) * 2); }
.m16 { margin: calc(var(--spacing) * 4); }

.mt0 { margin-top: 0; }
.mt1 { margin-top: calc(var(--spacing) * 0.25); }
.mt2 { margin-top: calc(var(--spacing) * 0.5); }
.mt4 { margin-top: calc(var(--spacing) * 1); }
.mt8 { margin-top: calc(var(--spacing) * 2); }
.mt16 { margin-top: calc(var(--spacing) * 4); }

.mb0 { margin-bottom: 0; }
.mb1 { margin-bottom: calc(var(--spacing) * 0.25); }
.mb2 { margin-bottom: calc(var(--spacing) * 0.5); }
.mb4 { margin-bottom: calc(var(--spacing) * 1); }
.mb8 { margin-bottom: calc(var(--spacing) * 2); }
.mb16 { margin-bottom: calc(var(--spacing) * 4); }

.ml0 { margin-left: 0; }
.ml1 { margin-left: calc(var(--spacing) * 0.25); }
.ml2 { margin-left: calc(var(--spacing) * 0.5); }
.ml4 { margin-left: calc(var(--spacing) * 1); }
.ml8 { margin-left: calc(var(--spacing) * 2); }
.ml16 { margin-left: calc(var(--spacing) * 4); }

.mr0 { margin-right: 0; }
.mr1 { margin-right: calc(var(--spacing) * 0.25); }
.mr2 { margin-right: calc(var(--spacing) * 0.5); }
.mr4 { margin-right: calc(var(--spacing) * 1); }
.mr8 { margin-right: calc(var(--spacing) * 2); }
.mr16 { margin-right: calc(var(--spacing) * 4); }

.mt0.mb0 { margin-top: 0; margin-bottom: 0; }
.mt1.mb1 { margin-top: calc(var(--spacing) * 0.25); margin-bottom: calc(var(--spacing) * 0.25); }
.mt2.mb2 { margin-top: calc(var(--spacing) * 0.5); margin-bottom: calc(var(--spacing) * 0.5); }
.mt4.mb4 { margin-top: calc(var(--spacing) * 1); margin-bottom: calc(var(--spacing) * 1); }
.mt8.mb8 { margin-top: calc(var(--spacing) * 2); margin-bottom: calc(var(--spacing) * 2); }
.mt16.mb16 { margin-top: calc(var(--spacing) * 4); margin-bottom: calc(var(--spacing) * 4); }

.ml0.mr0 { margin-left: 0; margin-right: 0; }
.ml1.mr1 { margin-left: calc(var(--spacing) * 0.25); margin-right: calc(var(--spacing) * 0.25); }
.ml2.mr2 { margin-left: calc(var(--spacing) * 0.5); margin-right: calc(var(--spacing) * 0.5); }
.ml4.mr4 { margin-left: calc(var(--spacing) * 1); margin-right: calc(var(--spacing) * 1); }
.ml8.mr8 { margin-left: calc(var(--spacing) * 2); margin-right: calc(var(--spacing) * 2); }
.ml16.mr16 { margin-left: calc(var(--spacing) * 4); margin-right: calc(var(--spacing) * 4); }

.gap0 { gap: 0; }
.gap1 { gap: calc(var(--spacing) * 0.25); }
.gap2 { gap: calc(var(--spacing) * 0.5); }
.gap4 { gap: calc(var(--spacing) * 1); }
.gap8 { gap: calc(var(--spacing) * 2); }
.gap16 { gap: calc(var(--spacing) * 4); }

.br0 { border-radius: 0; }
.br1 { border-radius: calc(var(--spacing) * 0.25); }
.br2 { border-radius: calc(var(--spacing) * 0.5); }
.br4 { border-radius: calc(var(--spacing) * 1); }
.br8 { border-radius: calc(var(--spacing) * 2); }
.br16 { border-radius: calc(var(--spacing) * 4); }

.noline { text-decoration: none; }
.underline { text-decoration: underline; }
.line { text-decoration: line-through; }
.overline { text-decoration: overline; }

.border-basic { border: 1px solid var(--primary);}

.border-0 { border-width: 0; }
.border-1 { border-width: 1px; }
.border-2 { border-width: 2px; }
.border-4 { border-width: 4px; }
.border-8 { border-width: 8px; }

.border-solid { border-style: solid; }
.border-dashed { border-style: dashed; }
.border-dotted { border-style: dotted; }
.border-double { border-style: double; }
.border-none { border-style: none; }

.border-primary { border-color: var(--primary); }
.border-secondary { border-color: var(--secondary); }

*/
