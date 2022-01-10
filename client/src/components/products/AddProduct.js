import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";
import Compressor from 'compressorjs';
import LinearProgressLoad from "../alerts/LinearProgress";

function AddProduct() {
    const navigate = useNavigate();


    //alert state
    const [open, setOpen] = useState(false);
    //dialog state

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [loadingProgress, setLoadingProgress] = useState(false);

    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };


    const [branches, setBranches] = useState([])
    const [units, setUnits] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    const [category_id, setProductCategoryId] = useState('')
    const [brand_id, setProductBrandId] = useState('')
    const [branch_id, setProductBranchId] = useState('')
    const [unit_id, setProductUnitId] = useState('')

    const [product_code, setProductCode] = useState("");
    const [product_name, setProductName] = useState("");
    const [product_qty, setProductQty] = useState("");
    const [product_price, setProductPrice] = useState("");
    const [product_notes, setProductNotes] = useState("");
    const [product_serial, setProductSerial] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);


    const add = (e) => {
        e.preventDefault()
        if (category_id === "" || brand_id === "" || branch_id === "" || unit_id === "" || product_code === "" || product_name === "" || product_qty === "" || product_price === "") {
            setOpen(true);
            setAlertMessage('Marked fields are mandatory')
            setAlertType('error')
        } else {
            // const state = {
            //     product_pic: selectedFile,
            //     category_id: category_id,
            //     unit_id: unit_id,
            //     brand_id: brand_id,
            //     product_code: product_code,
            //     product_name: product_name,
            //     product_qty: product_qty,
            //     product_price: product_price,
            //     product_notes: product_notes,
            //     // product_price: product_price,
            //     product_serial: product_serial,
            //     branch_id: branch_id
            // }

            setLoadingProgress(true)
            const data = new FormData()
            data.append('product_pic', selectedFile)
            data.append('category_id', category_id)
            data.append('unit_id', unit_id)
            data.append('brand_id', brand_id)
            data.append('product_code', product_code)
            data.append('product_name', product_name)
            data.append('product_qty', product_qty)
            data.append('product_price', product_price)
            data.append('product_notes', product_notes)
            data.append('product_serial', product_serial)
            data.append('branch_id', branch_id)

            AddProductHandler(data)
            // setProductCategoryId('')
            // setProductBrandId('')
            // setProductBranchId('')

            // setProductUnitId('')
            // setProductCode('')
            // setProductName('')
            // setProductQty("");
            // setProductPrice("");
            // setProductNotes("");
            // setProductSerial("");
            // document.querySelector("#imageForm").reset();


            // navigate('/users');

        }
    }

    const AddProductHandler = (state) => {
        console.log(state)

        api.post('/saveProduct'
            , state, {
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data"
            }

        }
        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error === false) {

                    console.log(response.data.users)
                    // return response.data.users;
                    setAlertType('success')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                    setTimeout(() => { navigate('/products'); }, 1000)

                } else {
                    console.log(response.data)
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                }

            })
            .catch(function (error) {
                console.log(error);
                setAlertType('error')
                setAlertMessage("Error 500: Internal server error")
                setOpen(true)
            });
    }

    // retrieve branches
    const retrieveData = () => {
        setLoadingProgress(true)
        api.get('/fetchAllBranches'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                setLoadingProgress(false)
                // console.log(response.data)
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setBranches(response.data.branches)
                    setBrands(response.data.brands)
                    setUnits(response.data.units)
                    setCategories(response.data.categories)
                    // return response.data.users;

                } else {
                    // console.log("sjs")
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)

                }

            })
            .catch(function (myJson) {
                setLoadingProgress(false)
                // console.log(myJson);
                setAlertType('error')
                setAlertMessage('Error 500: Internal server error')
                setOpen(true)
            });
    }



    //compress the file
    const handleCompressedUpload = (e) => {
        setSelectedFile(e.target.files[0])
        const image = e.target.files[0];
        new Compressor(image, {
            quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {
                // compressedResult has the compressed file.
                // Use the compressed file to upload the images to your server.        
                // setCompressedFile(res)
                // console.log(image)
                // console.log(compressedResult)
                // setSelectedFile(compressedResult)
            },
        });
    };



    useEffect(() => {
        retrieveData();
    }, [])

    const renderBranchList = branches.map((branch) => {
        return (
            <option key={branch.id} value={branch.id} >{branch.branch_name}</option>
        );
    })

    const renderBrandsList = brands.map((brand_) => {
        return (
            <option key={brand_.id} value={brand_.id} >{brand_.brand_name}</option>
        );
    })

    const renderUnitsList = units.map((unit) => {
        return (
            <option key={unit.id} value={unit.id} >{unit.unit_name} - {unit.unit_symbol}</option>
        );
    })

    const renderCategoriesList = categories.map((category) => {
        return (
            <option key={category.id} value={category.id} >{category.category_name}</option>
        );
    })

    const loading = () => {
        if (loadingProgress) {
            return (
                <div className="mb-3">
                    <LinearProgressLoad />
                </div>
            )
        }
    }

    return (
        <div>
            <div className="">
                <div className="header bg-primary pb-6">
                    <div className="container-fluid">
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-7">
                                    <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                        <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                            <li className="breadcrumb-item"><Link to={"/"}><i className="fas fa-home"></i></Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"><Link to={'/products'}>Products</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Add Product </li>
                                        </ol>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt--6">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="container-fluid mt-5">

                                    {loading()}

                                    <form onSubmit={add}>
                                        <div className="row">

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label >Product Picture</label>
                                                    <input onChange={(event) => handleCompressedUpload(event)} accept=".png, .jpg, .jpeg" type="file" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Product Name <span className='text-danger'>*</span></label>
                                                    <input value={product_name} onChange={(e) => setProductName(e.target.value)} type="text" className="form-control" placeholder="Ex: i5 HP" required />
                                                </div>
                                            </div>

                                            <div className=" col-md-6">
                                                <div className="form-group">
                                                    <label >Product Brand <span className='text-danger'>*</span></label>
                                                    <select value={brand_id} onChange={(e) => setProductBrandId(e.target.value)} className="form-control" name="ubranch" id="ubranch" required>
                                                        <option value='' defaultValue disabled>-select-</option>
                                                        {renderBrandsList}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className=" col-md-6">
                                                <div className="form-group">
                                                    <label >Product Branch <span className='text-danger'>*</span></label>
                                                    <select value={branch_id} onChange={(e) => setProductBranchId(e.target.value)} className="form-control" name="ubranch" id="ubranch" required>
                                                        <option value='' disabled>-select-</option>
                                                        {renderBranchList}
                                                    </select>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Product Unit <span className='text-danger'>*</span></label>
                                                    <select value={unit_id} onChange={(e) => setProductUnitId(e.target.value)} className="form-control" name="ubranch" id="ubranch" required>
                                                        <option value='' disabled>-select-</option>
                                                        {renderUnitsList}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className=" col-md-6">
                                                <div className="form-group">
                                                    <label >Product Category <span className='text-danger'>*</span></label>
                                                    <select value={category_id} onChange={(e) => setProductCategoryId(e.target.value)} className="form-control" name="ubranch" id="ubranch" required>
                                                        <option value='' disabled>-select-</option>
                                                        {renderCategoriesList}
                                                    </select>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Product Code <span className='text-danger'>*</span></label>
                                                    <input value={product_code} onChange={(e) => setProductCode(e.target.value)} type="text" className="form-control" placeholder="Ex: 1234567890" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Product Serial</label>
                                                    <input value={product_serial} onChange={(e) => setProductSerial(e.target.value)} type="text" className="form-control" placeholder="Ex: AB4H3W3E3RU355" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Product Quantity <span className='text-danger'>*</span></label>
                                                    <input value={product_qty} onChange={(e) => setProductQty(e.target.value)} onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }} type="text" className="form-control" placeholder="Ex: 55" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Product Price (MWK) <span className='text-danger'>*</span></label>
                                                    <input value={product_price} onChange={(e) => setProductPrice(e.target.value)} onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }} type="text" className="form-control" placeholder="Ex: 55000" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Product Notes</label>
                                                    <textarea value={product_notes} onChange={(e) => setProductNotes(e.target.value)} className="form-control" placeholder="Ex: limited product"></textarea>
                                                </div>
                                            </div>


                                        </div>


                                        <div className="modal-footer">
                                            <button type="submit" id="btn_add" className="btn btn-primary">Save</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default AddProduct;