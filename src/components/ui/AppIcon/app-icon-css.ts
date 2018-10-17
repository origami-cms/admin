import {html} from '@polymer/lit-element';
export default html`<style>:host .rounded{border-radius:var(--border-radius)}.gradient-main{background:linear-gradient(to bottom right, var(--color-main-alt, #b155ba), var(--color-main, var(--color-purple, #693a91)))}.gradient-orange{background:linear-gradient(to bottom right, #FF9B54, #C95A54)}.gradient-red{background:linear-gradient(to bottom right, #FF5554, #C92954)}.gradient-green{background:linear-gradient(to bottom right, #84D59A, #00BED0)}.gradient-blue{background:linear-gradient(to bottom right, #008CBA, #6146C8)}.gradient-white{background:linear-gradient(to bottom right, var(--color-main-soft), #cacadf)}.gradient-gold{background:linear-gradient(to bottom right, #f1e35f, #da9124)}:root{--gradient-main: linear-gradient(to bottom right, var(--color-main-alt, #b155ba), var(--color-main, var(--color-purple, #693a91)));--gradient-orange: linear-gradient(to bottom right, #FF9B54, #C95A54);--gradient-red: linear-gradient(to bottom right, #FF5554, #C92954);--gradient-green: linear-gradient(to bottom right, #84D59A, #00BED0);--gradient-blue: linear-gradient(to bottom right, #008CBA, #6146C8);--gradient-white: linear-gradient(to bottom right, var(--color-main-soft), #cacadf);--gradient-gold: linear-gradient(to bottom right, #f1e35f, #da9124)}:host{display:inline-grid;align-items:center}:host div,:host img{width:100%;height:100%}:host div{display:grid;align-items:center;justify-content:center}:host([shadow]) img,:host([shadow]) div{box-shadow:0 0.4rem 0.8rem var(--color-main-faint)}
</style>`;
