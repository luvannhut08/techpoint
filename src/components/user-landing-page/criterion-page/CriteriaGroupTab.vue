<template>
    <div class="bg-gray-200 flex items-center justify-between p-4 mb-6 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 h-[6vh] cursor-pointer"
         @click="onClick">
        <Tippy class="truncate mt-1 ml-3 text-lg font-bold" :content="group.name" placement="bottom">
            {{ group.name }}
        </Tippy>
    </div>
</template>
<script>

export default {
    name: "CriteriaGroupTab",
    props: ["group", "onClick"]
}
</script>

