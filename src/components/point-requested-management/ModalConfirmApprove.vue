<template>
  <Modal :show="isOpen" size="modal-md" @hidden="closeModal" class="size-height">
    <div class="p-5 text-center">
      <picture class="flex justify-center">
        <img v-if="status === 2" src="/src/assets/images/bug-brown.gif" alt="🤔" width="60" height="60">
        <img v-else src="/src/assets/images/consider.gif" alt="🤔" width="60" height="60">
      </picture>
      <div class="text-3xl mt-5 flex flex-col">Xác nhận {{ status === 1 ? "phê duyệt" : "từ chối" }} <br> yêu cầu tích điểm của <span
          class="font-medium">{{ this.dataDetail.user?.name }}</span>
      </div>
    </div>
    <div class="px-5 pb-8 text-center">
      <button type="button"
              @click="closeModal"
              class="btn btn-outline-secondary w-24 mr-1">Hủy
      </button>
      <button v-if="status === 1"
              type="button" class="btn bg-green-400 text-white w-24"
              @click="updateStatusPointRequest">OK
      </button>
      <button v-else
              type="button" class="btn bg-rose-400 text-white w-24"
              @click="updateStatusPointRequest">OK
      </button>
    </div>
  </Modal>
</template>

<script>
import {mapGetters} from "vuex";
import PointsExchange from "@/api/PointsExchange";
import Swal from "sweetalert2";

export default {
  name: "ModalConfirmApprove",
  props: ["isOpen", "onClose", "dataDetail", "status", "selectedTime"],
  emits: ["clicked"],
  computed: {
    ...mapGetters('auth', ["uid", "username"])
  },
  data() {
    return {
      isSubmitting: false
    }
  },
  methods: {
    closeModal() {
      this.onClose()
    },
    async updateStatusPointRequest() {
      if (this.isSubmitting) {
        return
      }
      this.isSubmitting = true;

      let params = {
        id: this.dataDetail.id,
        status: this.status,
        updateAt: this.selectedTime,
        approveByUserId: this.uid
      }
      try {
        const res = await PointsExchange.updateStatus((this.$h.convertJsonToFormData(params)))
        this.$emit("clicked", false)
        if (res.status === 200) {
          this.closeModal()
          this.$store.dispatch('pointsExchange/fetchPointsRequestedList')
          if (params.status === 1) {
            await Swal.fire({
              title: `<span style="font-weight: normal; line-height: 35px">Phê duyệt yêu cầu tích điểm <br> thành công!</span>`,
              timerProgressBar: true,
              icon: "success",
              timer: 3000,
              didOpen: () => {
                const titleElement = document.querySelector('.swal2-title');
                titleElement.style.lineHeight = ('1');
              }
            })
          } else {
            await Swal.fire({
              title: `<span style="font-weight: normal; line-height: 35px">Từ chối yêu cầu tích điểm <br> thành công!</span>`,
              timerProgressBar: true,
              icon: "success",
              timer: 3000,
              didOpen: () => {
                const titleElement = document.querySelector('.swal2-title');
                titleElement.style.lineHeight = ('1');
              }
            })
          }
          this.onClose();
        }
      }catch (error) {
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.size-height {
  padding-top: 14%;
}
</style>