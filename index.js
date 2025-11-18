const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak

  //Output:
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  // 1. Minta input teks to-do dari user menggunakan `prompt()`

  //Output:
  const newTodoText = prompt("Masukkan text todo baru:");

  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  if (!newTodoText || newTodoText.trim() === "") {
    console.log("Penambahan todo dibatalkan. Teks tidak boleh kosong.");
    return;
  }

  // 3. Buat objek to-do baru dengan properti: id, text, dan isCompleted
  const newTodo = {
    id: generateUniqueId(),
    text: newTodoText.trim(),
    isCompleted: false,
  };

  // 4. Tambahkan objek to-do ini ke array `todos`
  todos.push(newTodo);

  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  console.log(`Todo berhasil ditambahkan: "${newTodo.text}"`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai

  //Output:
  listTodos();
  const input = prompt(
    "Masukkan nomor to-do yang ingin ditandai sebagai selesai (atau tekan Cancel untuk batal):"
  );
  if (input === null) {
    console.log("Pembatalan.");
    return;
  }

  const todoNumber = parseInt(input); // Dapatkan nomor to-do yang dimasukkan user (1-based)

  // Validasi input: Pastikan itu angka valid dan dalam rentang yang benar
  if (isNaN(todoNumber) || todoNumber < 1 || todoNumber > todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const index = todoNumber - 1; // Konversi ke index array (0-based)

  if (todos[index].isCompleted) {
    console.log(`Todo "${todos[index].text}" sudah selesai.`);
  } else {
    todos[index].isCompleted = true;
    console.log(
      `Todo "${todos[index].text}" berhasil ditandai sebagai selesai.`
    );
  }
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus

  //Output:

  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  listTodos();

  // Jika daftar to-do kosong, langsung beritahu dan keluar
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }

  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  const input = prompt(
    "Masukkan nomor to-do yang ingin dihapus (atau tekan Cancel untuk batal):"
  );

  // Jika user membatalkan (menekan Cancel)
  if (input === null) {
    console.log("Operation cancelled.");
    return;
  }

  // Trim input untuk menghilangkan spasi di awal/akhir
  const trimmedInput = input.trim();

  // Cek jika input kosong setelah di-trim
  if (trimmedInput === "") {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  // Konversi ke integer dan sesuaikan dengan 0-based index
  const index = parseInt(trimmedInput) - 1;

  // 3. Validasi input: Pastikan nomor adalah angka
  if (isNaN(index)) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  // Validasi input: Pastikan nomor dalam rentang yang valid
  if (index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  // 4. Hapus to-do yang dipilih dari array `todos`
  const deletedTodo = todos.splice(index, 1)[0];

  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  console.log(`To-do "${deletedTodo.text}" has been deleted.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar

  //Output:
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  } else {
    console.log("--- YOUR TO-DO LIST ---");
    todos.forEach((todo, index) => {
      const status = todo.isCompleted ? "[COMPLETED]" : "[ACTIVE]";
      console.log(`${index + 1}. ${status} | ${todo.text}`);
    });
  }
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid

    //Output:
    console.log("=== APLIKASI TO-DO LIST ===");
    console.log("1. Tambah To-Do");
    console.log("2. Tampilkan Daftar To-Do");
    console.log("3. Tandai To-Do Selesai");
    console.log("4. Hapus To-Do");
    console.log("5. Keluar");
    console.log("==========================");

    const choice = prompt("Pilih menu (1-5):");
    if (choice === null) {
      console.log("Keluar dari aplikasi.");
      break;
    }

    switch (choice) {
      case "1":
        addTodo();
        break;
      case "2":
        listTodos();
        break;
      case "3":
        markTodoCompleted();
        break;
      case "4":
        deleteTodo();
        break;
      case "5":
        console.log("Keluar dari aplikasi.");
        return;
      default:
        console.log("Pilihan tidak valid. Silakan coba lagi.");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
