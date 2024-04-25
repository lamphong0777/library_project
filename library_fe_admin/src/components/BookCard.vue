<template>
    <div class="p-1">
        <strong>Id:</strong>
        {{ book._id }}
    </div>
    <div class="p-1">
        <strong>Name:</strong>
        {{ book.title }}
    </div>
    <div class="p-1">
        <strong>Url:</strong>
        {{ book.imageUrl }}
    </div>
    <div class="p-1">
        <strong>Description:</strong>
        {{ book.description }}
    </div>
    <div class="p-1">
        <img :src="'/src/assets/images/'+book.imageUrl" alt="" width="50px">
    </div>
    <div class="p-1">
        <img :src="book.imageUrl" alt="">
    </div>
</template>

<script>
    export default {
        props: {
            book: { type: Object, required: true},
        },
    };
</script>