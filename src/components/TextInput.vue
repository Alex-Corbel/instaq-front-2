<template>
  <div class="relative">
    <input
      :class="['input border border-gray-500 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600', value !== ''? 'filled':'']"
      :id="id"
      :name="id"
      type="text"
      autofocus
      :value="value"
      @keyup="toggleInputContainer($event.target)"
    />
    <label
      :for="id"
      class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-500 text-base mt-2 cursor-text"
      @click="this.previousElementSibling.focus()"
      :value="value"
    >
      {{ placeholder }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    placeholder: String,
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    toggleInputContainer: input => {
      if (input.value != "") {
        input.classList.add("filled");
      } else {
        input.classList.remove("filled");
      }
    }
  },
  mounted(){
  }
};
</script>

<style>
.input {
  transition: border 0.2s ease-in-out;
  min-width: 280px;
}

.input:focus + .label,
.input:active + .label,
.input.filled + .label {
  font-size: 0.75rem;
  transition: all 0.2s ease-out;
  top: -0.1rem;
  color: #667eea;
}

.label {
  transition: all 0.2s ease-out;
  top: 0.4rem;
  left: 0;
}
</style>
