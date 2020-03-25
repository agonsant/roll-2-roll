import 'hammerjs';
import { LikeCard } from '../like-card/like-card';

export class LikeCarousel {

    constructor(element, cards) {
        this.originalCards = cards;
        this.currentIndex = 0;
        this.board = element;
        this.push();
        this.push();
        this.handle();
    }

    handle() {
        this.cards = this.board.querySelectorAll('.card');
        this.topCard = this.cards[this.cards.length - 1];
        this.nextCard = this.cards[this.cards.length - 2];
        if (this.cards.length > 0) {
            this.topCard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)';
            if (this.hammer) this.hammer.destroy();
            this.hammer = new Hammer(this.topCard);
            this.hammer.add(new Hammer.Tap());
            this.hammer.add(new Hammer.Pan({
                position: Hammer.position_ALL, threshold: 0
            }));
            this.hammer.on('tap', (e) => { this.onTap(e) });
            this.hammer.on('pan', (e) => { this.onPan(e) });
        }
    }

    onTap(e) {

        let propX = (e.center.x - e.target.getBoundingClientRect().left) / e.target.clientWidth;
        let rotateY = 15 * (propX < 0.05 ? -1 : 1);
        this.topCard.style.transition = 'transform 100ms ease-out';
        this.topCard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(' + rotateY + 'deg) scale(1)';
        setTimeout(() => {
            this.topCard.style.transform =
                'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
        }, 100);
    }

    onPan(e) {
        if (!this.isPanning) {
            this.isPanning = true;
            this.topCard.style.transition = null;
            if (this.nextCard) this.nextCard.style.transition = null;
            let style = window.getComputedStyle(this.topCard);
            let mx = style.transform.match(/^matrix\((.+)\)$/);
            this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
            this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;

            // get top card bounds
            let bounds = this.topCard.getBoundingClientRect();
            // get finger position on top card, top (1) or bottom (-1)
            this.isDraggingFrom =
                (e.center.y - bounds.top) > this.topCard.clientHeight / 2 ? -1 : 1;
        }

        // calculate new coordinates
        let posX = e.deltaX + this.startPosX;
        let posY = e.deltaY + this.startPosY;

        // get ratio between swiped pixels and the axes
        let propX = e.deltaX / this.board.clientWidth;
        let propY = e.deltaY / this.board.clientHeight;

        // get swipe direction, left (-1) or right (1)
        let dirX = e.deltaX < 0 ? -1 : 1;

        // calculate rotation, between 0 and +/- 45 deg
        let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45;

        // calculate scale ratio, between 95 and 100 %
        let scale = (95 + (5 * Math.abs(propX))) / 100;

        // move top card
        this.topCard.style.transform =
            'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg) rotateY(0deg) scale(1)';

        // scale next card
        if (this.nextCard) this.nextCard.style.transform =
            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')';

        if (e.isFinal) {
            this.isPanning = false;
            let successful = false;

            // set back transition properties
            this.topCard.style.transition = 'transform 200ms ease-out';
            if (this.nextCard) this.nextCard.style.transition = 'transform 100ms linear';

            // check threshold
            if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
                successful = true;
                // get right border position
                posX = this.board.clientWidth;
            } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
                successful = true;
                // get left border position
                posX = - (this.board.clientWidth + this.topCard.clientWidth);
            }

            if (successful) {
                // throw card in the chosen direction
                this.topCard.style.transform =
                    'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)';
                // wait transition end
                setTimeout(() => {
                    // remove swiped card
                    this.board.removeChild(this.topCard);
                    // add new card
                    this.push();
                    // handle gestures on new top card
                    this.handle();
                }, 200);
            } else {
                // reset cards position
                this.topCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)';
                if (this.nextCard) this.nextCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)';
            }
        }
    }

    push() {
        const cardInfo = this.originalCards[this.currentIndex];
        this.currentIndex = (this.currentIndex+1) % this.originalCards.length;
        let card = new LikeCard(cardInfo.name, cardInfo.age, cardInfo.url);
        const node = document.createElement('div');
        node.classList.add('card');
        node.innerHTML = card.render();
        if (this.board.firstChild) {
            this.board.insertBefore(node, this.board.firstChild);
        } else {
            this.board.append(node);
        }
    }
}