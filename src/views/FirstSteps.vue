<template>
  <div>
    <Step
      :name="step.name"
      :image="step.image"
      :texts="step.texts"
      v-for="(step, index) in steps"
      :key="step.name"
      :class="{'hidden': actualStepIndex!=index}"
    >
    </Step>
    <div class="flex flex-row fixed mb-20 w-full justify-center bottom-0" ref="dots">
      <div
      v-for="(i, index) in steps.length" :key="i"
      :class="{
        'rounded-full': true,
        'border-purple-600': true,
        'border-2': true,
        'ml-1': true,
        'w-3': true,
        'h-3': true,
        'bg-purple-600': index==actualStepIndex
        }"
      >
      </div>
    </div>
    <div 
      @click="incrementIndex"
      class="cursor-pointer flex items-center justify-center text-xl w-full h-16 fixed bottom-0 text-purple-100 bg-purple-1000 font-salsa"
    >
      <span v-if="actualStepIndex < steps.length-1">{{$t('skip')}}</span>
      <span v-if="actualStepIndex == steps.length-1" @click="registerUser" class="w-full h-16 justify-center items-center flex">{{$t('finish')}}</span>
    </div>
  </div>
</template>

<script>
import Step from '@/components/Step.vue'
import store from "@/store";
import { action_types } from "@/store/types";
import Vue from "vue";

export default {
  name: "FirstStep",
  components: {Step},
  data() {
    return {
      steps: [{
        name: 'security',
        image: require('@/assets/img/onboarding/undraw_unlock_24mb.svg'),
        texts: ['Coucou', 'Je suis louis', 'et toi'],
      },
      {
        name: 'post',
        image: require('@/assets/img/onboarding/undraw_insert_08ir.svg'),
        texts: ['Coucou', 'Je suis louis', 'et toi'],
      },
      {
        name: 'hashtag',
        image: require('@/assets/img/onboarding/undraw_trends_a5mf.svg'),
        texts: ['Coucou', 'Je suis louis', 'et toi'],
      },
      {
        name: 'comment',
        image: require('@/assets/img/onboarding/undraw_personal_text_vkd8.svg'),
        texts: ['Coucou', 'Je suis louis', 'et toi'],
      }],
      actualStepIndex:0
    }
  },
  methods:{
    incrementIndex: function () {
      if (this.actualStepIndex < this.steps.length-1)
        this.actualStepIndex = this.actualStepIndex + 1;
    },
    registerUser: function() {
      store.dispatch(
        action_types.INSERT_USER,
        Vue.prototype.$keycloak.tokenParsed.preferred_username
      ).then(()=>{
        document.location.href = "/#/home"
      })
    }
  }
}
</script>