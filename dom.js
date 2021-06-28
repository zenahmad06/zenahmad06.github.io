
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('form').addEventListener('submit',function (event){
		event.preventDefault();
		masukBuku();
		
	});
	document.getElementById('form1').addEventListener('submit',function (event){
		event.preventDefault();
		masukEdit();
	});

	document.getElementById('btnCari').addEventListener("click",cariNama);
	document.getElementById('tutup').addEventListener("click",tutupModal);

    if(adaStorage()){
        loadData();
    }
});
document.addEventListener("dataload",()=>{
	refreshData();
});