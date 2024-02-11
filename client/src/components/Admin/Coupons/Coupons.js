import { Link, useParams } from "react-router-dom";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import AddButton from "../../Parts/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCouponAction,
  fetchCouponsAction,
} from "../../../redux/slices/coupons/couponsSlice";
import ConditionalSpan from "../../Parts/ConditionalSpan";
import EditButton from "../../Parts/EditButton";
import DeleteButton from "../../Parts/DeleteButton";
import { TrashIcon } from "@heroicons/react/24/outline";
export default function Coupons() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCouponsAction());
  }, [dispatch]);

  //get coupons
  const { coupons, loading, error } = useSelector((state) => state?.coupons);

  //---deleteHandler---

  const deleteCouponHandler = (id) => {
    dispatch(deleteCouponAction(id));
    window.location.reload();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            All Coupons - [{coupons?.coupons?.length}]
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            List of all coupons in the system
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <AddButton name={"Add new Coupon"} link={"/admin/coupons/add"} />
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMsg
          message={error?.message || "Something went wrong, please try again"}
        />
      ) : coupons?.coupons?.length <= 0 ? (
        <NoDataFound />
      ) : (
        <>
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
                          Code
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Percentage (%)
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Start Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          End Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Days Left
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
                      {coupons?.coupons?.map((coupon) => (
                        <tr key={coupon._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {coupon?.code}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {coupon?.discount}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(coupon.startDate)?.toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(coupon.endDate)?.toLocaleDateString()}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {coupon?.isExpired ? (
                              <ConditionalSpan type={"red"} text={"Expired"} />
                            ) : (
                              <ConditionalSpan
                                type={"green"}
                                text={coupon?.daysLeft}
                              />
                            )}
                          </td>
                          {/* edit icon */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <EditButton
                              to={`/admin/coupons/edit/${coupon.code}`}
                            />
                          </td>
                          {/* delete */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <DeleteButton
                              onClick={() => deleteCouponHandler(coupon?._id)}
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
        </>
      )}
    </div>
  );
}
