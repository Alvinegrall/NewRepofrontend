<script setup>
import { computed, ref } from "vue";
// import { useMainStore } from "@/stores/main";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import TableCheckboxCell from "@/components/common/TableCheckboxCell.vue";
import BaseLevel from "@/components/common/BaseLevel.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import FormateDate from "@/helpers/FormateDate";
import AuthService from "@/services/AuthService";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  details: {
    type: Array,
    default: () => [],
  },
  checkable: Boolean,
});

const store = useStore();
const router = useRouter();

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(10);

const currentPage = ref(0);

const checkedRows = ref([]);

const emit = defineEmits(["deleted"]);

// new design

const itemsPaginated = computed(() =>
  props.details.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

// const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

// new mun pages

const numPages = computed(() =>
  Math.ceil(props.details.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, membre) => {
  if (isChecked) {
    checkedRows.value.push(membre);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === membre.id
    );
  }
};
const showDetails = () => {
  router.push({
    name: "finance.single-member",
    params: { matricule: "1234AS" },
  });
};
const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate;
};

const deleteUser = async (id) => {
  await AuthService.deleteUser(id)
    .then(async (res) => {
      if (!res.data.error) {
        emit("deleted", id);
      }
    })
    .finally(() => {});
};
</script>

<template>
  <div>
    <CardBoxModal v-model="isModalActive" title="Sample modal">
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal
      v-model="isModalDangerActive"
      title="Please confirm"
      button="danger"
      has-cancel
    >
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>

    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th>Crée le</th>
          <th>Nom</th>
          <th>Téléphone</th>
          <th>email</th>

          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in itemsPaginated" :key="client.id">
          <TableCheckboxCell
            v-if="checkable"
            @checked="checked($event, client)"
          />

          <td data-label="Crée le">
            {{ FormateDate(client.created_at, true) }}
          </td>
          <td data-label="Nom">
            {{ client.name }}
          </td>
          <td data-label="Téléphone">
            {{ client.phone }}
          </td>
          <td data-label="Email">
            {{ client.email }}
          </td>
          <td data-label="Action">
            <BaseButton
              color="danger"
              icon="trash-2"
              small
              @click="deleteUser(client.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'info' : 'secondary'"
            small
            @click="currentPage = page"
            class="text-white"
          />
        </BaseButtons>
        <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </div>
</template>
