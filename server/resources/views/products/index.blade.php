@extends('layouts.app')

@section('content')
<!-- Page content -->
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col">
      <div class="card">
        @include('incl.messages')
        <div class="table-responsive mt-4" id="show_all_products">

        </div>

      </div>
    </div>
  </div>


  {{-- add new unit modal start --}}
  <div class="modal fade" id="addproductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ADD PRODUCT</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form method="POST" id="addProductForm" enctype="multipart/form-data">
           @csrf
           <div class="row">

            <div class="col-md-12">
              <div class="form-group">
                <label for="fname">Product Picture</label>
                <input accept=".png, .jpg, .jpeg" type="file" class="form-control" name="product_pic" id="product_pic"  />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="fname">Product Name</label>
                <input type="text" class="form-control" name="product_name" id="product_name" placeholder="Ex: i5 HP" required>
              </div>
            </div>

            <div class=" col-md-6">
              <div class="form-group">
                <label for="ubranch">Product Brand</label>
                <select class="form-control" name="product_brand" id="product_brand" required > 
                  <option value="" selected disabled >-select-</option>
                  @if(count($brands) > 0)
                    @foreach($brands as $brand)
                      <option value="{{ $brand->id }}">{{ $brand->brand_name }}</option>
                    @endforeach
                  @endif
                </select>
              </div>
            </div>

            <div class=" col-md-6">
              <div class="form-group">
                <label for="ubranch">Product Branch</label>
                <select class="form-control" name="product_branch" id="product_branch" > 
                  <option selected disabled>-select-</option>
                  @if(count($branches) > 0)
                    @foreach($branches as $branch)
                      <option value="{{ $branch->id }}">{{ $branch->branch_name }}</option>
                    @endforeach
                  @endif
                </select>
              </div>
            </div>


            <div class="col-md-6">
              <div class="form-group">
                <label for="fname">Product Unit</label>
                <select class="form-control" name="product_unit" id="product_unit" required> 
                  <option value="" selected disabled>-select-</option>
                  @if(count($units) > 0)
                    @foreach($units as $unit)
                      <option value="{{ $unit->id }}">{{ $unit->unit_name }} - {{ $unit->unit_symbol }}</option>
                    @endforeach
                  @endif
                </select>
              </div>
            </div>

            <div class=" col-md-6">
              <div class="form-group">
                <label for="ubranch">Product Category</label>
                <select class="form-control" name="product_category" id="product_category" required> 
                  <option value="" selected disabled>-select-</option>
                  @if(count($categories) > 0)
                    @foreach($categories as $category)
                      <option value="{{ $category->id }}">{{ $category->category_name }}</option>
                    @endforeach
                  @endif
                </select>
              </div>
            </div>


            <div class="col-md-6">
              <div class="form-group">
                <label for="fname">Product Code</label>
                <input type="text" class="form-control" name="product_code" id="product_code" placeholder="Ex: 1234567890" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="lname">Product Serial</label>
                <input type="text" class="form-control" name="product_serial" id="product_serial" placeholder="Ex: AB4H3W3E3RU355" >
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="lname">Product Quantity</label>
                <input onkeypress="return isNumberKey(event)" type="text" class="form-control" name="product_qty" id="product_qty" placeholder="Ex: 55" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="lname">Product Price (MWK)</label>
                <input onkeypress="return isNumberKey(event)" type="text" class="form-control" name="product_price" id="product_price" placeholder="Ex: 55000" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="lname">Product Notes</label>
                <textarea class="form-control" name="product_notes" id="product_notes" placeholder="Ex: limited product"></textarea>
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
{{-- add new unit modal end --}}

  {{-- add new unit modal start --}}
  <div class="modal fade" id="editproductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">EDIT PRODUCT</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
         <form method="POST" action="/updateProduct"  id="editProductxFormBody" enctype="multipart/form-data">
          @csrf
          {{ method_field('PUT') }}
              <input type="hidden" name ="_token" value="{{csrf_token()}}" id="token"/>
          <div id="editProductBody"></div>
         </form>
      </div>

    </div>
  </div>
</div>
{{-- edit new unit modal end --}}


<!-- Footer -->
@include('incl.footer')
</div>
@endsection