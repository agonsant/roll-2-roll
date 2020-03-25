import './styles/styles.scss';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { MDCRipple } from '@material/ripple';
import { LikeCarousel } from './components/like-carousel/like-carousel';


const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
  return new MDCRipple(el);
});
const cardContainer = document.querySelector('.roll__container');
const carousel = new LikeCarousel(cardContainer,[
  {name: 'Scottex', age: '1 día', url: `https://picsum.photos/320/320/?random=${Math.round(Math.random()*1000000)}`},
  {name: 'Scottex', age: '2 día', url: `https://picsum.photos/320/320/?random=${Math.round(Math.random()*1000000)}`},
  {name: 'Scottex', age: '3 día', url: `https://picsum.photos/320/320/?random=${Math.round(Math.random()*1000000)}`},
  {name: 'Scottex', age: '4 día', url: `https://picsum.photos/320/320/?random=${Math.round(Math.random()*1000000)}`},
  {name: 'Scottex', age: '5 día', url: `https://picsum.photos/320/320/?random=${Math.round(Math.random()*1000000)}`},
  {name: 'Scottex', age: '6 día', url: `https://picsum.photos/320/320/?random=${Math.round(Math.random()*1000000)}`},
]);