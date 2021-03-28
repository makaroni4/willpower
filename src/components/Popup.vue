<template>
  <div class="oh-really-popup">
    <h1>Oh Really?!</h1>

    <a target="_blank" href="/options.html">Options</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    proceedCount: Number,
    fuckItCount: Number
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: url("chrome-extension://__MSG_@@extension_id__/fonts/Roboto-Regular.ttf");
}

.oh-really-popup {
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px;
  z-index: 100000000;
  width: 100%;
  height: 100%;

  border-radius: 0 0 8px 0;

  background-color: #FFB088;
}

.oh-really-popup__icon {
  width: 32px;
  height: 32px;
  display: block;

  background-image: url("chrome-extension://__MSG_@@extension_id__/images/edit-regular.svg") !important;
  background-repeat: no-repeat;
  background-position: center;

  color: #FFF;

  cursor: pointer;
}
</style>
