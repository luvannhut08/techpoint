<template>
  <div v-if="pointsHistoryList.length <= 0" class="font-special text-lg text-center py-10">
    Chưa có lịch sử tích điểm nào!
  </div>
    <div v-else class="scroll-view font-special">
      <table class="table table-bordered table-hover">
        <thead class="sticky top-0 bg-sky-200">
        <tr>
          <th></th>
          <th>Tên tiêu chí</th>
          <th>Điểm</th>
          <th>Người duyệt</th>
          <th>Ngày đổi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in pointsHistoryList">
          <td>{{ index + 1 }}</td>
          <td>{{ item.criterionName }}</td>
          <td>{{ item.point }}</td>
          <td class="flex items-center image-history">
              <Tippy class="truncate mt-1 ml-3 text-lg font-bold" :content="item?.approveByUser?.name" placement="bottom">
                <img :src="item?.approveByUser?.avatarUrl"
                     alt="Rounded avatar"
                     class="w-11 h-11 rounded-full border-2 object-cover"
                >
              </Tippy>
          </td>
          <td>{{ item.createAt.slice(0, 10) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import PointsExchange from "@/api/PointsExchange";

export default {
  name: "PointsHistory",
  data() {
    return {
      pointsHistoryList: {},
      userId: "",
    }
  },
  props: ["list", "isOpen"],
  methods: {
    async init() {
      const res = await PointsExchange.getHistoryPointsDetailUser(this.userId)
      this.pointsHistoryList = res.data.data
    }
  },
  watch: {
    list(value) {
      this.userId = value
      this.init()
    },
    isOpen() {
      this.pointsHistoryList = {}
    }
  }
}
</script>

<style scoped>
.scroll-view {
  max-height: 400px;
  overflow-y: scroll;
}
.image-history {
  padding: 0 0.75rem 0 0.75rem !important;
}
</style>
