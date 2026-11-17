<script setup>
defineProps({
    modelValue: [String, Number]
})
defineEmits(['update:modelValue']) // Jangan lupa tambahkan emits agar tidak muncul warning di console
</script>

<template>
    <div id="container_input">
        <label for="input">
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
#container_input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 0.5rem; /* Disesuaikan agar jarak label dan input lebih rapi */
    width: 100%;
}

label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #334155;
}

#input {
    width: 100%; /* Membuat input otomatis melebar penuh mengikuti container card */
    max-width: 100%;
    height: 48px; /* Tinggi standar yang nyaman untuk disentuh di HP (touch-friendly) */
    background-color: #f1f5f9; /* Warna latar lebih modern */
    border: 1.5px solid #cbd5e1;
    border-radius: 12px;
    padding: 0 16px; /* Padding horizontal saja agar teks tidak terlalu ke bawah */
    font-size: 1rem;
    color: #1e293b;
    outline: none;
    transition: all 0.2s ease;
}

#input:focus {
    border-color: #004dbe;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(0, 77, 190, 0.15);
}
</style>