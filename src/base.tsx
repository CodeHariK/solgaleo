/*CSS:*

sol(--spacing , .9rem);

sol(--body-bg , white , black);
sol(--body-col , black , white);

sol(--primary , #6750A4 , #d8c8fa);
sol(--primary-container , #EADDFF , #4F378B);
sol(--primary-border , oklch(from var(--primary) calc(l + 0.1) c h));

sol(--secondary , #ff69b4 , #ff69b4);
sol(--secondary-container , #ffe3f1 , #454245);

sol(--surface , oklch(from var(--body-bg) calc(l - .02) c h) , oklch(from var(--body-bg) calc(l + .3) c h) );
sol(--surface-container , oklch(from var(--body-col) calc(l + .9) c h) , oklch(from var(--body-col) calc(l - .6) c h) );

sol(--error , #B3261E , #ff7262);
sol(--error-container , #F9DEDC , #8C1D18);

sol(--disabled , #bdbdbd , #bcbcbc);
sol(--disabled-container , #e7e7e7 , #7d7d7d) ;

sol(--a-hover-col , #ffac90 , #ffac90);
sol(--a-active-col , #cf90ff , #cf90ff); 

sol(--modal-bg , oklch(from var(--body-bg) calc(l + .3) c h) ); 
sol(--modal-col , var(--body-col) ); 

::-webkit-scrollbar {
  height: 8px;
  width: 7px;
}

::-webkit-scrollbar-track {
  background: var(--surface);
}
::-webkit-scrollbar-track:hover {
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: var(--surface-container);
}

*:hover::-webkit-scrollbar-thumb {
}

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
  height: 100vh;
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

sol(--size-0 , 0);
sol(--size-1 , calc(var(--spacing) * 0.25));
sol(--size-2 , calc(var(--spacing) * 0.5));
sol(--size-4 , calc(var(--spacing) * 1));
sol(--size-8 , calc(var(--spacing) * 2));
sol(--size-16 , calc(var(--spacing) * 4));

.p0 { padding: var(--size-0); }
.p1 { padding: var(--size-1); }
.p2 { padding: var(--size-2); }
.p4 { padding: var(--size-4); }
.p8 { padding: var(--size-8); }
.p16 { padding: var(--size-16); }

.pt0 { padding-top: var(--size-0); }
.pt1 { padding-top: var(--size-1); }
.pt2 { padding-top: var(--size-2); }
.pt4 { padding-top: var(--size-4); }
.pt8 { padding-top: var(--size-8); }
.pt16 { padding-top: var(--size-16); }

.pb0 { padding-bottom: var(--size-0); }
.pb1 { padding-bottom: var(--size-1); }
.pb2 { padding-bottom: var(--size-2); }
.pb4 { padding-bottom: var(--size-4); }
.pb8 { padding-bottom: var(--size-8); }
.pb16 { padding-bottom: var(--size-16); }

.pl0 { padding-left: var(--size-0); }
.pl1 { padding-left: var(--size-1); }
.pl2 { padding-left: var(--size-2); }
.pl4 { padding-left: var(--size-4); }
.pl8 { padding-left: var(--size-8); }
.pl16 { padding-left: var(--size-16); }

.pr0 { padding-right: var(--size-0); }
.pr1 { padding-right: var(--size-1); }
.pr2 { padding-right: var(--size-2); }
.pr4 { padding-right: var(--size-4); }
.pr8 { padding-right: var(--size-8); }
.pr16 { padding-right: var(--size-16); }

.ptb0 { padding-top: var(--size-0); padding-bottom: var(--size-0); }
.ptb1 { padding-top: var(--size-1); padding-bottom: var(--size-1); }
.ptb2 { padding-top: var(--size-2); padding-bottom: var(--size-2); }
.ptb4 { padding-top: var(--size-4); padding-bottom: var(--size-4); }
.ptb8 { padding-top: var(--size-8); padding-bottom: var(--size-8); }
.ptb16 { padding-top: var(--size-16); padding-bottom: var(--size-16); }

.plr0 { padding-left: var(--size-0); padding-right: var(--size-0); }
.plr1 { padding-left: var(--size-1); padding-right: var(--size-1); }
.plr2 { padding-left: var(--size-2); padding-right: var(--size-2); }
.plr4 { padding-left: var(--size-4); padding-right: var(--size-4); }
.plr8 { padding-left: var(--size-8); padding-right: var(--size-8); }
.plr16 { padding-left: var(--size-16); padding-right: var(--size-16); }

.m0 { margin: var(--size-0); }
.m1 { margin: var(--size-1); }
.m2 { margin: var(--size-2); }
.m4 { margin: var(--size-4); }
.m8 { margin: var(--size-8); }
.m16 { margin: var(--size-16); }

.mt0 { margin-top: var(--size-0); }
.mt1 { margin-top: var(--size-1); }
.mt2 { margin-top: var(--size-2); }
.mt4 { margin-top: var(--size-4); }
.mt8 { margin-top: var(--size-8); }
.mt16 { margin-top: var(--size-16); }

.mb0 { margin-bottom: var(--size-0); }
.mb1 { margin-bottom: var(--size-1); }
.mb2 { margin-bottom: var(--size-2); }
.mb4 { margin-bottom: var(--size-4); }
.mb8 { margin-bottom: var(--size-8); }
.mb16 { margin-bottom: var(--size-16); }

.ml0 { margin-left: var(--size-0); }
.ml1 { margin-left: var(--size-1); }
.ml2 { margin-left: var(--size-2); }
.ml4 { margin-left: var(--size-4); }
.ml8 { margin-left: var(--size-8); }
.ml16 { margin-left: var(--size-16); }

.mr0 { margin-right: var(--size-0); }
.mr1 { margin-right: var(--size-1); }
.mr2 { margin-right: var(--size-2); }
.mr4 { margin-right: var(--size-4); }
.mr8 { margin-right: var(--size-8); }
.mr16 { margin-right: var(--size-16); }

.mt0.mb0 { margin-top: var(--size-0); margin-bottom: var(--size-0); }
.mt1.mb1 { margin-top: var(--size-1); margin-bottom: var(--size-1); }
.mt2.mb2 { margin-top: var(--size-2); margin-bottom: var(--size-2); }
.mt4.mb4 { margin-top: var(--size-4); margin-bottom: var(--size-4); }
.mt8.mb8 { margin-top: var(--size-8); margin-bottom: var(--size-8); }
.mt16.mb16 { margin-top: var(--size-16); margin-bottom: var(--size-16); }

.ml0.mr0 { margin-left: var(--size-0); margin-right: var(--size-0); }
.ml1.mr1 { margin-left: var(--size-1); margin-right: var(--size-1); }
.ml2.mr2 { margin-left: var(--size-2); margin-right: var(--size-2); }
.ml4.mr4 { margin-left: var(--size-4); margin-right: var(--size-4); }
.ml8.mr8 { margin-left: var(--size-8); margin-right: var(--size-8); }
.ml16.mr16 { margin-left: var(--size-16); margin-right: var(--size-16); }

.gap0 { gap: var(--size-0); }
.gap1 { gap: var(--size-1); }
.gap2 { gap: var(--size-2); }
.gap4 { gap: var(--size-4); }
.gap8 { gap: var(--size-8); }
.gap16 { gap: var(--size-16); }

.br0 { border-radius: var(--size-0); }
.br1 { border-radius: var(--size-1); }
.br2 { border-radius: var(--size-2); }
.br4 { border-radius: var(--size-4); }
.br8 { border-radius: var(--size-8); }
.br16 { border-radius: var(--size-16); }

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
