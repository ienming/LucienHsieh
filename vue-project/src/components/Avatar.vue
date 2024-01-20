<script>
</script>

<template>
    <div class="dynamic-color p-1 px-2 lg:p-2 rounded-full flex gap-1 lg:gap-2 txt-slot-hover">
        <div class="avatar"></div>
        <div class="txt-slot-container">
            <span class="txt-slot">
                About Creator
            </span>
            <span class="txt-slot">
                關於作者
            </span>
        </div>
    </div>
</template>

<style scoped>
.avatar{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid white;
    background-image: url('../assets/avatar.jpeg');
    background-size: cover;
}
</style>