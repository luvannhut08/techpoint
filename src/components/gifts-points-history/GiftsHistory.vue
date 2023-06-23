<template>
  <div v-if="giftsHistoryList.length <= 0" class="font-special text-lg text-center py-10">
    Chưa có lịch sử đổi quà nào!
  </div>
  <div v-else class="scroll-view font-special">
    <table class="table table-bordered rounded-br-md rounded-bl-md table-hover">
      <thead class="sticky -top-px bg-sky-200">
      <tr>
        <th></th>
        <th>Tên quà</th>
        <th>Số lượng quà</th>
        <th>Điểm</th>
        <th>Ngày đổi</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in giftsHistoryList">
        <td>{{ index + 1 }}</td>
        <td>{{ item.giftName }}</td>
        <td>{{ item.amount }}</td>
        <td>{{ item.pointUsed }}</td>
        <td>{{ item.createAt.slice(0, 10) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import GiftsExchange from "@/api/GiftsExchange";

export default {
  name: "GiftsHistory",
  data() {
    return {
      giftsHistoryList: {},
      userId: ""
    }
  },
  props: ["list"],
  methods: {
    async init() {
      const res = await GiftsExchange.getHistoryGiftsDetailUser(this.userId)
      this.giftsHistoryList = res.data.data
    }
  },
  watch: {
    list(value) {
      this.userId = value
      this.init()
    }
  }
}
</script>

<style scoped>
.scroll-view {
    max-height: 400px;
    overflow-y: scroll;
}
</style>