import { Lazyload, ImgPreview, Loading, InfiniteLoad, Icon, PullRefresh, Navbar, Tab, Tabs, DatetimePicker, Slider, Popup } from 'wot-design'

const UIComponents = [Lazyload, ImgPreview, Loading, InfiniteLoad, PullRefresh, Icon, Navbar, Tab, Tabs, DatetimePicker, Slider, Popup ]


const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default WotUIPlugin