<template>
  <div class="text-center py-4 lg:px-4">
    <div :class="toast.class.join(' ')" role="alert">
      <font-awesome-icon
          :v-if="beforeIcon.content"
          :icon="beforeIcon.content || ''"
          :class="beforeIcon.class"/>
      <span :class="message.class.join(' ')">{{message.text}}</span>
      <font-awesome-icon
          :v-if="afterIcon.content"
          :icon="afterIcon.content"
          :class="afterIcon.class || ''"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    toast: {
      class: Array
    },
    message: {
      class: Array,
      text: String
    },
    beforeIcon: {
      class: Array,
      content: Array
    },
    afterIcon: {
      class: Array,
      content: Array
    }
  }
}
</script>