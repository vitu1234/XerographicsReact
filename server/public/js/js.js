//allow numbers only
function isNumberKey(evt){
 var charCode = (evt.which) ? evt.which : event.keyCode
 if (charCode > 31 && (charCode < 48 || charCode > 57))
  return false;

return true;
}

//check if cookie exists
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  }
  else
  {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }

      // Create our number formatter.
      var formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'MWK',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

// ********************************************************************
// ------------------------------------------------------------------



// USERS REQUESTS
//get all users
function fetchAllUsers() {
  $.ajax({
    url: '/fetchAllUsers',
    method: 'get',
    success: function(response) {
      $("#show_all_users").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });
    },
    error: function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  });
}

//delete user
function deleteUser(id, fullname){
 $(document).on('click', '#delBtn'+id, function(e) {
  e.preventDefault();
  let csrf = $('meta[name="csrf-token"]').attr('content');
  Swal.fire({
    title: 'Are you sure to delete '+fullname+'?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/deleteUser/'+id,
        type: 'DELETE',
        data: {
          id: id,
          _token: csrf
        },
        success: function(response) {
         console.log(response);

         if (response.status == 200) {
          Swal.fire(
            'Deleted!',
            'User deleted Successfully!',
            'success'
            )
          fetchAllUsers();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg = '';
        $("#btn_add").text('Save');
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
    });
    }
  })
});
}



$(function() {

    // add new user ajax request
    $("#addUserForm").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#addUserForm").validate();//validate the form
      var role = $("#urole").val();
      var ubranch = $("#ubranch").val();
      if (role === '' || role === null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'select user role!',
        });
        return false;
      }
      if (ubranch === '' || ubranch === null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'select branch!',
        })
        return false;
      }

      $("#btn_add").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/saveUser",
      type: "POST",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_add").text('Save');
          $("#addUserForm")[0].reset();
          $("#adduserModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Added!',
              'User saved Successfully!',
              'success'
              )
            fetchAllUsers();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });

    $("#editFormBody").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#editFormBody").validate();//validate the form

      $("#btn_editx").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/updateUser",
      type: "PUT",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_editx").text('Save');
          $("#editFormBody")[0].reset();
          $("#edituserModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Updated!',
              'User updated Successfully!',
              'success'
              )
            fetchAllUsers();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });


  });

// edit unit ajax request
$(document).on('click', '.editIcon', function(e) {
  e.preventDefault();
  let id = $(this).attr('id');
  let csrf = $('meta[name="csrf-token"]').attr('content');
  $.ajax({
    url: '/editUser',
    method: 'get',
    data: {
      id: id,
      _token: csrf
    },
    success: function(response) {
      $("#edituserModal").modal('toggle')
      $("#editFormBody").html(response);
      $("#_tokend").val(csrf)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    }
  });
});

//========================================================
// CUSTOMERS REQUESTS
//get all customers
function fetchAllCustomers() {
  $.ajax({
    url: '/fetchAllCustomers',
    method: 'get',
    success: function(response) {
      $("#show_all_customers").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });
    },
    error: function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  });
}

//delete customer
function deleteCustomer(id, fullname){
 $(document).on('click', '#delBtn'+id, function(e) {
  e.preventDefault();
  let csrf = $('meta[name="csrf-token"]').attr('content');
  Swal.fire({
    title: 'Are you sure to delete '+fullname+'?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/deleteCustomer/'+id,
        type: 'DELETE',
        data: {
          id: id,
          _token: csrf
        },
        success: function(response) {
         console.log(response);

         if (response.status == 200) {
          Swal.fire(
            'Deleted!',
            'Customer deleted Successfully!',
            'success'
            )
          fetchAllCustomers();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg = '';
        $("#btn_add").text('Save');
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
    });
    }
  })
});
}



$(function() {

    // add new customer ajax request
    $("#addCustomerForm").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#addCustomerForm").validate();//validate the form

      $("#btn_add").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/saveCustomer",
      type: "POST",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_add").text('Save');
          $("#addCustomerForm")[0].reset();
          $("#addcustomerModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Added!',
              'Customer saved Successfully!',
              'success'
              )
            var pathname = window.location.pathname;
            if (pathname == '/customers') {
              fetchAllCustomers();
            }else{
             setTimeout(function(){ location.reload();  }, 1500);

           }

         }else if(response.status == 201){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message,
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }

      }).fail(function(jqXHR, exception){
        var msg = '';
        $("#btn_add").text('Save');
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      });


      e.preventDefault();
      e.stopImmediatePropagation();
    });

    $("#editCustomerFormBody").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#editCustomerFormBody").validate();//validate the form

      $("#btn_editx").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/updateCustomer",
      type: "PUT",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_editx").text('Save');
          $("#editCustomerFormBody")[0].reset();
          $("#editcustomerModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Updated!',
              'Customer updated Successfully!',
              'success'
              )
            fetchAllCustomers();
          }else if(response.status == 201){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.message,
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });


  });

// edit customer ajax request
$(document).on('click', '.editCustomerIcon', function(e) {
  e.preventDefault();
  let id = $(this).attr('id');
  let csrf = $('meta[name="csrf-token"]').attr('content');
  $.ajax({
    url: '/editCustomer',
    method: 'get',
    data: {
      id: id,
      _token: csrf
    },
    success: function(response) {
      $("#editcustomerModal").modal('toggle')
      $("#editCustomerFormBody").html(response);
      $("#_tokend").val(csrf)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    }
  });
});



// =======================================================================

// UNITS REQUESTS
//get all units
function fetchAllUnits() {
  $.ajax({
    url: '/fetchAllUnits',
    method: 'get',
    success: function(response) {
      $("#show_all_units").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });
    },
    error: function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  });
}

//delete Unit
function deleteUnit(id, unit_name){
 $(document).on('click', '#delBtn'+id, function(e) {
  e.preventDefault();
  let csrf = $('meta[name="csrf-token"]').attr('content');
  Swal.fire({
    title: 'Are you sure to delete '+unit_name+'?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/deleteUnit/'+id,
        type: 'DELETE',
        data: {
          id: id,
          _token: csrf
        },
        success: function(response) {
         console.log(response);

         if (response.status == 200) {
          Swal.fire(
            'Deleted!',
            'Unit deleted Successfully!',
            'success'
            )
          fetchAllUnits();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg = '';
        $("#btn_add").text('Save');
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
    });
    }
  })
});
}



$(function() {

    // add new unit ajax request
    $("#addUnitForm").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#addUnitForm").validate();//validate the form


      $("#btn_add").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/saveUnit",
      type: "POST",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_add").text('Save');
          $("#addUnitForm")[0].reset();
          $("#addunitModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Added!',
              'Unit saved Successfully!',
              'success'
              )
            fetchAllUnits();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });

    $("#editUnitFormBody").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#editUnitFormBody").validate();//validate the form

      $("#btn_editx").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/updateUnit",
      type: "PUT",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_editx").text('Save');
          $("#editUnitFormBody")[0].reset();
          $("#editunitModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Updated!',
              'Unit updated Successfully!',
              'success'
              )
            fetchAllUnits();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });


  });

// edit unit ajax request
$(document).on('click', '.editIconUnit', function(e) {
  e.preventDefault();
  let id = $(this).attr('id');
  let csrf = $('meta[name="csrf-token"]').attr('content');
  $.ajax({
    url: '/editUnit',
    method: 'get',
    data: {
      id: id,
      _token: csrf
    },
    success: function(response) {
      $("#editunitModal").modal('toggle')
      $("#editUnitFormBody").html(response);
      $("#_tokend").val(csrf)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    }
  });
});

// =======================================================================

// CATEGORIES REQUESTS
//get all categories
function fetchAllCategories() {
  $.ajax({
    url: '/fetchAllCategories',
    method: 'get',
    success: function(response) {
      $("#show_all_categories").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });
    },
    error: function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  });
}

//delete Category
function deleteCategory(id, category_name){
 $(document).on('click', '#delBtn'+id, function(e) {
  e.preventDefault();
  let csrf = $('meta[name="csrf-token"]').attr('content');
  Swal.fire({
    title: 'Are you sure to delete '+category_name+'?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/deleteCategory/'+id,
        type: 'DELETE',
        data: {
          id: id,
          _token: csrf
        },
        success: function(response) {
         console.log(response);

         if (response.status == 200) {
          Swal.fire(
            'Deleted!',
            'Category deleted Successfully!',
            'success'
            )
          fetchAllCategories();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg = '';
        $("#btn_add").text('Save');
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
    });
    }
  })
});
}



$(function() {

    // add new category ajax request
    $("#addCategoryForm").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#addCategoryForm").validate();//validate the form


      $("#btn_add").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/saveCategory",
      type: "POST",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_add").text('Save');
          $("#addCategoryForm")[0].reset();
          $("#addcategoryModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Added!',
              'Category saved Successfully!',
              'success'
              )
            fetchAllCategories();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });

//update category request
$("#editCategoryFormBody").on('submit',function(e){
 var form_data = $(this).serialize();

      $("#editCategoryFormBody").validate();//validate the form

      $("#btn_editx").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/updateCategory",
      type: "PUT",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_editx").text('Save');
          $("#editCategoryFormBody")[0].reset();
          $("#editcategoryModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Updated!',
              'Category updated Successfully!',
              'success'
              )
            fetchAllCategories();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });


});

// show category form ajax request
$(document).on('click', '.editIconCategory', function(e) {
  e.preventDefault();
  let id = $(this).attr('id');
  let csrf = $('meta[name="csrf-token"]').attr('content');
  $.ajax({
    url: '/editCategory',
    method: 'get',
    data: {
      id: id,
      _token: csrf
    },
    success: function(response) {
      $("#editcategoryModal").modal('toggle')
      $("#editCategoryFormBody").html(response);
      $("#_tokend").val(csrf)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    }
  });
});

// =======================================================================

// BRANCHES REQUESTS
//get all branches
function fetchAllBranches() {
  $.ajax({
    url: '/fetchAllBranches',
    method: 'get',
    success: function(response) {
      $("#show_all_branches").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });
    },
    error: function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  });
}

//delete branch
function deleteBranch(id, branch_name){
 $(document).on('click', '#delBtn'+id, function(e) {
  e.preventDefault();
  let csrf = $('meta[name="csrf-token"]').attr('content');
  Swal.fire({
    title: 'Are you sure to delete '+branch_name+'?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/deleteBranch/'+id,
        type: 'DELETE',
        data: {
          id: id,
          _token: csrf
        },
        success: function(response) {
         console.log(response);

         if (response.status == 200) {
          Swal.fire(
            'Deleted!',
            'Branch deleted Successfully!',
            'success'
            )
          fetchAllBranches();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg = '';
        $("#btn_add").text('Save');
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
    });
    }
  })
});
}



$(function() {

    // add new branch ajax request
    $("#addBranchForm").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#addBranchForm").validate();//validate the form


      $("#btn_add").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/saveBranch",
      type: "POST",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_add").text('Save');
          $("#addBranchForm")[0].reset();
          $("#addbranchModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Added!',
              'Branch saved Successfully!',
              'success'
              )
            fetchAllBranches();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });

//update branch request
$("#editBranchFormBody").on('submit',function(e){
 var form_data = $(this).serialize();

      $("#editBranchFormBody").validate();//validate the form

      $("#btn_editx").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/updateBranch",
      type: "PUT",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_editx").text('Save');
          $("#editBranchFormBody")[0].reset();
          $("#editbranchModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Updated!',
              'Branch updated Successfully!',
              'success'
              )
            fetchAllBranches();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });


});

// show branch form ajax request
$(document).on('click', '.editIconBranch', function(e) {
  e.preventDefault();
  let id = $(this).attr('id');
  let csrf = $('meta[name="csrf-token"]').attr('content');
  $.ajax({
    url: '/editBranch',
    method: 'get',
    data: {
      id: id,
      _token: csrf
    },
    success: function(response) {
      $("#editbranchModal").modal('toggle')
      $("#editBranchFormBody").html(response);
      $("#_tokend").val(csrf)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    }
  });
});


// =======================================================================

// PRODUCTS REQUESTS
//get all products
function fetchAllProducts() {
  $.ajax({
    url: '/fetchAllProducts',
    method: 'get',
    success: function(response) {
      $("#show_all_products").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });
    },
    error: function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  });
}

//delete product
function deleteProduct(id, product_name){
 $(document).on('click', '#delBtn'+id, function(e) {
  e.preventDefault();
  let csrf = $('meta[name="csrf-token"]').attr('content');
  Swal.fire({
    title: 'Are you sure to delete '+product_name+'?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/deleteProduct/'+id,
        type: 'DELETE',
        data: {
          id: id,
          _token: csrf
        },
        success: function(response) {
         console.log(response);

         if (response.status == 200) {
          Swal.fire(
            'Deleted!',
            'Product deleted Successfully!',
            'success'
            )
          fetchAllProducts();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg = '';
        $("#btn_add").text('Save');
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
    });
    }
  })
});
}



$(function() {

    // add new product ajax request
    $("#addProductForm").on('submit',function(e){
     var form_data = new FormData(this);

      $("#addProductForm").validate();//validate the form
      $("#btn_add").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');

      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/saveProduct',
        method: 'post',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          $("#btn_add").text('Save');
          $("#addProductForm")[0].reset();
          $("#addproductModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Added!',
              'Product saved Successfully!',
              'success'
              )
            fetchAllProducts();
          }else if (response.status == 500) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.message,
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        }
      });
      e.preventDefault();
      e.stopImmediatePropagation();
    });

//update product request
$("#editProdxuctFormBody").submit(function(e) {
  e.preventDefault();
  const fd = new FormData(this);
  $("#btn_editx").text('Updating...');
  $.ajax({
    url: '/updateProduct',
    method: 'put',
    data: fd,
    cache: false,
    contentType: false,
    processData: false,
    dataType: 'json',
    success: function(response) {
      console.log(response)
      if (response.status == 200) {
        Swal.fire(
          'Updated!',
          'Employee Updated Successfully!',
          'success'
          )
        fetchAllProducts();
      }
      $("#edit_employee_btn").text('Update Employee');
      $("#edit_employee_form")[0].reset();
      $("#editEmployeeModal").modal('hide');
    },
    error: function (jqXHR, textStatus, exception) {
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    }
  });
});



});

// show product form ajax request
$(document).on('click', '.editIconProduct', function(e) {
  e.preventDefault();
  let id = $(this).attr('id');
  let csrf = $('meta[name="csrf-token"]').attr('content');
  $.ajax({
    url: '/editProduct',
    method: 'get',
    data: {
      id: id,
      _token: csrf
    },
    success: function(response) {
      $("#editproductModal").modal('toggle')
      $("#editProductBody").html(response);
      $("#_tokend").val(csrf)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    }
  });
});


// =======================================================================

// BRANdS REQUESTS
//get all brands
function fetchAllProductBrands() {
  $.ajax({
    url: '/fetchAllProductBrands',
    method: 'get',
    success: function(response) {
      $("#show_all_brands").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });
    },
    error: function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  });
}

//delete brand
function deleteBrand(id, brand_name){
 $(document).on('click', '#delBtn'+id, function(e) {
  e.preventDefault();
  let csrf = $('meta[name="csrf-token"]').attr('content');
  Swal.fire({
    title: 'Are you sure to delete '+brand_name+'?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: '/deleteBrand/'+id,
        type: 'DELETE',
        data: {
          id: id,
          _token: csrf
        },
        success: function(response) {
         console.log(response);

         if (response.status == 200) {
          Swal.fire(
            'Deleted!',
            'Brand deleted Successfully!',
            'success'
            )
          fetchAllProductBrands();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var msg = '';
        $("#btn_add").text('Save');
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msg,
        })
      }
    });
    }
  })
});
}



$(function() {

    // add new brand ajax request
    $("#addBrandForm").on('submit',function(e){
     var form_data = $(this).serialize();

      $("#addBrandForm").validate();//validate the form


      $("#btn_add").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/saveBrand",
      type: "POST",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_add").text('Save');
          $("#addBrandForm")[0].reset();
          $("#addbrandModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Added!',
              'Brand saved Successfully!',
              'success'
              )
            fetchAllProductBrands();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });

//update brand request
$("#editBrandFormBody").on('submit',function(e){
 var form_data = $(this).serialize();

      $("#editBrandFormBody").validate();//validate the form

      $("#btn_editx").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Saving...');
     $.ajax({ //make ajax request to cart_process.php
      url: "/updateBrand",
      type: "PUT",
            //dataType:"json", //expect json value from server
            data: form_data
        }).done(function(response){ //on Ajax success
          console.log(response);
          $("#btn_editx").text('Save');
          $("#editBrandFormBody")[0].reset();
          $("#editbrandModal").modal('hide');
          if (response.status == 200) {
            Swal.fire(
              'Updated!',
              'Brand updated Successfully!',
              'success'
              )
            fetchAllProductBrands();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });


        e.preventDefault();
        e.stopImmediatePropagation();
      });


});

// show brand form ajax request
$(document).on('click', '.editIconBrand', function(e) {
  e.preventDefault();
  let id = $(this).attr('id');
  let csrf = $('meta[name="csrf-token"]').attr('content');
  $.ajax({
    url: '/editBrand',
    method: 'get',
    data: {
      id: id,
      _token: csrf
    },
    success: function(response) {
      $("#editbrandModal").modal('toggle')
      $("#editBrandFormBody").html(response);
      $("#_tokend").val(csrf)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    }
  });
});

// POS REQUESTS
//get all pos products
function fetchAllPosProducts(category) {
 $("#search_input").focus()
 $.ajax({
  url: '/fetchAllPosProducts/'+category,
  method: 'get',
  success: function(response) {
    $("#all_pos_prods").html(response);
    $("#ssPos").DataTable({
      order: [0, 'desc']
    });
  },
  error: function(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
});
}

//filter pos products
function filterPosProducts(){
  var selectedItem = $("#cat_id").val();
  if (selectedItem !== '') {
    fetchAllPosProducts(selectedItem)
  }
}


//get all pos products by product code, name or serial
function fetchAllPosProductsFilter() {

  var query = $("#search_input").val();
  $("#search_btn").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Searching...');
  if (query !== '') {
    $("#all_pos_prods").html('');
    $.ajax({
      url: '/fetchAllPosProductsFilter/'+query,
      method: 'get',
      success: function(response) {

        console.log(response)

        $("#search_input").val('');
        $("#search_input").focus()
        $("#search_btn").html('Find')
        $("#all_pos_prods").html(response);
        $("#ssPos").DataTable({
          order: [0, 'desc']
        });
      },
      error: function(){
        $("#search_input").val('');
        $("#search_input").focus()
        $("#search_btn").html('Find')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Search keyword is required!',
    })

    $("#search_input").focus()
  }

}

//add to cart
function addProductToCart(id, product_name, price,price_formated,tax, instock){

  if($("#cartProdID" + id).length == 0) {
    //it doesn't exist
    $('#tbl_cart > tbody').prepend('<tr id="cartProdID'+id+'"><td>'+product_name+'</td><td>'+price_formated+'</td><td data-th="Quantity"><div class="row"><button type="button" onclick="addProductQty('+id+','+price+','+tax+')">+</button><input readonly="readonly" pattern="[0-9]*" name="number_qty[]" id="number_qty'+id+'" oninput="getQtyB4change('+id+')"  min="1" style="width:40px"  type="text" class="form-control text-center" value="1"><button type="button" onclick="minusProductQty('+id+','+price+','+tax+')">-</button></div></td><td class="actions" data-th="" style="width:10%;">   <button onclick="removeFromCart('+id+','+price+','+tax+')" type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button><input type="hidden" id="tax'+id+'" name="tax[]" value="0" /> <input type="hidden" id="instock'+id+'" value="'+instock+'" /> <input type="hidden" name="prod_id[]" value="'+id+'" /></td></tr>');
    var total = $("#total_amount").val();
    $("#tax"+id).val(tax)
    // do cookie doesn't exist stuff;
    var f_total = parseInt(price) + parseInt(total) + parseInt(tax);

    $("#total_amount").val(f_total);
    var formated = formatter.format(f_total); /* $2,500.00 */
    $("#total_txt").html(formated)



  }else{
    alert('Already added, just modify the quantity!')
  }
}

// remove from cart
function removeFromCart(id, price){
  if($("#cartProdID" + id).length == 0) {
    alert("Glitch! already removed.")
  }else{
    var tax = $("#tax"+id).val()
    var qty = $("#number_qty"+id).val();
    $("#cartProdID" + id).remove();

    var total = $("#total_amount").val();

    console.log("ID "+id+" TAX "+tax+" PRICE: "+price+" QTY: "+qty)

    var prod_price = parseInt(tax)+parseInt(price)
    var old_T = parseInt(prod_price) * parseInt(qty);
    console.log(old_T);

    var new_total = parseInt(total)-parseInt(old_T);
    $("#total_amount").val(new_total)

    var formated = formatter.format(new_total); /* $2,500.00 */
    $("#total_txt").html(formated)
  }
}

//get qty before changed
function getQtyB4change(id){
  var qty = $("#number_qty"+id).val();
  console.log("before changing "+qty);
}

//update product price
function addProductQty(id,price){
  var tax = $("#tax"+id).val()
  var instock = $("#instock"+id).val()
  console.log("TAX "+tax)
  var qty = $("#number_qty"+id).val();
  // console.log("OLD QTY: "+qty)
  var new_qty = parseInt(qty)+1;
  $("#number_qty"+id).val(new_qty);

  if (parseInt(new_qty) <= parseInt(instock)) {
   var prod_price = parseInt(tax)+parseInt(price)

   var old_sub_total = parseInt(prod_price) * parseInt(qty);
   var sub_total = parseInt(prod_price) * parseInt(new_qty);
   console.log("SUBTOTAL "+sub_total)

    //update all total
    var old_total = $("#total_amount").val(); // => 'value'
    // console.log("oldTotal "+old_total)

    //remove the old price
    var rm_price = parseInt(old_total) - parseInt(old_sub_total);
    // console.log("rm_price "+rm_price)

    //add subtotal
    var final_total = parseInt(rm_price) + parseInt(sub_total);
    // console.log("final total "+final_total)

    $("#total_amount").val(final_total)

    var formated = formatter.format(final_total); /* $2,500.00 */
    $("#total_txt").html(formated)
  }else{
    $("#number_qty"+id).focus()

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Remaining products in stock is '+instock+', cannot exceed that!',
    })

  // var new_qty = parseInt(qty)-1;
  // $("#number_qty"+id).val(new_qty);
}



}

function minusProductQty(id,price){
  var tax = $("#tax"+id).val()
  var qty = $("#number_qty"+id).val();
  if (qty > 1) {
    var new_qty = parseInt(qty)-1;
  }else{
    var new_qty = 1
  }

  $("#number_qty"+id).val(new_qty);

  var prod_price = parseInt(tax)+parseInt(price)

  var old_sub_total = parseInt(prod_price) * parseInt(qty);
  var sub_total = parseInt(prod_price) * parseInt(new_qty);

  //update all total
  var old_total = $("#total_amount").val(); // => 'value'

  //remove the old price
  var rm_price = parseInt(old_total) - parseInt(old_sub_total);
  console.log("rm_price "+rm_price)

  //add subtotal
  var final_total = parseInt(rm_price) + parseInt(sub_total);
  console.log("final total "+final_total)

  $("#total_amount").val(final_total)

  var formated = formatter.format(final_total); /* $2,500.00 */
  $("#total_txt").html(formated)
}

//handle discount input field event
$("#discount_input").on('input',function(e){

  calculateDiscount();

  e.preventDefault();
  e.stopImmediatePropagation();

});


//save sale POS
$("#addSaleForm").on('submit',function(e){
 var form_data = $(this).serialize();

 var total_amount = $("#total_amount").val();
 if (parseInt(total_amount) !== 0) {

  $("#addSaleForm").validate();//validate the form
  $("#progressStatus").fadeIn();
  $("#progressStatus").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Please wait...');

  var amount_paid_input = $("#amount_paid_input").val();
  if (parseInt(amount_paid_input) !== 0) {
    $.ajax({ //make ajax request to cart_process.php
      url: "/saveSale",
      type: "POST",
        //dataType:"json", //expect json value from server
        data: form_data
    }).done(function(response){ //on Ajax success
      console.log(response);
      $("#progressStatus").fadeOut()
      $("#addSaleForm")[0].reset();
      if (response.status == 200) {
        Swal.fire(
          'Saved!',
          'Successfully!',
          'success'
          );
        $("#all_pos_prods").html('')
        $("#cart_container").html('<table  id="tbl_cart" class="table table-hover border bg-white mt-1"><thead><tr><th>Price</th><th>Subtotal</th><th >Quantity </th><th></th></tr></thead><tbody></tbody></table>')
        fetchAllPosProducts("category");
        $("#total_txt").html('MWK 0.00');
        $("#change_txt").html('MWK 0.00');
            //focus on input field
            $("#search_input").focus()
            $("#total_amount").val(0)

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }

        }).fail(function(jqXHR, exception){
          var msg = '';
          $("#btn_add").text('Save');
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
          })
        });

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Enter amount paid!',
        });
        $("#amount_paid_input").focus();
      }


    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select products first!',
      })
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  });

$("#amount_paid_input").on('input',function(e){
  calculateDiscount();
  var amount_paid_input = $(this).val();
  var total_amount = $("#total_amountAfterDiscount").val();

  if (parseInt(total_amount) !== 0) {
   if (amount_paid_input === "null" || amount_paid_input === "") {
    var formated = formatter.format(after_paid); /* $2,500.00 */
    $("#change_txt").html(formated);
  }else{
        // after discount
        var after_paid = parseInt(amount_paid_input) - parseInt(total_amount);

      // $("#total_amount").val(final_total)

      var formated = formatter.format(after_paid); /* $2,500.00 */
      $("#change_txt").html(formated);
    }

  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Select products first!',
    })

    $(this).val(0)
  }

});

function calculateDiscount(){
  var discount_percent = $("#discount_input").val();
  var total_amount = $("#total_amount").val();
  if (parseInt(total_amount) !== 0) {
    if (discount_percent <= 100) {
         // after discount
         var discount_amount = (parseInt(total_amount)*parseInt(discount_percent))/100;
         var after_discount = parseInt(total_amount) - parseInt(discount_amount);

         $("#total_amountAfterDiscount").val(after_discount)
         var formated = formatter.format(after_discount); /* $2,500.00 */
         $("#total_txt").html(formated);
       }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Discount percentage should be less than or equal to 100%!',
        })
        $("#discount_input").val(0)
      }

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select products first or re-add products!',
      })

      $("#discount_input").val(0)
    }

  }


// SALES REQUESTS
//get all branchsales
function fetchAllBranchSales(){
  $.ajax({
    url: '/fetchAllBranchSales',
    method: 'get',
    success: function(response) {
      $("#show_all_branch_sales").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });
    },
    error: function(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  });
}

//ALL USER REPORTS
function fetchAllUserReports(){

}

    // filter user report ajax request
$("#filterUserReportsForm").on('submit',function(e){
     var form_data = $(this).serialize();

  $("#filterUserReportsForm").validate();//validate the form

  var filter_user = $("#filter_user").val();

  if (filter_user === '' || filter_user === null) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'select user!',
    })
    return false;
  }

  $("#btn_find").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Retrieving...');
 $.ajax({ //make ajax request to cart_process.php
  url: "/filterUserReports",
  type: "POST",
        //dataType:"json", //expect json value from server
        data: form_data
    }).done(function(response){ //on Ajax success
      console.log(response);
      $("#btn_find").text('Find');
      $("#filterUserReportsForm")[0].reset();

      $("#show_reports").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });

    }).fail(function(jqXHR, exception){
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    });


    e.preventDefault();
    e.stopImmediatePropagation();
  });

// filter branch report ajax request
$("#filterBranchReportsForm").on('submit',function(e){
     var form_data = $(this).serialize();

  $("#filterBranchReportsForm").validate();//validate the form

  var filter_user = $("#filter_branch").val();

  if (filter_user === '' || filter_user === null) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'select branch!',
    })
    return false;
  }

  $("#btn_find").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Retrieving...');
 $.ajax({ //make ajax request to cart_process.php
  url: "/fetchAllBranchSales",
  type: "POST",
        //dataType:"json", //expect json value from server
        data: form_data
    }).done(function(response){ //on Ajax success
      console.log(response);
      $("#btn_find").text('Find');
      $("#filterBranchReportsForm")[0].reset();

      $("#show_reports").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });

    }).fail(function(jqXHR, exception){
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    });


    e.preventDefault();
    e.stopImmediatePropagation();
  });

// filter category report ajax request
$("#filterCategoryReportsForm").on('submit',function(e){
     var form_data = $(this).serialize();

  $("#filterCategoryReportsForm").validate();//validate the form

  var filter_user = $("#filter_branch").val();

  if (filter_user === '' || filter_user === null) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'select category!',
    })
    return false;
  }

  $("#btn_find").html('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> Retrieving...');
 $.ajax({ //make ajax request to cart_process.php
  url: "/fetchAllCategorySales",
  type: "POST",
        //dataType:"json", //expect json value from server
        data: form_data
    }).done(function(response){ //on Ajax success
      console.log(response);
      $("#btn_find").text('Find');
      $("#filterCategoryReportsForm")[0].reset();

      $("#show_reports").html(response);
      $("table").DataTable({
        order: [0, 'desc']
      });

    }).fail(function(jqXHR, exception){
      var msg = '';
      $("#btn_add").text('Save');
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    });


    e.preventDefault();
    e.stopImmediatePropagation();
  });

//dashboard filter by taxes
function yearDashrecords() {
  alert("you selected "+$("#selected_year").val());
}
