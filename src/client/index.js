import { performAction } from './js/app'
import { getWeatherbitData } from './js/app'
import { getGeonamesData } from './js/app'
import { getImageData } from './js/app'
import { newElement } from './js/todolist'
import { resetElement } from './js/todolist'

import './styles/style.scss'
import './styles/todo.scss'
import './styles/media.scss'

export { performAction }
export { getGeonamesData }
export { getWeatherbitData }
export { getImageData }
export { newElement }
export { resetElement }

document.getElementById('generate').addEventListener('click', performAction);
document.getElementById('add-item').addEventListener('click', newElement);
document.getElementById('clear').addEventListener('click', resetElement);
