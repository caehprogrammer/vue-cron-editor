[![Actions Status](https://github.com/karoletrych/vue-cron-editor/workflows/Node%20CI/badge.svg)](https://github.com/karoletrych/vue-cron-editor/actions)

# vue-cron-editor

VueCronEditor is a component library built with Vue allowing for easier editing of cron expressions.

# Demo

https://github.com/caehprogrammer/vue-cron-editor

# Requirements

-   Vue ^2.0

# Installation

-   vue-cron-editor-vuetify

```
npm install vue-cron-editor-vuetify --save
```

# Usage

```
<template>
  <div>
    <VueCronEditorVuetify v-model="cronExpression"/>
    {{cronExpression}}
  </div>
</template>

<script>
import VueCronEditorVuetify from 'vue-cron-editor-vuetify';
// or include the vue-cron-editor-vuetify.umd.js file and call:
// Vue.component("vue-cron-editor-vuetify", window["vue-cron-editor-vuetify"]);

export default {
  name: 'App',
  components: {
    VueCronEditorVuetify
  },
  data: () => ({
      cronExpression: "*/1 * * * *"
  }),
};
</script>
```

The editor tab will be set to the one which is able to represent an initial expression given to a `value` prop (**minutes** tab in the example above).
If none of the tabs can represent the given expression then **advanced** tab is selected.

To show only some of the tabs, specify them using `visibleTabs` prop:
`:visibleTabs="['daily', 'weekly', 'monthly']"`
Possible tabs: "minutes", "hourly", "daily", "weekly", "monthly", "advanced".

To preserve expression on switch to **advanced** tab set the `preserveStateOnSwitchToAdvanced` to `true`.

# i18n

The language of the component can be selected with the `locale` prop.

```
<VueCronEditorVuetify
    v-model="expression"
    locale="pl"
></VueCronEditorVuetify>
```

Currently supported languages:

-   en
-   pl
-   pt
-   it
-   es

Custom locales can be provided via a `customLocales` prop:

```
<VueCronEditorVuetify
    v-model="expression"
    locale="test"
    :custom-locales="{
    test: {
        every: "Every",
        mminutes: "minute(s)",
        hoursOnMinute: "hour(s) on minute",
        daysAt: "day(s) at",
        at: "at",
        onThe: "On the",
        dayOfEvery: "day, of every",
        monthsAt: "month(s), at",
        everyDay: "Every",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
        hasToBeBetween: "Has to be between",
        and: "and",
        minutes: "MINUTES",
        hourly: "HOURLY",
        daily: "DAILY",
        weekly: "WEEKLY",
        monthly: "MONTHLY",
        advanced: "ADVANCED",
        cronExpression: "cron expression:"
    }
}"
></VueCronEditorVuetify>
```

# Contributing

To build the samples app run in root directory:

```
npm install
npm run serve
```

To run unit tests:

```
npm run test:unit
```
