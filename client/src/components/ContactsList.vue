<template>
  <b-container>

    <section class="contacts">
      <h1 class="contacts__header">Contacts List</h1>

      <b-list-group>
        <b-list-group-item
          class="contacts__list-item"
          v-for="contact in contacts"
          :key="contact._id"
        >
          <article>
            <h2 class="list-item__name">{{ contact.name }}</h2>

            <p class="list-item__phone">{{ contact.phone }}</p>
          </article>

          <div class="button-block">
            <router-link
              :to="{ name: 'ContactInfo', params: { id: contact._id }}"
              tag="button"
              class="button-block__btn btn btn-info"
            >Info</router-link>
            <router-link
              :to="{ name: 'ContactEdit', params: { id: contact._id }}"
              tag="button"
              class="button-block__btn btn btn-dark"
            >Edit</router-link>
            <b-button class="button-block__btn" variant="danger" @click="removeData(contact._id)">Remove</b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
    </section>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContactsList',
  data () {
    return {
      contacts: []
    }
  },
  methods: {
    async getContacts () {
      const response = await axios({
        url: 'http://localhost:3000/api/records',
        method: 'GET'
      })

      return response.data
    },

    async removeData (id) {
      await axios({
        url: `http://localhost:3000/api/records/${id}/delete`,
        method: 'DELETE'
      })

      this.contacts = this.contacts.filter(c => c._id !== id)
    }
  },
  async mounted () {
    this.contacts = await this.getContacts()
  }
}
</script>

<style lang="scss" scoped>
  .contacts {
    &__header {
      margin-bottom: 1.5rem;
    }

    &__list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 1rem;
    }

    .list-item {
      &__name {
        margin-bottom: 1rem;

        font-size: 1.5rem;
      }

      &__phone {
        margin-bottom: 0;

        font-size: 1.125rem;
      }
    }
  }

  .button-block {
    display: flex;

    &__btn {
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
