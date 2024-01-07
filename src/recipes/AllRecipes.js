import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Card, CardContent, CardActions, Typography, Grid, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";

const AllRecipes = () => {
    const { state } = useLocation();
    const categories = useSelector((state) => state?.category);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [duration, setDuration] = useState();
    const [difficulty, setDifficulty] = useState();
    const data = useSelector(state => state?.recipies);

    useEffect(() => {
        setFilteredRecipes(data?.filter(f => (!categoryId || f.CategoryId == categoryId) && (!duration || f.Duration <= duration) && (!difficulty || f.Difficulty <= difficulty)))
    }, [categoryId, duration, difficulty]);

    const dispatch = useDispatch();
    // const data = useSelector(state => state?.recipies);
    const naving = useNavigate();
    const userId = useSelector(state => state?.user?.Id);
    const DeleteRecipe = (x) => {
        dispatch({ type: "GET_RECIPIES", recipies: filteredRecipes });
        axios.post(`http://localhost:8080/api/recipe/delete/:${x}`).then((res) => {
            dispatch({ type: "DELETE_RECIPE", id: x.Id });
            alert("המתכון נמחק בהצלחה!!!");
        }).catch((error) => {
            alert("ho no!!!! i cant do it' please help me------");
        });
    };
    return (
        <Container
            style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#222',
                padding: '1rem',
                marginBottom: '1rem',
            }}>
            <Fragment>
                <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#222', padding: '1rem', marginBottom: '1rem', }}   >
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', }} >
                        <select onChange={(i) => setCategoryId(i.target.value)} style={{ width: '150px', borderRadius: '8px', padding: '0.5rem', border: '1px solid #222', backgroundColor: 'rgba(255, 255, 255, 0.4)', }} >
                            <option>category</option>
                            {categories?.map((c) => (
                                <option key={c.Id} value={c.Id}>
                                    {c.Name}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={(d) => setDuration(d.target.value)}
                            style={{
                                width: '150px',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                border: '1px solid #222',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            <option>זמן הכנה</option>
                            {data?.map((c) => (
                                <option key={c.Id} value={c.Duration}>
                                    {"דקות "}
                                    {c.Duration}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={(d) => setDifficulty(d.target.value)}
                            style={{
                                width: '150px',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                border: '1px solid #222',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            <option>קושי</option>
                            {data?.map((c) => (
                                <option key={c.Id} value={c.Difficulty}>
                                    {c.Difficulty}
                                </option>
                            ))}
                        </select>
                    </div></div>
            </Fragment>
            <Grid container spacing={3}>
                {filteredRecipes?.map((x) => (
                    <Grid item xs={12} sm={6} md={4} key={x.Id}>
                        <Card style={{ backgroundColor: "white", color: "black", textAlign: "center" }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {x.Name}
                                </Typography>
                                <img src={x.Img} alt={x.Name} style={{ width: "100%", height: "auto" }} />
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => naving("/DetailRecipe", { state: x })} variant="contained" color="primary" style={{ backgroundColor: "black", color: "white" }}>
                                    Show Recipe
                                </Button>
                                <Button onClick={() => DeleteRecipe(x)} variant="contained" color="secondary" disabled={x.UserId !== userId || userId !== 1} style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    opacity: x.UserId !== userId || userId !== 1 ? 0.5 : 1,
                                }}>
                                    Delete Recipe
                                </Button>
                                <Button onClick={() => naving('/AddEditRecipes', { state: x })} variant="contained" disabled={x.UserId !== userId || x.UserId !== 1}
                                    style={{ backgroundColor: "black", color: "white", opacity: x.UserId !== userId || userId !== 1 ? 0.5 : 1, }}>
                                    Edit Recipe
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );
};

export default AllRecipes;