<template>
  <Modal :show="isOpen" size="modal-xl" @hidden="closeModal" class="font-special">
    <img
        alt=""
        class="absolute opacity-100 w-full h-full"
        src="https://cdn.wallpapersafari.com/58/49/b5taeY.jpg"
    />
    <div class="rounded-lg relative">
      <button
          class="mx-auto flex items-center mr-3 pt-4 pr-3 justify-center h-10 w-10"
          @click="closeModal"
      >
        <svg
            aria-hidden="true"
            class="h-7 w-7 text-gray-600 hover:text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M6 18L18 6M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
          />
        </svg>
      </button>
      <ModalHeader class="pb-8 pt-1">
        <h2 class="text-3xl text-orange-800 font-bold pl-8 absolute">
          Chi tiết tiêu chí
        </h2>
      </ModalHeader>
      <ModalBody>
        <div class="sm:flex sm:items-start ml-4">
          <div>
            <div class="mt-3 sm:mt-0">
              <div class="mt-4 mx-auto ml-52">
                <div class="flex items-end">
                  <label
                      class="text-lg mr-11 w-48 leading-6 font-medium text-orange-700"
                      for="criterion-name"
                  >
                    Tên tiêu chí
                  </label>
                  <input
                      id="criterion-name"
                      v-model="criterion.name"
                      class="mr-9 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      disabled="disabled"
                  />
                </div>
                <div class="flex mt-4 items-end">
                  <label
                      class="w-60 text-lg mr-4 leading-6 font-medium text-orange-700"
                      for="criterion-point"
                  >
                    Số điểm tương ứng
                  </label>
                  <input
                      id="criterion-point"
                      v-model="criterion.point"
                      class="mr-9 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                      type="number"
                      disabled="disabled"
                  />
                </div>
                <div class="flex mt-4 items-center">
                  <label
                      class="w-40 text-lg leading-6 font-medium text-orange-700"
                      for="criterion-point"
                  >
                    Người đánh giá
                  </label>
                  <div v-for="admin in admins">
                    <Tippy class="w-full truncate mt-1 ml-3 text-lg font-bold flex items-center" :content="admin.name" placement="bottom">
                      <img :src="admin.avatarUrl"
                           alt="Rounded avatar"
                           class="w-11 h-11 rounded-full border-2 object-cover"
                      >
                    </Tippy>
                  </div>
                </div>
                <div class="mt-4 flex">
                  <div class="mr-7">
                    <label
                        class="text-lg leading-6 font-medium text-orange-700"
                        for="criterion-description"
                    >
                      Mô tả chi tiết
                    </label>
                    <textarea
                        disabled="disabled"
                        id="criterion-description"
                        v-model="criterion.description"
                        class="ml-4 custom-textarea border-none bg-transparent w-80 h-72 leading-tight overflow-y-scroll scroll-view border-transparent focus:outline-none"
                    ></textarea>
                  </div>
                  <div class="mt-3 mr-9">
                    <label class="relative">
                      <div
                          class="aspect-square w-full rounded-lg flex flex-col items-center justify-center"
                      >
                        <div
                            v-if="isValidImage && tmpImgUrl"
                            class="p-3"
                        >
                          <img
                              ref="imgRef"
                              :src="tmpImgUrl"
                              alt=""
                              class="w-64 h-52 object-full"
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </div>
  </Modal>
</template>

<script>

import CriterionApi from "@/api/CriterionApi";
import CriteriaGroupsApi from "@/api/CriteriaGroupsApi";

export default {
  name: "DetailCriterionModal",
  data() {
    return {
      criterion: {
        ...this.initialCriterion,
        img: null,
        groupId: this.action === "create" ? this.activeGroup.id : null,
      },
      tmpImgUrl: this.initialCriterion && this.initialCriterion.img ? this.initialCriterion.img : "",
      isValidImage: true,
      admins: []
    }
  },
  props: ["isOpen", "onClose", "initialCriterion", "activeGroup"],
  methods: {
    closeModal() {
      this.onClose();
    },
    async getAdmins() {
      const res = await CriteriaGroupsApi.getOne(this.initialCriterion.groupId)
      this.admins = res.data.data.admins
    }
  },
  watch: {
    isOpen() {
      this.getAdmins()
    }
  }
};
</script>
<style scoped>
textarea {
    font-family: 'Marck Script', cursive;
    font-size: 17px;
    line-height: 40px;
    resize: none;
}

.v-text-field {
    border: none;
    border-bottom: 1px solid #7c2d12;
    padding-bottom: 2px;
}

textarea::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, wheat, white);
}

textarea::-webkit-scrollbar-thumb {
    background: white;
}
</style>
