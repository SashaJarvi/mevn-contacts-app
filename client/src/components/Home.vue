<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="8">
        <div class="home">
          <h1>This is home page</h1>

          <form @submit.prevent="sendData" @reset.prevent="resetForm">
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                class="form-control"
                id="name"
                name="name"
                placeholder="Enter contact name"
                :class="{ 'is-invalid': $v.name.$error }"
                v-model.trim="name"
              >
              <div class="invalid-feedback" v-if="!$v.name.required">Contact name is empty</div>
              <div class="invalid-feedback" v-if="!$v.name.minLength">Contact name must contain at least {{ $v.name.$params.minLength.min }} letters</div>
            </div>

            <div class="form-group">
              <label for="phone">Phone: </label>
              <input
                type="tel"
                v-mask="'+# (###) ###-##-##'"
                class="form-control"
                id="phone"
                name="phone"
                placeholder="Enter contact phone"
                :class="{ 'is-invalid': $v.phone.$error }"
                v-model.trim="phone"
              >
              <div class="invalid-feedback" v-if="!$v.phone.required">Contact phone is empty</div>
            </div>

            <div class="form-group">
              <label for="address">Address: </label>
              <input
                class="form-control"
                id="address"
                name="address"
                placeholder="Enter contact address"
                v-model.trim="address"
              >
            </div>

            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  v-model="gender"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male">
                <label class="form-check-label" for="male">
                  Male
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  v-model="gender"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female">
                <label class="form-check-label" for="female">
                  Female
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-success mr-3" :disabled="submitStatus === 'PENDING'">Submit</button>
            <button type="reset" class="btn btn-danger" @click="resetForm">Reset</button>

            <div class="mt-4">
              <p class="text-info" v-if="submitStatus === 'PENDING'">Sending...</p>
              <p class="text-success" v-if="submitStatus === 'OK'">Success!</p>
              <p class="text-danger" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            </div>
          </form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      name: '',
      phone: '',
      address: '',
      gender: '',
      submitStatus: null
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(2)
    },
    phone: {
      required
    }
  },
  methods: {
    async sendData () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        await axios({
          url: 'http://localhost:3000/api/records',
          method: 'POST',
          data: {
            name: this.name,
            phone: this.phone,
            address: this.address,
            gender: this.gender
          }
        })

        setTimeout(() => {
          this.submitStatus = 'OK'
          this.resetForm()
        }, 500)

        setTimeout(() => {
          this.submitStatus = null
          this.$router.push('/thanks')
        }, 1500)
      }
    },

    resetForm () {
      this.name = ''
      this.phone = ''
      this.address = ''
      this.gender = ''

      this.$v.$reset()
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
