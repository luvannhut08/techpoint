<template>
  <div class="relative">
    <div class="bg-white flex">
      <div class="flex scroll-item items-center gap-2 pl-2 scroll-view" v-dragscroll @mouseover="showScroll"  @mouseout="hideScroll" ref="scrollContainer"
           :class="{'overflow-x-scroll width-scroll': newArraySearch.length > 3}">
        <div class="text-white select-point" v-for="(item,index) in newArraySearch" :key="item">
          <div class="bg-blue-400 pl-2 py-1 text-center flex items-center rounded-md gap-2 text-size">
            <span>{{ item }}</span>
            <XIcon @click="clearNumberFilterInput(index)" class="h-4 flex items-center justify-center"/>
          </div>
        </div>
      </div>
      <input type="number" ref="inputSearchPoint" v-model="dataSearch" class="w-full input-no-spinner pr-2" :placeholder="newArraySearch.length > 0 ? '' : 'Tìm kiếm điểm' "
             @keyup.enter="performAction">
      <div v-if="newArraySearch.length <= 0" class="icon-search w-1/3" @click="performAction"></div>
      <div v-else class="flex items-center justify-center pr-2" @click="clearAllNumberFilter"><XIcon class=""/></div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {dragscroll} from "vue-dragscroll";

export default {
  name: "FilterByScore",
  props: ["numbers"],
  directives: {
    dragscroll
  },
  data() {
    return {
      filteredItems: [],
      newArraySearch: [],
      dataSearch: "",
      flagSearchPoint: -1,
      flagPoint: -1
    }
  },
  created() {
    this.updateSearchByPoint("")
  },
  watch: {
    getPointSelected(newValue) {
      this.updateSearchByPoint(newValue)
      if (newValue != null) {
        this.$refs.inputSearchPoint.focus()
        if (typeof newValue == "object") {
          const foundElement = this.newArraySearch.findIndex(element => element === newValue.point)
          if (foundElement !== -1) {
            this.newArraySearch.splice(foundElement, 1)
          }else {
            this.newArraySearch.push(newValue.point)
          }
        } else {
          const found = this.newArraySearch.findIndex(element => element === newValue)
          if (found == -1) {
            this.newArraySearch.push(newValue)
          } else {
            this.newArraySearch.splice(found, 1)
          }
        }
        this.$nextTick(() => {
          const scrollContainer = this.$refs.scrollContainer;
          scrollContainer.scrollLeft = scrollContainer.scrollWidth
        });
        this.$emit("searchByPoint", this.newArraySearch)
      }
    },
    getDeleteSearchBlock(index) {
      this.$refs.inputSearchPoint.focus()
      if(typeof index == "object") {
        this.newArraySearch = this.newArraySearch.filter(item => item !== index.point)
      }else {
        this.newArraySearch = this.newArraySearch.filter(item => item !== index)
      }
    }
  },
  computed: {
    ...mapGetters('filterPoint', ['getPointSelected', 'getDeleteSearchBlock']),
    points() {
      return Array.from(new Set(this.numbers))
    }
  },
  methods: {
    ...mapActions('filterPoint', ['updatePointSelected', 'updateSearchByPoint', 'updateDeletePoint']),
    clearNumberFilterInput(index) {
      this.$refs.inputSearchPoint.focus()
      const deletePoint = this.newArraySearch.splice(index, 1)
      this.updateDeletePoint(deletePoint)
    },
    clearAllNumberFilter() {
      this.$refs.inputSearchPoint.focus()
      if(this.newArraySearch.length > 0){
        this.updateDeletePoint(this.newArraySearch);
        this.newArraySearch = []
      }
      else {
        return
      }
    },
    performAction() {
      if(this.dataSearch == "") {
        return
      }
      const foundElement = this.newArraySearch.findIndex(element => element === this.dataSearch)
      if (foundElement == -1) {
        this.newArraySearch.push(this.dataSearch)
      }
      this.$emit("searchByPoint", this.newArraySearch)
      if (this.flagPoint == this.dataSearch) {
        const objPoint = {
          point: this.dataSearch
        };
        this.updateSearchByPoint(objPoint)
      }else {
        this.updateSearchByPoint(this.dataSearch)
      }
      this.flagPoint = this.dataSearch
      this.dataSearch = ""
      this.$nextTick(() => {
        const scrollContainer = this.$refs.scrollContainer
        scrollContainer.scrollLeft = scrollContainer.scrollWidth
      })
    },
    showScroll() {
      this.$refs.scrollContainer.classList.add('scroll-height')
    },
    hideScroll() {
      this.$refs.scrollContainer.classList.remove('scroll-height')
    }
  }
}
</script>
<style>
.icon-search {
    background: url("src/assets/images/icons8-search-32.png") no-repeat right;
    width: 30px;
    margin-right:10px
}

.select-point {
    top: 0;
    left: 0;
}

.input-no-spinner::-webkit-inner-spin-button,
.input-no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
}

.input-no-spinner {
    -moz-appearance: textfield;
    background-size: 30px;
    border: none;
    outline: none;
    padding: 10px;
}

.input-no-spinner:focus {
    outline: none !important;
    outline: 0 !important;
    outline: transparent !important;
    box-shadow: none !important;
    border-color: transparent !important;
}

.scroll-item {
    max-width: 210px;
}

.width-scroll {
  min-width: 210px;
}

.text-size {
  font-size: 12px;
  border: 1px solid #6392cc;
}

.scroll-item::-webkit-scrollbar {
  width: 10px;
  height: 0px;

}

.scroll-height::-webkit-scrollbar {
  height: 8px;
}

.scroll-item::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.scroll-item::-webkit-scrollbar-thumb {
  background-color: #888;
}

.scroll-item::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
.text-size {
  font-size: 12px;
  border: 1px solid #6392cc;
}
</style>
