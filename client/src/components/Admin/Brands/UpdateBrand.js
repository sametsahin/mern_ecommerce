import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingComponent } from "../../Parts/index.js";
import { toast } from "react-toastify";
import {
  fetchSingleBrandAction,
  updateBrandAction,
} from "../../../redux/slices/brands/brandsSlice.js";

export default function UpdateBrand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get id from params
  const { id } = useParams();
  //fetch single brand
  useEffect(() => {
    dispatch(fetchSingleBrandAction(id));
  }, [id, dispatch]);

  //get brand from store
  const { brand, isUpdated, loading, error } = useSelector(
    (state) => state?.brands
  );

  //---form data---
  const [name, setName] = useState(brand?.brand?.name);
  //onChange
  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(
      updateBrandAction({
        name,
        id,
      })
    );

    //reset form data
    setName({
      name: "",
    });

    if (error) {
      toast.error(error.message);
    }
    if (isUpdated) {
      navigate(-1);
      toast.success(`${name} has been UPDATED`);
    }
    console.log(brand, isUpdated, loading, error);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Update Brand
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update Brand
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
