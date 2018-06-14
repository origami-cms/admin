import {html} from '@polymer/lit-element';
export default html`<style>:host .table .row:not(.header):before{position:absolute;width:100%;height:100%;top:0;left:0}:host .table .row{background:var(--card-bg, var(--color-white, #fff));border:var(--card-border, );border-radius:var(--card-border-radius, var(--border-radius, .4rem));padding:var(--card-padding, var(--size-main, 4rem));box-shadow:var(--card-shadow, var(--shadow-main-soft, 0 var(--size-tiny, 1rem) var(--size-main, 4rem) var(--color-main-soft, rgba(105,58,145,0.1))))}:host .table{display:grid;grid-row-gap:var(--size-small);--card-padding: var(--size-small)}:host .table .row{position:relative;display:grid;grid-template-columns:4rem repeat(var(--cols), 1fr);border:2px solid transparent;cursor:default}:host .table .row.active{border-color:var(--color-grey-300, #bda9cf)}:host .table .row:not(.header):before{content:'';background-color:var(--color-main, var(--color-purple, #693a91));opacity:0;transition:all calc(default('transition-time') / 2)}:host .table .row:hover:before{opacity:0.05}:host .table .row .cell,:host .table .row .header{position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:var(--size-small)}:host .table .row .cell:first-child,:host .table .row .header:first-child{padding-left:0}:host .table .row.header{background-color:transparent;box-shadow:none;text-transform:uppercase;font-weight:600;letter-spacing:1px;color:var(--color-grey-300, #bda9cf)}
</style>`;
