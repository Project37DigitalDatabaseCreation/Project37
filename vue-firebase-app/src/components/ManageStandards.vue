<template>
  <div class="container scrollcontainer">
    <div class="card">
      <div class="card-header">
        All Standards
        <div style="float: right">
          <button
            class="btn save"
            style="margin-right: 4px; background-color: #49703b"
            @click="goToCreate"
          >
            Add Standard
          </button>
          <standard-modify-modal
            v-if="showEditModal"
            :std="std"
            @close="handleCloseEdit"
          ></standard-modify-modal>
          <standard-create-modal
            v-if="showCreateModal"
            @close="handleCloseCreate"
          ></standard-create-modal>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table" style="margin: 0 !important">
          <thead class="project-head">
            <tr>
              <th>Title</th>
              <th>General Standard Number</th>
              <th>Standard Number</th>
              <th>Points</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <div
            v-if="loading"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            "
          >
            <div class="loader"></div>
          </div>
          <tbody v-else class="project-body">
            <tr v-for="(standard, i) in orderedStandards" :key="standard.id">
              <td>{{ standard.title }}</td>
              <td>
                {{ genNumber(standard) }}
              </td>
              <td>{{ standard.number }}</td>
              <td>{{ standard.points }}</td>
              <td>{{ standard.is_active ? "True" : "False" }}</td>
              <td>
                <button
                  title="edit"
                  class="btn edit"
                  @click="goToEdit(standard, i)"
                ></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import { ref, reactive } from "vue";
import StandardCreateModal from "../components/StandardCreateModal";
import StandardModifyModal from "../components/StandardModifyModal";
export default {
  setup() {
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const std = reactive(null);
    return { showCreateModal, showEditModal, std };
  },
  components: { StandardCreateModal, StandardModifyModal },
  computed: {
    ...mapGetters([
      "generalStandards",
      "loading",
      "sortedStandards",
      "standards",
    ]),
    orderedStandards() {
      if (!this.standards) return null;
      //  Deep copy our standards
      const stds = _.cloneDeep(this.standards);
      //  Order our standards by their general standard
      return stds.sort((a, b) => {
        return a.generalStandard.number > b.generalStandard.number ? 1 : -1;
      });
    },
  },
  methods: {
    handleCloseEdit(std) {
      //  If not std, it is a normal close, return
      if (!std) {
        this.showEditModal = false;
        return;
      }
      //  Update our standard with the new data
      this.orderedStandards[this.idx] = std;
      //  Pop notification bar
      this.$store.commit("SET_NOTIFICATION_BAR", {
        open: true,
        text: `Standard updated!`,
      });

      //  Find the sortedStandard and update it
      var i = -1;
      var i2 = -1;

      //  Iterate through our sorted standards
      loop2: for (let j = 0; j < this.sortedStandards.length; j++) {
        for (let k = 0; k < this.sortedStandards[j].standards.length; k++) {
          let entry = this.sortedStandards[j].standards[k];
          if (entry.id === std.id) {
            i = j;
            i2 = k;
            break loop2;
          }
        }
      }

      //  If i is not -1, update it
      if (i !== -1) {
        this.sortedStandards[i].standards[i2] = std;
      }

      //  Find the generalStandard and update it
      i = this.standards.findIndex((x) => x.id === std.id);

      //  If i is not -1, update it
      if (i !== -1) {
        this.standards[i] = std;
      }

      this.showEditModal = false;
    },
    handleCloseCreate(std) {
      //  If not std, it is a normal close, return
      if (!std) {
        this.showCreateModal = false;
        return;
      }

      //  Add this standard to our list
      this.orderedStandards.push(std);

      //  Order our standards again
      this.orderedStandards.sort((a, b) => {
        return a.generalStandard.number > b.generalStandard.number ? 1 : -1;
      });

      //  Pop notification bar
      this.$store.commit("SET_NOTIFICATION_BAR", {
        open: true,
        text: `Standard created!`,
      });

      //  Fetch our standards again
      this.$store.dispatch("sortStandards");

      this.showCreateModal = false;
    },
    genNumber(std) {
      //  Get the general standard
      const gen = std.generalStandard;
      //  Return the general standard number
      return gen ? gen.number : "N/A";
    },
    goToCreate() {
      this.showCreateModal = true;
    },
    goToEdit(std, idx) {
      this.std = std;
      this.idx = idx;
      this.showEditModal = true;
    },
  },
};
</script>
<style scoped>
th {
  text-align: center;
}
/* Save/View Button */
.save {
  font-size: 0.6em;
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  background-color: #49703b;
}
</style>