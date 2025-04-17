/*CSS:

--spacing: 1rem;

--primary : var : #6750A4 : #9a7ed6;
--primary-container : var : #EADDFF : #4F378B;

--secondary : var : #625B71 : #e04482;
--secondary-container : var : #E8DEF8 : #614f61;

--surface : var : #FEF7FF : #64626b87;

--error : var : #B3261E : #ff7262;
--error-container : var : #F9DEDC : #8C1D18;

--disabled : var : #6B7280: #9CA3AF ;

*::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

*::-webkit-scrollbar-track {
  border-radius: 100vh;
}

*::-webkit-scrollbar-thumb {
  background: var(--primary-container);
  border-radius: 100vh;
}

*::-webkit-scrollbar-thumb:hover {}

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
  background: var : white : black ;
  color: var : black : white;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  padding: 0px;
  margin: 0px;
  font-family: monospace, Inter, ui-sans-serif, system-ui;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
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

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}


#root,
#__next {
  isolation: isolate;
}

//-------

h1 {
    font-size: 1.9rem;
    line-height: 2rem;
    font-weight: 600;
    letter-spacing: -0.025em;
}

h2 {
    font-size: 1.7rem;
    line-height: 1.8rem;
    font-weight: 600;
    letter-spacing: -0.025em;
}

h3 {
    font-size: 1.5rem;
    line-height: 1.8rem;
    font-weight: 500;
    letter-spacing: -0.025em;
}

h4 {
    font-size: 1.3rem;
    line-height: 1.7rem;
    font-weight: 500;
    letter-spacing: -0.025em;
}

h5 {
    font-size: 1.1rem;
    line-height: 1.6rem;
    font-weight: 500;
    letter-spacing: -0.025em;
}

h6 {
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: 400;
}

p,
li {
    font-size: 0.85rem;
    line-height: 1.25rem;
}

a {
    color: var(--primary);

    :hover {
        --a-hover-col: var : #ffac90 : #ffac90;
        color: var(--a-hover-col);
    }
    :active, .active {
        --a-active-col: var : #cf90ff : #cf90ff; 
        color: var(--a-active-col);
    }
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
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

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

.m0 { margin: 0; }
.m1 { margin: calc(var(--spacing) * 0.25); }
.m2 { margin: calc(var(--spacing) * 0.5); }
.m4 { margin: calc(var(--spacing) * 1); }
.m8 { margin: calc(var(--spacing) * 2); }
.m16 { margin: calc(var(--spacing) * 4); }

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

*/
