import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IProductCatagory } from "../types/Iorder";
import { Box, Button, Input, TableFooter, TextField } from "@mui/material";
import { TableBarOutlined } from "@mui/icons-material";

const CatalogManager: React.FC = () => {
  const { getData, postData, putData } = UseCrud();

  const [categories, setCategories] = useState<IProductCatagory[]>([]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", desc: "" });
  const [showForm, setShowForm] = useState(false);

  const getFunc = async (url: string) => {
    let result = await getData(url);
    if (url === "categories") setCategories(result);
    if (url === "products") setProducts(result);
  };

  useEffect(() => {
    getFunc("categories");
    getFunc("products");
  }, []); 

  const tableContainerStyles = {
    maxHeight: "300px",
    overflow: "auto",
    width: "86vw",
    left: "7vw",
    position: "relative",
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    console.log(newCategory);
  };

  const handleAddNewCategory = async () => {
    if (newCategory.name != "")
      try {
        const response = await postData("categories", newCategory);
        console.log("Response:", response);
        setCategories((prevCategories) => [...prevCategories, response]);
      } catch (error) {
        console.error("Error:", error); 
      }
    console.log("Adding new category:", newCategory);
    setNewCategory({ name: "", desc: "" });
    setShowForm(false);
  };

  function handleEditCategory(category: IProductCatagory): void {
    setNewCategory({ name: category.name, desc: category.desc });
    setShowForm(true);
    putData("categories", newCategory);
  }

  return (
    <div>
      <h2>Categories</h2>
      {categories.length > 0 ? (
        <Paper sx={{ width: "86vw", left: "7vw", position: "relative" }}>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table
              sx={{ backgroundColor: "lightgrey" }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">product</TableCell>
                  <TableCell align="center">description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell align="center">{category.name}</TableCell>
                    <TableCell align="center">{category.desc}</TableCell>
                    {/* <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
              {showForm && (
                <TableFooter
                  sx={{ position: "sticky", bottom: 0, background: "white" }}
                >
                  <TableRow>
                    <TableCell align="center">
                      <TextField
                        name="name"
                        value={newCategory.name}
                        onChange={handleInputChange}
                        label="New Product"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        name="desc"
                        value={newCategory.desc}
                        onChange={handleInputChange}
                        label="New Description"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={handleAddNewCategory}>Add New</Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <p>Loading categories...</p>
      )}

      {/* Button to show the form */}
      {!showForm && (
        <Button
          sx={{
            width: "86vw",
            left: "7vw",
            position: "relative",
            backgroundColor: "lightgrey",
            textAlign: "!important left",
            "&:hover": {
              backgroundColor: "lightgrey",
            },
          }}
          variant="contained"
          onClick={() => setShowForm(true)}
        >
          add new category
        </Button>
      )}
    </div>
  );
};

export default CatalogManager;
