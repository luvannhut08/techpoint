<template>
<Modal :show="isOpen" size="modal-xl" @hidden="closeModal"  >
  <ModalHeader>
    <h2 class="font-bold text-xl font-mono uppercase">Lịch sử đổi quà - tích điểm</h2>
  </ModalHeader>
  <a class="absolute right-2 top-2 mr-2" href="javascript:;" @click="closeModal">
    <XIcon class="w-8 h-8 text-slate-400"/>
  </a>
  <ModalBody class="background-modal-history rounded-br-md rounded-bl-md">
    <Preview>
      <TabGroup>
        <TabList class="nav-tabs font-special text-lg">
          <Tab class="w-full py-2 " tag="button">Lịch sử nhận quà</Tab>
          <Tab class="w-full py-2" tag="button">Lịch sử tích điểm</Tab>
        </TabList>
        <TabPanels class="border-l border-r border-b">
          <TabPanel class="leading-relaxed p-5">
            <GiftsHistory :list="list"/>
          </TabPanel>
          <TabPanel class="leading-relaxed p-5">
            <PointsHistory :list="list" :is-open="isOpen"/>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Preview>
  </ModalBody>
</Modal>
</template>

<script>
import PointsHistory from "@/components/gifts-points-history/PointsHistory.vue";
import GiftsHistory from "@/components/gifts-points-history/GiftsHistory.vue";

export default {
  name: "HistoryMain",
  components: {GiftsHistory, PointsHistory},
  props: ["isOpen", "onClose", "list"],
  methods: {
    closeModal(props) {
      this.onClose(props)
    }
  }
}
</script>

<style scoped>
.background-modal-history {
  background-image: url("https://i.pinimg.com/564x/88/24/b0/8824b01ed4ebd8b30156b0e05ca0b300.jpg");
}
</style>
<style>
.nav.nav-tabs .nav-item .nav-link.active {
  background-color: pink !important;
}
</style>