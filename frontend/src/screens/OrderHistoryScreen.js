import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOrderMine } from "../actions/orderActions";
import Loading from "../elements/Loading";
import MessageBox from "../elements/MessageBox";

export default function OrderHistoryScreen() {
  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div className="order-history">
      <h1>Order History</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <span>ID</span>
                  {order._id}
                </td>
                <td>
                  <span>DATE</span>
                  {order.createdAt.substring(0, 10)}
                </td>
                <td>
                  <span>TOTAL</span>
                  {order.totalPrice.toFixed(2)}
                </td>
                <td>
                  <span>PAID</span>
                  {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                </td>
                <td>
                  <span>DELIVERED</span>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <span>ACTIONS</span>
                  <button
                    type="button"
                    className="btn btn-secondary btn-small"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
