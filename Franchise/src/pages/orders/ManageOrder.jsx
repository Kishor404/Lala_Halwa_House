import { Link, useNavigate } from "react-router-dom";
import * as Icons from "react-icons/tb";
import Orders from "../../api/Orders.json";
import Customers from "../../api/Customers.json";
import React, { useState, useEffect } from "react";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import CheckBox from "../../components/common/CheckBox.jsx";
import Dropdown from "../../components/common/Dropdown.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import TableAction from "../../components/common/TableAction.jsx";
import SelectOption from "../../components/common/SelectOption.jsx";

import OrderData from "../../api/OrderData.jsx";


const ManageOrders = () => {
  const [bulkCheck, setBulkCheck] = useState(false);
  const [specificChecks, setSpecificChecks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(5);
    const navigate = useNavigate();
  const [tableRow, setTableRow] = useState([
    { value: 2, label: "2" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ]);

  const orders = Orders;

	const customer = orders.map(order => {
	  const customerId = order.customer_id;
	  const customer = Customers.find(customer => customer.id === customerId);
	  return customer;
	});



  const bulkAction = [
    { value: "delete", label: "Delete" },
    { value: "category", label: "Category" },
    { value: "status", label: "Status" },
  ];

  const bulkActionDropDown = (selectedOption) => {
    console.log(selectedOption);
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleBulkCheckbox = (isCheck) => {
    setBulkCheck(isCheck);
    if (isCheck) {
      const updateChecks = {};
      orders.forEach((order) => {
        updateChecks[order.id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckOrder = (isCheck, id) => {
    setSpecificChecks((prevSpecificChecks) => ({
      ...prevSpecificChecks,
      [id]: isCheck,
    }));
  };

  const showTableRow = (selectedOption) => {
    setSelectedValue(selectedOption.label);
  };


  const actionItems = ["Delete","View", "Edit"];

  const handleActionItemClick = (item, orderId) => {
    var updateItem = item.toLowerCase();
    if (updateItem === "delete") {
      alert(`#${orderId} item delete`);
    } else if (updateItem === "view") {
      navigate(`/orders/manage/${orderId.toString()}`);
    }
  };


  return (
    <section className="orders">
      <div className="container">
        <div className="wrapper">
          <div className="content transparent">
            <div className="content_head">
              <Dropdown
                placeholder="Bulk Action"
                className="sm"
                onClick={bulkActionDropDown}
                options={bulkAction}
              />
              <Input
                placeholder="Search Order..."
                className="sm table_search"
              />
              <div className="btn_parent">
                <Link to="/orders/add" className="sm button">
                  <Icons.TbPlus />
                  <span>Create Order</span>
                </Link>
                <Button label="Advance Filter" className="sm" />
                <Button label="save" className="sm" />
              </div>
            </div>
            <div className="content_body">
              <div className="table_responsive">
                <table className="separate">
                  <thead>
                    <tr>
                      <th className="td_checkbox">
                        <CheckBox
                          onChange={handleBulkCheckbox}
                          isChecked={bulkCheck}
                        />
                      </th>
                      <th className="td_id">id</th>
                      <th>Customers</th>
                      <th>phone</th>
                      <th>amount</th>
                      <th>payment method</th>
                      <th>payment status</th>
                      <th>status</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrderData.map((order, key) => {
                      return (
                        <tr key={key}>
                          <td className="td_checkbox">
                            <CheckBox
                              onChange={(isCheck) =>
                                handleCheckOrder(isCheck, order.id)
                              }
                              isChecked={specificChecks[order.id] || false}
                            />
                          </td>
                          <td className="td_id">{order.id}</td>
                          <td>
                          	<Link>{order.user}</Link>
                          </td>
                          <td>{order.user}</td>
                          <td>{order.total_price}</td>
                          <td>{order.payment_details.payment_method}</td>
                          <td>
                          	{order.status.toLowerCase() === "active" ||
                           order.status.toLowerCase() === "completed" ||
                           order.status.toLowerCase() === "approved" ||
                           order.status.toLowerCase() === "Delivered" ||
                           order.status.toLowerCase() === "Shipped" ||
                           order.status.toLowerCase() === "new" ||
                           order.status.toLowerCase() === "coming soon" ? (
                             <Badge
                               label={order.status}
                               className="light-success"
                             />
                           ) : order.status.toLowerCase() === "inactive" ||
                             order.status.toLowerCase() === "out of stock" ||
                             order.status.toLowerCase() === "rejected" ||
                             order.status.toLowerCase() === "locked" ||
                             order.status.toLowerCase() === "Cancelled" ? (
                             <Badge
                               label={order.status}
                               className="light-danger"
                             />
                           ) : order.status.toLowerCase() === "on sale" ||
                               order.status.toLowerCase() === "featured" ||
                               order.status.toLowerCase() === "shipping" ||
                               order.status.toLowerCase() === "Processing" ||
                               order.status.toLowerCase() === "Pending" ? (
                             <Badge
                               label={order.status}
                               className="light-warning"
                             />
                           ) : order.status.toLowerCase() === "archive" ||
                               order.status.toLowerCase() === "pause" ? (
                             <Badge
                               label={order.status}
                               className="light-secondary"
                             />
                           ) : (
                             order.status
                           )}
                          </td>
                          <td>
                          	{order.payment_details.status.toLowerCase() === "active" ||
                           order.payment_details.status.toLowerCase() === "completed" ||
                           order.payment_details.status.toLowerCase() === "approved" ||
                           order.payment_details.status.toLowerCase() === "Delivered" ||
                           order.payment_details.status.toLowerCase() === "Shipped" ||
                           order.payment_details.status.toLowerCase() === "new" ||
                           order.payment_details.status.toLowerCase() === "coming soon" ? (
                             <Badge
                               label={order.payment_details.status}
                               className="light-success"
                             />
                           ) : order.payment_details.status.toLowerCase() === "inactive" ||
                             order.payment_details.status.toLowerCase() === "out of stock" ||
                             order.payment_details.status.toLowerCase() === "rejected" ||
                             order.payment_details.status.toLowerCase() === "locked" ||
                             order.payment_details.status.toLowerCase() === "Cancelled" ? (
                             <Badge
                               label={order.payment_details.status}
                               className="light-danger"
                             />
                           ) : order.payment_details.status.toLowerCase() === "on sale" ||
                               order.payment_details.status.toLowerCase() === "featured" ||
                               order.payment_details.status.toLowerCase() === "shipping" ||
                               order.payment_details.status.toLowerCase() === "Processing" ||
                               order.payment_details.status.toLowerCase() === "Pending" ? (
                             <Badge
                               label={order.payment_details.status}
                               className="light-warning"
                             />
                           ) : order.payment_details.status.toLowerCase() === "archive" ||
                               order.payment_details.status.toLowerCase() === "pause" ? (
                             <Badge
                               label={order.payment_details.status}
                               className="light-secondary"
                             />
                           ) : (
                             order.payment_details.status
                           )}
                          </td>
                          <td className="td_action">
                            <TableAction
                              actionItems={actionItems}
                              onActionItemClick={(item) =>
                                handleActionItemClick(item, order.id)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="content_footer">
              <Dropdown
                className="top show_rows sm"
                placeholder="please select"
                selectedValue={selectedValue}
                onClick={showTableRow}
                options={tableRow}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageOrders;