<template>
  <section class="section">
    <div class="columns">
      <div class="column card is-rounded is-4 is-offset-4">
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Text input" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email input" />
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-warning"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Phone</label>
          <div class="control">
            <input class="input" type="text" placeholder="Phone Number" />
          </div>
        </div>
        <div class="field">
          <label class="label">Gender</label>
          <div class="control">
            <div class="select">
              <select>
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" />
              I agree to the
              <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Signup",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  text-align: center;
}
</style>