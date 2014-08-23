$(function () {

	var valorColectivo_Pasaje = 3.97;
	var valorTaxi_BajadaBandera = 10;
	var valorTaxi_Ficha = 1;

	$('.btn-mobility').click(function () {
		switch ($(this).attr('value'))
		{
			case 'cole':$('#txtAsk').html('¿Cuantos colectivos tomas por dia?')
						break;

			case 'taxi':$('#txtAsk').html('¿Cuantas cuadras viajas en taxi por dia?')
						break;

			default: break;
		}
	})

	$('#btnMakeCalculo').click(function () {
		var total = 0;
		var cantidad = $('#txtCantidad').val();
		console.log(cantidad);
		//Calculo colectivo
		if ($('.btn-mobility.active').attr('value') === 'cole')
		{
			total = (cantidad * 26) * valorColectivo_Pasaje;
		}
		//Calculo taxi
		else
		{
			var metros = cantidad * 100; 
			total = (valorTaxi_BajadaBandera + ((metros / 160.00) * valorTaxi_Ficha)) * 26;
		}
		$('#txtCalculo').html('Ahorro por mes: $'
			+total.toFixed(2));
		//var cantidad = $('txtCantidad').val();
	})

    $(".tooltip").tooltip();

})