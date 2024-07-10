const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");

const app = express();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;

app.use(bodyParser.json());

// Create a new product
// Create a new product
app.post("/product", async (req, res) => {
      const { id, name, price } = req.body;

      const params = {
            TableName: tableName,
            Item: { id, name, price },
      };

      try {
            await dynamoDb.put(params).promise();
            res.status(201).json({ message: "Product created successfully" });
      } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({
                  error: "Could not create product",
                  details: error.message,
            });
      }
});

// Get a product by ID
app.get("/product/:id", async (req, res) => {
      const params = {
            TableName: tableName,
            Key: { id: req.params.id },
      };

      try {
            const result = await dynamoDb.get(params).promise();
            res.status(200).json(result.Item);
      } catch (error) {
            res.status(500).json({ error: "Could not fetch product" });
      }
});

// List all products
app.get("/products", async (req, res) => {
      const params = {
            TableName: tableName,
      };

      try {
            const result = await dynamoDb.scan(params).promise();
            res.status(200).json(result.Items);
      } catch (error) {
            res.status(500).json({ error: "Could not fetch products" });
      }
});

// Update a product by ID
app.put("/product/:id", async (req, res) => {
      const { name, price } = req.body;

      const params = {
            TableName: tableName,
            Key: { id: req.params.id },
            UpdateExpression: "set #name = :name, price = :price",
            ExpressionAttributeNames: { "#name": "name" },
            ExpressionAttributeValues: { ":name": name, ":price": price },
            ReturnValues: "UPDATED_NEW",
      };

      try {
            const result = await dynamoDb.update(params).promise();
            res.status(200).json(result.Attributes);
      } catch (error) {
            res.status(500).json({ error: "Could not update product" });
      }
});

// Delete a product by ID
app.delete("/product/:id", async (req, res) => {
      const params = {
            TableName: tableName,
            Key: { id: req.params.id },
      };

      try {
            await dynamoDb.delete(params).promise();
            res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
            res.status(500).json({ error: "Could not delete product" });
      }
});

module.exports = app;
