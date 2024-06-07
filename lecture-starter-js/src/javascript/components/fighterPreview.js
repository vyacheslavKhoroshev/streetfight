import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    const fighterPreviewContainer = typeof fighter === 'object'
        ? 
        `<div class='fighter-preview___container' >
            <div class='fighter-preview___img-container'>
                <img src=${fighter.source} title=${fighter.name} alt=${fighter.name} style='transform: ${position === 'right' ? 'scaleX(-1)' : 'none'}';>
            </div>
            <div class='title' >${fighter.name}</div>
            <div class='fighter-preview___info' >
                <div class='fighter-preview___health fighter-preview___scale' style='width: ${fighter.health}%;'>
                    <span class='fighter-preview___type'>HEALTH</span>
                    <span class='fighter-preview___type-value'>${fighter.health}</span>
                </div>
                <div class='fighter-preview___attack fighter-preview___scale' style='width: ${fighter.attack * 20}%;'>
                    <span class='fighter-preview___type'>ATTACK</span>
                    <span class='fighter-preview___type-value'>${fighter.attack}</span>
                </div>
                <div class='fighter-preview___defense fighter-preview___scale' style='width: ${fighter.defense * 20}%;'>
                    <span class='fighter-preview___type'>DEFENSE</span>
                    <span class='fighter-preview___type-value'>${fighter.defense}</span>
                </div>
            </div>
        </div>`
        
        :`<div class='fighter-preview___container'></div>`;

    fighterElement.insertAdjacentHTML('beforeEnd', fighterPreviewContainer);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
} 