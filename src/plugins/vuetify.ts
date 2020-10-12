import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#ffcd00", // #E53935
                secondary: "#252728", // #FFCDD2
                tertiary: "#fafafa",
                accent: colors.indigo.base, // #3F51B5
                error: "#fd5151",
                warning: "#FD9A51"
            }
        }
    }
});
