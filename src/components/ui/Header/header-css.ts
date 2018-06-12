import {html} from '@polymer/lit-element';
export default html`<style>:host{position:absolute;display:flex;height:var(--header-height);top:0;left:var(--sidebar-width);right:0;padding-left:calc(var(--header-height) / 4);background-color:var(--color-white, #fff);border-left:var(--border-100, 1px solid var(--color-grey-100, #f5f5f5));border-width:1px;box-shadow:1rem 0.5rem 2rem var(--color-main-soft);z-index:100}:host h1{flex:1;margin:0;line-height:var(--header-height)}:host ui-header-user,:host ui-header-notifications{flex-grow:0;border-left:var(--border-100)}
</style>`;
