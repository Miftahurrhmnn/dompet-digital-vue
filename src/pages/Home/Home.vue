<script setup>
import Input from '@/components/Input/Input.vue';
import { ref } from 'vue';

const saldo = ref(0);
const showTambahInput = ref(false);
const showTransferInput = ref(false);

const inputTambah = ref('');
const inputTransfer = ref('');

const menus = [
    { name: "Tambah Saldo" }, 
    { name: "Transfer" },
    { name: "Batal" }
];

const handleMenu = (name) => {
    if (name === "Tambah Saldo") {
        showTambahInput.value = !showTambahInput.value;
    } else if (name === "Transfer") {
        showTransferInput.value = !showTransferInput.value;
        showTambahInput.value = false;
    } else if (name === "Batal") {
        showTambahInput.value = false;
        showTransferInput.value = false;
    }
}

const tambahSaldo = () => {
    const jumlah = Number(inputTambah.value);

    if (isNaN(jumlah) || jumlah <= 0) {
        alert("Masukkan nominal saldo yang valid!");
        return;
    }

    saldo.value += jumlah;
    inputTambah.value = '';
    showTambahInput.value = false;
}

const transferSaldo = () => {
    const jumlah = Number(inputTransfer.value);

    if (isNaN(jumlah) || jumlah <= 0) {
        alert("Masukkan nominal transfer yang valid!");
        return;
    }

    // Cek apakah saldo mencukupi untuk ditransfer
    if (jumlah > saldo.value) {
        alert("Saldo Anda tidak mencukupi untuk melakukan transfer ini!");
        return;
    }

    // Kurangi saldo
    saldo.value -= jumlah;
    
    alert(`Berhasil mentransfer Rp. ${jumlah.toLocaleString('id-ID')},-`);
    inputTransfer.value = '';
}
</script>

<template>
    <main id="container">
        <div class="wallet-wrapper">
            <div class="card">
                <div class="card-header">
                    <div class="bca-logo-container">
                        <span class="bca-text">BCA</span>
                        <span class="bca-sub">Platinum Debit</span>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="details">
                        <div class="title-row">
                            <span class="title">Your Balance</span>
                            <span class="chip-icon"></span>
                        </div>
                        <span class="amount">Rp. {{ saldo.toLocaleString('id-ID') }},-</span>
                    </div>

                    <div class="card-network">
                        <div class="circle red"></div>
                        <div class="circle orange"></div>
                    </div>
                </div>
            </div>

            <!-- Form Hidden Input: Tambah Saldo -->
            <div v-if="showTambahInput" class="input-container">
                <Input 
                    v-model="inputTambah"
                    placeholder="Masukkan nominal saldo..."
                />
                <button class="submit-btn" @click="tambahSaldo">Konfirmasi Tambah</button>
            </div>

            <!-- Form Hidden Input: Transfer Saldo -->
            <div v-if="showTransferInput" class="input-container">
                <Input v-model="inputTransfer" placeholder="Nominal yang akan ditransfer..." />
                <button class="submit-btn transfer" @click="transferSaldo">Konfirmasi Transfer</button>
            </div>

            <!-- Bagian Menu -->
            <div id="menus">
                <div v-for="(item, index) in menus" :key="index" class="menu-item">
                    <button class="menu-btn" @click="handleMenu(item.name)">
                        {{ item.name }}
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
#container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #f8fafc;
    font-family: 'Inter', 'Segoe UI', sans-serif;
}

.wallet-wrapper {
    width: 100%;
    max-width: 420px;
    padding: 20px;
}

/* Styling Kartu */
.card {
    width: 100%;
    height: 220px;
    background: linear-gradient(135deg, #004dbe 0%, #0070f3 50%, #003399 100%);
    border-radius: 18px;
    box-shadow: 0 12px 30px -8px rgba(0, 77, 190, 0.4);
    position: relative;
    overflow: hidden;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px 26px;
    color: white;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
}

/* Header Kartu (Logo BCA) */
.card-header {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.bca-logo-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.bca-text {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: 1px;
    font-style: italic;
    line-height: 1;
}

.bca-sub {
    font-size: 0.65rem;
    opacity: 0.85;
    letter-spacing: 0.5px;
    margin-top: 2px;
}

/* Footer Kartu (Saldo & Network Logo) */
.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.card .details {
    display: flex;
    flex-direction: column;
}

.title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 2px;
}

.card .title {
    font-size: 0.85rem;
    font-weight: 400;
    opacity: 0.85;
}

/* Ikon kecil mirip simbol kecil di sebelah tulisan Your Balance */
.chip-icon {
    width: 10px;
    height: 10px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    display: inline-block;
}

.card .amount {
    font-size: 1.55rem;
    font-weight: 700;
    letter-spacing: -0.3px;
}

/* Logo Jaringan Kartu (Mastercard Style) */
.card-network {
    display: flex;
    position: relative;
    width: 44px;
    height: 28px;
}

.circle {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    position: absolute;
    opacity: 0.9;
}

.circle.red {
    background-color: #eb001b;
    left: 0;
}

.circle.orange {
    background-color: #eaac4e;
    right: 0;
}

/* Bagian Input & Tombol */
.input-container {
    margin-bottom: 20px;
}

.submit-btn {
    width: 100%;
    padding: 12px;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 10px;
}

.submit-btn:hover {
    background-color: #059669;
}

/* Bagian Menu Bawah */
#menus {
    display: flex;
    gap: 12px;
    width: 100%;
}

.menu-item {
    flex: 1;
}

.menu-btn {
    width: 100%;
    padding: 14px 0px;
    background-color: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #334155;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    transition: all 0.2s ease;
}

.menu-btn:hover {
    background-color: #004dbe;
    border-color: #004dbe;
    color: #ffffff;
    box-shadow: 0 6px 15px -3px rgba(0, 77, 190, 0.25);
    transform: translateY(-2px);
}

.menu-btn:active {
    transform: translateY(0);
}
</style>