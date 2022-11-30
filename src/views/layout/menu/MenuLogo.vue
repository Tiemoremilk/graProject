<template>
  <div class="logo">
    <img :class="MenuLogo" :src="MenuLogoImges" />
  </div>
</template>

<script setup lang="ts">
import MenuLogoMax from "@/assets/logoMax.png";
import MenuLogoMin from "@/assets/logoMin.png";
import { collapseStore } from "@/stores/collapse";
import { computed, onMounted } from "vue";
const store = collapseStore();
// eslint-disable-next-line vue/return-in-computed-property
const stauts = computed(() => {
  return store.getCollapse;
});
const MenuLogo = computed(() => {
  if (stauts.value) {
    return "MenuLogoMax";
  } else {
    return "MenuLogoMin";
  }
});
const MenuLogoImges = computed(() => {
  if (stauts.value) {
    return MenuLogoMax;
  } else {
    return MenuLogoMin;
  }
});
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: 70px;
  line-height: 70px;
  cursor: pointer;
  text-align: center;
  align-items: center;
  .MenuLogoMax {
    width: 230px;
  }
  .MenuLogoMin {
    margin-left: 10px;
    width: 40px;
  }
}
</style>
