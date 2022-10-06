<template>
  <datepicker
    v-model="model.date"
    :format="DatePickerFormat"
    :disabledDates="disabledDates"
  >
  </datepicker>
</template>

<script>
import DatePicker from "vuejs-datepicker";

export default {
  components: {
    DatePicker,
  },

  data() {
    return {
      model: {
        date: "",
      },
      DatePickerFormat: "dd/MM/yyyy",
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
    };
  },
};
</script>

<style>
</style>
