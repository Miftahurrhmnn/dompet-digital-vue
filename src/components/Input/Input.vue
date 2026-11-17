<script setup>
defineProps({
    modelValue: [String, Number]
})
</script>

<template>
    <div id="container_input">
        <label>
            Input Saldo: 
        </label>
        <input 
            id="input"
            type="number" 
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)"
            placeholder="Masukkan nominal..."
            class="custom-input"
        />
    </div>
</template>

<style scoped>
#container_input{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 1rem;
}

#input {
    width: 400px;
    height: 60px;
    background-color: gainsboro;
    border: none;
    border-radius: 10px;
    padding: 30px;
    margin-bottom: 2rem;
}
</style>