import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  const addCustomers = (customersData) => {
    setCustomers(customersData);
  };

  const addCustomer = (customerData) => {
    setCustomers((prevCustomers) => [...prevCustomers, customerData]);
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.idCustomer === updatedCustomer.idCustomer
          ? updatedCustomer
          : customer
      )
    );
  };

  const deleteCustomer = (id) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.idCustomer !== id)
    );
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

// Hook personalizado para usar el contexto de los clientes
// eslint-disable-next-line react-refresh/only-export-components
export const useCustomerContext = () => useContext(CustomerContext);

// Prop types para el proveedor
CustomerProvider.propTypes = {
  children: PropTypes.node,
};
