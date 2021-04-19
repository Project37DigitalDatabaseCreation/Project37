<template>
  <div class="container">
    <div class="container-layout">
        <div class="card">
          <div class="card-header">Manage Invitations</div>
          <div class="table-responsive">
          <table class="table">
            <thead class="project-head">
              <tr>
                <th>Name</th>
                <th>Email Address</th>
                <th>Organization</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="invitations.length && !spinner" class="project-body">
              <tr v-for="(invite, i) in invitations" :key="invite.id">
                <td>{{ invite.name }}</td>
                <td>{{ invite.email }}</td>
                <td v-if="invite.organization_ref">
                  {{ invite.organization_ref.title }}
                </td>
                <td>
                  <button @click="accept(invite, i)"  title="accept" class="btn accept">
                  </button>
                </td>
                <td>
                  <button @click="decline(invite, i)" title="decline" class="btn delete">
                  </button>
                </td>
              </tr>
            </tbody>
            <div
              v-if="spinner"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
              "
            >
              <div class="loader"></div>
            </div>
          </table>
          </div>
          <!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->
        </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { reactive } from "vue";
import { ref } from "vue";
export default {
  setup() {
    const invitations = reactive([]);
    const spinner = ref(false);
    return { invitations, spinner };
  },
  mounted() {
    //  Get all of our invitations
    this.fetchInvitations();
  },
  methods: {
    async accept(inv, i) {
      //  We have to get the organization matching this ref
      const organization = firebase
        .firestore()
        .doc(`/Organizations/${inv.organization_ref.id}`);

      //  Try and split up the name into first and last at the space
      const split = inv.name.split(" ");

      //  If there is only 1 item, then leave last name empty
      const first = split[0];
      const last = split[1] || "";

      //  Our payload for creating the client
      const payload = {
        email: inv.email,
        firstName: first,
        lastName: last,
        organization_ref: organization,
      };

      //  Accept our invitation by creating a client for this invitation
      const client = firebase
        .firestore()
        .collection("Clients")
        .doc(inv.uid)
        .set(payload);

      //  If this wasn't successful, just return
      if (!client) return;

      //  Pop the notification bar
      this.$store.commit("SET_NOTIFICATION_BAR", {
        open: true,
        text: `${inv.name} has been added as a Client!`,
      });

      //  Delete the invitation
      this.deleteInvitation(inv, i);
    },
    async decline(inv, i) {
      //  Pop the notification bar
      this.$store.commit("SET_NOTIFICATION_BAR", {
        open: true,
        text: `Invitation declined`,
      });

      //  Decline the invitation by just deleting it
      this.deleteInvitation(inv, i);
    },
    async deleteInvitation(inv, i) {
      //  If this was successful, delete the invitation
      firebase.firestore().collection("Invitations").doc(inv.id).delete();

      //  We should remove this item from our array
      this.invitations.splice(i, 1);
    },
    async fetchInvitations() {
      //  Start our spinner
      this.spinner = true;

      //  Container for our invitations
      const response = [];

      //  Invitations query from firestore
      const inv = firebase.firestore().collection("Invitations");

      //  Execute the query
      const obj = await inv.get();

      //  Iterate through each document and push them into response
      for (let i = 0; i < obj.docs.length; i++) {
        //  Our current document
        let doc = obj.docs[i].data();
        //  Append the id
        doc.id = obj.docs[i].id;
        //  Push onto response
        response.push(doc);
      }

      //  Now that we have all of our invitations, replace our current invitations
      this.invitations = response;

      //  Stop spinner
      this.spinner = false;
    },
  },
};
</script>
<style scoped src="../assets/styles/styles.css"></style>