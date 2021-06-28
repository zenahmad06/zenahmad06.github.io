let data=[];
const key_name="simpan";
/**
  * Fungsi ini digunakan untuk memeriksa apakah localStorage didukung oleh browser atau tidak
  * 
  * 
  */
function adaStorage(){
	if(typeof(Storage)==undefined){
		alert("tdaik ada storage");
		return false;
	}
	return true;
}
/**
  * Fungsi ini digunakan untuk memasukan data ke Object
  * 
  * @returns object javascript
  */
function keObject(a,b,c,d){
	const obj={
		id:+new Date(),
		judul:a,
		penulis:b,
		tahun:c,
		isComplete:d
	};
	return obj;
}
/**
  * Fungsi ini digunakan untuk menyimpan data ke local storag
  * 
  */
function simpanData(){
	const pars=JSON.stringify(data);
	localStorage.setItem(key_name,pars);
}
/**
  * Fungsi ini digunakan untuk mmelakukan load data yang berasal dari local storage
  * 
  * 
  */
function loadData(){
	const ambildata=localStorage.getItem(key_name);
	const dataload=JSON.parse(ambildata);
	if(dataload!=null){
		data=dataload;
	}
	document.dispatchEvent(new Event("dataload"));
}
/**
  * Fungsi ini digunakan untuk menghapus data sesuai id yang diberikan
  * 
  */
function hapusBuku(a){
	for(let i=0;i<data.length;i++){
		if(a==data[i].id){
			data.splice(i,1);
		}
	}
}
/**
  * Fungsi ini digunakan untuk mencari data pada array data
  * 
  * return data sesuai id yang diberikan
  */
function cariData(a){
	for(let i=0;i<data.length;i++){
		if(a==data[i].id){
			return data[i];
		}
	}
	return null;
}

	
