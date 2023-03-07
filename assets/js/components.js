// 
// 
// 
// 
// 今回使ったcomponentたち
const CoverEnterPoint = {
    template: `
    <div class="cover-container" :style="{backgroundImage: styleUrl}">
        <a :href="url" target="newTab ? '_blank' : ''" class="cover-enter-point">
            <p class="description">
                <span class="t-z-6 t-w-6">{{coverTitle}}</span>
                <span class="t-z-2 t-w-6" v-for="hashtag of coverHashtags">#{{hashtag}} </span>
                <span class="d-inline-block mt-1">{{coverDes}}</span>
            </p>
        </a>
    </div>
    `,
    props: ['coverImg', 'coverTitle', 'coverDes', 'url', 'newTab', 'coverHashtags'],
    computed: {
        styleUrl(){
            return `url(${this.coverImg})`
        }
    },
    data(){
        return {}
    }
}
Vue.component('cover-enter-point', CoverEnterPoint)

const CTA = {
    template: `
        <div class="my-cta-container" :class="{ 'large' : large}">
        <a :href="url" class="my-cta" :class="{ 'fill' : fill}" :target="newTab ? '_blank' : ''">
            <span v-html="title"></span>
            <div class="icon-container">
                <img :src="iconUrl" alt="">
                <img :src="iconUrl" alt="">
            </div>
        </a>
        </div>
    `,
    props: {
        title: {
            title: String,
            default: "Prev"
        },
        large: {
            type: Boolean, 
            default: false
        },
        fill: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            default: ""
        },
        newTab: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconUrl(){
            let iconUrl = "./assets/img/icons/arrow_rightLong.svg"
            if (this.fill){
                iconUrl = "./assets/img/icons/arrow_rightLong_ht.svg"
            }
            return iconUrl
        }
    },
    data(){
        return {}
    }
}

Vue.component('cta', CTA)

const Link = {
    template: `
    <a :href="url" class="my-link" :class="{ 'highlight' : highlight }" :style="[full ? fullObj : '']" target="_blank">
        {{ title }}
        <div class="icon-container" :style="styleObj">
            <img :src="iconUrl" class="icon">
            <img :src="iconUrl" class="icon">
        </div>
    </a>
    `,
    props: {
        title: {
            title: String,
            default: "Link"
        },
        url: {
            type: String,
            default: ""
        },
        hasIcon: {
            type: Boolean,
            default: true
        },
        full: {
            type: Boolean, 
            default: false
        },
        highlight: {
            type: Boolean, 
            default: false
        }
    },
    data(){
        let display = "none"
        if(this.hasIcon){
            display = "inline-block"
        }
        let iconUrl = "assets/img/icons/arrow_rightTop.svg"
        if(this.highlight){
            iconUrl = "assets/img/icons/arrow_rightTop_ht.svg"
        }
        return{
            styleObj: {
                display: display
            },
            fullObj: {
                display: "flex",
                "justify-content": "space-between"
            },
            iconUrl: iconUrl
        }
    }
}

Vue.component('basic-link', Link)

const DropDown = {
    template: `
    <nav class="dpd-container">
        <span class="dpd-head">{{title}}
            <div class="icon-container">
                <img src="assets/img/icons/arrow_down.svg" alt="" class="icon">
                <img src="assets/img/icons/arrow_down.svg" alt="" class="icon">
            </div>
        </span>
        <ul class="dpd-lists w-100">
            <li class="dpd-list" v-for="list of lists" :key="list.content" @click="$emit('drop-click', list.content)">{{list.content}}</li>
        </ul>
    </nav>
    `,props: {
        title: {
            type: String,
            default: "Drop Down List"
        },lists: {
            type: Array,
            default(){
                return [
                    {
                        content: ""
                    }
                ]
            }
        }
    },data(){
        return {}
    }
}

Vue.component('drop-down', DropDown)


const Footer = {
    template: `
        <footer class="flexable t-z-3">
            <div class="col-md-4">
                <a :href="links.home">
                    <img src="./assets/img/logo.png" alt="Logo" class="logo">
                </a>
                <div class="sns my-1">
                </div>
            </div>
            <div class="col-md-4">
                <a :href="links.about" class="d-block mb-1 t-z-3">關於 About</a>
                <a :href="links.about" class="d-block mb-1 t-z-3">設計 Design</a>
                <a :href="links.about" class="d-block mb-1 t-z-3">程式 Code</a>
                <a :href="links.about" class="d-block mb-1 t-z-3">繪畫 Painting</a>
            </div>
            <div class="col-md-4">
                <div>
                    <basic-link title="あるリンク" :url="links.sinica" :has-icon="true" :full="true" :highlight="false" class="mb-2 mb-md-1 d-block"></basic-link>
                </div>
                <span class="t-z-1 mt-5">Copyrights©2023</br>Lucien Hsieh</span>
            </div>
        </footer>
    `,
    data(){
        return{
            links: {
                home: "index.html",
                about: "about.html",
                design: "",
                code: "",
                painting: ""
            }
        }
    }
}

Vue.component('my-footer', Footer)

const Header = {
    template: `
    <header class="my-header" :class="{ 'out' : childIsScrollDown }">
    <div>
    <h1>
        <a href="./index.html">
            <img src="./assets/img/logo.png" alt="logo" class="logo">
        </a>
    </h1>
    <nav class="mobile-menu">
        <button @click="openMobile" class="d-flex flex-column ain hamburger">
            <p class="m-0 t-w-6">MENU</p>
            <span></span>
            <span></span>
        </button>
        <div class="menu" :class="{ 'show' : mobileShow }">
            <header>
                <div>
                    <h1>
                        <img src="./assets/img/logo.png" alt="logo" class="logo">
                    </h1>
                    <button><img src="./assets/img/icons/close_dark.svg" alt="Close" @click="closeMobile" class="icon"/></button>
                </div>
            </header>
            <div style="overflow: scroll;">
                <div class="row w-100 mt-md-3">
                    <figure class="col-12 col-md-6 px-md-1">
                        <img src="./assets/img/banner.png" />
                    </figure>
                    <nav class="col-12 col-md-6 px-md-1">
                        <a v-for="page of pages" class="mobile-nav" :href="page.worksCate ? 'works.html#'+page.worksCate : page.url">
                            <span class="heading">{{ page.heading }}</span>
                        </a>
                        <div class="sns">
                            <p>SNS</p>
                            <a href=""><img src="./assets/img/icons/fb.svg" alt="Facebook" class="icon mr-1"></a>
                            <a href=""><img src="./assets/img/icons/yt.svg" alt="Youtube" class="icon"></a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </nav>
    </div>
</header>
    `,
    props: {
        isScrollDown: {
            type: Boolean,
            default: false
        },
        nowPage: {
            type: String
        }
    },
    data(){
        let pages = [
            {
                heading: '關於 About',
                url: 'about.html'
            },{
                heading: '設計 Design',
                worksCate: 'design',
            },{
                heading: '程式 Code',
                worksCate: 'code',
            },{
                heading: '繪畫 Painting',
                worksCate: 'painting',
            }
        ]
        return {
            pages: pages,
            mobileShow: false,
            lastScrollTop: 0
        }
    },
    computed: {
        childIsScrollDown(){
            let childIsScrollDown = this.isScrollDown
            if (this.mobileShow){
                childIsScrollDown = false
            }
            return childIsScrollDown
        }
    },
    methods: {
        openMobile(){
            this.mobileShow = true
            this.$emit('mobile-is-open')
        },
        closeMobile(){
            this.mobileShow = false
            TweenMax.to(".scroll", .5, {
                y: 0
            })
            this.$emit('mobile-is-close')
        }
    }
}
Vue.component("my-header", Header)
// 
// 
// 
// Layout Components for pages
const LayoutText = {
    template: `
    <section class="row mb-1 jcc">
        <div class="col-12 col-md-8">
            <h3 class="mb-1" v-if="title">{{title}}</h3>
            <h4 class="mb-1" v-if="subTitle">{{subTitle}}</h4>
            <p class="t-a-j" v-for="par of pars">{{par}}</p>
        </div>
    </section>
    `,
    props: {
        title: {
            default: ""
        },
        subTitle: {
            default: ""
        },
        pars: {
            type: Array,
            default: ['par1', 'par2']
        }
    },
    data(){
        return {}
    }
}
Vue.component('layout-t', LayoutText)

const LayoutImg = {
    template: `
    <section class="row aic jcc mb-1">
        <div class="col-12" :class="colNumber" v-for="img of imgs">
            <figure>
                <img :src="img.url" alt="">
                <figcaption>{{img.figcaption}}</figcaption>
            </figure>
        </div>
    </section>
    `,
    props: {
        imgs: {
            type: Array,
            default: [
                {
                    url: "./assets/img/banner.png",
                    figcaption: "画像について説明してください"
                }
            ]
        },
    },
    computed: {
        colNumber(){
            if (this.imgs.length == 1){
                return "col-md-8"
            }else return "col-md-"+12/this.imgs.length
        }
    },
    data(){
        return {}
    }
}
Vue.component('layout-i', LayoutImg)

const LayoutLI = {
    template: `
    <section class="row flex-column-r flex-md-row aic mb-1">
        <div class="col-12 col-md-6">
            <figure>
                <img :src="imgUrl" alt="">
                <figcaption>{{figcaption}}</figcaption>
            </figure>
        </div>
        <div class="col-12 col-md-6">
            <p class="pb-1 pb-md-0 pr-md-1" v-for="par of pars">{{par}}</p>
        </div>
    </section>
    `,
    props: {
        pars: {
            type: Array,
            default: ["par"]
        },
        imgUrl: {
            default: "./assets/img/banner.png"
        },
        figcaption: {
            default: "画像について説明してください"
        }
    },
    data(){
        return {}
    }
}
Vue.component('layout-li', LayoutLI)

const LayoutLT = {
    template: `
    <section class="row aic mb-1">
        <div class="col-12 col-md-6">
            <p class="pb-1 pb-md-0 pr-md-1" v-for="par of pars">{{par}}</p>
        </div>
        <div class="col-12 col-md-6">
            <figure>
                <img :src="imgUrl" alt="">
                <figcaption>{{figcaption}}</figcaption>
            </figure>
        </div>
    </section>
    `,
    props: {
        pars: {
            type: Array,
            default: ["par"]
        },
        imgUrl: {
            default: "./assets/img/banner.png"
        },
        figcaption: {
            default: "画像について説明してください"
        }
    },
    data(){
        return {}
    }
}
Vue.component('layout-lt', LayoutLT)

// 
// 
// 
// custom
const ProjectCover = {
    template: `
        <div class="pj-cover" :style="{backgroundImage: styleUrl}"></div>
    `,
    props: ['projectName'],
    computed: {
        styleUrl(){
            let pjName = this.projectName.split(" ").join("_").toLowerCase()
            return `url(./assets/img/pj_${pjName}/cover.png)`
        }
    },
    data(){
        return {}
    }
}
Vue.component('project-cover', ProjectCover)

// 
// 
// 
// 
// 
// 
const BasicButton = {
    template: `
        <button class="my-btn" :class="mybtnClasses">{{ title }}</button>
    `,
    props: {
        title: {
            type: String,
            default: "Button"
        },
        highlight: {
            type: Boolean,
            default: false
        },
        outline: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            mybtnClasses: {
                "highlight": this.highlight,
                "outline": this.outline,
                "small": this.small
            }
        }
    }
}
Vue.component('basic-button', BasicButton)

const FileLink = {
    template: `
    <a :href="url" class="my-link file-link" target="_blank">
        <p class="title">
            <span>{{ title }}</span>
            <span class="sub-title">{{ subTitle }}</span>
        </p>
        <div class="info">
            <span class="cate">{{ cate }}</span>
            <div class="icon-container" :style="styleObj">
                <img :src="iconUrl" class="icon">
                <img :src="iconUrl" class="icon">
            </div>
        </div>
    </a>
    `,
    props: {
        title: {
            title: String,
            default: "File Link"
        },
        url: {
            type: String,
            default: ""
        },
        cate: {
            type: String,
            default: "PDF"
        },
        hasIcon: {
            type: Boolean,
            default: true
        },
        subTitle: {
            type: String,
            default: ""
        }
    },
    data(){
        let display = "none"
        if(this.hasIcon){
            display = "inline-block"
        }
        let iconUrl = "assets/img/icons/arrow_rightTop.svg"
        return{
            styleObj: {
                display: display
            },
            iconUrl: iconUrl
        }
    }
}

Vue.component('file-link', FileLink)

const ButtonLink = {
    template: `
    <a :href="url" class="my-btn link" :class="mybtnClasses" target="_blank">
        {{ title }}
        <div class="icon-container" :style="styleObj">
            <img src="assets/img/icons/arrow_rightTop.svg" class="icon">
            <img src="assets/img/icons/arrow_rightTop.svg" class="icon">
        </div>
    </a>
    `,
    props: {
        title: {
            title: String,
            default: "Link"
        },
        url: {
            type: String,
            default: ""
        },
        hasIcon: {
            type: Boolean,
            default: true
        },
        highlight: {
            type: Boolean,
            default: false
        },
        outline: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        }
    },data: function () {
        let display = "none"
        if(this.hasIcon){
            display = "inline-block"
        }
        return {
            mybtnClasses: {
                "highlight": this.highlight,
                "outline": this.outline,
                "small": this.small
            },
            styleObj: {
                display: display
            }
        }
    }
}

Vue.component('button-link', ButtonLink)

const checkBox = {
    template: `
    <label :for="id" class="d-flex aic my-inpt-container">
        <input type="checkbox" :name="name" :id="id" class="my-inpt" v-model="checked" @input="switchChecked"></input>
        <span v-html="title"></span>
    </label>
    `,
    props: {
        title: {
            type: String,
            default: "核取方塊"
        },
        id: {
            type: String,
            default: "checkbox1"
        },
        name: {
            type: String,
            default: "testcheckbox"
        },
        isChecked: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
        }
    },
    methods: {
        switchChecked(){
            this.$emit('child-switch-check', !this.checked)
        }
    },
    computed:{
        checked: {
            get(){
                return this.isChecked
            },
            set: function(value){
                this.$emit("update:is-checked", value)
            }
        }
    }
}

Vue.component('input-checkbox', checkBox)

const InputText = {
    template: `
    <label :for="id" class="my-inpt-container d-flex flex-column">
        <span class="aid"><span v-show="required">＊</span>{{labelTitle}}</span>
        <input :id="id" :name="name" :type="type" :placeholder="placeholder" @input="$emit('input', $event.target.value)" :required="required" :pattern="pattern ? regExp : false" :title="patternInstruct" class="my-inpt"/>
    </label>
    `,
    props: {
        labelTitle: {
            type: String,
            default: "說明文字"
        },
        placeholder: {
            type: String,
            default: "內容說明文字"
        },
        id: {
            type: String,
            default: "inputText1"
        },
        name: {
            type: String,
            default: "testInputText"
        },
        type: {
            type: String,
            default: "text"
        },
        required: {
            type: Boolean,
            default: true
        },
        regExp: {
            type: String
        },
        patternInstruct: {
            type: String
        }
    },
    computed: {
        pattern(){
            if (this.regExp){
                return true
            }else {
                return false
            }
        }
    },
    data(){
        return {
        }
    }
}

Vue.component('input-text', InputText)

const InputTextArea = {
    template: `
    <label :for="id" class="my-inpt-container d-flex flex-column">
        <span class="aid"><span v-show="required">＊</span>{{title}}</span>
        <textarea :id="id" :name="name" class="my-inpt" :placeholder="placeholder" :required="required" v-model="txtContent" v-bind="$attrs">{{content}}</textarea>
    </label>
    `,
    props: {
        title: {
            type: String,
            default: "說明文字"
        },
        id: {
            type: String,
            default: "inputTextArea1"
        },
        name: {
            type: String,
            default: "testTextArea"
        },
        placeholder: {
            type: String,
            default: "請輸入訊息"
        },
        required: {
            type: Boolean,
            default: true
        },
        content: {
            type: String
        }
    },
    data(){
        return {}
    },
    computed:{
        txtContent: {
            get(){
                return this.content
            },
            set: function(value){
                this.$emit("update:content", value)
            }
        }
    }
}

Vue.component('input-text-area', InputTextArea)

const inputSelect = {
    template: `
    <label :for="id" class="my-inpt-container d-flex flex-column">
        <span class="aid"><span>＊</span>{{title}}</span>
        <select :name="name" :id="id" class="my-inpt" :value="value" @input="$emit('input', $event.target.value)" :required="required">
            <option :value="option.value" v-for="(option, idx) of options" :disabled="idx == 0 ? true : false">{{ option.content }}</option>
        </select>
    </label>
    `,
    props: {
        title: {
            type: String,
            default: "說明文字"
        },
        id: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: "testInputSelect"
        },
        value: {
            type: String
        },
        required: {
            type: Boolean,
            default: true
        },
        options: {
            type: Array,
            default(){
                return [
                    {
                        value: "",
                        content: "--請選擇--"
                    }
                ]
            }
        }
    },
    data(){
        return {}
    }
}

Vue.component('input-select', inputSelect)

const SearchBtn = {
    template:`
    <button @click="startSearch">
        <img src="./assets/img/icons/search.svg" alt="Search" class="icon">
    </button>
    `,
    data(){
        return {}
    },
    methods:{
        startSearch(){
            this.$emit('start-search')
        }
    }
}
Vue.component('search-btn', SearchBtn)


const Search = {
    template: `
        <div class="overlay" :style="{ 'display': searchShow }">
            <div class="search-container">
                <div class="close">
                    <img src="assets/img/icons/close_dark.svg" alt="" @click="closeCarousel">
                </div>
                <form role="search" method="get" class="search-form" action="/search.html">
                    <input type="hidden" name="cx" value="8b2bf72ed6730cb8b"/>
                    <input type="text" name="q" placeholder="搜尋..." value="" class="csetext my-inpt">
                    <input type="submit" name="sa" value="搜尋" class="search_btn my-btn mt-1">
                </form>
            </div>
        </div>
    `,
    props: ["show"],
    data(){
        return {}
    },
    computed:{
        searchShow(){
            if (this.show){
                return "block"
            }else{
                return "none"
            }
        }
    },
    methods: {
        closeCarousel(){
            if (this.show){
                this.$emit('close-carousel')
            }
        }
    }
}
Vue.component("my-search", Search)


const Snake = {
    template: `
    <div class="snake-banner" :class="{ 'hide' : childIsScrollDown }">
    <p class="t-z-2 m-0">＊ 每天02：00～03：00為系統更新時間，此期間暫停報名事宜</p>
    <button><img src="./assets/img/icons/close.svg" alt="close" class="icon" @click="closeSnake"></button>
    </div>
    `,
    data(){
        return {
            childIsScrollDown: this.isScrollDown,
        }
    },
    props: {
        isScrollDown: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isScrollDown(){
            this.childIsScrollDown = true
        }
    },
    methods: {
        closeSnake(){
            this.childIsScrollDown = true
        }
    }
}

Vue.component("snake", Snake)


const Table = {
    template: `
    <div class="my-table">
    <nav class="dpd-container" :class="{ 'hover' : filterHoverable }" :style="hasFilter?'':hideFilter">
        <span class="dpd-head">{{nowFilter}}
            <div class="icon-container">
                <img src="assets/img/icons/arrow_down.svg" alt="" class="icon">
                <img src="assets/img/icons/arrow_down.svg" alt="" class="icon">
            </div>
        </span>
        <ul class="dpd-lists">
            <li class="dpd-list" v-for="filter of filters" @click="filterTable(filter)">{{filter}}</li>
        </ul>
    </nav>
    <div class="my-table-container">
        <table class="table">
            <thead class="table-heads">
                <tr class="table-head">
                    <th v-for="head of tableContent.heads">{{head}}</th>
                </tr>
            </thead>
            <tbody class="table-rows" :class="{'striped':isStriped}" v-for="(newTable, idx) of newTables" v-show="idx == nowTable" :key="newTable.key">
                <tr v-for="(row, value, idx) of newTable.rows">
                    <td><span v-if="row.name">{{row.name}}</span></td>
                    <td><span v-if="row.addr">{{row.addr}}</span></td>
                    <td><span v-if="row.county">{{row.county}}</span></td>
                    <td><span v-if="row.tele">{{row.tele}}</span></td>
                    <td><span v-if="row.fax">{{row.fax}}</span></td>
                    <td><a :href="row.link" target="_blank" v-if="row.link">連結</a></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="my-paginations">
        <button class="pagination" :class="{ 'active' : nowTable == idx }" v-for="(locatePage, idx) of newTables" @click="changePage(idx)">{{idx+1}}</button>
    </div>
    </div>
    `,
    props: {
        tableContent: {
            type: Object,
            default(){
                return {}
            }
        },
        hasFilter: {
            type: Boolean,
            default: true
        },
        isStriped: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        newTables(){
            let [newTables, showCount, filterRows] = [[], 8, []]
            filterRows = this.tableContent.rows
            if (this.nowFilter !== "全台灣"){
                filterRows = this.tableContent.rows.filter(el=>el.county == this.nowFilter)
            }
            for (let i=0; i<Math.ceil(filterRows.length/showCount); i++){
                newTables.push(
                    {
                        rows: filterRows.slice(i*showCount,(i+1)*showCount),
                        key: Math.random()+i
                    }
                )
            }
            return newTables
        },
        filters(){
            let filters = ["全台灣"]
            this.tableContent.rows.forEach(el=>{
                filters.push(el.county)
            })
            filters = [...new Set(filters)]
            return filters
        }
    },
    data(){
        return {
            nowTable: 0,
            nowFilter: "全台灣",
            hideFilter: {
                display: 'none'
            },
            filterHoverable: true
        }
    },
    methods: {
        changePage(id){
            this.nowTable = id
        },
        filterTable(filter){
            this.nowFilter = filter
            this.changePage(0)
            this.filterHoverable = false

            window.setTimeout(()=>{
                this.filterHoverable = true
            }, 200)
        },
    }
}

Vue.component('my-table', Table)


const JobTable = {
    template: `
    <div class="my-table">
    <nav class="dpd-container" :style="hasFilter?'':hideFilter">
        <span class="dpd-head">{{nowFilter}}
            <div class="icon-container">
                <img src="assets/img/icons/arrow_down.svg" alt="" class="icon">
                <img src="assets/img/icons/arrow_down.svg" alt="" class="icon">
            </div>
        </span>
        <ul class="dpd-lists">
            <li class="dpd-list" v-for="filter of filters" @click="filterTable(filter)">{{filter}}</li>
        </ul>
    </nav>
    <div class="my-table-container wide">
        <table class="table">
            <thead class="table-heads">
                <tr class="table-head">
                    <th v-for="head of tableContent.heads" :style="{ 'width' : head.width }">{{ head.th }}</th>
                </tr>
            </thead>
            <tbody class="table-rows" :class="{'striped':isStriped}" v-for="(newTable, idx) of newTables" v-show="idx == nowTable" :key="newTable.key">
                <tr v-for="row of newTable.rows">
                    <td class="table-row" v-if="row.branch">{{row.branch}}</td>
                    <td class="table-row" v-if="row.jobTitle">{{row.jobTitle}}</td>
                    <td class="table-row" v-if="row.jobContent">
                        <div v-html="row.jobContent" class="job-content d-inline-block"></div>
                        <a :href="row.link" class="my-link t-c" v-if="row.link"><strong>詳細資訊</strong></a>
                    </td>
                    <td class="table-row" v-if="row.start">{{row.start}}</td>
                    <td class="table-row" v-if="row.end">{{row.end}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="my-paginations">
        <button class="pagination" :class="{ 'active' : nowTable == idx }" v-for="(locatePage, idx) of newTables" @click="changePage(idx)">{{idx+1}}</button>
    </div>
    </div>
    `,
    props: {
        tableContent: {
            type: Object,
            default(){
                return {}
            }
        },
        hasFilter: {
            type: Boolean,
            default: true
        },
        isStriped: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        newTables(){
            let [newTables, showCount, filterRows] = [[], 8, []]
            filterRows = this.tableContent.rows
            if (this.nowFilter !== "全部"){
                filterRows = this.tableContent.rows.filter(el=>el.county == this.nowFilter)
            }
            for (let i=0; i<Math.ceil(filterRows.length/showCount); i++){
                newTables.push(
                    {
                        rows: filterRows.slice(i*showCount,(i+1)*showCount),
                        key: Math.random()+i
                    }
                )
            }
            return newTables
        },
        filters(){
            let filters = ["全部"]
            this.tableContent.rows.forEach(el=>{
                filters.push(el.county)
            })
            filters = [...new Set(filters)]
            return filters
        }
    },
    data(){
        return {
            nowTable: 0,
            nowFilter: "全部",
            hideFilter: {
                display: 'none'
            }
        }
    },
    methods: {
        changePage(id){
            this.nowTable = id
        },
        filterTable(filter){
            this.nowFilter = filter
            this.changePage(0)
        },
    }
}

Vue.component('job-table', JobTable)


const Meshi = {
    template: `
    <div class="my-meshi">
        <div class="content">
            <div class="descrip">
                <p class="title mb-1">
                    <span class="d-block">{{ name }}</span>
                    <span> {{ engName }} </span>
                </p>
                <p class="t-z-2">{{ jobTitle }}</p>
            </div>
            <figure>
                <div class="mask">
                    <img :src="portrait" alt="">
                </div>
            </figure>
        </div>
        <a :href="url" class="my-link" target="_blank">
            <div class="icon-container">
                <img :src="iconUrl" class="icon">
                <img :src="iconUrl" class="icon">
            </div>
        </a>
    </div>
    `,
    props: {
        url: {
            type: String,
            default: ""
        },
        portrait: {
            type: String,
            default: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
        },
        name: {
            type: String,
            default: "你的名字"
        },
        jobTitle: {
            type: String,
            default: "職稱"
        },
        engName: {
            type: String,
            default: "Your Name"
        }
    },
    data(){
        return{
            iconUrl: "assets/img/icons/arrow_rightTop_ht.svg"
        }
    }
}

Vue.component("my-meshi", Meshi)


const News = {
    template: `
    <div class="my-news">
        <a :href="url" :target="targetWindow">
            <div class="cover">
                <figure>
                    <img :src="cover" alt="">
                </figure>
                <span class="cate" v-if="cate">{{ cate }}</span>
                <div class="my-link">
                    <div class="icon-container">
                        <img :src="iconUrl" class="icon">
                        <img :src="iconUrl" class="icon">
                    </div>
                </div>
            </div>
            <div class="text">
            <h6 class="t-z-4">{{ title }}</h6>
            <p class="t-z-3 t-c-g" v-if="subTitle" style="margin-top: 8px;">{{ subTitle }}</p>
            <p class="t-z-1 t-c-g" v-if="date">{{ date }}</p>
            </div>
        </a>
    </div>
    `,
    props: {
        url: {
            type: String,
            default: "https://www.twbiobank.org.tw/new_web/"
        },
        cover: {
            type: String,
            default: "./assets/img/news/default-news.jpg"
        },
        cate: {
            type: String
        },
        title: {
            type: String,
            default: "新聞標題"
        },
        subTitle: {
            type: String
        },
        date: {
            type: String
        }
    },
    data(){
        return{
            iconUrl: "assets/img/icons/arrow_rightTop_ht.svg"
        }
    },
    computed: {
        targetWindow(){
            if (this.cate == "媒體報導"){
                return "_blank"
            }else{
                return ""
            }
        }
    }
}

Vue.component('my-news', News)

const Carousel = {
    template: `
    <div class="overlay" v-if="childOpen">
        <div class="step-descrip">
            <div class="close">
                <img src="assets/img/icons/close_dark.svg" alt="" @click="closeCarousel">
            </div>
            <transition-group name="fade">
                <div class="row" v-for="(step, idx) of steps" :key="step.count" v-show="idx+1 == childStep">
                    <div class="col col-12 col-lg-5">
                        <img :src="step.imgLink" alt="">
                    </div>
                    <div class="col col-12 col-lg-7 d-flex aic">
                        <div>
                            <span class="d-block">{{ step.count }}</span>
                            <h4>{{ step.name }}</h4>
                            <p v-html="step.content" class="hide-scroll"></p>
                        </div>
                    </div>
                </div>
            </transition-group>
            <div class="btn-controls">
                <button @click="prevStep">＜</button>
                <button @click="nxtStep">＞</button>
            </div>
        </div>
    </div>
    `,
    props: {
        carouselOpen: {
            type: Boolean,
            default: false
        },
        steps: {
            type: Array,
            default(){
                return []
            }
        },
        nowStep: {
            type: Number,
            default: 1
        }
    },
    computed: {
        childOpen(){
            return this.carouselOpen
        }
    },
    watch: {
        childOpen(){
            if (this.childOpen){
                this.childStep = this.nowStep
            }
        }
    },
    data(){
        return {
            childStep: this.nowStep,
        }
    },
    methods: {
        nxtStep(){
            this.childStep ++
            if (this.childStep >= 10){
                this.childStep = 9
            }
        },
        prevStep(){
            this.childStep --
            if (this.childStep <= 0){
                this.childStep = 1
            }
        },
        closeCarousel(){
            if (this.childOpen){
                this.childOpen = false
            }
            this.$emit('close-carousel')
        }
    }
}

Vue.component('my-carousel', Carousel)


const Tabs = {
    template: `
    <div class="tab-container">
        <div class="tab-head-container">
            <div class="tabs" v-for="(tab, idx) of tabs">
                <button :class="{ 'active': nowTab == idx }" @click="switchTab(idx)">{{ tab }}</button>
            </div>
        </div>
    </div>
    `,
    props: {
        tabs: {
            type: Array,
            default(){
                return [ "tab1", "tab2"]
            }
        }
    },
    data(){
        return {
            nowTab: 0
        }
    },
    methods: {
        switchTab(id){
            this.nowTab = id
            this.$emit('switch-tab', id)
        }
    }
}

Vue.component('my-tabs', Tabs)


const KOL = {
    template: `
    <div class="kol-card">
        <div class="img-container">
            <img :src="imgSrc" alt="">
        </div>
        <div class="head">
            <h4 class="t-z-4 t-w-5">{{ title }}</h4>
            <h3 class="t-z-6">{{ name }}</h3>
        </div>
        <div class="content t-a-j">
            <h5 class="t-z-5 mb-1">{{ contentTitle }}</h5>
            <p>{{ content }}</p>
        </div>
    </div>
    `,
    props: {
        title: {
            type: String,
            default: "職稱"
        },contentTitle: {
            type: String,
            default: "內文標題"
        },name: {
            type: String,
            default: "名字"
        },content: {
            type: String,
            default: "說的話"
        },imgSrc: {
            type: String,
            default: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
        }
    },
    data(){
        return {}
    }
}

Vue.component('kol', KOL)


const ButtonControlls = {
    template: `
    <div class="btn-controls">
        <button @click="prev" class="ctrl"> ＜ </button>
        <button @click="next" class="ctrl"> ＞ </button>
        <button @click="pause" class="ctrl" v-if="hasPaused"> {{ pausedOrNot }} </button>
    </div>
    `,
    props: {
        duration: {
            type: Number,
            default: 1000
        },
        hasPaused: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            // paused: false,
            pausedOrNot: "||",
            autoMode: true
        }
    },
    created(){
        this.$emit('auto-play', this.duration)
    },
    methods: {
        prev(){
            // if (this.paused){
            //     // this.paused = false
            //     this.pausedOrNot = "||"
            // }
            this.$emit('prev')
        },
        next(){
            // if (this.paused){
            //     // this.paused = false
            //     this.pausedOrNot = "||"
            // }
            this.$emit('next')
        },
        pause(){
            if (this.autoMode){
                this.pausedOrNot = "▶"
            }else{
                this.pausedOrNot = "||"
            }
            this.autoMode = !this.autoMode
            // this.paused = !this.paused
            this.$emit('pause')
        }
    }
}

Vue.component('btn-controls', ButtonControlls)


const StageCarousel = {
    template: `
    <div class="stage-carousel-container">
        <div class="carousel">
            <btn-controls :duration="3000" @prev="handlePrev" @next="handleNext" @pause="handlePause" @auto-play="handleAuto"></btn-controls>
            <transition-group name="fade">
                <div class="row vue-transition" v-for="kol of computedKols" v-show="kol.no == nowShow" :key="kol.no">
                    <kol :title="kol.title" :name="kol.name" :content="kol.content" :img-src="kol.imgSrc" :content-title="kol.contentTitle"></kol>
                </div>
            </transition-group>
        </div>
    </div>
    `,
    props: {
        kols: {
            type: Array,
            default(){
                return [
                    {
                        title: "職稱",
                        name: "姓名",
                        content: "說了什麼",
                        imgSrc: ""
                    }
                ]
            }
        }
    },
    computed: {
        computedKols(){
            let arr = this.kols
            arr.forEach((el, id)=>{
                el.no = id
            })
            return arr
        }
    },
    data(){
        return {
            nowShow: 0,
            manual: false,
            paused: false,
            autoMode: true,
        }
    },
    methods: {
        autoPlay(){
            // if (!this.manual && !this.paused){
            //     if (this.nowShow < this.kols.length-1){
            //         this.nowShow ++
            //     }else{
            //         this.nowShow = 0
            //     }
            // }else if (this.manual && !this.paused){
            //     setTimeout(()=>{
            //         this.manual = false
            //     }, 1500)
            // }
            if (this.autoMode){
                if (this.nowShow < this.kols.length-1){
                    this.nowShow ++
                }else{
                    this.nowShow = 0
                }
            }
        },
        handleAuto(duration){
            setInterval(this.autoPlay, duration)
        },
        handlePrev(){
            this.nowShow --
            if (this.nowShow < 0){
                this.nowShow = this.kols.length-1
            }
            this.manual = true
            // this.paused = false
        },
        handleNext(){
            this.nowShow ++
            if (this.nowShow > this.kols.length-1){
                this.nowShow = 0
            }
            this.manual = true
            // this.paused = false
        },
        handlePause(){
            // this.paused = !this.paused
            this.autoMode = !this.autoMode
        }
    }
}

Vue.component('my-stage-carousel', StageCarousel)

const AsideNav = {
    template: `
    <aside class="aside" :class="{ 'scroll-over': nowScrollOver }">
        <ul>
            <li v-for="(page, idx) of pages" @click="toggleSubs(idx, $event)" class="aside-nav">
                <span class="heading" :class="{ 'active':nowHeading == page.heading}" @click="switchPage(page)">{{page.heading}}</span>
                <ul class="subs">
                    <li v-for="sub of page.subs">{{sub}}</li>
                </ul>
            </li>
        </ul>
    </aside>
    `,
    props: {
        pageTitle: {
            type: String,
            default: "網頁標題"
        },
        pages: {
            type: Array,
            default(){
                return [
                    {
                        heading: "分類1",
                    },{
                        heading: "分類2",
                        subs: ["2-1", "2-2", "2-3"]
                    },{
                        heading: "分類3"
                    }
                ]
            }
        },
        activeHeading: {
            type: String
        }
    },
    data(){
        return {
            nowHeading: this.activeHeading,
            nowScroll: 0,
            nowScrollOver: false
        }
    },
    methods:{
        toggleSubs(id, evt){
            if (this.pages[id].subs){
                let el = evt.currentTarget
                let subs = el.querySelector("ul")
                let subPage = subs.querySelectorAll("li")
                let subsHeight = Array.from(subPage).map(el => el.clientHeight + 24)
                let resultHeight = subsHeight.reduce((a,b)=>a+b)
                if (el.classList.contains("is-open")){
                    el.classList.remove("is-open")
                    subs.style.height = '0px'
                }else{
                    el.classList.add("is-open")
                    subs.style.height = resultHeight+'px'
                }
            }
        },
        switchPage(el){
            this.nowHeading = el.heading
            this.$emit('aside-switch', el.heading)
        },
        updatScroll(){
            let st = window.pageYOffset || document.documentElement.scrollTop
            if (this.nowScroll > 100){
                console.log("over")
                this.nowScrollOver = true
            }else{
                this.nowScrollOver = false
            }
            this.nowScroll = st
        }
    },
    created(){
        window.addEventListener('scroll', this.updatScroll);
    },
    destroyed(){
        window.removeEventListener('scroll', this.updatScroll);
    }
}

Vue.component("my-aside-nav", AsideNav)

const progressBar  = {
    template: `
        <div class='progress-container'>
            <div class="nodes">
                <div class="node active"></div>
                <div class="node"></div>
                <div class="node"></div>
                <div class="node"></div>
            </div>
            <div class="base">
                <div class="progress" :style="{ 'width': progress }"></div>
            </div>
        </div>
    `,
    props: {
        comNowSlide: {
            type: Number,
            default: 1
        }
    },
    watch: {
        comNowSlide: function(){
            let nodes = document.querySelector(".progress-container").querySelectorAll(".node")
            let nodesArr = [...nodes]
            nodesArr.forEach(node => {
                node.classList.remove("active")
            })
            for (let i =0; i<this.comNowSlide; i++){
                nodesArr[i].classList.add("active")
            }
        }
    },
    computed: {
        progress(){
            return (this.comNowSlide-1) * 33.3 + "%"
        }
    },
    data: function(){
        return {
        }
    },
    methods: {
        toStep: function(el){
            this.clickProgress(el)
        },
        clickProgress(val){
            this.$emit('progress-click', val)
        }
    }
}

Vue.component('progress-bar', progressBar)