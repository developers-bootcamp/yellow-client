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
  const { getData } = UseCrud();

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
    // Fetch data when the component mounts
    getFunc("categories");
    getFunc("products");
  }, []); // Empty dependency array to fetch data only once

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
  };

  const handleAddNewCategory = () => {
  
    console.log("Adding new category:", newCategory);
   
    // Clear the form fields after adding the new category
    setNewCategory({ name: "", desc: "" });

    // Hide the form after adding the new category
    setShowForm(false);
  };

  return (
    <div>
      <h2>Categories</h2>
      {categories.length > 0 ? (
        <Paper sx={{ width: "86vw", left: "7vw", position: "relative" }}>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table sx={{ backgroundColor: "lightgrey" }} stickyHeader aria-label="sticky table">
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
                  </TableRow>
                ))}
              </TableBody>
              {showForm && (
                <TableFooter sx={{ position: "sticky", bottom: 0, background: "white" }}>
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
                      <Button
                        variant="contained"
                        onClick={handleAddNewCategory}
                      >
                        Add New
                      </Button>
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
        <Button variant="contained" onClick={() => setShowForm(true)}>
            add new category
        </Button>
      )}
    </div>
  );
};

export default CatalogManager;

