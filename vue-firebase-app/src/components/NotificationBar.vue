<template>
  <div :style="style" :class="classes">
    <div v-if="notificationBar">{{ notificationBar.text }}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      alert: false,
      default: 2000, //  Default timeout 2 seconds
    };
  },
  computed: {
    ...mapGetters(["notificationBar"]),
    classes() {
      if (this.notificationBar && this.notificationBar.open)
        return "hidden open";
      return "hidden";
    },
    style() {
      return {
        position: "fixed",
        height:
          this.notificationBar && this.notificationBar.open ? "48px" : "0px",
        width: "100%",
        color: "white",
        "padding-left": "10%",
        "padding-right": "10%",
        "font-family": "Glacial Indifference",
        background: "#4BB543",
        "pointer-events": "none",
        "z-index": "4",
        display: "flex",
        "align-items": "center",
      };
    },
  },
  methods: {
    close() {
      this.$store.commit("SET_NOTIFICATION_BAR", { open: false });
      console.log("closing", this.notificationBar);
    },
    pop() {
      //  If bar is not open, do nothing
      if (this.notificationBar && this.notificationBar.open == false) return;

      //  Set the default timeout
      setTimeout(this.close, this.default);
    },
  },
  watch: {
    notificationBar() {
      this.pop();
    },
  },
};
</script>
<style>
.hidden {
  height: 0px;
  -webkit-transition: height, 0.2s linear;
  -moz-transition: height, 0.2s linear;
  -ms-transition: height, 0.2s linear;
  -o-transition: height, 0.2s linear;
  transition: height, 0.2s linear;
}
.hidden.open {
  height: 200px;
  -webkit-transition: height, 0.2s linear;
  -moz-transition: height, 0.2s linear;
  -ms-transition: height, 0.2s linear;
  -o-transition: height, 0.2s linear;
  transition: height, 0.2s linear;
}
</style>