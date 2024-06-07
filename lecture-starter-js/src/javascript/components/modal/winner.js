import App from '../../app';
import createElement from '../../helpers/domHelper';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call showModal function

    const winnerImageElement = createElement({
        tagName: 'img', 
        className: 'img',
        attributes: {
            src: fighter.source,
            title: fighter.name,
            alt: fighter.name
        }
    })
    
    showModal({
        title: `${fighter.name} has been WON !`, 
        bodyElement: winnerImageElement, 
        onClose: () => {
            document.getElementById('root').innerHTML = ''
            App.startApplication()
        }
    })
}
