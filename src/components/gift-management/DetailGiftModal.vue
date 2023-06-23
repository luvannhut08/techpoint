<template>
  <Modal :show="isOpen" size="modal-xl" @hidden="closeModal" class="font-special">
    <img alt="" class="absolute opacity-100 w-full h-full object-cover"
         src="../../assets/images/4.jpg">
    <div class="rounded-lg relative">
      <button class="mx-auto flex items-center mr-3 pt-4 pr-3 justify-center h-10 w-10" @click="closeModal">
        <svg aria-hidden="true" class="h-7 w-7 text-gray-600 hover:text-red-600" fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
      </button>
      <ModalHeader class="pb-8 pt-1">
        <h2 class="text-3xl text-orange-800 font-bold pl-8 absolute">
          {{ actionModal == "UPDATE" ? "Chi tiết quà tặng" : "Thêm mới quà tặng" }}</h2>
      </ModalHeader>
      <ModalBody>
        <div class="sm:flex sm:items-start">
          <div class="">
            <div class=" sm:mt-0">
              <div class="">
                <div class="flex ml-20 mt-2">
                  <label class="text-2xl w-64 font-medium text-orange-900"
                         for="gift-name">Tên quà tặng</label>
                  <input id="gift-name" v-model="gift.name"
                         class="input-no-spinner text-2xl font-medium bg-transparent border-none v-text-field  focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-2/4 text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                         required
                         type="text">
                </div>
                <div class="flex mt-4 ml-20">
                  <div class="">
                    <div class="flex">
                      <div class="flex items-end">
                        <label class="w-64 mt-1 text-lg font-medium text-orange-700"
                               for="gift-point">Số điểm tương ứng</label>
                        <input id="gift-point" v-model="gift.point"
                               v-on:keydown="preventE"
                               class="input-no-spinner w-32 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 py-1 px-2 leading-tight focus:outline-none"
                               required
                               min="0"
                               type="number">
                      </div>
                    </div>
                    <div class="flex mt-4 items-end">
                      <label class="w-64 text-lg font-medium text-orange-700"
                             for="gift-point">Số lượng quà</label>
                      <input id="gift-point" v-model="gift.quantity"
                             v-on:keydown="preventE"
                             class="input-no-spinner w-32 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 py-1 px-2 leading-tight focus:outline-none"
                             required
                             min="0"
                             type="number">
                    </div>
                    <div class="mt-4 flex">
                      <div class="mb-4">
                        <label class="text-lg leading-6 font-medium text-orange-700"
                               for="gift-description">Mô tả chi tiết</label>
                        <textarea id="gift-description" v-model="gift.description"
                                  class="custom-textarea bg-transparent w-96 border-gray-700 mt-2 h-72 decoration-orange-800 focus:ring-orange-200 leading-tight overflow-y-scroll scroll-view"
                                  required></textarea>
                      </div>
                    </div>
                  </div>

                  <div class=" mr-20 mt-5 ">
                    <label class="relative">
                      <div :class="{'border-danger': errors.img || errors.size}"
                           class="border-2 border-dashed border-primary aspect-square w-4/5 rounded-lg flex flex-col items-center">
                        <div class="p-4 w-full">
                          <div class="relative h-full zoom-in ">
                            <div v-if="checkDelete === 'UPDATE'" data-v-9f00ac50=""
                                 class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                 @click="deleteImg">
                              <svg data-v-9f00ac50="" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                   stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </div>
                            <img ref="imgRef" :src="this.tmpImgUrl" alt="image-default"
                                 class="w-64 h-full rounded-lg overflow-hidden object-cover" style="height: 173px">

                          </div>
                        </div>
                        <div class="mb-4 flex items-center justify-center">

                          <button class="btn-upload-img relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24"
                                 fill="none" class="svg-icon">
                              <g stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd"
                                 clip-rule="evenodd">
                                <path
                                    d="m4 9c0-1.10457.89543-2 2-2h2l.44721-.89443c.33879-.67757 1.03131-1.10557 1.78889-1.10557h3.5278c.7576 0 1.4501.428 1.7889 1.10557l.4472.89443h2c1.1046 0 2 .89543 2 2v8c0 1.1046-.8954 2-2 2h-12c-1.10457 0-2-.8954-2-2z"></path>
                                <path d="m15 13c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z"></path>
                              </g>
                            </svg>
                            <span class="lable">Chọn ảnh</span>
                            <input
                                ref="uploadImage"
                                class="absolute opacity-0 w-full h-full rounded-2xl"
                                type="file"
                                @change="onChooseFile"
                            />
                          </button>
                        </div>
                        <div class="invalid-feedback font-sans font-medium text-center" v-for="(item, index) in errorImages" v-bind:key="index">{{ item }}</div>
                        <Error :hidden="!errors.img&&!errors.size"
                        :message="errors.img || errors.size"/>
                      </div>
                    </label>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showError" v-html="messageError" class="text-red-500 mt-2 text-center">
        </div>
        <div class="flex justify-center mt-7 mb-7">
          <button class="w-24 mr-4 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                  @click="closeModal">
            Huỷ
          </button>
          <button class=" w-24 bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  @click="updateGift">
            {{ actionModal == "UPDATE" ? "Cập nhật" : "Lưu" }}
          </button>
        </div>
      </ModalBody>
    </div>
  </Modal>
</template>
<script>
import Error from "@/components/core/Error.vue";
import Swal from "sweetalert2";
import GiftsApi from "@/api/GiftsApi";
import AvatarDefault from "@/assets/images/avatar-default.png"

export default {
  name: "DetailGiftModal",
  components: {Error},
  data() {
    return {
      gift: {...this.initialGift},
      errors: {},
      tmpImgUrl: AvatarDefault,
      isValidImage: true,
      showError: false,
      avatarDefault: AvatarDefault,
      checkDelete: this.actionModal,
      errorImages: [],
      checkFile: 0,
      isSaving: false,
      messageError: ""
    }
  },
  props: ["isOpen", "onClose", "initialGift", "actionModal"],
  methods: {
    async updateGift() {
      this.messageError = ""
      if (this.gift.name.length > 255) {
          this.messageError += " Tên món quà không được vượt quá 255 kí tự! <br>" 
      }
      if (this.gift.description.length > 500) {
          this.messageError += " Mô tả không được vượt quá 500 kí tự! <br>"
      }
      if (this.gift.point < 1) {
          this.messageError += " Điểm tương ứng không thể ít hơn 1! <br>"
      }
      if (this.gift.quantity < 1) {
          this.messageError += " Số lượng quà không thể ít hơn 1! <br>"
      }
      this.errors = {}
      if (!this.gift.name || !this.gift.point || !this.gift.description || !this.gift.quantity) {
        this.messageError = "Vui lòng nhập tất cả các mục! <br>"
      }
      if(/[.,-]/.test(this.gift.point) && /[.,-]/.test(this.gift.quantity)) {
        this.messageError += "Điểm và số lượng phải là số nguyên dương! <br>"
      }else if(/[.,-]/.test(this.gift.point)) {
        this.messageError += "Điểm phải là số nguyên dương! <br>"
      }else if(/[.,-]/.test(this.gift.quantity)) {
        this.messageError += "Số lượng phải là số nguyên dương! <br>"
      }
      if (this.messageError) {
        this.showError = true
        return this.messageError;
      }
      if (this.actionModal == "CREATE") {
        this.validateImage()
        try {
          if(this.errorImages.length > 0) {
            return
          }
          if (this.isSaving) {
            return
          }
          this.isSaving = true;
          const res = await GiftsApi.createNewGift((this.$h.convertJsonToFormData(this.gift)))
          if (res.status === 200) {
            this.closeModal()
            this.$store.dispatch("gifts/fetchGifts")
            await Swal.fire({
              title: `<span style="font-weight: normal">Thêm mới quà tặng thành công!</span>`,
              timerProgressBar: true,
              timer: 5000,
              icon: "success"
            })
          }
        } catch (e) {
          this.errors = e.data.errors
        } finally {
          this.isSaving = false;
        }
      } else {
        try {
          if(this.checkFile == 1) {
            this.validateImage()
          }
          if(this.errorImages.length > 0) {
            return
          }
          const data = this.$h.convertJsonToFormData(this.gift)
          const res = await GiftsApi.updateGift(this.gift.id, data)
          if (res.status === 200) {
            this.closeModal()
            this.$store.dispatch("gifts/fetchGifts")
            await Swal.fire({
              title: `<span style="font-weight: normal">Cập nhật quà tặng </span> <b>${this.gift.name}</b> <span style="font-weight: normal">thành công!</span>`,
              timerProgressBar: true,
              timer: 2000,
              icon: "success",
              didOpen: () => {
                const titleElement = document.querySelector('.swal2-title');
                titleElement.style.lineHeight = ('1');
              }
            })
          }
        } catch (e) {
          this.errors = e.data.errors
        }
      }
    },
    onChooseFile(e) {
      this.errors = {...this.errors, size: "", img: ""}
      let files = e.target.files || e.dataTransfer.files
      this.gift.img = files[0]
      this.tmpImgUrl = URL.createObjectURL(files[0])
      this.checkDelete = "UPDATE"
      this.checkFile = 1
    },
    preventE(event) {
      if (event.key === "e" || event.key === "E") {
        event.preventDefault();
      }
    },
    closeModal() {
      this.reset()
      this.onClose()
    },
    reset() {
      URL.revokeObjectURL(this.tmpImgUrl)
      this.gift = {...this.initialGift, img: null}
      this.errors = {}
      this.tmpImgUrl = this.actionModal == "UPDATE" ? this.initialGift.img : this.avatarDefault
      this.isValidImage = true
    },
    deleteImg() {
      this.checkDelete = "CREATE"
      this.errors = {...this.errors, size: "", img: ""}
      this.gift.img = this.avatarDefault
      this.tmpImgUrl = this.avatarDefault
      this.checkFile = 1
    },
    validateImage() {
      let file = this.$refs.uploadImage.files[0]
      let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
      this.errorImages = []
      if (!file) {
        this.errorImages.push('Vui lòng chọn hình ảnh.')
        return
      }
      if (!allowedTypes.includes(file.type)) {
        this.errorImages.push('Vui lòng tải lên ảnh có định dạng jpeg, png, jpg')
        return
      }
      if (file.size > 500000) {
        this.errorImages.push('Kích thước tệp quá lớn. Kích thước tối đa là 500KB.')
        return
      }
    },
  },
  watch: {
    tmpImgUrl(crc, oldSrc) {
      URL.revokeObjectURL(oldSrc)
    },
    isOpen(){
      this.errorImages = []
      this.showError = false;
      if (!val) {
        this.reset();
      }
    },
    initialGift: {
      deep: true,
      handler(newGift) {
        this.gift = {...newGift, img: null}
        this.tmpImgUrl = newGift.img
      }
    },
    actionModal(newValue, oldValue) {
      this.errorImages = []
      this.checkDelete = newValue
    },
    isOpen() {
      this.messageError = "",
      this.showError = false,
      this.errorImages = []
    }
  }
}
</script>
<style scoped>
.input-no-spinner {
  -moz-appearance: textfield;
  background-size: 30px;
  outline: none;
  padding: 10px;
  height: 30px;
}

.input-no-spinner:focus {
  border-bottom: 1px solid #7c2d12;
  outline: none !important;
  outline: 0 !important;
  outline: transparent !important;
  box-shadow: none !important;
  border-bottom: 2px solid #9A3412 !important;
}

.custom-textarea:focus {
  outline: none !important;
  outline: 0 !important;
  outline: transparent !important;
  box-shadow: none !important;
  border: 2px solid #9A3412 !important;
}

.upload-img {
  top: 80%;
  left: 40%;
  transform: translate(-50%)
}

.btn-upload-img {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;
  gap: 8px;
  height: 40px;
  width: 172px;
  border: none;
  background: #FF2849;
  border-radius: 20px;
  cursor: pointer
}

.btn-upload-img .lable {
  line-height: 22px;
  font-size: 17px;
  color: #fff;
  letter-spacing: 1px
}

.btn-upload-img:hover {
  background: #e52441
}

.btn-upload-img:hover .svg-icon {
  animation: flickering 2s linear infinite
}

@keyframes flickering {
  0% {
    opacity: 1
  }

  50% {
    opacity: 1
  }

  52% {
    opacity: 1
  }

  54% {
    opacity: 0
  }

  56% {
    opacity: 1
  }

  90% {
    opacity: 1
  }

  92% {
    opacity: 0
  }

  94% {
    opacity: 1
  }

  96% {
    opacity: 0
  }

  98% {
    opacity: 1
  }

  99% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}

textarea {
  font-family: 'Marck Script', cursive;
  font-size: 17px;
  line-height: 50px;
  resize: none
}

.v-text-field {
  border: none;
  border-bottom: 1px solid #7c2d12;
  padding-bottom: 2px
}
.invalid-feedback {
  color: red;
  margin-top: 8px
}
</style>
