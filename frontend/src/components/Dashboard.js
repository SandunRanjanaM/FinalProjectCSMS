import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import { Container, Typography, Paper, Grid } from "@mui/material";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE02', '#D0ED57'];

const PackageChart = () => {
    const [packageCounts, setPackageCounts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setPackageCounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching package counts:', error);
            });
    }, []);

    // Prepare the data for the bar chart (total price) and pie chart (user count)
    const chartData = packageCounts.map(({ packageName, userCount, price }) => {
        return {
            packageName,
            totalPrice: price * userCount,
            userCount,
        };
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Package Price and User Count Charts
            </Typography>

            <Grid container spacing={3}>
                {/* Bar Chart for Total Price */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: 16 }}>
                        <Typography variant="h6" gutterBottom>
                            Total Price by Package
                        </Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="packageName" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalPrice" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Pie Chart for User Count */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: 16 }}>
                        <Typography variant="h6" gutterBottom>
                            User Count Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="userCount"
                                    nameKey="packageName"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#82ca9d"
                                    label
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PackageChart;
