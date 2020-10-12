<template>
    <div class="enable-bulma" :key="visibleTabs.join()">
        <v-tabs v-model="activeTab" @change="reset">
            <v-tab v-if="visibleTabs.includes('minutes')">
                {{ _$t("minutes") }}
            </v-tab>
            <v-tab v-if="visibleTabs.includes('hourly')">
                {{ _$t("hourly") }}
            </v-tab>
            <v-tab v-if="visibleTabs.includes('daily')">
                {{ _$t("daily") }}
            </v-tab>
            <v-tab v-if="visibleTabs.includes('weekly')">
                {{ _$t("weekly") }}
            </v-tab>
            <v-tab v-if="visibleTabs.includes('monthly')">
                {{ _$t("monthly") }}
            </v-tab>
            <v-tab v-if="visibleTabs.includes('advanced')">
                {{ _$t("advanced") }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
            <v-tab-item>
                <v-row>
                    <v-col>
                        <v-text-field
                            type="number"
                            label="xxx"
                            single-line
                            class="number-type"
                            :suffix="_$t('mminutes')"
                            :prefix="_$t('every')"
                            v-model.number="editorData.minuteInterval"
                        /> </v-col
                ></v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col>
                        <v-text-field
                            type="number"
                            label="xxx"
                            single-line
                            class="number-type"
                            :prefix="_$t('every')"
                            :suffix="_$t('hhours')"
                            v-model.number="editorData.hourInterval"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            type="number"
                            label="xxx"
                            single-line
                            :prefix="_$t('atMinute')"
                            class="number-type"
                            v-model.number="editorData.minutes"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col>
                        <v-text-field
                            type="number"
                            label="xxx"
                            single-line
                            class="number-type"
                            :prefix="_$t('every')"
                            :suffix="_$t('ddays')"
                            v-model.number="editorData.dayInterval"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            type="time"
                            color="primary"
                            label="xxx"
                            single-line
                            class="number-type"
                            :prefix="_$t('at')"
                            :suffix="_$t('hhours')"
                            v-model="time"
                            @input="setDateTime"
                        /> </v-col
                ></v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col class="text-center pt-8"
                        ><span>{{ _$t("everyDay") }}</span></v-col
                    >
                    <v-col>
                        <v-checkbox
                            v-model="editorData.days"
                            :label="_$t('sun')"
                            value="0"
                    /></v-col>
                    <v-col>
                        <v-checkbox
                            v-model="editorData.days"
                            value="1"
                            :label="_$t('mon')"
                    /></v-col>
                    <v-col>
                        <v-checkbox
                            v-model="editorData.days"
                            value="2"
                            :label="_$t('tue')"
                    /></v-col>
                    <v-col>
                        <v-checkbox
                            v-model="editorData.days"
                            value="3"
                            :label="_$t('wed')"
                    /></v-col>
                    <v-col>
                        <v-checkbox
                            v-model="editorData.days"
                            value="4"
                            :label="_$t('thu')"
                    /></v-col>
                    <v-col>
                        <v-checkbox
                            v-model="editorData.days"
                            value="5"
                            :label="_$t('fri')"
                    /></v-col>
                    <v-col>
                        <v-checkbox
                            v-model="editorData.days"
                            value="6"
                            :label="_$t('sat')"
                    /></v-col>
                    <v-col>
                        <v-text-field
                            type="time"
                            color="primary"
                            label="xxx"
                            single-line
                            class="number-type"
                            :prefix="_$t('at')"
                            :suffix="_$t('hhours')"
                            v-model="time"
                            @input="setDateTime"
                    /></v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col>
                        <v-text-field
                            type="number"
                            color="primary"
                            label="xxx"
                            single-line
                            class="number-type"
                            :prefix="_$t('onThe')"
                            :suffix="_$t('onTheMonth')"
                            v-model.number="editorData.day"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            type="number"
                            color="primary"
                            label="xxx"
                            single-line
                            class="number-type"
                            :prefix="_$t('every').toLowerCase()"
                            :suffix="_$t('mmonths')"
                            v-model.number="editorData.monthInterval"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            type="time"
                            color="primary"
                            label="xxx"
                            single-line
                            class="number-type"
                            :prefix="_$t('at')"
                            :suffix="_$t('hhours')"
                            v-model="time"
                            @input="setDateTime"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col>
                        <v-text-field
                            color="primary"
                            label="xxx"
                            single-line
                            class="number-type"
                            :prefix="_$t('cronExpression')"
                            v-model="editorData.cronExpression"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>
<style lang="scss" scoped>
::v-deep .number-type {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
}
</style>

<script>
import vueCronEditorMixin from "./core/vueCronEditorMixin";

export default {
    name: "VueCronEditorVuetify",
    mixins: [vueCronEditorMixin],
    data: () => ({
        activeTab: null,
        time: null,
        tabs: [
            { id: 0, key: "minutes" },
            { id: 1, key: "hourly" },
            { id: 2, key: "daily" },
            { id: 3, key: "weekly" },
            { id: 4, key: "monthly" },
            { id: 5, key: "advanced" }
        ]
    }),
    mounted() {
        this.activeTab = this.tabs.find(t => t.key === this.currentTab).id;
    },
    watch: {
        currentTab() {
            this.activeTab = this.tabs.find(t => t.key === this.currentTab).id;
        }
    },
    computed: {
        dateTime() {
            let dateTime = new Date();
            dateTime.setHours(this.editorData.hours);
            dateTime.setMinutes(this.editorData.minutes);
            return dateTime;
        }
    },
    methods: {
        reset(e) {
            const tabKey = this.tabs.find(t => t.id === e).key;
            this._resetToTab(tabKey);
        },
        setDateTime(e) {
            if (e == null) {
                return;
            }
            this.editorData.hours = e.split(":")[0];
            this.editorData.minutes = e.split(":")[1];
        }
    }
};
</script>
