<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
//        $this->middleware('auth');
    }

    public function index()
    {
        $units = Unit::all();
        $data = array(
            'units' => $units,
        );
        return view('units.index')->with($data);
    }


       // handle fetch all units ajax request
    public function fetchAllUnits() {
        // echo "df";
        $units = Unit::all();
        $output = '';

        if ($units->count() > 0) {
            $data = array(
                'error' => false,
                'message' => 'success',
                'units' => $units,

            );

            return response()->json($data, 200);
        } else {
            $data = array(
                'error' => true,
                'message' => 'No units present',
            );

            return response()->json($data, 201);

        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //create post
        $unit = new Unit;
        $unit->unit_name = $request->input('unit_name');
        $unit->unit_symbol = $request->input('unit_symbol');


        if ($unit->save()) {
            return response()->json([
                'status' => 200,
                'error'=>false,
                'message' => 'Unit saved!',
            ]);
        }else{

            return response()->json([
                'status' => 500,
                'error'=>true,
                'message' => 'Failed saving unit, try again later!',
            ]);


        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $unit = Unit::find($id);


        $output = '
        
            
           <div class="row">
           <input type="hidden" name="eunit_id" id="eunit_id" value="'.$id.'" required>
            <input type="hidden" name="_token" id="_tokend" required>
           

            <div class="col-md-6">
              <div class="form-group">
                <label for="efname">Unit Name</label>
                <input type="text" class="form-control" name="eunit_name" id="eunit_name" placeholder="Ex: John" value="'.$unit->unit_name.'" required>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="elname">Unit Symbol</label>
                <input type="text" class="form-control" value="'.$unit->unit_symbol.'" name="eunit_symbol" id="eunit_symbol" placeholder="Ex: Doe" required>
              </div>
            </div>
          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" id="btn_editx" class="btn btn-primary">Save</button>
          </div>

        ';
        echo $output;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function edit(Unit $unit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Unit $unit)
    {
         //create post
        $id = $request->input('eunit_id');
        $unit = Unit::find($id);

        $unit->unit_name = $request->input('eunit_name');
        $unit->unit_symbol = $request->input('eunit_symbol');

        if (!empty($unit)){
            if ($unit->save()) {

                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message' => 'Unit updated successfully!',
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message' => 'Failed updating unit, try again later!',
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message' => 'Failed updating unit, unit not found!',
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unit = Unit::find($id);

        if (!empty($unit)){
            if ($unit->delete()) {
                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message' => 'Unit deleted!',
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>false,
                    'message' => 'Unit deleting failed!',
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>false,
                'message' => 'Unit deleting failed, unit not found!',
            ]);
        }

    }
}
