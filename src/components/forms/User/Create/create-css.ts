import {html} from '@polymer/lit-element';
export default html`<style>.ellipsis{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.card{background:var(--card-bg, var(--color-white, #fff));border:var(--card-border, );border-radius:var(--card-border-radius, var(--border-radius, .4rem));padding:var(--card-padding, var(--size-main, 4rem));box-shadow:var(--card-shadow, var(--shadow-main-soft, 0 var(--size-tiny, 1rem) var(--size-main, 4rem) var(--color-main-soft, rgba(105,58,145,0.1))))}.hide{display:none !important}.round{border-radius:50%}.rounded{border-radius:var(--border-radius)}.no-select{user-select:none}.color-main{color:var(--color-main)}.background-main{background-color:var(--color-main)}.color-alt{color:var(--color-alt)}.background-alt{background-color:var(--color-alt)}.color-active{color:var(--color-active)}.background-active{background-color:var(--color-active)}.color-text{color:var(--color-text)}.background-text{background-color:var(--color-text)}.color-white{color:var(--color-white)}.background-white{background-color:var(--color-white)}.color-grey-50{color:var(--color-grey-50)}.background-grey-50{background-color:var(--color-grey-50)}.color-grey-100{color:var(--color-grey-100)}.background-grey-100{background-color:var(--color-grey-100)}.color-grey-200{color:var(--color-grey-200)}.background-grey-200{background-color:var(--color-grey-200)}.color-grey-300{color:var(--color-grey-300)}.background-grey-300{background-color:var(--color-grey-300)}.color-grey-400{color:var(--color-grey-400)}.background-grey-400{background-color:var(--color-grey-400)}.color-grey-500{color:var(--color-grey-500)}.background-grey-500{background-color:var(--color-grey-500)}.color-grey-600{color:var(--color-grey-600)}.background-grey-600{background-color:var(--color-grey-600)}.color-grey-700{color:var(--color-grey-700)}.background-grey-700{background-color:var(--color-grey-700)}.color-grey-800{color:var(--color-grey-800)}.background-grey-800{background-color:var(--color-grey-800)}.color-grey-900{color:var(--color-grey-900)}.background-grey-900{background-color:var(--color-grey-900)}.color-black{color:var(--color-black)}.background-black{background-color:var(--color-black)}.color-error{color:var(--color-error)}.background-error{background-color:var(--color-error)}.success{color:var(--color-success)}.error{color:var(--color-error)}.gradient-main{background:linear-gradient(to bottom right, var(--color-main-alt, #b155ba), var(--color-main, var(--color-purple, #693a91)))}.gradient-orange{background:linear-gradient(to bottom right, #FF9B54, #C95A54)}.gradient-red{background:linear-gradient(to bottom right, #FF5554, #C92954)}.gradient-green{background:linear-gradient(to bottom right, #84D59A, #00BED0)}.gradient-blue{background:linear-gradient(to bottom right, #008CBA, #6146C8)}.gradient-white{background:linear-gradient(to bottom right, var(--color-main-soft), #cacadf)}.gradient-gold{background:linear-gradient(to bottom right, #f1e35f, #da9124)}:root{--gradient-main: linear-gradient(to bottom right, var(--color-main-alt, #b155ba), var(--color-main, var(--color-purple, #693a91)));--gradient-orange: linear-gradient(to bottom right, #FF9B54, #C95A54);--gradient-red: linear-gradient(to bottom right, #FF5554, #C92954);--gradient-green: linear-gradient(to bottom right, #84D59A, #00BED0);--gradient-blue: linear-gradient(to bottom right, #008CBA, #6146C8);--gradient-white: linear-gradient(to bottom right, var(--color-main-soft), #cacadf);--gradient-gold: linear-gradient(to bottom right, #f1e35f, #da9124)}.display-ib{display:inline-block}.display-b{display:block}.display-f{display:flex}.position-r{position:relative}.position-a{position:absolute}.center-margin{margin:auto}.center{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)}.center-v{position:absolute;top:50%;transform:translateY(-50%)}.center-h{position:absolute;left:50%;transform:translateX(-50%)}.float-left{float:left}.float-right{float:right}.clear{clear:both}.width-10{width:10%}.height-10{height:10%}.width-20{width:20%}.height-20{height:20%}.width-30{width:30%}.height-30{height:30%}.width-40{width:40%}.height-40{height:40%}.width-50{width:50%}.height-50{height:50%}.width-60{width:60%}.height-60{height:60%}.width-70{width:70%}.height-70{height:70%}.width-80{width:80%}.height-80{height:80%}.width-90{width:90%}.height-90{height:90%}.width-100{width:100%}.height-100{height:100%}.cover{position:absolute;top:0;left:0;width:100%;height:100%}.margin-tiny{margin:var(--size-tiny)}.n-margin-tiny{margin:calc(-1 * var(--size-tiny))}.margin-v-tiny{margin-top:var(--size-tiny);margin-bottom:var(--size-tiny)}.n-margin-v-tiny{margin-top:calc(-1 * var(--size-tiny));margin-bottom:calc(-1 * var(--size-tiny))}.margin-h-tiny{margin-left:var(--size-tiny);margin-right:var(--size-tiny)}.n-margin-h-tiny{margin-left:calc(-1 * var(--size-tiny));margin-right:calc(-1 * var(--size-tiny))}.margin-t-tiny{margin-top:var(--size-tiny)}.n-margin-t-tiny{margin-top:calc(-1 * var(--size-tiny))}.margin-l-tiny{margin-left:var(--size-tiny)}.n-margin-l-tiny{margin-left:calc(-1 * var(--size-tiny))}.margin-b-tiny{margin-bottom:var(--size-tiny)}.n-margin-b-tiny{margin-bottom:calc(-1 * var(--size-tiny))}.margin-r-tiny{margin-right:var(--size-tiny)}.n-margin-r-tiny{margin-right:calc(-1 * var(--size-tiny))}.margin-small{margin:var(--size-small)}.n-margin-small{margin:calc(-1 * var(--size-small))}.margin-v-small{margin-top:var(--size-small);margin-bottom:var(--size-small)}.n-margin-v-small{margin-top:calc(-1 * var(--size-small));margin-bottom:calc(-1 * var(--size-small))}.margin-h-small{margin-left:var(--size-small);margin-right:var(--size-small)}.n-margin-h-small{margin-left:calc(-1 * var(--size-small));margin-right:calc(-1 * var(--size-small))}.margin-t-small{margin-top:var(--size-small)}.n-margin-t-small{margin-top:calc(-1 * var(--size-small))}.margin-l-small{margin-left:var(--size-small)}.n-margin-l-small{margin-left:calc(-1 * var(--size-small))}.margin-b-small{margin-bottom:var(--size-small)}.n-margin-b-small{margin-bottom:calc(-1 * var(--size-small))}.margin-r-small{margin-right:var(--size-small)}.n-margin-r-small{margin-right:calc(-1 * var(--size-small))}.margin-medium{margin:var(--size-medium)}.n-margin-medium{margin:calc(-1 * var(--size-medium))}.margin-v-medium{margin-top:var(--size-medium);margin-bottom:var(--size-medium)}.n-margin-v-medium{margin-top:calc(-1 * var(--size-medium));margin-bottom:calc(-1 * var(--size-medium))}.margin-h-medium{margin-left:var(--size-medium);margin-right:var(--size-medium)}.n-margin-h-medium{margin-left:calc(-1 * var(--size-medium));margin-right:calc(-1 * var(--size-medium))}.margin-t-medium{margin-top:var(--size-medium)}.n-margin-t-medium{margin-top:calc(-1 * var(--size-medium))}.margin-l-medium{margin-left:var(--size-medium)}.n-margin-l-medium{margin-left:calc(-1 * var(--size-medium))}.margin-b-medium{margin-bottom:var(--size-medium)}.n-margin-b-medium{margin-bottom:calc(-1 * var(--size-medium))}.margin-r-medium{margin-right:var(--size-medium)}.n-margin-r-medium{margin-right:calc(-1 * var(--size-medium))}.margin-main{margin:var(--size-main)}.n-margin-main{margin:calc(-1 * var(--size-main))}.margin-v-main{margin-top:var(--size-main);margin-bottom:var(--size-main)}.n-margin-v-main{margin-top:calc(-1 * var(--size-main));margin-bottom:calc(-1 * var(--size-main))}.margin-h-main{margin-left:var(--size-main);margin-right:var(--size-main)}.n-margin-h-main{margin-left:calc(-1 * var(--size-main));margin-right:calc(-1 * var(--size-main))}.margin-t-main{margin-top:var(--size-main)}.n-margin-t-main{margin-top:calc(-1 * var(--size-main))}.margin-l-main{margin-left:var(--size-main)}.n-margin-l-main{margin-left:calc(-1 * var(--size-main))}.margin-b-main{margin-bottom:var(--size-main)}.n-margin-b-main{margin-bottom:calc(-1 * var(--size-main))}.margin-r-main{margin-right:var(--size-main)}.n-margin-r-main{margin-right:calc(-1 * var(--size-main))}.margin-large{margin:var(--size-large)}.n-margin-large{margin:calc(-1 * var(--size-large))}.margin-v-large{margin-top:var(--size-large);margin-bottom:var(--size-large)}.n-margin-v-large{margin-top:calc(-1 * var(--size-large));margin-bottom:calc(-1 * var(--size-large))}.margin-h-large{margin-left:var(--size-large);margin-right:var(--size-large)}.n-margin-h-large{margin-left:calc(-1 * var(--size-large));margin-right:calc(-1 * var(--size-large))}.margin-t-large{margin-top:var(--size-large)}.n-margin-t-large{margin-top:calc(-1 * var(--size-large))}.margin-l-large{margin-left:var(--size-large)}.n-margin-l-large{margin-left:calc(-1 * var(--size-large))}.margin-b-large{margin-bottom:var(--size-large)}.n-margin-b-large{margin-bottom:calc(-1 * var(--size-large))}.margin-r-large{margin-right:var(--size-large)}.n-margin-r-large{margin-right:calc(-1 * var(--size-large))}.margin-huge{margin:var(--size-huge)}.n-margin-huge{margin:calc(-1 * var(--size-huge))}.margin-v-huge{margin-top:var(--size-huge);margin-bottom:var(--size-huge)}.n-margin-v-huge{margin-top:calc(-1 * var(--size-huge));margin-bottom:calc(-1 * var(--size-huge))}.margin-h-huge{margin-left:var(--size-huge);margin-right:var(--size-huge)}.n-margin-h-huge{margin-left:calc(-1 * var(--size-huge));margin-right:calc(-1 * var(--size-huge))}.margin-t-huge{margin-top:var(--size-huge)}.n-margin-t-huge{margin-top:calc(-1 * var(--size-huge))}.margin-l-huge{margin-left:var(--size-huge)}.n-margin-l-huge{margin-left:calc(-1 * var(--size-huge))}.margin-b-huge{margin-bottom:var(--size-huge)}.n-margin-b-huge{margin-bottom:calc(-1 * var(--size-huge))}.margin-r-huge{margin-right:var(--size-huge)}.n-margin-r-huge{margin-right:calc(-1 * var(--size-huge))}.margin-super{margin:var(--size-super)}.n-margin-super{margin:calc(-1 * var(--size-super))}.margin-v-super{margin-top:var(--size-super);margin-bottom:var(--size-super)}.n-margin-v-super{margin-top:calc(-1 * var(--size-super));margin-bottom:calc(-1 * var(--size-super))}.margin-h-super{margin-left:var(--size-super);margin-right:var(--size-super)}.n-margin-h-super{margin-left:calc(-1 * var(--size-super));margin-right:calc(-1 * var(--size-super))}.margin-t-super{margin-top:var(--size-super)}.n-margin-t-super{margin-top:calc(-1 * var(--size-super))}.margin-l-super{margin-left:var(--size-super)}.n-margin-l-super{margin-left:calc(-1 * var(--size-super))}.margin-b-super{margin-bottom:var(--size-super)}.n-margin-b-super{margin-bottom:calc(-1 * var(--size-super))}.margin-r-super{margin-right:var(--size-super)}.n-margin-r-super{margin-right:calc(-1 * var(--size-super))}.margin-hero{margin:var(--size-hero)}.n-margin-hero{margin:calc(-1 * var(--size-hero))}.margin-v-hero{margin-top:var(--size-hero);margin-bottom:var(--size-hero)}.n-margin-v-hero{margin-top:calc(-1 * var(--size-hero));margin-bottom:calc(-1 * var(--size-hero))}.margin-h-hero{margin-left:var(--size-hero);margin-right:var(--size-hero)}.n-margin-h-hero{margin-left:calc(-1 * var(--size-hero));margin-right:calc(-1 * var(--size-hero))}.margin-t-hero{margin-top:var(--size-hero)}.n-margin-t-hero{margin-top:calc(-1 * var(--size-hero))}.margin-l-hero{margin-left:var(--size-hero)}.n-margin-l-hero{margin-left:calc(-1 * var(--size-hero))}.margin-b-hero{margin-bottom:var(--size-hero)}.n-margin-b-hero{margin-bottom:calc(-1 * var(--size-hero))}.margin-r-hero{margin-right:var(--size-hero)}.n-margin-r-hero{margin-right:calc(-1 * var(--size-hero))}.margin-none{margin:0 !important}.margin-t-none{margin-top:0 !important}.margin-l-none{margin-left:0 !important}.margin-b-none{margin-bottom:0 !important}.margin-r-none{margin-right:0 !important}.padding-tiny{padding:var(--size-tiny)}.n-padding-tiny{padding:calc(-1 * var(--size-tiny))}.padding-v-tiny{padding-top:var(--size-tiny);padding-bottom:var(--size-tiny)}.n-padding-v-tiny{padding-top:calc(-1 * var(--size-tiny));padding-bottom:calc(-1 * var(--size-tiny))}.padding-h-tiny{padding-left:var(--size-tiny);padding-right:var(--size-tiny)}.n-padding-h-tiny{padding-left:calc(-1 * var(--size-tiny));padding-right:calc(-1 * var(--size-tiny))}.padding-t-tiny{padding-top:var(--size-tiny)}.n-padding-t-tiny{padding-top:calc(-1 * var(--size-tiny))}.padding-l-tiny{padding-left:var(--size-tiny)}.n-padding-l-tiny{padding-left:calc(-1 * var(--size-tiny))}.padding-b-tiny{padding-bottom:var(--size-tiny)}.n-padding-b-tiny{padding-bottom:calc(-1 * var(--size-tiny))}.padding-r-tiny{padding-right:var(--size-tiny)}.n-padding-r-tiny{padding-right:calc(-1 * var(--size-tiny))}.padding-small{padding:var(--size-small)}.n-padding-small{padding:calc(-1 * var(--size-small))}.padding-v-small{padding-top:var(--size-small);padding-bottom:var(--size-small)}.n-padding-v-small{padding-top:calc(-1 * var(--size-small));padding-bottom:calc(-1 * var(--size-small))}.padding-h-small{padding-left:var(--size-small);padding-right:var(--size-small)}.n-padding-h-small{padding-left:calc(-1 * var(--size-small));padding-right:calc(-1 * var(--size-small))}.padding-t-small{padding-top:var(--size-small)}.n-padding-t-small{padding-top:calc(-1 * var(--size-small))}.padding-l-small{padding-left:var(--size-small)}.n-padding-l-small{padding-left:calc(-1 * var(--size-small))}.padding-b-small{padding-bottom:var(--size-small)}.n-padding-b-small{padding-bottom:calc(-1 * var(--size-small))}.padding-r-small{padding-right:var(--size-small)}.n-padding-r-small{padding-right:calc(-1 * var(--size-small))}.padding-medium{padding:var(--size-medium)}.n-padding-medium{padding:calc(-1 * var(--size-medium))}.padding-v-medium{padding-top:var(--size-medium);padding-bottom:var(--size-medium)}.n-padding-v-medium{padding-top:calc(-1 * var(--size-medium));padding-bottom:calc(-1 * var(--size-medium))}.padding-h-medium{padding-left:var(--size-medium);padding-right:var(--size-medium)}.n-padding-h-medium{padding-left:calc(-1 * var(--size-medium));padding-right:calc(-1 * var(--size-medium))}.padding-t-medium{padding-top:var(--size-medium)}.n-padding-t-medium{padding-top:calc(-1 * var(--size-medium))}.padding-l-medium{padding-left:var(--size-medium)}.n-padding-l-medium{padding-left:calc(-1 * var(--size-medium))}.padding-b-medium{padding-bottom:var(--size-medium)}.n-padding-b-medium{padding-bottom:calc(-1 * var(--size-medium))}.padding-r-medium{padding-right:var(--size-medium)}.n-padding-r-medium{padding-right:calc(-1 * var(--size-medium))}.padding-main{padding:var(--size-main)}.n-padding-main{padding:calc(-1 * var(--size-main))}.padding-v-main{padding-top:var(--size-main);padding-bottom:var(--size-main)}.n-padding-v-main{padding-top:calc(-1 * var(--size-main));padding-bottom:calc(-1 * var(--size-main))}.padding-h-main{padding-left:var(--size-main);padding-right:var(--size-main)}.n-padding-h-main{padding-left:calc(-1 * var(--size-main));padding-right:calc(-1 * var(--size-main))}.padding-t-main{padding-top:var(--size-main)}.n-padding-t-main{padding-top:calc(-1 * var(--size-main))}.padding-l-main{padding-left:var(--size-main)}.n-padding-l-main{padding-left:calc(-1 * var(--size-main))}.padding-b-main{padding-bottom:var(--size-main)}.n-padding-b-main{padding-bottom:calc(-1 * var(--size-main))}.padding-r-main{padding-right:var(--size-main)}.n-padding-r-main{padding-right:calc(-1 * var(--size-main))}.padding-large{padding:var(--size-large)}.n-padding-large{padding:calc(-1 * var(--size-large))}.padding-v-large{padding-top:var(--size-large);padding-bottom:var(--size-large)}.n-padding-v-large{padding-top:calc(-1 * var(--size-large));padding-bottom:calc(-1 * var(--size-large))}.padding-h-large{padding-left:var(--size-large);padding-right:var(--size-large)}.n-padding-h-large{padding-left:calc(-1 * var(--size-large));padding-right:calc(-1 * var(--size-large))}.padding-t-large{padding-top:var(--size-large)}.n-padding-t-large{padding-top:calc(-1 * var(--size-large))}.padding-l-large{padding-left:var(--size-large)}.n-padding-l-large{padding-left:calc(-1 * var(--size-large))}.padding-b-large{padding-bottom:var(--size-large)}.n-padding-b-large{padding-bottom:calc(-1 * var(--size-large))}.padding-r-large{padding-right:var(--size-large)}.n-padding-r-large{padding-right:calc(-1 * var(--size-large))}.padding-huge{padding:var(--size-huge)}.n-padding-huge{padding:calc(-1 * var(--size-huge))}.padding-v-huge{padding-top:var(--size-huge);padding-bottom:var(--size-huge)}.n-padding-v-huge{padding-top:calc(-1 * var(--size-huge));padding-bottom:calc(-1 * var(--size-huge))}.padding-h-huge{padding-left:var(--size-huge);padding-right:var(--size-huge)}.n-padding-h-huge{padding-left:calc(-1 * var(--size-huge));padding-right:calc(-1 * var(--size-huge))}.padding-t-huge{padding-top:var(--size-huge)}.n-padding-t-huge{padding-top:calc(-1 * var(--size-huge))}.padding-l-huge{padding-left:var(--size-huge)}.n-padding-l-huge{padding-left:calc(-1 * var(--size-huge))}.padding-b-huge{padding-bottom:var(--size-huge)}.n-padding-b-huge{padding-bottom:calc(-1 * var(--size-huge))}.padding-r-huge{padding-right:var(--size-huge)}.n-padding-r-huge{padding-right:calc(-1 * var(--size-huge))}.padding-super{padding:var(--size-super)}.n-padding-super{padding:calc(-1 * var(--size-super))}.padding-v-super{padding-top:var(--size-super);padding-bottom:var(--size-super)}.n-padding-v-super{padding-top:calc(-1 * var(--size-super));padding-bottom:calc(-1 * var(--size-super))}.padding-h-super{padding-left:var(--size-super);padding-right:var(--size-super)}.n-padding-h-super{padding-left:calc(-1 * var(--size-super));padding-right:calc(-1 * var(--size-super))}.padding-t-super{padding-top:var(--size-super)}.n-padding-t-super{padding-top:calc(-1 * var(--size-super))}.padding-l-super{padding-left:var(--size-super)}.n-padding-l-super{padding-left:calc(-1 * var(--size-super))}.padding-b-super{padding-bottom:var(--size-super)}.n-padding-b-super{padding-bottom:calc(-1 * var(--size-super))}.padding-r-super{padding-right:var(--size-super)}.n-padding-r-super{padding-right:calc(-1 * var(--size-super))}.padding-hero{padding:var(--size-hero)}.n-padding-hero{padding:calc(-1 * var(--size-hero))}.padding-v-hero{padding-top:var(--size-hero);padding-bottom:var(--size-hero)}.n-padding-v-hero{padding-top:calc(-1 * var(--size-hero));padding-bottom:calc(-1 * var(--size-hero))}.padding-h-hero{padding-left:var(--size-hero);padding-right:var(--size-hero)}.n-padding-h-hero{padding-left:calc(-1 * var(--size-hero));padding-right:calc(-1 * var(--size-hero))}.padding-t-hero{padding-top:var(--size-hero)}.n-padding-t-hero{padding-top:calc(-1 * var(--size-hero))}.padding-l-hero{padding-left:var(--size-hero)}.n-padding-l-hero{padding-left:calc(-1 * var(--size-hero))}.padding-b-hero{padding-bottom:var(--size-hero)}.n-padding-b-hero{padding-bottom:calc(-1 * var(--size-hero))}.padding-r-hero{padding-right:var(--size-hero)}.n-padding-r-hero{padding-right:calc(-1 * var(--size-hero))}.padding-none{padding:0 !important}.padding-t-none{padding-top:0 !important}.padding-l-none{padding-left:0 !important}.padding-b-none{padding-bottom:0 !important}.padding-r-none{padding-right:0 !important}.width-tiny{width:var(--size-tiny)}.width-small{width:var(--size-small)}.width-medium{width:var(--size-medium)}.width-main{width:var(--size-main)}.width-large{width:var(--size-large)}.width-huge{width:var(--size-huge)}.width-super{width:var(--size-super)}.width-hero{width:var(--size-hero)}.height-tiny{height:var(--size-tiny)}.height-small{height:var(--size-small)}.height-medium{height:var(--size-medium)}.height-main{height:var(--size-main)}.height-large{height:var(--size-large)}.height-huge{height:var(--size-huge)}.height-super{height:var(--size-super)}.height-hero{height:var(--size-hero)}.size-tiny{width:var(--size-tiny);height:var(--size-tiny)}.size-small{width:var(--size-small);height:var(--size-small)}.size-medium{width:var(--size-medium);height:var(--size-medium)}.size-main{width:var(--size-main);height:var(--size-main)}.size-large{width:var(--size-large);height:var(--size-large)}.size-huge{width:var(--size-huge);height:var(--size-huge)}.size-super{width:var(--size-super);height:var(--size-super)}.size-hero{width:var(--size-hero);height:var(--size-hero)}.uppercase{text-transform:uppercase}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.align-middle{vertical-align:middle}.align-top{vertical-align:top}.align-bottom{vertical-align:bottom}.empty-hide:empty{display:none}.weight-light{font-weight:100}.weight-normal{font-weight:400}.weight-heavy{font-weight:700}.shadow-100{box-shadow:var(--shadow-100)}.shadow-main{box-shadow:var(--shadow-main-soft)}@keyframes fade-in{from{opacity:0}to{opacity:1}}@keyframes fade-slide-up{from{margin-top:var(--size-large);opacity:0}to{margin-top:0;opacity:1}}.ani-fade-slide-up{animation-name:fade-slide-up}@keyframes loading-bounce{0%{transform:none;border-radius:0}10%{border-radius:0}20%{transform:translateY(calc(var(--loading-size, var(--size-main, 4rem)) * 3.7 / 4)) rotate(45deg)}25%{transform:translateY(calc(var(--loading-size, var(--size-main, 4rem)) * 3.8 / 4)) rotate(45deg);border-radius:0;border-bottom-right-radius:calc(var(--loading-size, var(--size-main, 4rem)) * 1 / 4)}40%{border-radius:0;border-bottom-right-radius:calc(var(--loading-size, var(--size-main, 4rem)) * 1 / 4)}50%{transform:translateY(0) rotate(90deg);border-radius:50%}70%{transform:translateY(calc(var(--loading-size, var(--size-main, 4rem)) * 4.2 / 4)) rotate(360deg) scaleY(0.9) scaleX(1.1)}75%{transform:translateY(calc(var(--loading-size, var(--size-main, 4rem)) * 4.3 / 4)) rotate(360deg) scaleY(0.9) scaleX(1.1);border-radius:50%}100%{transform:translateY(0) rotate(360deg)}}@keyframes loading-bounce-shadow{0%,50%,100%{transform:scale(0.9)}25%,75%{transform:scale(1)}}@keyframes bounce{from{transform:translateY(0px)}to{transform:translateY(-15px)}}.font-base{font-size:var(--font-size-base)}.font-tiny{font-size:var(--font-size-tiny)}.font-small{font-size:var(--font-size-small)}.font-main{font-size:var(--font-size-main)}.font-large{font-size:var(--font-size-large)}.font-huge{font-size:var(--font-size-huge)}.font-super{font-size:var(--font-size-super)}.font-hero{font-size:var(--font-size-hero)}h1{font-size:var(--h1-font-size);font-family:var(--h1-font-family);font-weight:var(--h1-font-weight, 400);color:var(--h1-color, var(--color-text))}h2{font-size:var(--h2-font-size);font-family:var(--h2-font-family);font-weight:var(--h2-font-weight, 400);color:var(--h2-color, var(--color-text))}h3{font-size:var(--h3-font-size);font-family:var(--h3-font-family);font-weight:var(--h3-font-weight, 400);color:var(--h3-color, var(--color-text))}h4{font-size:var(--h4-font-size);font-family:var(--h4-font-family);font-weight:var(--h4-font-weight, 400);color:var(--h4-color, var(--color-text))}h5{font-size:var(--h5-font-size);font-family:var(--h5-font-family);font-weight:var(--h5-font-weight, 400);color:var(--h5-color, var(--color-text))}a,wc-link{text-decoration:none;cursor:pointer;color:var(--color-main)}p{line-height:2;margin-bottom:var(--size-small)}p:last-child{margin-bottom:0}small{font-size:var(--fs-small)}strong{font-weight:700;letter-spacing:1px}i{font-style:italic}.error{color:var(--color-error)}h2,h3{margin-bottom:var(--size-small)}:host .card{max-width:48rem}
</style>`;
