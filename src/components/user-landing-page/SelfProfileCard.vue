<template>
    <div>
        <div class="flex items-center rounded-lg">
            <div class="flex items-center gap-4 w-52 rounded-full">
                <button
                  class="bg-blue-950 rounded-full w-28 mt-2 mb-2 flex items-center justify-center gap-1 ml-5 transition-transform transform hover:scale-110"
                  @click="filterGifts"
                >
                    <svg class="w-10 h-10 fill-yellow-400 stroke-yellow-400 ml-1" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                    </svg>
                    <div class="text-xl font-bold text-white mr-2">{{ selfPointInfo.totalOfPoint }}</div>
                </button>
                <div class="text-base">
                    <b>Top {{ selfPointInfo.rank }}</b><br />
                </div>
            </div>
            <img
              :src="avatarUrl"
              alt=""
              class="w-16 aspect-square rounded-full object-cover ring-2 ring-[#354259] cursor-pointer"
              @click="toggleLogout"
            />
            <img
              v-if="isTop1 || isTop2 || isTop3"
              :src="getIconUrl(selfPointInfo.rank)"
              alt=""
              class="h-9 w-12 absolute -top-1 right-10"
            />
        </div>
        <img v-if="showLogout" @click="handleLogout" class="ml-32 w-36 cursor-pointer transition-transform transform hover:scale-110" src="/src/assets/images/logout.png" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "SelfProfileCard",
    data() {
        return {
            showLogout: false,
        };
    },
    computed: {
        ...mapGetters({
            selfPointInfo: "point/getSelfPointInfo",
            username: "auth/username",
            avatarUrl: "auth/avatarUrl",
        }),
        isTop1() {
            return this.selfPointInfo.rank === 1;
        },
        isTop2() {
            return this.selfPointInfo.rank === 2;
        },
        isTop3() {
            return this.selfPointInfo.rank === 3;
        },
    },
    methods: {
        filterGifts() {
            this.$emit("filter-gifts", this.selfPointInfo.totalOfPoint);
        },
        handleLogout() {
            const isLogout = this.logout();
            this.$router.push("/login");
        },
        toggleLogout() {
            this.showLogout = !this.showLogout;
        },
        ...mapActions("auth", ["logout"]),

        getIconUrl(rank) {
            if (rank === 1) {
                return "/src/assets/images/cup1.png";
            } else if (rank === 2) {
                return "/src/assets/images/cup2.png";
            } else if (rank === 3) {
                return "/src/assets/images/cup3.png";
            } else {
                return "";
            }
        },
    },
};
</script>

<style scoped></style>