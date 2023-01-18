import Vue from "vue";
import lang from "element-ui/lib/locale/lang/zh-TW";
import locale from "element-ui/lib/locale";

import {
  Input,
  Select,
  Form,
  FormItem,
  Option,
  OptionGroup,
  Tabs,
  TabPane,
  RadioGroup,
  Radio,
  Checkbox,
  Message,
  Progress
} from "element-ui";

// 設置語言
locale.use(lang);

Vue.use(Input);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Progress);
Vue.prototype.$message = Message;
