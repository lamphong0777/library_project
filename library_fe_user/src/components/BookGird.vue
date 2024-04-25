<template>
    <div class="row mt-2">
        <div class="col-md-3 col-sm-6 mb-2 d-flex"
            v-for="(item, index) in books"
        >
            <div class="book-item p-3 text-center">
                <img :src="item.imageUrl" alt="" width="230px" height="300px">
                <router-link :to="{name: 'bookDetails', params: { id: item._id },}" class="router">
                <!-- <p>{{ item._id }}</p> -->
                <p class="mb-1 text-start book-title">{{ item.title }}</p>
                </router-link>
                <p class="text-start book-author">{{ item.author }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            books: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        emits: ["update:activeIndex"],
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },
        },
    }
</script>

<style>
.book-item {
    background-color: #FFFF;
}
.book-title {
    font-size: 18px;
    color: #006400;
    text-transform: uppercase;
    font-weight: bold;
}
.book-title:hover {
    color: #2E8B57;
    text-decoration: underline;
}
.book-author {
    text-transform: uppercase;
    font-size: 15px;
    font-style: italic;
}
.router {
    text-decoration: none !important;
}
</style>