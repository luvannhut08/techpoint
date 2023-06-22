<template>
  <div
      class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full cursor-pointer relative"
      @click="toggleTooltip(admin?.user?.id)">
    <img :class="{'border-transparent': !isShowTooltip,'border-primary': isShowTooltip}"
         :src="admin?.user?.avatarUrl"
         alt="Rounded avatar"
         class="w-12 h-12 rounded-full border-2 object-cover"
    >
    <Tippy
        tag="div"
        :content="admin?.user?.name"
        class="w-12 h-12 flex items-center justify-center absolute rounded-full text-white bg-transparent right-0 top-0"
    />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import CriteriaGroupsApi from "@/api/CriteriaGroupsApi";

export default {
  name: "AdminTagForPointsRequested",
  props: ["admin", "isShowTooltip", "toggleTooltip", "onClick", "groupId"],
  methods: {
    async onDelete() {
      const result = await Swal.fire({
        title: '<span>Xác nhận xóa người đánh giá này?</span>',
        text: "Hành động này không thể hoàn tác!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9a3412',
        cancelButtonColor: '#4b5563',
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy',
        reverseButtons: true
      });
      if (result.isConfirmed) {
        try {
          const res = await CriteriaGroupsApi.removeAdminsFromGroup(this.groupId, this.admin.id);
          if (res.status === 200) {
            this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList");
            await Swal.fire({
              title: `<span style="font-weight: normal">Bạn đã xoá</span> <b>${this.admin.name}</b> <span style="font-weight: normal">thành công!</span>`,
              timerProgressBar: true,
              timer: 1500,
              icon: "success",
              didOpen: () => {
                const titleElement = document.querySelector('.swal2-title');
                titleElement.style.lineHeight = '1';
              }
            });
          }
        } catch (e) {
          await Swal.fire({
            title: `Có lỗi xảy ra ở đây!!`,
            timer: 1500,
            timerProgressBar: true,
            icon: "error"
          });
        }
      }
    }
  }
}
</script>
