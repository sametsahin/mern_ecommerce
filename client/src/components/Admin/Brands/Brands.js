import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBrandsAction } from "../../../redux/slices/brands/brandsSlice";
import { ErrorMsg, NoDataFound } from "../../Notifications/index.js";
import {
  LoadingComponent,
  AddButton,
  EditButton,
  DeleteButton,
} from "../../Parts/index.js";

export default function Brands() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  //get data from store
  // const { error, loading, categories } = useSelector((state) => state?.categories);
  const {
    brands: { brands },
    loading,
    error,
  } = useSelector((state) => state?.brands);

  //delete brand handler
  const deleteItemHandler = (id) => {};
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            All Brands - [{brands?.length}]
          </h1>

          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AddButton name={"Add new Brand"} link={"/admin/brands/add"} />
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMsg message={error?.message} />
      ) : brands?.length <= 0 ? (
        <NoDataFound />
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        No. Products
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {brands?.map((brand) => (
                      <tr key={brand?._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {brand?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {brand?.products?.length}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(brand?.createdAt).toLocaleDateString()}
                        </td>
                        {/* edit icon */}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <EditButton to={`/admin/brands/edit/${brand?._id}`} />
                        </td>
                        {/* delete icon */}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <DeleteButton
                            onClick={() => deleteItemHandler(brand?._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
