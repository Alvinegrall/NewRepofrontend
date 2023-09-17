<template>
  <!-- <div class="box" :style="cssVars"></div> -->
  <div>
    <div class="skeleton skeleton-text" :style="cssVars"></div>
    <!-- <div class="skeleton skeleton-text"></div> -->

    <!-- <a class="card" id="card-link" target="_blank">
      <div class="card__header">
        <div>
          <img class="card__header header__img skeleton" id="logo-img" alt="" />
        </div>
        <h3 class="card__header header__title" id="card-title">
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
        </h3>
      </div>

      <div class="card__body">
        <div class="card__body body__text" id="card-details">
          <div class="skeleton skeleton-text skeleton-text__body"></div>
        </div>

        <div class="card__body body__img">
          <img class="skeleton" alt="" id="cover-img" />
        </div>
      </div>

      <div class="card__footer" id="card-footer">
        <div class="skeleton skeleton-text skeleton-footer"></div>
      </div>
    </a> -->

    <!-- <div class="skeleton skeleton-text skeleton-footer"></div> -->
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "unset",
    },
    height: {
      type: String,
      default: "unset",
    },
    radius: {
      type: String,
      default: "6px",
    },
    background: {
      type: String,
      default: "#ddd",
    },
    shadow: {
      type: String,
      default: "0px 2px 3px rgba(0, 0, 0, 0.12)",
    },
  },
  computed: {
    cssVars() {
      return {
        "--width": this.width,
        "--height": this.height,
        "--radius": this.radius,
        "--background": this.background,
        "--shadow": this.shadow,
      };
    },
  },
};
</script>

<!-- Inject JavaScript in css -->
<style scoped>
/* Use props values */
/* .box {
  height: var(--height);
  background-color: #fff;
  border-radius: var(--radius);
  width: var(--width);
  box-shadow: var(--shadow);
  overflow: hidden;
} */

/* .box {
  background-color: var(--background);
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    var(--background);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s shimmer ease-in-out infinite;
} */

@keyframes shimmer {
  to {
    background-position-x: -20%;
  }
}

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 85%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.skeleton-text {
  width: var(--width);
  height: var(--height);
  margin-bottom: 0.5rem;
  border-radius: var(--radius)
}

.skeleton-text__body {
  width: 75%;
}

.skeleton-footer {
  width: 30%;
}
</style>
