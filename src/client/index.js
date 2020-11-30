// should import the main function of application JS, import scss, export main function from your applicatiion js. But in order to import, where will you need to export it?
import { performAction } from './js/app'

import './styles/style.scss'



export { performAction }




document.getElementById('generate').addEventListener('click', performAction);
