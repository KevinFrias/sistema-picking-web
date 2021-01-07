function formValidate(formId, formMsg, numeroEmpleado) {
  var flag = 0;

  $(formId).find('[data-required]').each(function() {
    var actual = $(this).val();

    if (actual === "") {
      $(this).addClass('is-invalid');
      flag = 1;
    } else {
      if (actual == numeroEmpleado) {
        if (!Validate_NumeroEmpleado(actual)) flag = 2;
      }
    }
  });

  if (flag == 1) {
    $(formMsg).html('<div class="text-danger"><i class="fa fa-exclamation-circle"></i> Todos los campos son necesarios! </div>');
    return false;
  } else if (flag == 2) {
    $(formMsg).html('<div class="text-danger"><i class="fa fa-exclamation-circle"></i> Error con el número de empleado! </div>');
    $(inputNumeroEmpleado).addClass('is-invalid');
    return false;
  } else {
    $(formMsg).html('<div class="text-danger"><i class="fa fa-exclamation-circle"></i> </div>');
    $(formId).find('[data-required]').each(function() {
      $(this).removeClass('is-invalid');
      $(this).addClass('is-valid');
    });
    insert(formId);
  }
}

function insert(formID) {
  $.ajax({
    type: 'POST',
    url: '../php/operadores/operadoresInsert.php',
    data: $(formID).serialize(),
    success: function(data) {
      $('#registro').modal('hide');
      $('#exito').modal('show');
    }
  });
}


function Validate_Delete(formId, formMsg, numeroEmpleado) {
  var valido = Validate_NumeroEmpleado(numeroEmpleado);

  if (valido) {
    $(formMsg).html('<div class="text-danger"><i class="fa fa-exclamation-circle"></i> No existe el número de empleado! </div>');
    $(formId).find('[data-required]').each(function() {
      $(this).addClass('is-invalid');
    });
  } else {
    $(formId).find('[data-required]').each(function() {
      $(this).removeClass('is-invalid');
      $(this).addClass('is-valid');
    });
    $('#eliminar1').modal('hide');
    $('#eliminar2').modal('show');
    $('#SE').html('<b>' + numeroEmpleado + '</b>');
  }
  return false;
}

function DeleteOperador(numeroEmpleado) {
  var dataString = 'numero_empleado=' + numeroEmpleado;
  $.ajax({
    url: '../php/operadores/operadoresDelete.php',
    type: 'post',
    data: dataString,
    success: function(value) {
      $('#eliminar2').modal('hide');
      $('#exito').modal('show');
    }
  });
}


function Validate_Modify(formId, formMsg, numeroEmpleado) {
  var valido = Validate_NumeroEmpleado(numeroEmpleado);
  // of validao == false i can work with it
  if (valido) {
    $(formMsg).html('<div class="text-danger"><i class="fa fa-exclamation-circle"></i> No existe el número de empleado! </div>');
    $(formId).find('[data-required]').each(function() {
      $(this).addClass('is-invalid');
    });
  } else {
    $('#modificar1').modal('hide');
    fillForm(formId, formMsg, numeroEmpleado);
  }
  return false;
}

//Aqui lleno el formulario con los datos que ya tengo
function fillForm(formID, formMsg, numeroEmpleado) {
  var dataString = 'numero_empleado=' + numeroEmpleado;
  $.ajax({
    url: '../php/operadores/operadoresModify.php',
    type: 'post',
    data: dataString,
    dataType: "json",
    success: function(data) {
      $('#modificarNombre').val(data[0]);
      $('#modificarCorreo').val(data[1]);
    }
  });
  $('#modificar2').modal('show');
}

//Aqui tengo que hacer el update de el usuario en la base de datos
function Validate_Form2(formId, formMsg, numeroEmpleado) {
  var flag = 0;

  $(formId).find('[data-required]').each(function() {
    var actual = $(this).val();

    if (actual === "") {
      $(this).addClass('is-invalid');
      flag = 1;
    }
  });
  if (flag == 1) {
    $(formMsg).html('<div class="text-danger"><i class="fa fa-exclamation-circle"></i> Todos los campos son necesarios! </div>');
    return false;
  } else {
    var dataString = 'numero_empleado=' + numeroEmpleado + "&" + $(formId).serialize();
    $.ajax({
      url: '../php/operadores/operadoresUpdate.php',
      type: 'post',
      data: dataString,
      success: function(data) {
        $('#modificar2').modal('hide');
        $('#exito').modal('show');
      }
    });
  }
}

function resetForm(formActual) {
  $(formActual).find('[data-required]').each(function() {
    $(this).val('');
  });
}

function Validate_NumeroEmpleado(actual) {
  var valueReturn;

  if (actual.length == 6 && !isNaN(actual)) {
    var dataString = 'numero_empleado=' + actual;
    $.ajax({
      async: false,
      url: '../php/operadores/operadoresR.php',
      type: 'post',
      data: dataString,
      success: function(value) {
        valueReturn = (value) ? true : false;
      }
    });
  } else {
    valueReturn = false;
  }

  return valueReturn;
}