<template>
  <div class="main map">
    <iframe v-if="type == 'mine'" id="map" :src="mapSrc" frameborder="0" scrolling="yes" noresize></iframe>
  </div>
</template>

<script>
export default {
  name: "TripMap",
  props: ["type", "lat", "lng", "name"],
  data() {
    return {
      defalutMyMapSrc: `http://114.116.250.115/google/map.html`
    };
  },
  computed: {
    mapSrc() {
      let src = `http://114.116.250.115/google/map.html`;
      let { type, lat, lng, name } = this;
      type = type || "mine";
      switch (type) {
        case "mine":
          if (lat && lng) {
            src = `http://114.116.250.115/google/map.html?lat=${lat}&lng=${lng}&name=${name}`;
          }
          break;
      }
      return src;
    }
  }
  //   template:"<map/>"
};
</script>

<style>
</style>