import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import { IProductCatagory } from "../types/IProductCategories";
import {
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import GlobalTable from "../components/globalTable";
import { PALLETE } from "../config/config";
import { MenuItem, Select, TextField } from "@mui/material";

const ROLE = sessionStorage.getItem("role");
let TYPE = "";

const defineColumns = (etitable: boolean) => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product",
      width: 180,
      editable: etitable,
      disableColumnMenu: true,
    },
    {
      field: "desc",
      headerName: "Description",
      type: "string",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: etitable,
    },
  ];
  return columns;
};
const defineColumnsProduct = (etitable: boolean) => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product",
      width: 180,
      editable: etitable,
      disableColumnMenu: true,
    },
    {
      field: "desc",
      headerName: "Description",
      type: "string",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: etitable,
    },
    {
      field: "inventory",
      headerName: "Inventory",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: etitable,
    },
    {
      field: "discountAmount",
      headerName: "Discount",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: etitable,
    },
    {
      field: "discount",
      headerName: "",
      type: "String",
      width: 20,
      align: "center",
      headerAlign: "left",
      editable: etitable,
      renderCell: (params) => {
        let symbol = "$";

        if (params.value === "Percentage") {
          symbol = "%";
        } else {
          // Assuming 'currency' is the name of the currency field in your data
          const currency = params.row.currency;

          // Map currency names to symbols as needed
          switch (currency) {
            case "SHEKEL":
              symbol = "₪";
              break;
            case "Euro":
              symbol = "€";
              break;
            case "FRANCE":
              symbol = "€";
              break;
            case "RUBLE":
              symbol = "₽";
              break;
            // Add more cases for other currencies as needed
            default:
              // Handle other cases here
              break;
          }
        }

        return <div>{symbol}</div>;
      },

      renderEditCell: (params) => {
        // Store the current 'discount' value in a variable
        const currentValue = params.row.discount;

        return (
          <Select
            style={{ width: "80px" }} // Adjust the width as needed
            value={currentValue}
            onChange={(e) => {
              params.api.setEditCellValue({
                id: params.id,
                field: "discount",
                value: e.target.value,
              });
            }}
          >
            <MenuItem value="Percentage">%</MenuItem>
            <MenuItem value="FixedAmount">
              {params.row.currency === "SHEKEL"
                ? "₪"
                : params.row.currency === "EURO"
                ? "€"
                : params.row.currency === "RUBLE"
                ? "₽"
                : params.row.currency === "DOLLAR"
                ? "$"
                : "MyCurrency"}
            </MenuItem>
          </Select>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 80,
      align: "center",
      headerAlign: "left",
      editable: etitable,
    },
    {
      field: "productCategoryId",
      headerName: "Category",
      type: "string",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: etitable,
    },
  ];
  return columns;
};
const CatalogManager: React.FC = () => {
  const { getData, postData, putData, deleteData } = UseCrud();
  const [categories, setCategories] = useState<GridRowsProp>([]);
  const [products, setProducts] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(0);

  const pageChange = (num: number, type: string) => {
    setPage(num);
    TYPE = type;
  };
  let currency = "DOLLAR";
  const getFunc = async (url: string) => {
    let result = await getData(url);
    if (url === "categories") setCategories(result);
    if (url === "product") setProducts(result);
    console.log(products);
  };
  useEffect(() => {
    getFunc("categories");
    getFunc("product");
  }, []);

  const addCategory = (newCategory: GridRowModel) => {
    postData("categories", newCategory)
      .then((data) => {
        console.log(data);
        getFunc("categories");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const deleteCategory = (id: GridRowId) => {
    deleteData(`categories/${id}`)
      .then((data) => {
        console.log(data);
        getFunc("categories");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const updateCategory = (Category: GridRowModel) => {
    console.log(Category);
    putData("categories", Category)
      .then((data) => {
        console.log(data);
        getFunc("categories");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const addProduct = (newProduct: GridRowModel) => {
    postData("product", newProduct)
      .then((data) => {
        console.log(data);
        getFunc("product");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const deleteProduct = (id: GridRowId) => {
    deleteData(`product/${id}`)
      .then((data) => {
        console.log(data);
        getFunc("product");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const updateProduct = (Product: GridRowModel) => {
    console.log(Product);
    putData("product", Product)
      .then((data) => {
        console.log(data);
        getFunc("product");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      {
        <GlobalTable
          editable={ROLE === "ADMIN" ? true : false}
          data={categories}
          title={"Categories"}
          columns={defineColumns(ROLE === "ADMIN" ? true : false)}
          color={PALLETE.RED}
          type={"CATEGORY"}
          onRowAdded={addCategory}
          onRowDeleted={deleteCategory}
          onRowUptated={updateCategory}
          fetchData={pageChange}
          role={""}
        ></GlobalTable>
      }

      {
        <GlobalTable
          editable={ROLE === "ADMIN" ? true : false}
          data={products}
          title={"Products"}
          columns={defineColumnsProduct(ROLE === "ADMIN" ? true : false)}
          color={PALLETE.RED}
          type={"PRODUCT"}
          onRowAdded={addProduct}
          onRowDeleted={deleteProduct}
          onRowUptated={updateProduct}
          fetchData={pageChange}
          role={""}
        ></GlobalTable>
      }
    </>
  );
};

export default CatalogManager;
