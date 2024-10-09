<template>
  <main class="h-full pb-16 overflow-y-auto bg-gray-900">
    <div class="container px-6 mx-auto grid">
      <h2 class="my-6 text-2xl font-semibold text-gray-200">
        Forms
      </h2>

      <div class="px-4 py-3 mb-3 rounded-lg shadow-md bg-gray-800">
        <label class="block text-sm">
          <span class="text-gray-400">Name</span>
          <input
            class="block w-full mt-1 text-sm border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-300 form-input"
            placeholder="Jane Doe"
          />
        </label>

        <div class="mt-4 text-sm">
          <span class="text-gray-400">
            Account Type
          </span>
          <div class="mt-2">
            <label class="inline-flex items-center text-gray-400">
              <input
                type="radio"
                class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                name="accountType"
                value="personal"
              />
              <span class="ml-2">Personal</span>
            </label>
            <label class="inline-flex items-center ml-6 text-gray-400">
              <input
                type="radio"
                class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                name="accountType"
                value="business"
              />
              <span class="ml-2">Business</span>
            </label>
          </div>
        </div>

        <label class="block mt-4 text-sm">
          <span class="text-gray-400">
            Requested Limit
          </span>
          <select
            class="block w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
          >
            <option>$1,000</option>
            <option>$5,000</option>
            <option>$10,000</option>
            <option>$25,000</option>
          </select>
        </label>

        <label class="block mt-4 text-sm">
          <span class="text-gray-400">Message</span>
          <textarea
            class="block w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
            rows="3"
            placeholder="Enter some long form content."
          ></textarea>
        </label>
      </div>

      <div class="flex justify-between gap-5">
        <button
          class="block w-full px-20 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-500 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Save
        </button>

        <button
          class="block w-full px-20 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-500 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple"
        >
          Cancel
        </button>
      </div>
    </div>
  </main>
</template>
