import { reactive } from 'vue'

export const storeIcon = reactive({
    icon: "",
    switchIcon(iconName){
        this.icon = iconName
    }
})