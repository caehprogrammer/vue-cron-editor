import { shallowMount } from "@vue/test-utils";
import VueCronEditorVuetify from "../../src/vuetify/VueCronEditorVuetify.vue";

function getMountedComponent(Component: any, propsData: any) {
    return shallowMount(Component, {
        propsData
    });
}

describe("isAdvancedVisible prop", () => {
    it("renders advanced tab when advanced is true", () => {
        let component = getMountedComponent(VueCronEditorVuetify, {
            visibleTabs: ["monthly", "advanced"]
        });
        expect(component.find(".advanced-tab").exists()).toBe(true);
    });

    it("does not render advanced tab when isAdvancedVisible is false", () => {
        let component = getMountedComponent(VueCronEditorVuetify, {
            visibleTabs: ["monthly"]
        });
        expect(component.find(".advanced-tab").exists()).toBe(false);
    });
});
