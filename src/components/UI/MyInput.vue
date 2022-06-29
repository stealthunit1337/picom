<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>


export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    margin-top: 15px;
    border: solid black;
    padding: 15px;
}
</style>