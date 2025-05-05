import re
import os
import glob
import shutil
from concurrent.futures import ThreadPoolExecutor

# Fungsi untuk mengonversi wikilinks menjadi format Markdown
def convert_wikilinks_to_md(text):
    pattern = r'(!?)\[\[([^\[\]]+?)(?:\|([^\[\]]+))?\]\]'

    def replacer(match):
        is_embed = match.group(1) == '!'
        title = match.group(2).strip()  # Judul tanpa spasi ekstra
        alias = match.group(3).strip() if match.group(3) else title  # Alias (jika ada)

        # Jika link bukan untuk gambar, format dengan .md di akhir
        if is_embed:
            return f'![{alias}]({title})'  # Gambar
        else:
            return f'[{alias}]({title}.md)'  # Teks link

    # Ganti semua wikilinks yang ditemukan dalam teks
    return re.sub(pattern, replacer, text)

# Fungsi untuk mengonversi satu file markdown
def convert_file(src, tgt):
    try:
        # Baca konten file markdown jika ada
        if src.endswith('.md'):
            with open(src, 'r', encoding='utf-8') as f:
                content = f.read()

            # Lakukan konversi wikilinks ke markdown
            converted = convert_wikilinks_to_md(content)

            # Pastikan direktori target ada
            os.makedirs(os.path.dirname(tgt), exist_ok=True)

            # Tulis file yang sudah dikonversi
            with open(tgt, 'w', encoding='utf-8') as f:
                f.write(converted)

        else:
            # Jika file bukan markdown, salin ke target tanpa perubahan
            os.makedirs(os.path.dirname(tgt), exist_ok=True)
            shutil.copy(src, tgt)  # Salin file selain .md

    except Exception as e:
        print(f"Error saat mengkonversi {src}: {e}")

# Fungsi untuk mengonversi semua file secara paralel
def convert_files_parallel(source_files, target_files):
    # Gunakan ThreadPoolExecutor untuk memproses file secara paralel
    with ThreadPoolExecutor(max_workers=8) as executor:
        # Menggunakan executor.map untuk memproses setiap file
        executor.map(convert_file, source_files, target_files)

if __name__ == "__main__":
    # Ambil semua file dari raw_content
    source_files = [f for f in glob.glob("raw_content/**/*", recursive=True) if os.path.isfile(f)]
    target_files = [os.path.join("content", os.path.relpath(f, "raw_content")) for f in source_files]

    # Proses file secara paralel
    convert_files_parallel(source_files, target_files)

    print("Konversi selesai.")
