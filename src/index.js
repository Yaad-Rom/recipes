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
            this.hidePressedIngredients(index1, false);
    }

    hidePressedIngredients(index1, changeRedCollapsed) {
        console.log("hiding");
        let recCopy = this.state.recipes.slice();
        recCopy[index1].ingredients = recCopy[index1].ingredients.filter(item => item[1]);
        if (recCopy[index1].ingredients.length === 0) {
            this.resetChoice(index1);
        } else {
            this.setState({recipes: recCopy});
            if (changeRedCollapsed)
                this.changeRedCollapsed(index1);
        }
    }

    resetChoice(index1) {
        let recCopy = this.state.recipes.slice();
        recCopy[index1].ingredients = this.getOriginalRecipes()[index1].ingredients;
        this.setState({recipes: recCopy});
        this.state.redCollapsed[index1] = false;
    }

    showAllIngredients(index1) {
        console.log("showing");
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
        this.changeRedCollapsed(index1);
    }

    filterIngredients(index1) {
        if (!this.state.redCollapsed[index1]) {
            this.hidePressedIngredients(index1, true);
        } else {
            this.showAllIngredients(index1);
        }
    }

    changeRedCollapsed(index1) {
        let redCol = this.state.redCollapsed.slice();
        console.log(redCol[index1]);
        redCol[index1] = !redCol[index1];
        this.setState({redCollapsed: redCol});
    }

    createWhatsAppUrl(index1) {
        let url = "https://wa.me/?text="
        let empty = true;
        for (let i = 0; i < this.state.recipes.slice()[index1].ingredients.length; i++) {
            if (this.state.recipes.slice()[index1].ingredients[i][1])
            {
                url += this.state.recipes.slice()[index1].ingredients[i][0]
                url += "%0a"
                if (empty)
                    empty = false;
            }
        }
        if (empty){
            url += "לא נבחרו מרכיבים חסרים";
        }
        return url;
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
                                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                    <div className="btn-group">
                                        <button type="button"
                                                className={this.state.redCollapsed[index1] ? "btn btn-warning" : "btn btn-danger"}
                                                onClick={() => this.filterIngredients(index1)}>{this.state.redCollapsed[index1] ? "הצג הכל" : "הצג חסרים"}</button>
                                        <button type="button"
                                                className="btn btn-default"
                                                onClick={() => this.resetChoice(index1)}>{"נקה בחירה"}</button>
                                    </div>
                                    <div className="btn-group">
                                        <a target="_blank" rel="noopener noreferrer" href={this.createWhatsAppUrl(index1)}><img
                                            className="smallImages"
                                            src="data:image/png;base64,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"
                                            alt=""/></a>
                                    </div>
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