<template>
    <div class="h-fit relative shadow-md rounded-md p-4 bg-white">
        <button class="absolute top-0 right-1 text-gray-600 hover:text-red-600" @click="onDelete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>

        <button class="h-52 w-full mt-2" @click="openModal">
            <img :src="criterion.img" alt="" class="h-full w-full object-cover rounded-md">
        </button>
        <h3 class="text-lg font-medium h-[2rem] truncate text-center mt-8 cursor-pointer" @click="openModal">{{ criterion.name }}</h3>
        <div class="flex mt-2 mb-2">
            <div class="justify-center m-auto flex bg-blue-800 text-white font-bold py-2 px-5 rounded ">
                <svg class=" w-6 h-6 fill-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                     viewBox="0 0 24 24">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
                <span class="ml-2 text-lg cursor-pointer" @click="openModal">{{ criterion.point }}</span>
            </div>
        </div>
        <DetailCriterionModal :initial-criterion="Object.assign({},criterion)"
                              :is-open="isModalOpen"
                              :on-close="closeModal"
                                :action = "action"/>
    </div>

</template>

<script>
import Swal from 'sweetalert2'
import CriterionApi from "@/api/CriterionApi";
import DetailCriterionModal from "@/components/criteria-group-manament/DetailCriterionModal.vue";

export default {
    name: "CriterionCard",
    components: {DetailCriterionModal},
    props: ["criterion"],
    data() {
        return {
            isModalOpen: false,
            action: ""
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true
            this.action = "update"
        },
        closeModal() {
            this.isModalOpen = false
        },
        async onDelete() {
            const result = await Swal.fire({
                title: `<span style="font-weight: normal; font-size:25px ;line-height: 2">Xác nhận xoá tiêu chí</span> <b style="font-size:25px ">${this.criterion.name}?</b>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9a3412',
                cancelButtonColor: '#4b5563',
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            })
            if (result.isConfirmed) {
                try {
                    const res = await CriterionApi.deleteById(this.criterion.id)
                    if (res.status === 200) {
                        this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList")
                        await Swal.fire({
                                title: `<span style="font-weight: normal">Bạn đã xoá</span> <b>${this.criterion.name}</b> <span style="font-weight: normal">thành công!</span>`,
                                timerProgressBar: true,
                                timer: 1500,
                                icon: "success",
                                didOpen: () => {
                                    const titleElement = document.querySelector('.swal2-title');
                                    titleElement.style.lineHeight = '1';
                                }
                            }
                        )
                    }
                } catch (e) {
                    await Swal.fire(
                        {
                            title: `Có lỗi xảy ra!!`,
                            timerProgressBar: true,
                            icon: "error"
                        }
                    )
                }
            }
        }
    }
}
</script>

<style scoped>
.my-title-class {
    line-height: 1.5rem;
}
</style>
