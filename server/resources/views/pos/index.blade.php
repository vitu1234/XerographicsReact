@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col">
      <div class="card">
        @include('incl.messages')
        <div class=" mt-4" >

          <div class="mx-5">
           <form id="addSaleForm" action="" method="POST" action="/saveSale">
             @csrf
            <div class="row">

              <div class="col-md-7 border-right-0">
                <div class="card card-stats">
                  <!-- Card body -->
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12">
                        <select onchange="filterPosProducts()" required class="select2 form-control" name="cat_id" id="cat_id">
                          <option value="category" selected >All Categories</option>
                          @if($customers->count() > 0)
                          @foreach($categories as $category)
                          <option value="{{ $category->id }}">{{ $category->category_name }}</option>
                          @endforeach
                          @endif
                        </select>
                      </div>

                    </div>
                    <br>
                    <div class="row ">
                      <div class="col-md-9">
                        <input  class="form-control" type="text" name="search_input" id="search_input" placeholder="Search product name, barcode or serial..." />
                      </div>
                      <div class="col-md-2 py-2">
                        <button type="button" onclick ="fetchAllPosProductsFilter()" id="search_btn" class="btn btn-primary py-1">Find </button>
                      </div>
                    </div>
                    <br/>

                    <div class="row anyClass">
                      <div class="col-md-12"></div>
                      <div class="table-responsive" id="all_pos_prods"> 
                        <table width="" class="table align-items-center table-hover " >

                        </table>
                      </div>
                    </div>
                  </div>


                </div>    
              </div>


              <div class="col-md-5 ">
                <div class="row ">
                  <div class="col-md-9">
                    <select required class="select2 form-control" name="customer_id" id="customer_id">
                      <option value="" selected disabled>-Select Customer-</option>
                      @if($customers->count() > 0)
                      @foreach($customers as $customer)
                      <option value="{{ $customer->id }}"><strong>{{ $customer->customer_name }}:</strong> {{ $customer->customer_phone }}</option>
                      @endforeach
                      @endif
                    </select>
                  </div>
                  <div class="col-md-2 py-2">
                    <button data-toggle="modal" data-target="#addcustomerModal" type="button" class="btn btn-primary py-1">New </button>
                  </div>
                </div>


                <div class="col-md-12 ">
                  <div class="row anyClass2">
                    <div class="card shopping-cart">
                      <div class="card-header bg-dark text-light">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        Products Checkout

                        <div class="clearfix"></div>
                      </div>
                      <div class="card-body">

                        <!-- END PRODUCT -->
                        <!-- PRODUCT -->
                        <div class="col-md-12 ">
                          <div class="">
                            <div class="table-responsive" id="cart_container">
                              <table  id="tbl_cart" class="table table-hover border bg-white mt-1">
                                <thead>
                                  <tr>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                    <th >Quantity </th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>


                                </tbody>

                              </table>

                            </div>
                          </div>
                          <!-- END PRODUCT -->

                        </div>


                      </div>

                    </div>
                  </div>
                </div>


              </div>



            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="">
                  <div class="card border-0 ">

                    <div class="card-body p-5">

                      <div class="row ">
                        <div class="col">
                           <div class="row justify-content-between">
                            <div class="col-4">
                              <p><b>Total</b></p>
                            </div>
                            <div class="flex-sm-col col-auto">
                              <p id="total_txt" class="mb-1"><b>MWK 0.00</b></p>
                            </div>
                          </div>

                          <hr class="my-3">

                          <div class="row justify-content-between">
                            <div class="col-4">
                              <p><b>Discount(%)</b></p>
                            </div>
                            <div class="flex-sm-col col-auto">
                              <input required="" onkeypress="return isNumberKey(event)" type="text" value="0" name="discount_input" id="discount_input" class="form-control" >

                            </div>
                          </div>

                          <hr class="my-3">


                          <div class="row justify-content-between">
                            <div class="col-4">
                              <p><b>Amount Paid</b></p>
                            </div>
                            <div class="flex-sm-col col-auto">
                              <input required="" onkeypress="return isNumberKey(event)" type="text" value="0" name="amount_paid_input" id="amount_paid_input" class="form-control" >
                            </div>
                          </div>

                          <hr class="my-3">

                           <div class="row justify-content-between">
                            <div class="col-4">
                              <p><b>Change</b></p>
                            </div>
                            <div class="flex-sm-col col-auto">
                              <p id="change_txt" class="mb-1"><b>MWK 0.00</b></p>
                            </div>
                          </div>

                          <hr class="my-3">

                         

                          <div class="row justify-content-between">
                            <div class="col-4">
                              <p><b>Payment Type</b></p>
                            </div>
                            <div class="flex-sm-col col-auto">


                              <div class="custom-control custom-radio custom-control-inline">
                                <input required type="radio" id="customRadioInline1" name="payment_type" class="custom-control-input"  value="Bank Payment" />
                                <label class="custom-control-label" for="customRadioInline1">Bank Payment</label>
                              </div>
                              <div class="custom-control custom-radio custom-control-inline">
                                <input checked required type="radio" id="customRadioInline2" name="payment_type" class="custom-control-input" value="Cash Payment" />
                                <label class="custom-control-label" for="customRadioInline2">Cash Payment</label>
                              </div>


                            </div>
                          </div>


                        </div>
                      </div>


                      <div class="row mb-5 mt-4 ">
                        <div class="col-md-12 ">
                          <p style="display:none;" id="progressStatus" class="text-center alert alert-outline-primary">Please wait...</p>
                        </div>
                        <div class="col-md-6 ">
                          <button type="submit" id="saveBtn" class="btn btn-block btn-outline-primary ">SAVE</button>
                          
                        </div>
                        <div class="col-md-6 ">

                          <button type="submit" id="saveBtnPrint" class="btn btn-block btn-outline-primary ">SAVE & PRINT</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <input type="hidden" name="total_amount" id="total_amount" value="0"/>
            <input type="hidden" name="total_amountAfterDiscount" id="total_amountAfterDiscount" value="0"/>
          </form>
        </div>
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

<!-- Footer -->
@include('incl.footer')
</div>
@endsection