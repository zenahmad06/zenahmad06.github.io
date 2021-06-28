const namaId="namaid";
function hapusData(a){
	const id=a.parentElement[namaId];
	hapusBuku(id);
	simpanData();
	a.parentElement.remove();
}
function perintahHapus(){
	const button=document.createElement('button');
	button.innerText="hapus";
	button.setAttribute("style","font-size:12px")
	button.addEventListener("click",function(event){
		hapusData(event.target.parentElement);
	});
			
	return button;
}
function pindahKeSebelumDibaca(a){
	const judulbaru=a.parentElement.querySelector('h4').innerText;
	const penulisbaru=a.parentElement.querySelector('p').innerText;
	const tahunbaru=a.parentElement.querySelector('p.thn').innerText;
	const box=tempatBuku(judulbaru,penulisbaru,tahunbaru,false);
	const id=a.parentElement[namaId];
	const objdata=cariData(id);
	objdata.isComplete=false;
	box[namaId]=objdata.id;
	simpanData();
	const blmdibaca=document.getElementById('belumdibaca');
	blmdibaca.append(box);
	a.parentElement.remove();
}
function pindahKeSesudahDibaca(a){
	const judulbaru=a.parentElement.querySelector('h4').innerText;
	const penulisbaru=a.parentElement.querySelector('p').innerText;
	const tahunbaru=a.parentElement.querySelector('p.thn').innerText;
	const box=tempatBuku(judulbaru,penulisbaru,tahunbaru,true);
	const id=a.parentElement[namaId];
	const objdata=cariData(id);
	objdata.isComplete=true;
	box[namaId]=objdata.id;
	simpanData();
	const sdhdibaca=document.getElementById('sudahDibaca');
	sdhdibaca.append(box);
	a.parentElement.remove();
}
function perintahPindahSdh(){
	const button=document.createElement('button');
	button.innerText="sudah dibaca";
	button.setAttribute("style","font-size:9px")
	button.addEventListener("click",function(event){
		pindahKeSesudahDibaca(event.target.parentElement);
	});
	return button;
}
function perintahPindahSblm(){
	const button=document.createElement('button');
	button.innerText="belum dibaca";
	button.setAttribute("style","font-size:9px")
	button.addEventListener("click",function(event){
		pindahKeSebelumDibaca(event.target.parentElement);
	});
	return button;
}
function editBukuKe(a){
	const id=a.parentElement[namaId];
	const data=cariData(id);
	document.getElementById("judul1").value=data.judul;
	document.getElementById("penulis1").value=data.penulis;
	document.getElementById("tahun1").value=data.tahun;
	document.getElementById("modal").classList.add(id);
}
function editBuku(){
	const button=document.createElement('button');
	button.innerText="edit";
	button.setAttribute("style","text-align:center")
	button.setAttribute("style","font-size:12px")
	button.addEventListener("click",function(event){
		document.getElementById("modal").setAttribute('style','display:block');
		document.getElementById("modalBox").setAttribute('style','display:block');
		editBukuKe(event.target.parentElement);
	});
	return button;
}
function tempatBuku(a,b,c,d){
	const judulBuku=document.createElement('h4');
	judulBuku.innerText=a;	
	const penulis=document.createElement('p');
	penulis.innerText=b;
	const tahun=document.createElement('p');
	tahun.classList.add('thn');
	tahun.innerText=c;
	const div=document.createElement('div');
	div.classList.add("tempatbuku");
	const div1=document.createElement('div');
	div1.classList.add("gambarbuku");
	div1.append(judulBuku);
	const buttonBox1=document.createElement('div');
	buttonBox1.classList.add("buttonBox1");
	const buttonBox=document.createElement('div');
	buttonBox.classList.add("buttonBox");
	buttonBox.setAttribute('style','top:93%');
	div.append(div1,penulis,tahun);
	if (d==false){
		buttonBox1.append(
			editBuku()
		);
		div.append(buttonBox1);
		buttonBox.append(
			perintahPindahSdh(),
			perintahHapus()
		);
		div.append(buttonBox);
				
	}else{
		buttonBox1.append(
			editBuku()
		);
		div.append(buttonBox1);
		buttonBox.append(
			perintahPindahSblm(),
			perintahHapus()
		);
		div.append(buttonBox);
	}
	return div;
}
function masukBuku(){
	const judul=document.getElementById('judul').value;
	const penulis=document.getElementById('penulis').value;
	const tahun=document.getElementById('tahun').value;
	const check=document.getElementById('check');
	if(check.checked==false){
		const box=tempatBuku(judul,penulis,tahun,false);
		const tmpBlm=document.getElementById('belumdibaca');
		tmpBlm.append(box);
		const keobj=keObject(judul,penulis,tahun,false);
		data.push(keobj);
		simpanData();
		box[namaId]=keobj.id;
	}else if(check.checked==true){
		const tmpSdh=document.getElementById('sudahDibaca');
		const box=tempatBuku(judul,penulis,tahun,true);
		tmpSdh.append(box);
		const keobj=keObject(judul,penulis,tahun,true);
		data.push(keobj);
		simpanData();
		box[namaId]=keobj.id;
	}
}
function masukEdit(){
	const judul=document.getElementById('judul1').value;
	const penulis=document.getElementById('penulis1').value;
	const tahun=document.getElementById('tahun1').value;
	const namad=document.getElementById("modal").className;
	const data=cariData(namad);
	data.judul=judul;
	data.penulis=penulis;
	data.tahun=tahun;
	simpanData()
	const bagiann=document.querySelectorAll('.tempatbuku');
	const bagian=Array.from(bagiann);
	for(let i=0;i<bagian.length;i++){
		if(bagian[i][namaId]==namad){
			bagian[i].querySelector('h4').innerText=judul;
			bagian[i].querySelector('p').innerText=penulis;
			bagian[i].querySelector('p.thn').innerText=tahun;
			break;
		}
	}
	console.log(namad);
	document.getElementById("modal").classList.remove(namad);
	document.getElementById("modal").setAttribute("style","display:none");
}
function tutupModal(){
	document.getElementById("modal").setAttribute("style","display:none");
}
function refreshData(){
	const belumdibaca=document.getElementById("belumdibaca");
	const sudahdibaca=document.getElementById("sudahDibaca");
	for(let i=0;i<data.length;i++){
		const box=tempatBuku(data[i].judul,data[i].penulis,data[i].tahun,data[i].isComplete);
		box[namaId]=data[i].id;
		if(data[i].isComplete==true){
			sudahdibaca.append(box);
		}else if(data[i].isComplete==false){
			belumdibaca.append(box);
		}
	}
}
function cariNama(){
	const nilaiCari=document.getElementById('cari').value;
	if (nilaiCari.length==0){
		const tampung=document.querySelectorAll(".tempatbuku");
		for(let i=0;i<tampung.length;i++){
			tampung[i].setAttribute('style','display:block');
		}		
	}else{
		const nama=nilaiCari.split(" ");
		const hasil=[];
		for(let i=0;i<data.length;i++){
			const tampungnama=[];
			const namabuku=data[i].judul.split(" ");
			for(let j=0;j<namabuku.length;j++){
				for(let k=0;k<nama.length;k++){
					if(nama[k]==namabuku[j]){
						tampungnama.push(nama[k]);
					}
				}
			}
			if(tampungnama.length>=nama.length){
				hasil.push(data[i]);
			}
		}
		if (hasil.length==0){
			alert("tidak ditemukan");
		}else{
			const listBuku=document.querySelectorAll('.tempatbuku');
			const bagian=Array.from(listBuku);
			const hasilCari=bagian.filter(n=>{
				for(let i=0;i<hasil.length;i++){
					if(n[namaId]==hasil[i].id){
						return true;
					}
				}
				return false;
			});
			for(let i=0;i<bagian.length;i++){
				if(hasilCari.includes(bagian[i])==false){
					bagian[i].setAttribute('style','display:none');
				}else if(hasilCari.includes(bagian[i])==true){
					bagian[i].setAttribute('style','display:block');
				}
			}
		}
	}
}
		
		
	
		