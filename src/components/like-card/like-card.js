import './like-card.scss';

export class LikeCard {
				
    constructor(name, age, imageUrl) {
        this.name = name;
        this.age = age;
        this.imageUrl = imageUrl;
    }
    
    render(el) {
        return `
        <div class="mdc-card roll-card">
        <div class="mdc-card__primary-action" tabindex="0">
          <div class="mdc-card__media mdc-card__media--16-9"
            style="background-image: url(&quot;${this.imageUrl}&quot;);">
          </div>
          <div class="roll-card__share">
            <button class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
                title="Share profile" data-mdc-ripple-is-unbounded="true" onclick="shareProfile()">share</button>
          </div>
          <div class="roll-card__primary">
            <h2 class="mdc-typography mdc-typography--headline6">${this.name}</h2>
            <h2 class="mdc-typography mdc-typography--headline6">${this.age}</h2>
          </div>
        </div>
        <div class="mdc-card__actions">
          <div class="mdc-card__action-icons roll-card__action-icons">
            <button class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded roll-card__action-icons--like"
              aria-pressed="false" aria-label="Like" title="Like"
              data-mdc-ripple-is-unbounded="true">favorite</button>
            <button class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded roll-card__action-icons--dislike"
              title="Dislike" data-mdc-ripple-is-unbounded="true">remove_circle</button>
          </div>
        </div>
      </div>        
        `
    }
}