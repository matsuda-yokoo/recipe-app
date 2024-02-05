//レシピ表示部分のコンポーネント

import React from 'react'

// レシピコンポーネント
// 取得した各要素を表示する
const Recipe = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <ol>
        {props.ingredients.map(ingredients=>{
            <li>
                {ingredients.text}
            </li>
        })}
      </ol>
      <p>{props.calories}cal</p>
      <img src={props.image} alt=""/>
    </div>
  );
};

export default Recipe;
