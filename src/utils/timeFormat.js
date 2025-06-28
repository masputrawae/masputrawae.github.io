export function timeFormat(dateInput, longDate) {
	const date = new Date(dateInput)
	const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
	const bulan = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	]

	const namaHari = hari[date.getDay()]
	const tanggal = date.getDate()
	const namaBulan = bulan[date.getMonth()]
	const tahun = date.getFullYear()

	let jam = date.getHours()
	const menit = date.getMinutes().toString().padStart(2, '0')

	const ampm = jam >= 12 ? 'PM' : 'AM'
	jam = jam % 12
	jam = jam ? jam : 12

	let setDate

	longDate
		? (setDate = `${namaHari}, ${tanggal} ${namaBulan} ${tahun}  - Jam ${jam}:${menit} ${ampm}`)
		: (setDate = `${tanggal} ${namaBulan} ${tahun}`)

	return setDate
}