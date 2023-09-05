import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import { GridColDef, GridRowId, GridRowModel, GridRowsProp } from "@mui/x-data-grid";
import GlobalTable from "../components/globalTable";
import LandingPage from "./landingPage";
import { PALLETE } from "../config/config";
import { TextField } from "@mui/material";
    const ROLE = sessionStorage.getItem('role');
    let TYPE = '';
    const defineColumns = (etitable: boolean) => {
        const columns: GridColDef[] = [
          { field: 'name', headerName: 'Product', width: 180, editable: etitable, disableColumnMenu: true },
          {
            field: 'desc',
            headerName: 'Description',
            type: 'string',
            width: 200,
            align: 'left',
            headerAlign: 'left',
            editable: etitable,
          }
        ];
        return columns;
      }
      const defineColumnsProduct = (etitable: boolean) => {
        const columns: GridColDef[] = [
          { field: 'name', headerName: 'Product', width: 180, editable: etitable, disableColumnMenu: true },
          {
            field: 'desc',
            headerName: 'Description',
            type: 'string',
            width: 200,
            align: 'left',
            headerAlign: 'left',
            editable: etitable,
          },
          {
            field: 'inventory',
            headerName: 'Inventory',
            type: 'number',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: etitable,
          },
          {
            field: 'discountAmount',
            headerName: 'Discount',
            type: 'string',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            editable: etitable,
          },
          {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            editable: etitable,
          },
          {
            field: 'productCategoryId',
            headerName: 'Category',
            type: 'string',
            width: 200,
            align: 'left',
            headerAlign: 'left',
            editable: etitable,
          }
        ];
        return columns;
      }
    const CatalogManager: React.FC = () => {
    const { getData, postData, putData,deleteData } = UseCrud();
    const [categories, setCategories] = useState<GridRowsProp>([]);
    const [products, setProducts] = useState<GridRowsProp>([]);
    const [page, setPage] = useState(0);
    const pageChange = (num: number, type: string) => {
        setPage(num);
        TYPE = type;
      }
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
        postData('categories', newCategory)
          .then((data) => {
            console.log(data);
            getFunc('categories');
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
      const deleteCategory = (id: GridRowId) => {
        deleteData(`categories/${id}`)
          .then((data) => {
            console.log(data);
            getFunc('categories');
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
          const updateCategory = (Category: GridRowModel) => {
            console.log(Category);
            putData('categories', Category)
              .then((data) => {
                console.log(data);
                getFunc('categories');
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
          const addProduct = (newProduct: GridRowModel) => {
            postData('product', newProduct)
              .then((data) => {
                console.log(data);
                getFunc('product');
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
          const deleteProduct = (id: GridRowId) => {
            deleteData(`product/${id}`)
              .then((data) => {
                console.log(data);
                getFunc('product');
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            }
              const updateProduct = (Product: GridRowModel) => {
                console.log(Product);
                putData('product', Product)
                  .then((data) => {
                    console.log(data);
                    getFunc('product');
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
              }
    return (
<div>
      <LandingPage></LandingPage>
</div>
    );
};
    
export default CatalogManager;