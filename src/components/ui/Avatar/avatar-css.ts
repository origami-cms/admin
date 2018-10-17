import {html} from '@polymer/lit-element';
export default html`<style>:host{display:inline-block;border-radius:50%;overflow:hidden;min-width:var(--size-small, 2rem);min-height:var(--size-small, 2rem);background-color:var(--color-main, var(--color-purple, #693a91));background-image:url("/content/profiles/default");background-size:100%}:host img{display:inline-block;width:100%;height:100%;vertical-align:top}:host-context([size=tiny]){width:var(--size-tiny, 1rem);height:var(--size-tiny, 1rem)}:host-context([size=small]){width:var(--size-small, 2rem);height:var(--size-small, 2rem)}:host-context([size=medium]){width:var(--size-medium, 3rem);height:var(--size-medium, 3rem)}:host-context([size=main]){width:var(--size-main, 4rem);height:var(--size-main, 4rem)}:host-context([size=large]){width:var(--size-large, 6rem);height:var(--size-large, 6rem)}:host-context([size=huge]){width:var(--size-huge, 8rem);height:var(--size-huge, 8rem)}:host-context([size=super]){width:var(--size-super, 12rem);height:var(--size-super, 12rem)}:host-context([size=hero]){width:var(--size-hero, 24rem);height:var(--size-hero, 24rem)}
</style>`;
