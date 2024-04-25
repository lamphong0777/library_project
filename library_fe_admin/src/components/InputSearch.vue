<template>
    <div class="input-group">
        <input type="text"
            class="form-control"
            placeholder="Nhập từ khóa...."
            :value="modelValue"
            @input="updateModelValue"
            @keyup.enter="submit"
        >
        <div class="input-group-append">
            <button
                class="btn btn-outline-primary"
                type="button"
                @click="submit"
            ><i class="fas fa-search"></i> Tìm</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: { type: String, default: "" },
        },
        emits: ["submit", "update:modelValue"],
        methods: {
            updateModelValue(e) {
                this.$emit("update:modelValue", e.target.value);
            },

            submit() {
                this.$emit("submit");
            },
        },
    }
</script>

<style>

</style>