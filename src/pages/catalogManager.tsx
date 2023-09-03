import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import { IProductCatagory } from "../types/IProductCategories";
import {
  GridColDef,
  GridPreProcessEditCellProps,
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

const CatalogManager: React.FC = () => {
  const [currency, setCurrency] = useState("");
  const { getData, postData, putData, deleteData } = UseCrud();
  const [categories, setCategories] = useState<GridRowsProp>([]);
  const [products, setProducts] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getFunc("categories");
    getFunc("product");
  }, []);

  const defineColumnsProduct = (etitable: boolean) => {
    const columns: GridColDef[] = [
      {
        field: "name",
        headerName: "Product",
        width: 180,
        type: "string",
        editable: etitable,
        disableColumnMenu: true,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          let hasError=true;
          if(params.props.value){
            hasError= params.props.value.length < 0;
          }
            return { ...params.props, error: hasError, message: "reqiured" };
          }
      },
      {
        field: "desc",
        headerName: "Description",
        type: "string",
        width: 200,
        align: "left",
        headerAlign: "left",
        editable: etitable,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          let hasError=true;
          if(params.props.value){
            hasError= params.props.value.length < 0;
          }
            return { ...params.props, error: hasError, message: "reqiured" };
          }
      },
      {
        field: "inventory",
        headerName: "Inventory",
        type: "number",
        width: 150,
        align: "left",
        headerAlign: "left",
        editable: etitable,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = params.props.value <0;
          return { ...params.props, error: hasError, message: "min 0" };
        }
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
            const currency1 = params.row.currency;
            
            switch (currency1) {
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
                {currency === "SHEKEL"
                  ? "₪"
                  : currency === "EURO"
                  ? "€"
                  : currency === "RUBLE"
                  ? "₽"
                  : currency === "DOLLAR"
                  ? "$"
                :"MyCurrency"}
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
        renderCell: (params) => (
            <div>{params.row.productCategoryId ? params.row.productCategoryId.name : "N/A"}</div>
          ),
        renderEditCell: (params) => {
          const currentValue = params.row.productCategoryId; // Get the current category object
  
          return (
            <Select
              style={{ width: "200px" }}
              value={currentValue ? currentValue.id || '' : ''}  // Assuming the category object has an "id" property
              onChange={(e) => {
                const selectedCategoryId = e.target.value;
                const selectedCategory = categories.find(
                  (category) => category.id === selectedCategoryId
                );
                params.api.setEditCellValue({
                  id: params.id,
                  field: "productCategoryId",
                  value: selectedCategory, // Send the entire category object
                });
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          );
        },
      },
    ];
    return columns;
  };
 
  const pageChange = (num: number, type: string) => {
    setPage(num);
    TYPE = type;
  };

  const getFunc = async (url: string) => {
    let result = await getData(url);
    if (url === "categories") setCategories(result);
    if (url === "product") setProducts(result);
    if (products.length > 0) {
      setCurrency(products[products.length - 1].currency);
    }
  };

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
          role={""}
          paginationMode={"client"} rowsCount={7} pageSizeOption={3}        ></GlobalTable>
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
          role={""} paginationMode={"client"} rowsCount={7} pageSizeOption={3}  ></GlobalTable>
      }
    </>
  );
};

export default CatalogManager;
