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
const carousel = new LikeCarousel(cardContainer, [
  { name: 'Scottex', age: '1 día', url: `assets/images/roll-1.jpg` },
  { name: 'Scottex', age: '2 día', url: `assets/images/roll-2.jpg` },
  { name: 'Scottex', age: '3 día', url: `assets/images/roll-3.jpg` },
  { name: 'Scottex', age: '4 día', url: `assets/images/roll-4.jpg` },
  { name: 'Scottex', age: '5 día', url: `assets/images/roll-5.jpg` },
  { name: 'Scottex', age: '6 día', url: `assets/images/roll-6.jpg` },
]);


function shareProfile(e) {
  console.log(e);
  if (navigator.share) {
    navigator.share({
      title: 'web.dev',
      text: 'Check out web.dev.',
      url: 'https://web.dev/',
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
};