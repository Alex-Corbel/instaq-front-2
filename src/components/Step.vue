<template>
  <div class="flex flex-col items-center">
    <div class="md:mt-4 mt-4 flex items-center">
      <img :src="image"/>
    </div>
    <div class="text-purple-1000 mt-2 font-semibold text-3xl font-salsa">
        <span v-if="name == 'security'">{{ $t('security') }}</span>
        <span v-if="name == 'post'">{{ $tc('post', 2) }}</span>
        <span v-if="name == 'comment'">{{ $tc('comment', 2) }}</span>
        <span v-if="name == 'hashtag'">{{ $tc('hashtag', 2) }}</span>
    </div>
    <div v-for="text in $t('onboarding.'+name)" :key="text" class="font-salsa">
        {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstStep",
  props: {
    name: String,
    image: String,
    texts: Array,
  }
}
</script>
