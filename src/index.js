//import the necessary files
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

//create the main class for displaying the recipes
class Recipe extends React.Component {

    getOriginalRecipes() {
        return ([
                {
                    link: "https://mobile.mako.co.il/food-cooking_magazine/become-a-chef/Recipe-382538f287a1e41006.htm",
                    img: "https://img.mako.co.il/2015/06/22/shasto_padthai_afik_c.jpg",
                    name: "פאד תאי",
                    ingredients: [["אטריות אורז", false, 0], ["גזר קטן", false, 1], ["כרוב קטן", false, 2], ["טופו / חזה עוף", false, 3], ["ג'ינג'ר", false, 4], ["ביצה", false, 5], ["בצל ירוק", false, 6], ["נבטים סיניים", false, 7], ["חמאת בוטנים", false, 8], ["סויה", false, 9], ["סילאן", false, 10], ["חומץ יין לבן", false, 11], ["שבבי צ'ילי חריף", false, 12], ["שבבי בוטנים קלויים", false, 13], ["כוסברה", false, 14]]
                },
                {
                    link: "https://www.mako.co.il/food-recipes/recipes_column-pasta/Recipe-49c837fce078341006.htm",
                    img: "https://img.mako.co.il/2013/12/25/asfasfvzxvvxv7_c.jpg",
                    name: "ספגטי בולונז",
                    ingredients: [["נודלס", false, 0], ["רוטב עגבניות", false, 1], ["כדורי בשר", false, 3]]
                },
                {
                    link: "https://www.hashulchan.co.il/%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99%D7%9D/%d7%a7%d7%90%d7%a8%d7%99-%d7%a2%d7%95%d7%a3-%d7%95%d7%99%d7%a8%d7%a7%d7%95%d7%aa-%d7%a2%d7%9d-%d7%97%d7%9e%d7%90%d7%aa-%d7%91%d7%95%d7%98%d7%a0%d7%99%d7%9d/",
                    img: "https://medias.hashulchan.co.il/www/uploads/2016/02/carry_chicken_peanuts_daniel_talya-2000x1125-1579771750.jpg",
                    name: "קארי עוף וירקות עם חמאת בוטנים",
                    ingredients: [["גזר", false, 0], ["שום", false, 1], ["בצל", false, 2]]
                }
            ]
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            recipes: this.getOriginalRecipes(),
            redCollapsed: [false, false, false]
        };
    }

    updatePressed(index1, index2) {
        const recCopy = this.state.recipes.slice();
        recCopy[index1].ingredients[index2][1] = !recCopy[index1].ingredients[index2][1];
        this.setState({recipes: recCopy})
        if (this.state.redCollapsed[index1])
            this.hidePressedIngredients(index1);
    }

    hidePressedIngredients(index1) {
        let recCopy = this.state.recipes.slice();
        recCopy[index1].ingredients = recCopy[index1].ingredients.filter(item => item[1]);
        if (recCopy[index1].ingredients.length === 0) {
            let redCol = this.state.redCollapsed.slice();
            redCol[index1] = !redCol[index1];
            this.setState({redCollapsed: redCol});
            this.showAllIngredients(index1);
        } else
            this.setState({recipes: recCopy});
    }

    resetChoice(index1) {
        let recCopy = this.state.recipes.slice();
        recCopy[index1].ingredients = this.getOriginalRecipes()[index1].ingredients;
        this.setState({recipes: recCopy});
        this.state.redCollapsed[index1] = false;
    }

    showAllIngredients(index1) {
        let recCopy = this.state.recipes.slice();
        let missing_items_indices = [];
        var i;
        for (i = 0; i < recCopy[index1].ingredients.length; i++) {
            missing_items_indices.push(recCopy[index1].ingredients[i][2]);
        }
        recCopy[index1].ingredients = this.getOriginalRecipes()[index1].ingredients;
        for (i = 0; i < missing_items_indices.length; i++) {
            recCopy[index1].ingredients[missing_items_indices[i]][1] = !recCopy[index1].ingredients[missing_items_indices[i]][1];
        }
        this.setState({recipes: recCopy});
    }

    filterIngredients(index1) {
        let redCol = this.state.redCollapsed.slice();
        redCol[index1] = !redCol[index1];
        if (!this.state.redCollapsed[index1]) {
            this.hidePressedIngredients(index1);
        } else {
            this.showAllIngredients(index1);
        }
        this.setState({redCollapsed: redCol});
    }

    render() {
        const recipes = this.state.recipes;
        return (
            <div className="jumbotron">
                <h1>מתכונים שווים</h1>
                <img className="bigImage"
                     src="https://cdn1.iconfinder.com/data/icons/restaurants-and-food/108/hat-512.png" alt="emoji"/>
                <br/>
                <div className="panel-group">
                    {recipes.map((recipe, index1) => (
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse" href={"#collapse".concat(index1)}>
                                        {/*<span className="badge">12</span>{"\t"}*/}
                                        {recipe.name}
                                    </a>
                                </h4>
                            </div>
                            <div id={"collapse".concat(index1)} className="panel-collapse collapse">
                                <ul id="collapse-list" className="list-group">
                                    <a target="_blank" rel="noopener noreferrer" href={recipe.link}><img
                                        className="images" src={recipe.img} alt=""/></a>
                                    {recipe.ingredients.map((ingredient, index2) => (
                                        <li key={index2} className={`list-group-item${ingredient[1] ? "-pressed" : ""}`}
                                            onClick={() => this.updatePressed(index1, index2, ingredient[2])}>
                                            {ingredient[0]}
                                        </li>
                                        // <li key={index} className="list-group-item">{ingredient}</li>
                                    ))}
                                    {/*<button id="toggle-collapse" onClick={() => this.filterIngredients(index1)}>Expand/Collapse</button>*/}
                                </ul>
                                <div className="btn-group">
                                    <button type="button"
                                            className={this.state.redCollapsed[index1] ? "btn btn-warning" : "btn btn-danger"}
                                            onClick={() => this.filterIngredients(index1)}>{this.state.redCollapsed[index1] ? "הצג הכל" : "הצג חסרים"}</button>
                                    <button type="button"
                                            className="btn btn-default"
                                            onClick={() => this.resetChoice(index1)}>{"נקה בחירה"}</button>
                                </div>
                            </div>
                            {/*<div id={"collapse".concat(index)} className="panel-collapse collapse">*/}
                            {/*    <div className="panel-body">Panel Body</div>*/}
                            {/*</div>*/}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Recipe/>, document.getElementById('app'));