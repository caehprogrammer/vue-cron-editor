/**
 * vueCronEditorMixin
 * Core logic of a component.
 * Functionality dependent on UI frameworks should be implemented in derived components
 */

import {
    buildExpression,
    parseExpression,
    TabUpdatedEvent,
    TabKey
} from "./cronExpressions";
import * as cronValidator from "cron-validator";
import * as cronstrue from "cronstrue/i18n";
import { createI18n, toCronstrueLocale } from "./i18n";

import Vue from "vue";
import { Locale } from "cronstrue/dist/i18n/locale";

const initialData: Record<TabKey, TabUpdatedEvent> = {
    minutes: {
        type: "minutes",
        minuteInterval: 1
    },
    hourly: {
        type: "hourly",
        minutes: 0,
        hourInterval: 1
    },
    daily: {
        type: "daily",
        minutes: 0,
        hours: 0,
        dayInterval: 1
    },
    weekly: {
        type: "weekly",
        minutes: 0,
        hours: 0,
        days: ["1"]
    },
    monthly: {
        type: "monthly",
        hours: 0,
        minutes: 0,
        day: 1,
        monthInterval: 1
    },
    advanced: {
        type: "advanced",
        cronExpression: ""
    }
};

interface ComponentData {
    editorData: Object;
    currentTab: TabKey;
    innerValue: string | null;
    i18n: Record<string, string> | null;
}

export default Vue.extend({
    created() {
        this.i18n = createI18n(this.customLocales, this.locale);
        this.innerValue = this.value;
        this.__loadDataFromExpression();
    },
    props: {
        value: { type: String, default: "*/1 * * * *" },
        visibleTabs: {
            type: Array,
            default() {
                return [
                    "minutes",
                    "hourly",
                    "daily",
                    "weekly",
                    "monthly",
                    "advanced"
                ];
            }
        },
        preserveStateOnSwitchToAdvanced: { type: Boolean, default: false },
        locale: { type: String, default: "en" },
        customLocales: { type: Object, default: null }
    },
    data() {
        return <ComponentData>{
            innerValue: "*/1 * * * *",
            editorData: Object.assign({}, initialData.minutes),
            currentTab: "minutes",
            i18n: null
        };
    },
    computed: {
        explanation(): string {
            if (!this.innerValue) return "";
            const cronstrueLocale = toCronstrueLocale(this.locale);
            return (cronstrue as any).toString(this.innerValue, {
                locale: cronstrueLocale
            });
        }
    },
    methods: {
        _$t(key: string) {
            return this.i18n![key];
        },
        _toTextExpression(value: string, localeExpression: string): string {
            if (!value) return "";
            const cronstrueLocale = toCronstrueLocale(localeExpression);
            return (cronstrue as any).toString(value, {
                locale: cronstrueLocale
            });
        },
        __loadDataFromExpression() {
            const tabData = parseExpression(this.value);
            if (!this.visibleTabs.includes(tabData.type)) {
                this.$data.editorData = {
                    type: "advanced",
                    expression: this.value
                };
                this.currentTab = "advanced";
                return;
            }
            this.$data.editorData = { ...tabData };

            this.currentTab = tabData.type;
        },
        __updateCronExpression(event: TabUpdatedEvent) {
            const cronExpression = buildExpression({
                ...event
            });

            if (cronValidator.isValidCron(cronExpression)) {
                this.innerValue = cronExpression;
                this.$emit("input", cronExpression);
            } else {
                this.innerValue = null;
                this.$emit("input", null);
            }
        },
        _resetToTab(tabKey: TabKey) {
            this.currentTab = tabKey;
            if (this.preserveStateOnSwitchToAdvanced && tabKey === "advanced") {
                this.$data.editorData = {
                    type: "advanced",
                    cronExpression: this.innerValue
                };
                return;
            }

            this.$data.editorData = Object.assign({}, initialData[tabKey]);
            this.__updateCronExpression(initialData[tabKey]);
        }
    },
    watch: {
        locale() {
            this.i18n = createI18n(this.customLocales, this.locale);
        },
        value: {
            handler() {
                if (this.value == this.innerValue) {
                    return;
                }
                this.__loadDataFromExpression();
            }
        },
        editorData: {
            deep: true,
            handler(changedData) {
                this.__updateCronExpression(changedData);
            }
        }
    }
});
