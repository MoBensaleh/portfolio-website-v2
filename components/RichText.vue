<template>
    <div class="rich-text">
        <component :is="tag">
          <slot  />
        </component>
    </div>

</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    props: {
      tag: {
        type: String as () => string,
        required: false,
        default: 'div'
      }
    },
  })
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.rich-text {
  font-weight: var(--font-weight-normal);
  transition: color 0.5s linear;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-secondary);
  }
  p {
    line-height: 1.75;
    font-weight: var(--font-weight-normal);
    font-family: Open sans, sans-serif;
  }
  img {
    @include size(75%, 75%);
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  b {
    font-weight: 700;
  }
  i {
    font-style: italic;
  }
  u {
    text-decoration-color: var(--secondary);
    text-decoration-skip-ink: none;
    text-decoration-thickness: from-font;
  }
  ul {
    list-style: disc outside none;
    padding-left: 15px;
  }
  ol {
    list-style: decimal outside none;
    padding-left: 15px;
  }
  li {
    display: list-item;
    margin-top: 10px;
    counter-increment: ol;
    &::marker {
      color: var(--secondary);
    }
  }
}
.text-xs {
  font-size: $text-xs;
}
.text-sm {
  font-size: $text-sm;
}
.text-base {
  font-size: $text-base;
}
.text-lg {
  font-size: $text-lg;
}
.text-xl {
  font-size: $text-xl;
}
.text-2xl {
  font-size: $text-2xl;
}
.text-3xl {
  font-size: $text-3xl;
}
.text-4xl {
  font-size: $text-4xl;
}
.text-5xl {
  font-size: $text-5xl;
}
.text-6xl {
  font-size: $text-6xl;
  line-height: 1.5;
}
.text-6xl + .dot {
  color: var(--tertiary);
  font-size: $text-6xl;
}
.text-4xl + .dot {
  color: var(--tertiary);
  font-size: $text-4xl;
}
</style>
