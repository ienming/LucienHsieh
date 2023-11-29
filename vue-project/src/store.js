import { reactive } from 'vue'

export const storeIcon = reactive({
    icon: "code",
    switchIcon(iconName){
        this.icon = iconName
    }
})