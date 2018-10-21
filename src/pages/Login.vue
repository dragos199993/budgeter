<template>
  <q-page padding>
   <div class="q-title q-pb-md" style="text-align: center">Log in</div>
   <q-field
    :count="22">
     <q-input float-label="Email" v-model="form.email" @blur="$v.form.email.$touch"
      @keyup.enter="submit"
      :error="$v.form.email.$error"/>
   </q-field>
   <q-field
    :count="16">
     <q-input type="password" float-label="Password" v-model="form.password"/>
   </q-field>
   <div class="q-caption q-py-md">To have access you need to use your existing account or to <router-link to="/user/signup">create a new one.</router-link></div>
   <q-btn color="primary" @click="submit" v-ripple.mat>
     Log in
   </q-btn>
  </q-page>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: {
        minLength: minLength(4),
        maxLength: maxLength(16),
        required }
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please review fields again.')
      }
    }
  }
}
</script>

<style>
</style>
