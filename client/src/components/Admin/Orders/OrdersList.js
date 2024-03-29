import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAction } from "../../../redux/slices/orders/ordersSlice";

import OrdersStats from "./OrdersStats";
import { ErrorMsg, NoDataFound } from "../../Notifications/index.js";
import { LoadingComponent } from "../../Parts/index.js";



export default function OrdersList() {
  const dispatch = useDispatch();

  //fetching orders
  useEffect(() => {
    dispatch(fetchAllOrdersAction());
  }, [dispatch]);
  const {
    error,
    loading,
    orders: { orders },
  } = useSelector((state) => state?.orders);

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center"></div>
        {/* order stats */}
        <OrdersStats />

        <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
          Recent Oders
        </h3>
        <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Oder Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Delivery Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Total
                </th>
                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th> */}
              </tr>
            </thead>
            {loading ? (
              <LoadingComponent />
            ) : orders?.length < 1 ? (
              <NoDataFound />
            ) : (
              <tbody className="divide-y divide-gray-200 bg-white">
                {orders?.map((order) => (
                  <tr key={order?._id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      {order?.orderNumber}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {order?.paymentStatus === "Not paid" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {order?.paymentStatus}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-700 text-black">
                          {order?.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {order.status}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      {order.status}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      {order.totalPrice}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      {order?.paymentStatus !== "Not paid" ? (
                        <Link
                          style={{ cursor: "not-allowed" }}
                          className="text-gray-400"
                        >
                          Edit
                        </Link>
                      ) : (
                        <Link
                          to={`/admin/orders/update/${order?._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
