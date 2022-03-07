@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col">
      <div class="card">

        <div class="table-responsive mt-4" id="show_all_customers">

        </div>

      </div>
    </div>
  </div>


  {{-- add new customer modal start --}}
  <div class="modal fade" id="addcustomerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ADD CUSTOMER</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form method="POST" action="saveCustomer" id="addCustomerForm">
           @csrf
           <div class="row">
       

            <div class="col-md-6">
              <div class="form-group">
                <label for="fname">Customer Name</label>
                <input type="text" class="form-control" name="customer_name" id="customer_name" placeholder="Ex: John" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="lname">Customer Phone</label>
                <input type="text" class="form-control" name="customer_phone" id="customer_phone" placeholder="Ex: +265882992942" required>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="password">Customer address</label>
                <textarea name="customer_address" id="customer_address" class="form-control" placeholder="Ex: area 25 sector 7"></textarea>
              </div>
            </div>

          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" id="btn_add" class="btn btn-primary">Save</button>
          </div>

        </form>
      </div>

    </div>
  </div>
</div>
{{-- add new customer modal end --}}

  {{-- add new customer modal start --}}
  <div class="modal fade" id="editcustomerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">EDIT CUSTOMER</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
         <form  method="POST" id="editCustomerFormBody" >
         </form>
      </div>

    </div>
  </div>
</div>
{{-- add new customer modal end --}}


<!-- Footer -->
@include('incl.footer')
</div>
@endsection