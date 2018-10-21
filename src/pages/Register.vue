<template>
  <q-page padding>

   <div class="q-title q-pb-md" style="text-align: center">{{ $i18n.t('register.title')}}</div>
   <q-field
    :count="22">
     <q-input :float-label="$i18n.t('user.email')" v-model="form.email" @blur="$v.form.email.$touch"
      @keyup.enter="submit"
      :error="$v.form.email.$error"/>
   </q-field>
   <q-field
    :count="16">
     <q-input type="password" :float-label="$i18n.t('user.password')" v-model="form.password"/>
   </q-field>
   <q-field
    :count="16">
     <q-input type="password" :float-label="$i18n.t('user.repeatPassword')" v-model="form.repeatPassword"/>
   </q-field>
   <div class="q-caption q-py-md">{{ $i18n.t('register.switchSignin') }} <router-link to="/user/login">{{ $i18n.t('register.switchSigninTarget') }}</router-link></div>
   <q-btn color="primary" @click="submit" v-ripple.mat>
    {{ $i18n.t('user.signIn') }}
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
        password: '',
        repeatPassword: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: {
        minLength: minLength(4),
        maxLength: maxLength(16),
        required },
      repeatPassword: {
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
      console.log(this.form.email)
      console.log(this.form.password)
    }
  }
}
</script>

<style>
</style>
