import {createStore} from 'vuex'
import getters from './getters'

import system from './modules/system'

const modules = {
    system
}


export default createStore({
    modules,
    getters
})

