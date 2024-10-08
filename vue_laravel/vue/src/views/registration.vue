<script setup>
  import axios from 'axios'
  import { ref, reactive } from 'vue';
  import  { serverURL } from '../store/server'
  import { showToast } from '../store/Toast';
  import router from '../router/router';

  const form = reactive({
     name: "Hasan",
     email: "hasan@gmail.com",
     password: "12345678",
  })

  const cPassword = ref('12345678');

  const registration = async () => {
    if (form.password !== cPassword.value) {
      showToast('error', 'Confirm password does not match');
      return; // Stop further execution if passwords don't match
    }

    try {
        const response = await axios.post(`${serverURL}/user-registration/`, form, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })

        if (response.data.status === 'success') {
            showToast('success', response.data.message);
            setTimeout(() => {
              router.push('/login');
            }, 2000);
        } else {
            showToast('error', response.data.message);
        }
      } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400 && data.message) {
                showToast('error', data.message);
            } else if (data.errors) {
                Object.values(data.errors).forEach(err => {
                    showToast('error', err[0]);
                });
            } else {
                showToast('error', 'An unexpected error occurred.');
            }
        } else {
            showToast('error', 'Network problem or server not responding.');
        }
      }
    }

</script>

<template>

    <Head>
        <title>Registration</title>
    </Head>

<div class="flex items-center min-h-screen p-6 bg-gray-900">
  <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-800 rounded-lg shadow-xl">
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div class="h-32 md:h-auto md:w-1/2">
        <img
          aria-hidden="true"
          class="object-cover w-full h-full"
          src="https://salvemusic.com.ua/wp-content/uploads/2019/09/portishead3.jpg"
          alt="Office"
        />
      </div>
      <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div class="w-full">
          <h1 class="mb-4 text-xl font-semibold text-gray-200">
            Create account
          </h1>

          <label class="block text-sm">
            <span class="text-gray-400">Full Name</span>
            <input
              id="name"
              v-model="form.name"
              class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-300 form-input"
              placeholder="Jane Doe"
            />
          </label>

          <label class="block text-sm mt-4">
            <span class="text-gray-400">Email</span>
            <input
              id="email"
              v-model="form.email"
              class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-300 form-input"
              placeholder="jane@doe.com"
            />
          </label>

          <label class="block mt-4 text-sm">
            <span class="text-gray-400">Password</span>
            <input
              id="password"
              v-model="form.password"
              class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-300 form-input"
              placeholder="***************"
            />
          </label>

          <label class="block mt-4 text-sm">
            <span class="text-gray-400">Confirm password</span>
            <input
              v-model="cPassword"
              class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-300 form-input"
              placeholder="***************"
            />
          </label>

          <div class="flex mt-6 text-sm">
            <label class="flex items-center text-gray-400">
              <input
                type="checkbox"
                class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
              />
              <span class="ml-2">
                I agree to the <span class="underline">privacy policy</span>
              </span>
            </label>
          </div>

          <button
            @click="registration()"
            type="submit"
            class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Create account
          </button>

          <hr class="my-8" />

          <button
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-300 transition-colors duration-150 border border-gray-600 rounded-lg active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
          >
            <svg
              class="w-4 h-4 mr-2"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            Github
          </button>

          <p class="mt-2 text-sm font-bold text-gray-200">
            Already have an account?
            <RouterLink
              class="text-sm font-medium text-purple-400 hover:underline"
              :to="{ name: 'login' }"
            >
              Login
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


</template>

<style scoped>

</style>