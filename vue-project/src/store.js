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

export const storeColor = reactive({
    bg: "",
    text: "",
    setColor(bg, text){
        this.bg = bg
        this.text = text
        document.documentElement.style.setProperty('--luc-dynamic-bg-color', this.bg);
        document.documentElement.style.setProperty('--luc-dynamic-text-color', this.text);
    }
})