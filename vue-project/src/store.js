import { reactive } from 'vue'

export const storeIcon = reactive({
    icon: "",
    switchIcon(iconName){
        this.icon = iconName
    }
})

export const storeCV = reactive({
    show: false,
    toggleCV(){
        this.show = !this.show
    }
})