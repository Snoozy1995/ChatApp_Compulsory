<template>
  <h1>Hello your home</h1>
  <div class="grid">
    <div class="col-12 md:col-4 lg:col-3"><h5>Default</h5>
      <PanelMenu :model="items" />
    </div>
    <div class="col-12 md:col-8 lg:col-9"></div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      items: [
        {
          label: "Friends 0/2",
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Friend 1",
              icon: "pi pi-fw pi-user-plus",
            },
            {
              label: "Friend 2",
              icon: "pi pi-fw pi-user-plus",
            },
          ],
        },
      ],
    };
  },
};
</script>
