import {html} from '@polymer/lit-element';
export default html`<style>:host main{position:absolute;left:var(--sidebar-width);top:var(--header-height);bottom:0;right:0;padding:var(--size-main, 4rem)}:host zen-sidebar{opacity:1;transition:all var(--transition-time)}:host zen-sidebar:unresolved{opacity:0}
</style>`;
