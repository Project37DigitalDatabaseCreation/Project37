<template>
    <div class="col-9 no-gutters px-0">
    <div class="justify-content-center">
      <div class="col-md-12" style="padding:0 !important;">
        <div class="card">
          <div class="card-header">Quality Review Form</div>
          <div class="card-body" style="overflow:auto; background-color:#f1f1f1;" :style="`height:${cardHeight}px;`">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form v-if="sortedStandards" action="#" @submit.prevent="submit">
              <template v-for="(item, i) in sortedStandards" :key="i">
                <div class="form-group row" :id="item.genStandard.number" style="background-color:#f8f8f8;">

                  <div style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">{{ `${item.genStandard.number}. ${item.genStandard.title}` }}</div>
                  
                  <template v-for="(standard, j) in sortedStandards[i].standards" :key="i + '-' + j">
                    <div class="standard-container col-12 px-0 mb-1" style="display:flex; border-bottom:1px solid grey; background-color:#ffffff; flex-direction:column;" :style="j == sortedStandards[i].standards.length - 1 ? 'border-bottom:unset !important;' : ''">
                      <div class="standard-container-title col-12 px-0" style="display:flex; font-size:12px; color:rgba(0,0,0,.6);">
                        <div class="col-1 px-0"  style="justify-content:center; align-items:center; text-align:center;">MET</div>
                        <div class="col-9 px-0">Standard {{ `${item.genStandard.number}.${standard.number}` }}</div>
                        <div class="col-2 px-0" style="text-align:center;">Points</div>
                      </div>
                      <div class="standard-container-body col-12 px-0" style="display:flex;">
                        <div class="col-1 px-0" style="justify-content:center; align-items:center; display:flex;">
                          <input id="st-1" type="checkbox" name="MET" v-model="standard.met" />
                        </div>
                        <div class="col-9 col-form-label px-0">{{ standard.title }}</div>
                        <div class="col-2 px-0" style="justify-content:center; align-items:center; display:flex;">{{ standard.met ? standard.points : 0 }}</div>
                      </div>
                    </div>
                  </template>
                  
                </div>
              </template>

              <div class="form-group row mb-0">
                <div class="col-12 px-0">
                  <button type="submit" class="btn btn-primary" style="width:100%;">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentLink: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null,
      standardMet: []
    };
  },
  mounted() {
    console.log('CONTENT HEIGHT', this.contentHeight)
  },
  computed: {
      cardHeight() {
        return this.contentHeight - 49
      },
      sortedStandards() {
          return this.$store.getters.sortedStandards
      }
  },
  methods: {
    pointsGiven(std, i, j) {
      console.log('std', std, i, j)

    },
    submit() {
      console.log('yee')
    }
  },
  watch: {
    currentLink(val) {
      if (val) {
        let element = document.getElementById(val)
        element.scrollIntoView(true)
      }
    }
  }
}
</script>
<style scoped>
.card {
    width: 100%;
}
.form-group {
  border-radius:4px 4px;
  box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important;
}
/* TODO: Add in breakpoints for the width */
</style>