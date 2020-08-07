<template>
  <b-container v-cloak>
    <section class="contact-info">
      <h1 class="contact-info__header">Contact Info</h1>

      <article class="contact-info__article" >
        <h2>{{ contact.name }}</h2>
        <p>{{ contact.phone }}</p>
        <p>{{ contact.address }}</p>
        <p>{{ contact.gender }}</p>
      </article>

      <router-link to="/contacts">Return to contacts list</router-link>
    </section>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContactInfo',
  data () {
    return {
      contact: {}
    }
  },
  methods: {
    async getTask () {
      const id = this.$route.params.id

      const response = await axios({
        url: `http://localhost:3000/api/records/${id}`,
        method: 'GET'
      })

      return response.data
    }
  },
  async mounted () {
    this.contact = await this.getTask()
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}

.contact-info {
  &__header {
    margin-bottom: 1.5rem;
  }
}
</style>
