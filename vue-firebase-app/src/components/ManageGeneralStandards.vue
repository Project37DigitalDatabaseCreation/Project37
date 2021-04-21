<template>
  <div class="container scrollcontainer">
    <div class="card">
      <div class="card-header">
        All General Standards
        <div style="float: right">
          <button class="btn save" style="margin-right: 60px;" @click="goToCreate">
            Add General Standard
          </button>
          <gen-standard-modify-modal
            v-if="showEditModal"
            :std="std"
            @close="handleCloseEdit"
          ></gen-standard-modify-modal>
          <gen-standard-create-modal
            v-if="showCreateModal"
            @close="handleCloseCreate"
          ></gen-standard-create-modal>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table" style="margin: 0 !important">
          <thead class="project-head">
            <tr>
              <th>Title</th>
              <th>Number</th>
              <th>Description</th>
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
            <tr
              v-for="(genStandard, i) in orderedGenStandards"
              :key="genStandard.id"
            >
              <td>{{ genStandard.title }}</td>
              <td>{{ genStandard.number }}</td>
              <td>{{ genStandard.description }}</td>
              <td>{{ genStandard.is_active ? "True" : "False" }}</td>
              <td>
                <button
                  title="edit"
                  class="btn edit"
                  @click="goToEdit(genStandard, i)"
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
import GenStandardCreateModal from "../components/GenStandardCreateModal";
import GenStandardModifyModal from "../components/GenStandardModifyModal";
export default {
  setup() {
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const std = reactive(null);
    return { showCreateModal, showEditModal, std };
  },
  components: { GenStandardCreateModal, GenStandardModifyModal },
  computed: {
    ...mapGetters([
      "generalStandards",
      "loading",
      "sortedStandards",
      "standards",
    ]),
    orderedGenStandards() {
      if (!this.generalStandards) return null;
      //  Deep copy our standards
      const stds = _.cloneDeep(this.generalStandards);
      //  Order our standards by their general standard
      return stds.sort((a, b) => {
        return a.number > b.number ? 1 : -1;
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
      this.orderedGenStandards[this.idx] = std;
      //  Pop notification bar
      this.$store.commit("SET_NOTIFICATION_BAR", {
        open: true,
        text: `General Standard updated!`,
      });

      //  Find the sortedStandard and update it
      var i = this.sortedStandards.findIndex(
        (x) => x.genStandard.id === std.id
      );

      //  If i is not -1, update it
      if (i !== -1) {
        this.sortedStandards[i].genStandard = std;
      }

      //  Find the generalStandard and update it
      i = this.generalStandards.findIndex((x) => x.id === std.id);

      //  If i is not -1, update it
      if (i !== -1) {
        this.generalStandards[i] = std;
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
      this.orderedGenStandards.push(std);

      //  Order our standards again
      this.orderedGenStandards.sort((a, b) => {
        return a.number > b.number ? 1 : -1;
      });

      //  Pop notification bar
      this.$store.commit("SET_NOTIFICATION_BAR", {
        open: true,
        text: `General Standard created!`,
      });

      //  Fetch our standards again
      this.$store.dispatch("sortStandards");

      this.showCreateModal = false;
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