@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col">
      <div class="card">


        <div class="page-content container">

          @if(!empty($invoice))
          <div class="page-header text-blue-d2">
            <div class="page-tools ">
              <div class="action-buttons ">
                <a class=" btn bg-white btn-light" href="#" data-title="Print">
                  <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                  Print
                </a>
                <a class=" btn bg-white btn-light " href="#" data-title="PDF">
                  <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                  Export
                </a>

                <a class=" btn bg-white btn-light " href="#" data-title="Excel">
                  <i class="mr-1 fa fa-file-excel-o text-success text-120 w-2"></i>
                  Export
                </a>

              </div>
            </div>
          </div>

          <div class="container px-0">
            <div class="row mt-4">
              <div class="col-12 col-lg-10 offset-lg-1">
                <div class="row">
                  <div class="col-12">
                    <div class="text-center text-150">
                      <img src="{{ asset('assets/img/brand/logo.png') }}"   class="navbar-brand-img" alt="Logo">
                    </div>
                  </div>
                </div>
                <!-- .row -->

                <hr class="row brc-default-l1 mx-n1 mb-4" />

                <div class="row">
                  <div class="col-sm-6">
                    <div>
                      <span class="text-sm text-grey-m2 align-middle"></span>
                      <span class="text-600 text-110 text-blue align-middle">{{ $invoice->customer->customer_name }}</span>
                    </div>
                    <div class="text-grey-m2">
                      <div class="my-1">
                        {{ $invoice->customer->address }}
                      </div>

                      <div class="my-1"><i class="fa fa-phone fa-flip-horizontal"></i> <b class="text-600">{{ $invoice->customer->customer_phone }}</b></div>
                    </div>
                  </div>
                  <!-- /.col -->

                  <div class="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                    <hr class="d-sm-none" />
                    <div class="text-grey-m2">
                      <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                        Invoice
                      </div>

                      <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">ID:</span> #{{ $invoice->id }}</div>

                      <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90"> Date:</span> <?php $old_date = date('Y-m-d H:i:s');
                      $new_date = date('Y-m-d', strtotime($invoice->created_at));
                      echo $new_date;
                    ?></div>

                    <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Payment Type:</span> {{ $invoice->payment_type }}</div>
                  </div>
                </div>
                <!-- /.col -->
              </div>

                 {{--  <div class="mt-4">
                    <div class="row text-600 text-white bgc-default-tp1 py-25">
                      <div class="d-none d-sm-block col-1">#</div>
                      <div class="col-9 col-sm-5">Description</div>
                      <div class="d-none d-sm-block col-4 col-sm-2">Qty</div>
                      <div class="d-none d-sm-block col-sm-2">Unit Price</div>
                      <div class="col-2">Amount</div>
                    </div>

                    <div class="text-95 text-secondary-d3">
                      <div class="row mb-2 mb-sm-0 py-25">
                        <div class="d-none d-sm-block col-1">1</div>
                        <div class="col-9 col-sm-5">Domain registration</div>
                        <div class="d-none d-sm-block col-2">2</div>
                        <div class="d-none d-sm-block col-2 text-95">$10</div>
                        <div class="col-2 text-secondary-d2">$20</div>
                      </div>

                      <div class="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                        <div class="d-none d-sm-block col-1">2</div>
                        <div class="col-9 col-sm-5">Web hosting</div>
                        <div class="d-none d-sm-block col-2">1</div>
                        <div class="d-none d-sm-block col-2 text-95">$15</div>
                        <div class="col-2 text-secondary-d2">$15</div>
                      </div>

                      <div class="row mb-2 mb-sm-0 py-25">
                        <div class="d-none d-sm-block col-1">3</div>
                        <div class="col-9 col-sm-5">Software development</div>
                        <div class="d-none d-sm-block col-2">--</div>
                        <div class="d-none d-sm-block col-2 text-95">$1,000</div>
                        <div class="col-2 text-secondary-d2">$1,000</div>
                      </div>

                      <div class="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                        <div class="d-none d-sm-block col-1">4</div>
                        <div class="col-9 col-sm-5">Consulting</div>
                        <div class="d-none d-sm-block col-2">1 Year</div>
                        <div class="d-none d-sm-block col-2 text-95">$500</div>
                        <div class="col-2 text-secondary-d2">$500</div>
                      </div>
                    </div>

                    <div class="row border-b-2 brc-default-l2"></div>

                    <!-- or use a table instead -->
                    --}} 
                    <div class="table-responsive mt-3">
                      <table class="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                        <thead class="bg-none bgc-default-tp1">
                          <tr class="text-white">
                            <th class="opacity-2">#</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Item Price</th>
                            <th width=""> Item Tax(%)</th>
                            <th width="140"> Total Amount</th>
                          </tr>
                        </thead>

                        <tbody class="text-95 text-secondary-d3">
                          <tr></tr>
                          <?php $total_no_tax = 0; $i = 1;?>
                          @foreach($invoice_details as $invoice_detail)

                          <tr>
                            <td>{{ $i }}</td>
                            <td>{{ $invoice_detail->products[0]->product_name }}</td>
                            <td>{{ $invoice_detail->product_qty }}</td>
                            <td class="text-95">MWK {{ number_format($invoice_detail->products[0]->product_price,2) }}</td>
                            <td class="text-secondary-d2">{{ $invoice_detail->tax }}</td> 
                            <td class="text-95">MWK {{ number_format($invoice_detail->total_price,2) }}</td>

                            <?php 
                            $i++; 
                            $total_no_tax+=($invoice_detail->product_qty*$invoice_detail->products[0]->product_price);
                          ?>

                        </tr> 

                        @endforeach


                      </tbody>
                    </table>
                  </div>
                  <hr/>

                  <div class="row mt-3">
                    <div class="col-12 col-sm-5 text-grey-d2 text-95 mt-2 mt-lg-0">
                     {{--  Extra note such as company or payment information... --}}
                   </div>

                   <div class="col-12 col-sm-7 text-grey text-90 order-first order-sm-last">
                    <div class="row my-2">
                      <div class="col-7 text-right">
                        SubTotal
                      </div>
                      <div class="col-5">
                        <span class="text-120 text-secondary-d1">MWK {{ number_format($total_no_tax,2) }}</span>
                      </div>
                    </div>

                    <div class="row my-2">
                      <div class="col-7 text-right">
                        Total Tax
                      </div>
                      <div class="col-5">
                        <span class="text-110 text-secondary-d1">MWK {{ number_format($invoice->total_tax,2) }}</span>
                      </div>
                    </div>

                    <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                      <div class="col-7 text-right">
                        Total Amount
                      </div>
                      <div class="col-5">
                        <span class="text-150 text-success-d3 opacity-3">MWK {{ number_format($invoice->total_amount,2) }}</span>
                      </div>
                    </div>

                    <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                      <div class="col-7 text-right">
                        Paid Amount
                      </div>
                      <div class="col-5">
                        <span class="text-150 text-success-d3 opacity-5">MWK {{ number_format($invoice->paid_amount,2) }}</span>
                      </div>
                    </div>

                  </div>
                </div>

                <hr />

                <div>
                  <span class="text-secondary-d1 text-105 py-5">Thank you for your business</span> 
                  <br/><br/>
                  <p class="text-secondary-d1 text-105 py-5 text-center"> <small>Invoice was created on a computer and is valid without the signature and seal.</small> </p> 
                  <br/>
                  <br/>
                  <br/>
                </div>
              </div>
            </div>
          </div>

          @else
            <h2 class="text-center text-danger py-5">Requested resource not found!</h2>
          @endif


        </div>
      </div>


    </div>
  </div>





  <!-- Footer -->
  @include('incl.footer')
</div>
@endsection